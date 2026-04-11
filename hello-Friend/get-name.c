#include <stdio.h>

char* get_your_age()
{
	int age;

	printf("input your age: ");
	scanf("%d", &age);

	return age;
}