import React from 'react';
import {Chart} from '@dpwiese/react-native-canvas-charts/ChartJs';

const chartConfig = {
  type: 'bar',
  data: {
    datasets: [
      {
        label: 'My Legend Label',
        backgroundColor: 'rgb(224, 110, 60)',
        borderColor: 'rgb(224, 110, 60)',
        data: [
          {x: 1, y: 2},
          {x: 2, y: 5},
          {x: 3, y: 3},
        ],
        fill: false,
        pointRadius: 0,
        lineTension: 0.1,
        borderJoinStyle: 'round',
      },
    ],
  },
  options: {
    animation: {
      duration: 1000,
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'My Title',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      x: {
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'My X-Axis Label',
        },
        ticks: {
          autoSkipPadding: 100,
          autoSkip: true,
          minRotation: 0,
          maxRotation: 0,
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'My Y-Axis Label',
        },
      },
    },
  },
};

const LineChart = () => {
  return <Chart config={chartConfig} style={{height: 500}} />;
};
export default LineChart;
