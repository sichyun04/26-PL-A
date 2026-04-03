#include <stdio.h>

int calcTriangleArea(int w, int h);
int calcRectangleArea(int w, int h);

int main(void)
{
	int a, b;
	int triArea, recArea;

	printf("input width and height: ");
	scanf("%d %d", &a, &b);

	triArea = calcTriangleArea(a, b);
	recArea = calcRectangleArea(a, b);
	printf("Triangle Area = %d\n", triArea);
	printf("Rectangle Area = %d\n", recArea);

	return 0;
}
