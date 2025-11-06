// BarChart.jsx
import React from 'react';
import ReactECharts from 'echarts-for-react';

const BarChart = ({ bar }) => {
  const names = Object.keys(bar);
  const totals = Object.values(bar);

  const option = {
    // title: {
    //   text: '', // 👈 Main chart title
    //   left: 'center',
    //   top: 0,
    //   textStyle: {
    //     color: '#333',
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //   },
    // },
    xAxis: {
      type: 'category',
      data: names,
      name: 'Name',       // 👈 X-axis title
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
      },
     
    },
    yAxis: {
      type: 'value',
      name: 'Total Amount ',      // 👈 Y-axis title
      nameLocation: 'middle',
      nameGap: 50,
      nameTextStyle: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
    series: [
      {
        data: totals,
        type: 'bar',
        itemStyle: {
          color: '#3b82f6', // nice blue color
        },
        label: {
          show: true,
          position: 'top',
          formatter: (params) => {
            const value = Math.round(params.value); // round decimals
            return value === 0 ? '' : value;        // hide if 0
          },
          color: '#000',
          fontSize: 12,
        },
        emphasis: {
          focus: 'series',
          scale: true,
          itemStyle: {
            color: '#2563eb', // darker on hover
          },
          label: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
      },
    ],
    animationDuration: 600,
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default BarChart;
