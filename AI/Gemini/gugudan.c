#include <stdio.h>

int main() {
    // 2단부터 9단까지 반복
    for (int i = 2; i <= 9; i++) {
        printf("--- %d ---\n", i);
        // 1부터 9까지 곱함
        for (int j = 1; j <= 9; j++) {
            printf("%d x %d = %d\n", i, j, i * j);
        }
        printf("\n"); // 단 사이 공백
    }
    return 0;
}
