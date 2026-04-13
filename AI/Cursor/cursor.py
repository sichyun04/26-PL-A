def main() -> None:
    line = input().strip()
    if not line:
        print([])
        return
    items = line.split()
    reversed_list = list(reversed(items))
    print(reversed_list)


if __name__ == "__main__":
    main()
