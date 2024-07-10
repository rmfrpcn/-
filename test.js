var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter',
    name: 'Team A',
  text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
};

var trace2 = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    mode: 'lines',
    type: 'scatter'
};

var trace3 = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: 'lines+markers',
    type: 'scatter'
};


let xs = [];
let ys = [];
let x = 0.0, y = 0.0;
let ESP = 0.00000001
let dx = 1.0, ddx = 0.0;
let h = 0.1, xmax = 10;

while (x <= xmax + ESP) {
    if (x > ddx - ESP) {
        ddx += dx;
        xs.push(x);
        ys.push(y);
    }

    y += h * 2 * x;
    x += h;
}
var trace4 = {
    x: xs,
    y: ys,
    mode: 'lines+markers',
    type: 'scatter'
};

var data = [trace1, trace2, trace3, trace4];

var layout = {
    title: 'Title of the Graph',
    xaxis: {
      title: 'x-axis title'
    },
    yaxis: {
      title: 'y-axis title'
    },
    height: 400,
    width: 550
  };

Plotly.newPlot('myDiv', data, layout);