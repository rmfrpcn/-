#include <stdio.h>
#define _USE_MATH_DEFINES
#include <math.h>
// サンプル数
#define P 10

double func_y(double);

int main(int argc, char **argv){
    printf("原関数:cos(3x)\n");
    double f[P];
    double ar, ai, x;

    for (int m = 0; m < P; m++){ // データサンプリング
        f[m] = func_y(2.0 * M_PI / (double)P * (double)m);
    }

    // DFT係数計算
    printf("次数\t実数部\t虚数部\t絶対値\n"); // 見出し打ち出し
    for (int n = 0; n < P; n++){
        ar = 0.0;
        ai = 0.0;
        for (int m = 0; m < P; m++){
            x = 2.0 * M_PI / (double)P * (double)m * (double)n;
            ar += f[m] * cos(-x);
            ai += f[m] * sin(-x);
        }
        ar /= (double)P;
        ai /= (double)P;
        x = sqrt(ar * ar + ai * ai);
        printf("%4d %9.3lf %9.3lf %9.3lf\n", n, ar, ai, x);
    }
    return 0;
}

double func_y(double x){ // 原関数
    return (0.0 * sin(4.0 * x) +1.0 * cos(3.0 * x));
}