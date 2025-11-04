// PieChart.jsx
import React from 'react';
import ReactECharts from 'echarts-for-react';

const PieChart = ({pointData}) => {
    
   
  const option = {
    tooltip: { trigger: 'item' },
    legend: { top: '5%', left: 'center' },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['30%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: { borderRadius: 10 },
        label: { show: false, position: 'center' },
        emphasis: {
          label: { show: true, fontSize: 40, fontWeight: 'bold' }
        },
        labelLine: { show: false },
        data: [
          { value: pointData['Paid'], name: 'Paid' },
          { value: pointData['Shipped'], name: 'Shipped' },
          { value: pointData['Pending'], name: 'Pending' },
          { value: pointData['Cancelled'], name: 'Cancelled' }
        
        ]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default PieChart;
