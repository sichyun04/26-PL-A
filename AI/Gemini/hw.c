#include <stdio.h>
#include <string.h>

#define N 100
#define PI 3.14
#define C 'K'
#define STR "HANSUNG"

int main() {
    int i;
    double d;
    char c;
    char str[256];
    char userName[100];

    // Fixed original logic (using defined macros)
    i = N;
    d = PI;
    c = C;
    strcpy(str, STR);

    printf("i = %d\n", i);
    printf("d = %lf\n", d);
    printf("c = %c\n", c);
    printf("c = %d\n", c);
    printf("str = %s\n", str);

    // Added greeting logic
    printf("\nPlease enter your name: ");
    scanf("%99s", userName);
    printf("Nice to meet you, %s!\n", userName);

    return 0;
}
