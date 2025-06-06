Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function (err, rows) {

  function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; });
  }

  var frames = []
  var x = unpack(rows, 'Date')
  var y = unpack(rows, 'AAPL.High')
  var x2 = unpack(rows, 'Date')
  var y2 = unpack(rows, 'AAPL.Low')

  var n = 100;
  for (var i = 0; i < n; i++) {
    frames[i] = { data: [{ x: [], y: [] }, { x: [], y: [] }] }
    frames[i].data[1].x = x.slice(0, i + 1);
    frames[i].data[1].y = y.slice(0, i + 1);
    frames[i].data[0].x = x2.slice(0, i + 1);
    frames[i].data[0].y = y2.slice(0, i + 1);
  }

  var trace2 = {
    type: "scatter",
    mode: "lines",
    name: 'AAPL High',
    fill: 'tonexty',
    x: frames[5].data[1].x,
    y: frames[5].data[1].y,
    line: { color: 'grey' }
  }

  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'AAPL Low',
    x: frames[5].data[0].x,
    y: frames[5].data[0].y,
    line: { color: 'lightgrey' }
  }

  var data = [trace1, trace2];

  var layout = {
    title: 'Multiple Trace Filled-Area Animation',
    xaxis: {
      range: [frames[99].data[0].x[0], frames[99].data[0].x[99]],
      showgrid: false
    },
    yaxis: {
      range: [120, 140],
      showgrid: false
    },
    legend: {
      orientation: 'h',
      x: 0.5,
      y: 1.2,
      xanchor: 'center'
    },
    updatemenus: [{
      x: 0.5,
      y: 0,
      yanchor: "top",
      xanchor: "center",
      showactive: false,
      direction: "left",
      type: "buttons",
      pad: { "t": 87, "r": 10 },
      buttons: [{
        method: "animate",
        args: [null, {
          fromcurrent: true,
          transition: {
            duration: 0,
          },
          frame: {
            duration: 40,
            redraw: false
          }
        }],
        label: "Play"
      }, {
        method: "animate",
        args: [
          [null],
          {
            mode: "immediate",
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          }
        ],
        label: "Pause"
      }]
    }]
  };

  Plotly.newPlot('myDiv', data, layout).then(function () {
    Plotly.addFrames('myDiv', frames);
  });
})