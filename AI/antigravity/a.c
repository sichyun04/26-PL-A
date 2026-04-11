#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * 인자로 받은 문자열을 역순으로 뒤집은 새로운 문자열을 동적 할당하여 반환하는
 * 함수
 */
char *reverse_string(const char *str) {
  if (str == NULL) {
    return NULL;
  }

  size_t len = strlen(str);

  // 입력받은 문자열의 길이 + 널 종료 문자('\0')를 위한 메모리 동적 할당
  char *reversed = (char *)malloc((len + 1) * sizeof(char));

  if (reversed == NULL) {
    // 메모리 할당 실패 시 처리
    fprintf(stderr, "메모리 할당에 실패했습니다.\n");
    return NULL;
  }

  // 문자열을 역순으로 복사
  for (size_t i = 0; i < len; ++i) {
    reversed[i] = str[len - 1 - i];
  }

  // 마지막에 널 종료 문자 추가
  reversed[len] = '\0';

  return reversed;
}

int main() {
  char buffer[256]; // 입력을 받기 위한 임시 버퍼

  printf("input string: ");

  // 사용자로부터 한 줄을 입력받음 (띄어쓰기 포함)
  if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
    // fgets로 들어온 개행 문자('\n')를 찾아 널 문자('\0')로 제거
    buffer[strcspn(buffer, "\n")] = '\0';

    // 함수 호출
    char *result = reverse_string(buffer);

    if (result != NULL) {
      printf("original: %s\n", buffer);
      printf("reversed: %s\n", result);

      // 사용이 끝난 'result' 메모리는 반드시 해제(free)해야 함
      free(result);
    }
  } else {
    printf("입력 오류 발생\n");
  }

  return 0;
}
