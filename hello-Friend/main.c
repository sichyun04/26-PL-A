#include <stdio.h>

char* get_your_age();

int main()
{
	int age;

	age = get_your_age();
	printf("Hello My age is %d\n", age);

	return 0;
}