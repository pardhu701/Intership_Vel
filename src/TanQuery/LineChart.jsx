// LineChart.jsx
import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = ({timeRange,pointData}) => {
  const option = {
    xAxis: {
      type: 'category',
      data:timeRange
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: pointData,
        type: 'line'
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default LineChart;
