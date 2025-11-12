// LineChart.jsx
import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = ({ timeRange, pointData }) => {
    const totalData = pointData.map(item => item.total);

   // ECharts default color palette
  const echartsColors = [
    '#5470C6', '#91CC75', '#EE6666', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC'
  ];

  // Map individual names to ECharts colors
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
        data: totalData,
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
            fontSize: 20, 
            fontWeight: 'bolder',
            color: '#d00'
          },
          symbolSize: 18  
        },
        blur: {
          label: {
            show: false 
          },
          itemStyle: {
            opacity: 0.2 
          }
        },
        blurScope: 'series', 
        animationDuration: 600
      }
    ],
       tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const index = params[0].dataIndex;
        const point = pointData[index];

        // Custom colors
        const nameColor = '#1f77b4'; // blue for x-axis label
        const totalColor = '#d00';   // red for total
        const detailsColor = '#ff8c00'; // orange for "Details:"

        let tooltipText = `<span style="color:${nameColor}; font-weight:bold; font-size:20px">${params[0].name}</span><br/>`;
        tooltipText += `<span style="color:${totalColor};">Total: $${Math.round(point.total)}</span><br/>`;

        if (point.individual && Object.keys(point.individual).length > 0) {
          tooltipText += `<span style="color:${detailsColor}; font-weight:bold; font-size:15px;">Details:</span><br/>`;
          for (let name in point.individual) {
            const color = nameColorMap[name]; // ECharts color
            tooltipText += `<span style="color:${color}; font-weight:bold;">${name}: $${point.individual[name]}</span><br/>`;
          }
        }

        return tooltipText;
      }
    }
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default LineChart;
