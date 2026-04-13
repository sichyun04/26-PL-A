const STORAGE_KEY = "todo-app-items";

const form = document.getElementById("add-form");
const input = document.getElementById("todo-input");
const dueInput = document.getElementById("todo-due");
const listPending = document.getElementById("todo-list-pending");
const listDone = document.getElementById("todo-list-done");
const pendingEmpty = document.getElementById("pending-empty");
const doneEmpty = document.getElementById("done-empty");

const DUE_RE = /^\d{4}-\d{2}-\d{2}$/;

let editingId = null;

function normalizeDueDate(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "string" || !DUE_RE.test(value)) return null;
  return value;
}

function parseDueYMD(ymd) {
  if (!ymd || !DUE_RE.test(ymd)) return null;
  const y = Number(ymd.slice(0, 4));
  const m = Number(ymd.slice(5, 7));
  const d = Number(ymd.slice(8, 10));
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

function startOfTodayLocal() {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

function isDueOverdue(ymd, done) {
  if (done || !ymd) return false;
  const due = parseDueYMD(ymd);
  if (!due) return false;
  return due < startOfTodayLocal();
}

function formatDueDisplay(ymd) {
  const d = parseDueYMD(ymd);
  if (!d) return "";
  return d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item) =>
          item &&
          typeof item.id === "string" &&
          typeof item.text === "string" &&
          typeof item.done === "boolean"
      )
      .map((item) => ({
        id: item.id,
        text: item.text,
        done: item.done,
        dueDate: normalizeDueDate(item.dueDate),
      }));
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

let todos = loadTodos();

function updateSectionEmptyStates(pendingCount, doneCount) {
  pendingEmpty.classList.toggle("hidden", pendingCount > 0);
  doneEmpty.classList.toggle("hidden", doneCount > 0);
}

function createTodoRowEditing(todo) {
  const li = document.createElement("li");
  li.className = "todo-item todo-item--editing";
  li.dataset.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-check";
  checkbox.checked = todo.done;
  checkbox.disabled = true;
  checkbox.setAttribute("aria-label", todo.done ? "완료된 항목" : "예정 항목");

  const body = document.createElement("div");
  body.className = "todo-body";

  const textField = document.createElement("input");
  textField.type = "text";
  textField.className = "todo-input todo-edit-input";
  textField.value = todo.text;
  textField.maxLength = 500;
  textField.setAttribute("aria-label", "할 일 내용");

  const dueRow = document.createElement("div");
  dueRow.className = "todo-edit-due";

  const dueLab = document.createElement("label");
  dueLab.className = "due-label";
  dueLab.htmlFor = `edit-due-${todo.id}`;
  dueLab.textContent = "마감";

  const dueField = document.createElement("input");
  dueField.type = "date";
  dueField.className = "due-input";
  dueField.id = `edit-due-${todo.id}`;
  if (todo.dueDate) {
    dueField.value = todo.dueDate;
  }

  dueRow.append(dueLab, dueField);

  const editActions = document.createElement("div");
  editActions.className = "todo-edit-actions";

  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "btn btn-primary btn-compact";
  saveBtn.textContent = "저장";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "btn btn-secondary btn-compact";
  cancelBtn.textContent = "취소";

  const cancelEdit = () => {
    editingId = null;
    render();
  };

  const applyEdit = () => {
    const nextText = textField.value.trim();
    if (!nextText) {
      textField.focus();
      return;
    }
    const dueRaw = dueField.value.trim();
    todo.text = nextText;
    todo.dueDate = dueRaw ? normalizeDueDate(dueRaw) : null;
    editingId = null;
    saveTodos(todos);
    render();
  };

  saveBtn.addEventListener("click", applyEdit);
  cancelBtn.addEventListener("click", cancelEdit);

  textField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  });

  dueField.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  });

  editActions.append(saveBtn, cancelBtn);
  body.append(textField, dueRow, editActions);
  li.append(checkbox, body);

  queueMicrotask(() => {
    textField.focus();
  });

  return li;
}

function createTodoRowView(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-check";
  checkbox.checked = todo.done;
  checkbox.setAttribute(
    "aria-label",
    todo.done ? "체크 해제하여 예정으로 되돌리기" : "완료 처리하여 완료 목록으로 이동"
  );

  const body = document.createElement("div");
  body.className = "todo-body";

  const span = document.createElement("span");
  span.className = "todo-text" + (todo.done ? " done" : "");
  span.textContent = todo.text;

  body.appendChild(span);

  if (todo.dueDate) {
    const dueEl = document.createElement("span");
    dueEl.className = "todo-due";
    if (!todo.done && isDueOverdue(todo.dueDate, false)) {
      dueEl.classList.add("todo-due--overdue");
    }
    if (todo.done) {
      dueEl.classList.add("todo-due--done");
    }
    dueEl.textContent = "마감: " + formatDueDisplay(todo.dueDate);
    body.appendChild(dueEl);
  }

  const actions = document.createElement("div");
  actions.className = "todo-item-actions";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "btn btn-edit";
  editBtn.textContent = "편집";

  const delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.className = "btn btn-danger";
  delBtn.textContent = "삭제";

  editBtn.addEventListener("click", () => {
    editingId = todo.id;
    render();
  });

  checkbox.addEventListener("change", () => {
    todo.done = checkbox.checked;
    saveTodos(todos);
    render();
  });

  delBtn.addEventListener("click", () => {
    if (editingId === todo.id) {
      editingId = null;
    }
    todos = todos.filter((t) => t.id !== todo.id);
    saveTodos(todos);
    render();
  });

  actions.append(editBtn, delBtn);
  li.append(checkbox, body, actions);
  return li;
}

function createTodoRow(todo) {
  if (todo.id === editingId) {
    return createTodoRowEditing(todo);
  }
  return createTodoRowView(todo);
}

function render() {
  if (editingId && !todos.some((t) => t.id === editingId)) {
    editingId = null;
  }

  const pending = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  listPending.replaceChildren(...pending.map((t) => createTodoRow(t)));
  listDone.replaceChildren(...done.map((t) => createTodoRow(t)));

  updateSectionEmptyStates(pending.length, done.length);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const dueRaw = dueInput.value.trim();
  const dueDate = dueRaw ? normalizeDueDate(dueRaw) : null;

  todos.push({ id: uid(), text, done: false, dueDate });
  input.value = "";
  dueInput.value = "";
  saveTodos(todos);
  render();
  input.focus();
});

render();
input.focus();
