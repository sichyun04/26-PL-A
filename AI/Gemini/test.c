#include <stdio.h>

int main() {
    int dan;
    
    printf("Enter a number to print its multiplication table: ");
    if (scanf("%d", &dan) != 1) {
        printf("Please enter a valid number.\n");
        return 1;
    }

    printf("\n--- Table %d ---\n", dan);
    for (int i = 1; i <= 9; i++) {
        printf("%d x %d = %d\n", dan, i, dan * i);
    }

    return 0;
}
