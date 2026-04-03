#include <stdio.h>
#include <time.h>
#include <stdlib.h>

int main()
{
	int ran = 0;
	int answer = 0;
	int count = 0;

	srand(time(NULL));
	ran = 1 + rand()%100;

	while (ran != answer) {
		printf("type answer: ");
		scanf("%d", &answer);
		count += 1;
		if (answer > ran) printf("down\n");
		else if (answer < ran) printf("up\n");
		}
	printf("win!\n");
	printf("your attempt: %d\n", count);

	return 0;
}
