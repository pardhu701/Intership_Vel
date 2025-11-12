// LineChart.jsx
import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = ({ timeRange, pointData }) => {
  const totalData = pointData.map(item => item.total);

  // ECharts default color palette
  const echartsColors = [
    '#5470C6', '#91CC75', '#EE6666', '#73C0DE',
    '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC'
  ];

  // Map individual names to consistent colors
  const nameColorMap = {};
  let colorIndex = 0;
  pointData.forEach(point => {
    Object.keys(point.individual || {}).forEach(name => {
      if (!nameColorMap[name]) {
        nameColorMap[name] = echartsColors[colorIndex % echartsColors.length];
        colorIndex++;
      }
    });
  });

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
      backgroundColor: 'rgba(50, 50, 50, 0.85)',
      borderRadius: 6,
      padding: 10,
      textStyle: {
        color: '#fff',
        fontSize: 13,
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        const point = pointData[index];

        // Main title (x-axis label)
        let tooltipText = `
          <div style="font-size:15px; font-weight:bold; color:#ffd700;">
            ${params[0].name}
          </div>
          <div style="margin-top:5px; color:#ff7f50;">
            Total: <b>$${Math.round(point.total)}</b>
          </div>
        `;

        // Individual breakdown (if available)
        if (point.individual && Object.keys(point.individual).length > 0) {
          tooltipText += `<div style="margin-top:5px; color:#ccc; font-weight:bold;">Details:</div>`;
          for (let name in point.individual) {
            const color = nameColorMap[name];
            tooltipText += `
              <div style="color:${color}; margin-left:8px;">
                ${name}: $${Math.round(point.individual[name])}
              </div>
            `;
          }
        }

        return tooltipText;
      },
    },
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
      },
      
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
        data: totalData,
        type: 'line',
        smooth: true,
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: '#3b82f6',
        },
        itemStyle: {
          color: '#3b82f6',
        },
        label: {
          show: true,
          position: 'top',
          formatter: function (params) {
            const value = Math.round(params.value);
            return value === 0 ? '' : `$${value}`;
          },
          color: '#000',
          fontSize: 12,
          fontWeight: 'bold',
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
            fontSize: 16,
            fontWeight: 'bolder',
            color: '#d00'
          },
          symbolSize: 14
        },
        animationDuration: 600,
      }
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default LineChart;
