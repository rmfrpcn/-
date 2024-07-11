// グローバル変数として定義
let xs, trueYs, eulerResult, rkResult;
let currentStep = 0;
let totalSteps = 0;
let startX, startY;

// オイラー法の計算関数
function eulerMethod(func, x0, y0, xmax, h) {
    let xs = [];
    let ys = [];
    let x = x0, y = y0;
    let ESP = 0.00000001
    let dx = 1.0, ddx = x0;

    while (x <= xmax + ESP) {
        if (x > ddx - ESP) {
            ddx += dx;r
            xs.push(x);
            ys.push(y);
        }

        y += h * func(x);
        x += h;
    }
    return { xs, ys };
}

// ルンゲクッタ法の計算関数
function rungeKuttaMethod(func, x0, y0, xmax, h) {
    let xs = [];
    let ys = [];
    let x = x0, y = y0;
    let ESP = 0.00000001
    let dx = 1.0, ddx = x0, k1, k2, k3, k4;

    while (x <= xmax + ESP) {
        if (x >= ddx - ESP) {
            ddx += dx;
            xs.push(x);
            ys.push(y);
        }

        k1 = func(x, y);
        k2 = func(x + h / 2.0, y + h * k1 / 2.0);
        k3 = func(x + h / 2.0, y + h * k2 / 2.0);
        k4 = func(x + h, y + k3 * h);

        y += (h / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4);
        x += h;
    }

    return { xs, ys };
}tt

// グラフの更新
function updateGraph() {
    let data = [];
    if (document.getElementById('original-checkbox').checked) {
        data.push({ x: xs, y: trueYs, mode: 'lines', type: 'scatter', name: '原関数', line: { color: 'black' } });
    }
    if (document.getElementById('euler-checkbox').checked) {
        data.push({ x: eulerResult.xs.slice(0, currentStep + 1), y: eulerResult.ys.slice(0, currentStep + 1), mode: 'lines+markers', type: 'scatter', name: 'オイラー', line: { color: 'red' } });
    }
    if (document.getElementById('rk-checkbox').checked) {
        data.push({ x: rkResult.xs.slice(0, currentStep + 1), y: rkResult.ys.slice(0, currentStep + 1), mode: 'lines+markers', type: 'scatter', name: 'ルンゲクッタ', line: { color: 'blue' } });
    }

    let layout = { title: '微分方程式シミュレーション', xaxis: { title: 'x' }, yaxis: { title: 'y' } };
    Plotly.newPlot('myDiv', data, layout);
}

// 実行ボタンの処理
document.getElementById('run-btn').addEventListener('click', function () {
    // パラメータの取得と計算
    let a = parseFloat(document.getElementById('a').value);
    let b = parseFloat(document.getElementById('b').value);
    let c = parseFloat(document.getElementById('c').value);
    let d = parseFloat(document.getElementById('d').value);
    startX = parseFloat(document.getElementById('start-x').value);
    totalSteps = parseInt(document.getElementById('xmax').value);
    let interval = parseFloat(document.getElementById('interval').value);
    let mode = document.getElementById('mode').value;

    // 初期値の設定
    a = isNaN(a) ? 0 : a;
    b = isNaN(b) ? 0 : b;
    c = isNaN(c) ? 2 : c;
    d = isNaN(d) ? 0 : d;
    startX = isNaN(startX) ? 0 : startX;
    totalSteps = isNaN(totalSteps) ? 10 : totalSteps;
    interval = isNaN(interval) ? 1 : interval;

    // 導関数の定義
    function func(x) {
        return a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
    }

    // 初期値の設定
    startY = originalFunc(startX);

    // 関数を格納
    xs = Array.from({ length: totalSteps - startX + 1 }, (_, i) => startX + i );
    trueYs = xs.map(originalFunc);
    eulerResult = eulerMethod(func, startX, startY, totalSteps + 1 , interval);
    rkResult = rungeKuttaMethod(func, startX, startY, totalSteps + 1 , interval);

    // ステップ初期化
    currentStep = 0;

    // グラフを更新
    updateGraph();

    // 実行ボタン非表示、次へボタン表示
    if (mode === 'manual') {
        document.getElementById('run-btn').style.display = 'none';
        document.getElementById('next-btn').style.display = 'inline-block';
    } else {
        document.getElementById('run-btn').style.display = 'inline-block';
        document.getElementById('next-btn').style.display = 'none';
        // 自動の場合
        currentStep = totalSteps - startX;
        updateGraph();
    }
});

// チェックボックスの変更時
document.querySelectorAll('input[type=checkbox]').forEach(function (el) {
    el.addEventListener('change', function () {
        updateGraph();
    });
});

// 次へボタンの処理
document.getElementById('next-btn').addEventListener('click', function () {
    currentStep++;
    if (currentStep <= totalSteps - startX) {
        updateGraph();
    } else {
        alert('すべてのステップが完了しました。リセットしてください。');
    }
});

// リセットボタンの処理
document.getElementById('reset-btn').addEventListener('click', function () {
    // 初期化
    document.getElementById('a').value = '0';
    document.getElementById('b').value = '0';
    document.getElementById('c').value = '2';
    document.getElementById('d').value = '0';
    document.getElementById('start-x').value = '0';
    document.getElementById('xmax').value = '10';
    document.getElementById('interval').value = '0.1';
    document.getElementById('mode').value = 'auto';

    // 初期表示状態に戻す
    document.getElementById('run-btn').style.display = 'inline-block';
    document.getElementById('next-btn').style.display = 'none';

    // グラフを初期化
    Plotly.newPlot('plot', []);
});
