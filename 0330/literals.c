#include <stdio.h>
#include <string.h>

#define N 100
#define PI 3.14
#define C 'K'
#define STR "HANSUNG"

int main()
{
	int i = N;
	double d = PI;
	char c = C;
	char str[256];
	strcpy(str, STR);

	printf("i = %d\n", i);
	printf("d = %lf\n", d);
	printf("c = %c\n", c);
	printf("c = %d\n", c);
	printf("str = %s\n", str);

}
