// BarChart.jsx
import React from 'react';
import ReactECharts from 'echarts-for-react';

const BarChart = ({ bar,sortOrder='desc' }) => {
  // const names = Object.keys(bar);
  // const totals = Object.values(bar);
   const entries = Object.entries(bar);

  // Sort based on total value
  entries.sort((a, b) => {
    if (sortOrder === 'asc') return a[1] - b[1];
    return b[1] - a[1]; // default: descending
  });

  // Extract sorted keys and values
  const names = entries.map(([name]) => name);
  const totals = entries.map(([_, total]) => total);

  const option = {
     tooltip: {
      trigger: 'axis', // or 'item' for per-bar tooltip
      axisPointer: {
        type: 'shadow', // highlights the bar area
      },
      backgroundColor: 'rgba(50, 50, 50, 0.8)',
      borderRadius: 6,
      padding: 10,
      textStyle: {
        color: '#fff',
        fontSize: 13,
      },
      formatter: (params) => {
        const data = params[0];
        return `
          <strong>${data.name}</strong><br/>
          Total Amount: <strong>${data.value}</strong>
        `;
      },
    },
    // title: {
    //   text: '', 
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
      name: 'Name',     
      nameLocation: 'end',
      nameGap: 20,
      nameTextStyle: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
      },
       axisLabel: {
    interval: 0,      // ✅ Show all labels (no skipping)
    rotate: 45,       // (optional) rotate labels to avoid overlap
    fontSize: 12,
  },
     
    },
    yAxis: {
      type: 'value',
      name: 'Total Amount ',     
      nameLocation: 'end',
      nameGap: 30,
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
            const value = Math.round(params.value); 
            return value === 0 ? '' : value;        
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
