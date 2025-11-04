// BarChart.jsx
import React from 'react';
import ReactECharts from 'echarts-for-react';

const BarChart = ({bar}) => {
  const names = Object.keys(bar);     
const totals = Object.values(bar); 
  const option = {
    xAxis: {
      type: 'category',
      data: names
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data:totals, 
        type: 'bar'
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default BarChart;
