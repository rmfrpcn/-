#include <stdio.h>
#include <math.h>

#define ESP 0.00000001

double func_f(double);

int main(int argc, char **argv)
{
    double x = 0.0, y = 0.0;
    double h = 0.0000001, dx = 1.0, xmax = 101.0;
    double ddx = 0.0;
    int count = 0;

    printf("X\tY\t\n");
    do
    {
        if( x > ddx - ESP ){
            ddx += dx;
            printf( "%7.4lf %7.4lf\n", x, y );
        }

        y += h * func_f(x);
        x += h;
        count++;
    } while (x <= xmax + ESP);
    printf( "計算回数:%d回\n", count);
    return 0;
}

double func_f(double x)
{
    return 2.0 * x;
}