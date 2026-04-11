#include <stdio.h>

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) {
        fprintf(stderr, "error: need two integers\n");
        return 1;
    }
    if (b == 0) {
        fprintf(stderr, "error: division by zero\n");
        return 1;
    }
    printf("%d\n", a / b);
    return 0;
}
