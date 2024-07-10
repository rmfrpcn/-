// グローバル変数として定義
let xs, trueYs, eulerResult, rkResult;
let currentStep = 0;
let totalSteps = 0;
let startY;

// オイラー法の計算関数
function eulerMethod(func, x0, y0, steps, h) {
    let xs = [x0];
    let ys = [y0];
    let x = x0, y = y0;

    for (let i = 0; i < steps; i++) {
        y += h * func(x);
        x += h;
        xs.push(x);
        ys.push(y);
    }
    return { xs, ys };
}

// ルンゲクッタ法の計算関数
function rungeKuttaMethod(func, x0, y0, steps, h) {
    let xs = [x0];
    let ys = [y0];
    let x = x0, y = y0;

    for (let i = 0; i < steps; i++) {
        let k1 = h * func(x, y);
        let k2 = h * func(x + h/2, y + k1/2);
        let k3 = h * func(x + h/2, y + k2/2);
        let k4 = h * func(x + h, y + k3);
        y += (k1 + 2*k2 + 2*k3 + k4) / 6;
        x += h;
        xs.push(x);
        ys.push(y);
    }
    return { xs, ys };
}

// 実行ボタンのクリック処理
document.getElementById('run-btn').addEventListener('click', function() {
    // パラメータの取得と計算
    let a = parseFloat(document.getElementById('a').value);
    let b = parseFloat(document.getElementById('b').value);
    let c = parseFloat(document.getElementById('c').value);
    let d = parseFloat(document.getElementById('d').value);
    let startX = parseFloat(document.getElementById('start-x').value);
    totalSteps = parseInt(document.getElementById('steps').value);
    let interval = parseFloat(document.getElementById('interval').value);
    let mode = document.getElementById('mode').value;

    // デフォルト値の設定
    a = isNaN(a) ? 0 : a;
    b = isNaN(b) ? 0 : b;
    c = isNaN(c) ? 2 : c;
    d = isNaN(d) ? 0 : d;
    startX = isNaN(startX) ? 0 : startX;
    totalSteps = isNaN(totalSteps) ? 10 : totalSteps;
    interval = isNaN(interval) ? 1 : interval;

    // 関数の定義
    function func(x) {
        return a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
    }

    // 原関数の定義
    function originalFunc(x) {
        return a * Math.pow(x, 4) / 4 +  b * Math.pow(x, 3) / 3 + c * Math.pow(x, 2) / 2 + d * x;
    }

    // 初期値の設定
    startY = originalFunc(startX);

    // グラフ描画の準備
    xs = Array.from({ length: totalSteps + 1 }, (_, i) => startX + i * interval);
    trueYs = xs.map(originalFunc);
    eulerResult = eulerMethod(func, startX, startY, totalSteps, interval);
    rkResult = rungeKuttaMethod(func, startX, startY, totalSteps, interval);

    // Plotlyを使用したグラフ描画
    let data = [
        { x: xs, y: trueYs, mode: 'lines', name: '原関数', line: { color: 'black' } },
        { x: eulerResult.xs, y: eulerResult.ys, mode: 'lines+markers', name: 'オイラー', line: { color: 'red' } },
        { x: rkResult.xs, y: rkResult.ys, mode: 'lines+markers', name: 'ルンゲクッタ', line: { color: 'blue' } }
    ];

    let layout = { title: '微分方程式シミュレーション', xaxis: { title: 'x' }, yaxis: { title: 'y' } };
    Plotly.newPlot('plot', data, layout);

    // 実行ボタン非表示、次へボタン表示（手動モードのみ）
    if (mode === 'manual') {
        document.getElementById('run-btn').style.display = 'none';
        document.getElementById('next-btn').style.display = 'inline-block';
        currentStep = 0;
    } else {
        document.getElementById('run-btn').style.display = 'inline-block';
        document.getElementById('next-btn').style.display = 'none';
    }
});

// 次へボタンのクリック処理（手動モードのみ）
document.getElementById('next-btn').addEventListener('click', function() {
    currentStep++;
    if (currentStep <= totalSteps+1) {
        let updatedData = [
            { x: xs, y: trueYs, mode: 'lines', name: '原関数', line: { color: 'black' } },
            { x: eulerResult.xs.slice(0, currentStep), y: eulerResult.ys.slice(0, currentStep), mode: 'lines+markers', name: 'オイラー', line: { color: 'red' } },
            { x: rkResult.xs.slice(0, currentStep), y: rkResult.ys.slice(0, currentStep), mode: 'lines+markers', name: 'ルンゲクッタ', line: { color: 'blue' } }
        ];
        Plotly.newPlot('plot', updatedData);
    } else {
        alert('すべてのステップが完了しました。リセットしてください。');
    }
});

// リセットボタンのクリック処理
document.getElementById('reset-btn').addEventListener('click', function() {
    // 入力欄の初期化
    document.getElementById('a').value = '0';
    document.getElementById('b').value = '0';
    document.getElementById('c').value = '2';
    document.getElementById('d').value = '0';
    document.getElementById('start-x').value = '0';
    document.getElementById('steps').value = '10';
    document.getElementById('interval').value = '1';
    document.getElementById('mode').value = 'auto';

    // ボタンの初期表示状態に戻す
    document.getElementById('run-btn').style.display = 'inline-block';
    document.getElementById('next-btn').style.display = 'none';

    // グラフを初期化する
    Plotly.newPlot('plot', []);
});
