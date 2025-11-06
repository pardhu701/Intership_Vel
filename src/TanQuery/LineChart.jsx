// LineChart.jsx
import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = ({ timeRange, pointData }) => {
  const option = {
    xAxis: {
      type: 'category',
      data: timeRange,
      name: 'Timeline',
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    yAxis: {
      type: 'value',
      name: 'Total Amount',
      nameLocation: 'middle',
      nameGap: 70,
      nameTextStyle: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    series: [
      {
        data: pointData,
        type: 'line',
        symbolSize: 8,
        label: {
          show: true,
          position: 'top',
          formatter: function (params) {
            const value = Math.round(params.value);
            if (value === 0) return '';
            return `${params.name} / $${value}`;
          },
          color: '#000',
          fontSize: 12,
          fontWeight: 'bold'
        },
        emphasis: {
          focus: 'self',
          scale: true,
          itemStyle: {
            borderWidth: 3,
            borderColor: '#333'
          },
          label: {
            show: true,
            fontSize: 20,  // big font for hovered point
            fontWeight: 'bolder',
            color: '#d00'
          },
          symbolSize: 18  // make point bigger on hover
        },
        blur: {
          label: {
            show: false // hide all other labels when not hovered
          },
          itemStyle: {
            opacity: 0.2 // fade out other points
          }
        },
        blurScope: 'series', // apply blur only within the same line series
        animationDuration: 600
      }
    ],
    tooltip: {
      trigger: 'axis'
    }
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default LineChart;
