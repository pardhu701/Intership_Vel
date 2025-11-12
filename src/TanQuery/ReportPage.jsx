import React, { useState } from 'react';
import { Row, Col, Card, Radio } from 'antd';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { subtractTime, padZero } from './subtractTime';
import { useNavigate } from 'react-router';




const ReportPage = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('7D');
  const [array, setArray] = React.useState([]);
  const [yaxis, setYaxis] = React.useState([])
  const [bar, setBar] = React.useState({})
  const [pie, setPie] = React.useState({});
  const queryClient = useQueryClient();
  
  const orderDetails = React.useMemo(() => {
    const orderList = queryClient.getQueryData(["orders"])
    //  console.log(orderList)
    return orderList;
  }, [])






  // const { data: orderDetails = [] } = useQuery({ queryKey: ["ordersData"],  queryFn: async () => {
  //         const { data } = await axios.get("http://localhost:8080/api/orders");
  //             return data;
  //            } });


  const handleTimeChange = e => {
    setTimeRange(e.target.value);


    // Pass mapped value to charts
  };

  React.useEffect(() => {
    
    const result = generateXAxis(timeRange) || [];
    const yaxisres = generateYAxis(timeRange, orderDetails) || []
    const BarChartPass = BarChartData(timeRange, orderDetails) || {}
    const PieChatPass = PieChartData(timeRange, orderDetails) || {}
    setArray(result)
    setYaxis(yaxisres)
    setBar(BarChartPass )
    setPie(PieChatPass)
  }, [timeRange, orderDetails])

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginTop: 1, textAlign: 'center' }}>
        <Radio.Group
          value={timeRange}
          onChange={handleTimeChange}
          optionType="button"
          buttonStyle="solid"
          size="large"
          style={{ marginBottom: 20, textAlign: 'center', }}
        >
          <Radio.Button value="7D">7D</Radio.Button>
          <Radio.Button value="1D">1D</Radio.Button>
          <Radio.Button value="4HR">4HR</Radio.Button>
          <Radio.Button value="1HR">1HR</Radio.Button>
        </Radio.Group>
      </div>
      {/* <Card title="Bar Chart">
        <BarChart bar={bar} />
      </Card>

      <Card title="Line Chart">
        <LineChart timeRange={array} pointData={yaxis} />
      </Card>

      <Card title="Pie Chart">
        <PieChart pointData={pie} />
      </Card> */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Bar Chart">
            <BarChart bar={bar} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Line Chart">
            <LineChart timeRange={array} pointData={yaxis} />
          </Card>
        </Col>
        <Col xs={24}>
          <Card title="Pie Chart">
            <PieChart pointData={pie} />
          </Card>
        </Col>
      </Row>

      {/* Sliding Buttons */}

    </div>
  );
};

export default ReportPage;







const BarChartData = (timeRange, orders) => {
  const now = new Date();
  const list = {};

    if(!orders) return list

  switch (timeRange) {
    case '7D':
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        const formatted = date.toISOString().split('T')[0];
        orders.forEach(order => {
          if (order.orderdate.split(' ')[0] === formatted && (order.status === 'Paid' || order.status === 'Shipped')) {
            list[order.name] = (list[order.name] || 0) + order.totalamount;
          }
        });
      }
      break;

    case '1D':
      for (let i = 24;i>0;i--) {
        const hourAgo = subtractTime(now, { hours: i });
      
        const labelDate = `${hourAgo[5]}-${hourAgo[4]}-${hourAgo[3]}`;
        const labelHour = `${labelDate} ${hourAgo[2]}`; // YYYY-MM-DD HH
        //console.log(labelHour)

        orders.forEach(order => {
          const orderDate = new Date(order.orderdate);
          const orderLabel = `${orderDate.getUTCFullYear()}-${padZero(orderDate.getUTCMonth() + 1)}-${padZero(orderDate.getUTCDate())} ${padZero(orderDate.getUTCHours())}`;
          if (orderLabel === labelHour && (order.status === 'Paid' || order.status === 'Shipped')) {
            list[order.name] = (list[order.name] || 0) + order.totalamount;
          }
        });
      }
      break;

    case '4HR':
      for (let i = 0; i < 240; i++) {
        const minuteAgo = subtractTime(now, { minutes: i });
        const labelDate = `${minuteAgo[5]}-${minuteAgo[4]}-${minuteAgo[3]}`;
        const labelMinute = `${labelDate} ${minuteAgo[2]}:${minuteAgo[1]}`; // YYYY-MM-DD HH:mm

        orders.forEach(order => {
          const orderDate = new Date(order.orderdate);
          const orderLabel = `${orderDate.getFullYear()}-${padZero(orderDate.getMonth() + 1)}-${padZero(orderDate.getDate())} ${padZero(orderDate.getHours())}:${padZero(orderDate.getMinutes())}`;
          if (orderLabel === labelMinute && (order.status === 'Paid' || order.status === 'Shipped')) {
            list[order.name] = (list[order.name] || 0) + order.totalamount;
          }
        });
      }
      break;

    case '1HR':
      for (let i = 0; i < 60; i++) {
        const minuteAgo = subtractTime(now, { minutes: i });
        const labelDate = `${minuteAgo[5]}-${minuteAgo[4]}-${minuteAgo[3]}`;
        const labelMinute = `${labelDate} ${minuteAgo[2]}:${minuteAgo[1]}`; // YYYY-MM-DD HH:mm

        orders.forEach(order => {
          const orderDate = new Date(order.orderdate.replace(" ", "T"));
          const orderLabel = `${orderDate.getFullYear()}-${padZero(orderDate.getMonth() + 1)}-${padZero(orderDate.getDate())} ${padZero(orderDate.getHours())}:${padZero(orderDate.getMinutes())}`;
          if (orderLabel === labelMinute && (order.status === 'Paid' || order.status === 'Shipped')) {
            list[order.name] = (list[order.name] || 0) + order.totalamount;
          }
        });
      }
      break;

    default:
      break;

  }



  return list;
};



// Pie Chart Data
const PieChartData = (timeRange, orders) => {
  const now = new Date();
  const list = {
    "Pending": 0,
    "Cancelled": 0,
    "Shipped": 0,
    "Paid": 0
  };

    if(!orders) return list

  switch (timeRange) {
    case '7D':
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        const formatted = date.toISOString().split('T')[0];
        orders.forEach(order => {
          if (order.orderdate.split(' ')[0] === formatted) {
            list[order.status] = (list[order.status] || 0) + 1;
          }
        });
      }
      break;

    case '1D':
      for (let i = 0; i < 24; i++) {
        const hourAgo = subtractTime(now, { hours: i });
        const labelDate = `${hourAgo[5]}-${hourAgo[4]}-${hourAgo[3]}`;
        const labelHour = `${labelDate} ${hourAgo[2]}`;

        orders.forEach(order => {
          const orderDate = new Date(order.orderdate);
          const orderLabel = `${orderDate.getFullYear()}-${padZero(orderDate.getMonth() + 1)}-${padZero(orderDate.getDate())} ${padZero(orderDate.getHours())}`;
          if (orderLabel === labelHour) {
            list[order.status] = (list[order.status] || 0) + 1;
          }
        });
      }
      break;

    case '4HR':
      for (let i = 0; i < 240; i++) {
        const minuteAgo = subtractTime(now, { minutes: i });
        const labelDate = `${minuteAgo[5]}-${minuteAgo[4]}-${minuteAgo[3]}`;
        const labelMinute = `${labelDate} ${minuteAgo[2]}:${minuteAgo[1]}`;

        orders.forEach(order => {
          const orderDate = new Date(order.orderdate);
          const orderLabel = `${orderDate.getFullYear()}-${padZero(orderDate.getMonth() + 1)}-${padZero(orderDate.getDate())} ${padZero(orderDate.getHours())}:${padZero(orderDate.getMinutes())}`;
          if (orderLabel === labelMinute) {
            list[order.status] = (list[order.status] || 0) + 1;
          }
        });
      }
      break;

    case '1HR':
      for (let i = 0; i < 60; i++) {
        const minuteAgo = subtractTime(now, { minutes: i });
        const labelDate = `${minuteAgo[5]}-${minuteAgo[4]}-${minuteAgo[3]}`;
        const labelMinute = `${labelDate} ${minuteAgo[2]}:${minuteAgo[1]}`;

        orders.forEach(order => {
          const orderDate = new Date(order.orderdate);
          const orderLabel = `${orderDate.getFullYear()}-${padZero(orderDate.getMonth() + 1)}-${padZero(orderDate.getDate())} ${padZero(orderDate.getHours())}:${padZero(orderDate.getMinutes())}`;
          if (orderLabel === labelMinute) {
            list[order.status] = (list[order.status] || 0) + 1;
          }
        });
      }
      break;

    default:
      break;
  }

  return list;
};



// Generate X-Axis Labels
const generateXAxis = (timeRange) => {
  const now = new Date();
  const labels = [];


  switch (timeRange) {
    case '7D':
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        labels.push(date.toISOString().split('T')[0]);
      }
      break;

    case '1D':
      for (let j = 0; j <24; j++) {
        const result = subtractTime(now, { hours: j });
       // const labelDate = `${result[5]}-${result[4]}-${result[3]}`;
        labels.push(`${result[2]}:${result[1]}`);
      }
      break;

    // case '4HR':
    //   for (let j = 1; j <= 240; j++) {
    //     const result = subtractTime(now, { minutes: j });
    //     const labelDate = `${result[5]}-${result[4]}-${result[3]}`;
    //     labels.push(`${result[2]}:${result[1]}`);
    //   }
    //   break;
     case '4HR':
      // 4 hours / 0.5 hour = 8 intervals
      for (let j = 0; j < 8; j++) {
        const result = subtractTime(now, { minutes: (j) * 30 });
        const label = `${padZero(result[2])}:${padZero(result[1])}`;
        labels.push(label);
      }
      break;


    case '1HR':
      for (let j = 0; j <60; j++) {
        const result = subtractTime(now, { minutes: j });
        const labelDate = `${result[5]}-${result[4]}-${result[3]}`;
        labels.push(`${result[2]}:${result[1]}`);
      }
      break;

    default:
      break;
  }

  return labels; // chronological order
};



const generateYAxis = (timeRange, orders) => {
  const now = new Date();
  const labels = [];

  if (!orders) return labels;

  const addOrders = (filteredOrders) => {
    const total = filteredOrders.reduce((sum, order) => sum + order.totalamount, 0);
    const individual = {};
    filteredOrders.forEach(order => {
      if (!individual[order.name]) {
        individual[order.name] = 0;
      }
      individual[order.name] += order.totalamount;
    });
   
    return { total, individual };
  };

  switch (timeRange) {
    case '7D':
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        const formatted = date.toISOString().split('T')[0];

        const filteredOrders = orders.filter(order => {
          const orderDateStr = order.orderdate.split(' ')[0];
          return orderDateStr === formatted && (order.status === 'Paid' || order.status === 'Shipped');
        });
      
      
        labels.push(addOrders(filteredOrders));
      }
      break;

    case '1D':
      for (let i = 0; i < 24; i++) {
        const hourAgo = subtractTime(now, { hours: i });
        const hourAgoU = subtractTime(now, { hours: i + 1 });
        const endDate = new Date(
          `${hourAgo[5]}-${hourAgo[4]}-${hourAgo[3]}T${hourAgo[2]}:${hourAgo[1]}:${hourAgo[0]}`
        );
        const startDate = new Date(
          `${hourAgoU[5]}-${hourAgoU[4]}-${hourAgoU[3]}T${hourAgoU[2]}:${hourAgoU[1]}:${hourAgoU[0]}`
        );

        const filteredOrders = orders.filter(order => {
          const orderDate = new Date(order.orderdate);
          return orderDate >= startDate && orderDate < endDate && (order.status === 'Paid' || order.status === 'Shipped');
        });
       
        labels.push(addOrders(filteredOrders));
        
      }
      break;

    case '4HR':
      for (let i = 0; i < 8; i++) {
        const halfHourAgo = subtractTime(now, { minutes: i * 30 });
        const periodStart = subtractTime(now, { minutes: (i + 1) * 30 });

        const startTime = new Date(periodStart[5], periodStart[4] - 1, periodStart[3], periodStart[2], periodStart[1]);
        const endTime = new Date(halfHourAgo[5], halfHourAgo[4] - 1, halfHourAgo[3], halfHourAgo[2], halfHourAgo[1]);

        const filteredOrders = orders.filter(order => {
          const orderDate = new Date(order.orderdate);
          return orderDate >= startTime && orderDate < endTime && (order.status === 'Paid' || order.status === 'Shipped');
        });

        labels.push(addOrders(filteredOrders));
      }
      break;

    case '1HR':
      for (let i = 0; i < 60; i++) {
        const minuteAgo = subtractTime(now, { minutes: i });
        const labelDate = `${minuteAgo[5]}-${padZero(minuteAgo[4])}-${padZero(minuteAgo[3])} ${padZero(minuteAgo[2])}:${padZero(minuteAgo[1])}`;

        const filteredOrders = orders.filter(order => {
          const orderDate = new Date(order.orderdate);
          const orderLabel = `${orderDate.getFullYear()}-${padZero(orderDate.getMonth() + 1)}-${padZero(orderDate.getDate())} ${padZero(orderDate.getHours())}:${padZero(orderDate.getMinutes())}`;
          return orderLabel === labelDate && (order.status === 'Paid' || order.status === 'Shipped');
        });

        labels.push(addOrders(filteredOrders));
      }
      break;

    default:
      break;
  }

  return labels;
};


// Generate Y-Axis Values
// const generateYAxis = (timeRange, orders) => {
//   const now = new Date();
//   const labels = [];

//   if(!orders) return labels

//   switch (timeRange) {
//     case '7D':
//       for (let i = 0; i < 7; i++) {
//         const date = new Date();
//         date.setDate(now.getDate() - i);
//         const formatted = date.toISOString().split('T')[0];
//         const total = orders
//           .filter(order => {
//             const orderDateStr = order.orderdate.split(' ')[0];
//             return orderDateStr === formatted && (order.status === 'Paid' || order.status === 'Shipped');
//           })
//           .reduce((sum, order) => sum + order.totalamount, 0);
//         labels.push(total);
//       }
//       break;

//     case '1D':
//       for (let i = 0; i < 24; i++) {
//         const hourAgo = subtractTime(now, { hours: i });  //2:30
//         const hourAgoU = subtractTime(now, { hours: i + 1 });///3:30
//         const endDate = new Date(
//           `${hourAgo[5]}-${hourAgo[4]}-${hourAgo[3]}T${hourAgo[2]}:${hourAgo[1]}:${hourAgo[0]}`
//         );
//         const startDate = new Date(
//           `${hourAgoU[5]}-${hourAgoU[4]}-${hourAgoU[3]}T${hourAgoU[2]}:${hourAgoU[1]}:${hourAgoU[0]}`
//         );
//         const label = `${endDate.getUTCHours()}:${padZero(endDate.getUTCMinutes())}`;
//         const total = orders
//           .filter(order => {
//             const orderDate = new Date(order.orderdate);
//             //const orderLabel = `${orderDate.getFullYear()}-${padZero(orderDate.getMonth() + 1)}-${padZero(orderDate.getDate())} ${padZero(orderDate.getHours())}`;
//             return orderDate >= startDate && orderDate < endDate && (order.status === 'Paid' || order.status === 'Shipped');
//           })
//           .reduce((sum, order) => sum + order.totalamount, 0);
//         labels.push( total );
//       }
//       break;

//     // case '4HR':
//     //   for (let i = 0; i < 240; i++) {
//     //     const minuteAgo = subtractTime(now, { minutes: i });
//     //     const labelDate = `${minuteAgo[5]}-${minuteAgo[4]}-${minuteAgo[3]}`;
//     //     const labelMinute = `${labelDate} ${minuteAgo[2]}:${minuteAgo[1]}`;

//     //     const total = orders
//     //       .filter(order => {
//     //         const orderDate = new Date(order.orderdate);
//     //         const orderLabel = `${orderDate.getFullYear()}-${padZero(orderDate.getMonth() + 1)}-${padZero(orderDate.getDate())} ${padZero(orderDate.getHours())}:${padZero(orderDate.getMinutes())}`;
//     //         return orderLabel === labelMinute && (order.status === 'Paid' || order.status === 'Shipped');
//     //       })
//     //       .reduce((sum, order) => sum + order.totalamount, 0);
//     //     labels.push(total);
//     //   }
//     //   break;
//      case '4HR':
//       // 8 half-hour intervals over 4 hours
//       for (let i = 0; i < 8; i++) {
//         const halfHourAgo = subtractTime(now, { minutes: i * 30 });
//         const labelDate = `${halfHourAgo[5]}-${padZero(halfHourAgo[4])}-${padZero(halfHourAgo[3])}`;
//         const labelMinute = `${labelDate} ${padZero(halfHourAgo[2])}:${padZero(halfHourAgo[1])}`;

//         // Get total for this 30-minute period
//         const periodStart = subtractTime(now, { minutes: (i + 1) * 30 });
//         const startTime = new Date(periodStart[5], periodStart[4] - 1, periodStart[3], periodStart[2], periodStart[1]);
//         const endTime = new Date(halfHourAgo[5], halfHourAgo[4] - 1, halfHourAgo[3], halfHourAgo[2], halfHourAgo[1]);

//         const total = orders
//           .filter(order => {
//             const orderDate = new Date(order.orderdate);
//             return (
//               orderDate >= startTime &&
//               orderDate < endTime &&
//               (order.status === 'Paid' || order.status === 'Shipped')
//             );
//           })
//           .reduce((sum, order) => sum + order.totalamount, 0);

//         labels.push(total);
//       }
//       break;

//     case '1HR':
//       for (let i = 0; i < 60; i++) {
//         const minuteAgo = subtractTime(now, { minutes: i });
//         const labelDate = `${minuteAgo[5]}-${minuteAgo[4]}-${minuteAgo[3]}`;
//         const labelMinute = `${labelDate} ${minuteAgo[2]}:${minuteAgo[1]}`;

//         const total = orders
//           .filter(order => {
//             const orderDate = new Date(order.orderdate);
//             const orderLabel = `${orderDate.getFullYear()}-${padZero(orderDate.getMonth() + 1)}-${padZero(orderDate.getDate())} ${padZero(orderDate.getHours())}:${padZero(orderDate.getMinutes())}`;
//             return orderLabel === labelMinute && (order.status === 'Paid' || order.status === 'Shipped');
//           })
//           .reduce((sum, order) => sum + order.totalamount, 0);
//         labels.push(total);
//       }
//       break;

//     default:
//       break;
//   }
  

//   return labels; // chronological order
// };
