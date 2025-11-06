import React, { useState } from 'react';
import { Row, Col, Card, Radio } from 'antd';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { subtractTime,padZero } from './subtractTime';




const ReportPage = () => {
  const [timeRange, setTimeRange] = useState('7D');
  const [array, setArray] = React.useState([]);
  const [yaxis, setYaxis] = React.useState([])
  const [bar, setBar] = React.useState({})
  const [pie, setPie] = React.useState({});
  const queryClient = useQueryClient();
  //const [orderDetails,setOrderDetails]=(queryClient.getQueryData(["orders"]))
  const orderDetails = React.useMemo(() => {
    const orderList = queryClient.getQueryData(["orders"])
    //  console.log(orderList)
    return orderList;
  }, [queryClient])



  // const { data: orderDetails = [] } = useQuery({ queryKey: ["ordersData"],  queryFn: async () => {
  //         const { data } = await axios.get("http://localhost:8080/api/orders");
  //             return data;
  //            }, refetchInterval:1 });



  const handleTimeChange = e => {
    setTimeRange(e.target.value);


    // Pass mapped value to charts
  };

  React.useEffect(() => {
    const result = generateXAxis(timeRange);
    const yaxisres = generateYAxis(timeRange, orderDetails)
    const BarChartPass = BarChartData(timeRange, orderDetails)
    const PieChatPass = PieChartData(timeRange, orderDetails)
    setArray(result)
    setYaxis(yaxisres)
    setBar(prev => ({ ...prev, ...BarChartPass }))
    setPie(prev => ({ ...prev, ...PieChatPass }))
  }, [timeRange, orderDetails])

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Radio.Group
          value={timeRange}
          onChange={handleTimeChange}
          optionType="button"
          buttonStyle="solid"
          size="large"
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
      for (let i = 0; i < 24; i++) {
        const hourAgo = subtractTime(now, { hours: i });
        const labelHour = hourAgo[2]; // hour
        orders.forEach(order => {
          const orderDate = new Date(order.orderdate);
          const orderHour = padZero(orderDate.getHours());
          if (orderHour === labelHour && (order.status === 'Paid' || order.status === 'Shipped')) {
            list[order.name] = (list[order.name] || 0) + order.totalamount;
          }
        });
      }
      break;

    case '4HR':
      for (let i = 0; i < 240; i++) {
        const minuteAgo = subtractTime(now, { minutes: i });
        const labelMinute = minuteAgo[2] + ":" + minuteAgo[1]; // HH:mm
        orders.forEach(order => {
          const orderDate = new Date(order.orderdate);
          const orderLabel = padZero(orderDate.getHours()) + ":" + padZero(orderDate.getMinutes());
          if (orderLabel === labelMinute && (order.status === 'Paid' || order.status === 'Shipped')) {
            list[order.name] = (list[order.name] || 0) + order.totalamount;
          }
        });
      }
      break;

    case '1HR':
      for (let i = 0; i < 60; i++) {
        const minuteAgo = subtractTime(now, { minutes: i });
        const labelMinute = minuteAgo[2] + ":" + minuteAgo[1]; // HH:mm
        orders.forEach(order => {
          const orderDate = new Date(order.orderdate);
          const orderLabel = padZero(orderDate.getHours()) + ":" + padZero(orderDate.getMinutes());
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
        const labelHour = hourAgo[2]; // hour
        orders.forEach(order => {
          const orderDate = new Date(order.orderdate);
          const orderHour = padZero(orderDate.getHours());
          if (orderHour === labelHour) {
            list[order.status] = (list[order.status] || 0) + 1;
          }
        });
      }
      break;

    case '4HR':
      for (let i = 0; i < 240; i++) {
        const minuteAgo = subtractTime(now, { minutes: i });
        const labelMinute = minuteAgo[2] + ":" + minuteAgo[1];
        orders.forEach(order => {
          const orderDate = new Date(order.orderdate);
          const orderLabel = padZero(orderDate.getHours()) + ":" + padZero(orderDate.getMinutes());
          if (orderLabel === labelMinute) {
            list[order.status] = (list[order.status] || 0) + 1;
          }
        });
      }
      break;

    case '1HR':
      for (let i = 0; i < 60; i++) {
        const minuteAgo = subtractTime(now, { minutes: i });
        const labelMinute = minuteAgo[2] + ":" + minuteAgo[1];
        orders.forEach(order => {
          const orderDate = new Date(order.orderdate);
          const orderLabel = padZero(orderDate.getHours()) + ":" + padZero(orderDate.getMinutes());
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
      for (let j = 1; j <= 24; j++) {
        const result = subtractTime(now, { hours: j });
        labels.push(result[2] + ":" + result[1]);
      }
      break;

    case '4HR':
      for (let j = 1; j <= 240; j++) {
        const result = subtractTime(now, { minutes: j });
        labels.push(result[2] + ":" + result[1]);
      }
      break;

    case '1HR':
      for (let j = 1; j <= 60; j++) {
        const result = subtractTime(now, { minutes: j });
        labels.push(result[2] + ":" + result[1]);
      }
      break;

    default:
      break;
  }

  return labels.reverse(); // chronological order
};

// Generate Y-Axis Values
const generateYAxis = (timeRange, orders) => {
  const now = new Date();
  const labels = [];

  switch (timeRange) {
    case '7D':
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        const formatted = date.toISOString().split('T')[0];
        const total = orders
          .filter(order => {
            const orderDateStr = order.orderdate.split(' ')[0];
            return orderDateStr === formatted && (order.status === 'Paid' || order.status === 'Shipped');
          })
          .reduce((sum, order) => sum + order.totalamount, 0);
        labels.push(total);
      }
      break;

    case '1D':
      for (let i = 0; i < 24; i++) {
        const hourAgo = subtractTime(now, { hours: i });
        const labelHour = hourAgo[2];
        const total = orders
          .filter(order => {
            const orderDate = new Date(order.orderdate);
            return padZero(orderDate.getHours()) === labelHour && (order.status === 'Paid' || order.status === 'Shipped');
          })
          .reduce((sum, order) => sum + order.totalamount, 0);
        labels.push(total);
      }
      break;

    case '4HR':
      for (let i = 0; i < 240; i++) {
        const minuteAgo = subtractTime(now, { minutes: i });
        const labelMinute = minuteAgo[2] + ":" + minuteAgo[1];
        const total = orders
          .filter(order => {
            const orderDate = new Date(order.orderdate);
            const orderLabel = padZero(orderDate.getHours()) + ":" + padZero(orderDate.getMinutes());
            return orderLabel === labelMinute && (order.status === 'Paid' || order.status === 'Shipped');
          })
          .reduce((sum, order) => sum + order.totalamount, 0);
        labels.push(total);
      }
      break;

    case '1HR':
      for (let i = 0; i < 60; i++) {
        const minuteAgo = subtractTime(now, { minutes: i });
        const labelMinute = minuteAgo[2] + ":" + minuteAgo[1];
        const total = orders
          .filter(order => {
            const orderDate = new Date(order.orderdate);
            const orderLabel = padZero(orderDate.getHours()) + ":" + padZero(orderDate.getMinutes());
            return orderLabel === labelMinute && (order.status === 'Paid' || order.status === 'Shipped');
          })
          .reduce((sum, order) => sum + order.totalamount, 0);
        labels.push(total);
      }
      break;

    default:
      break;
  }

  return labels.reverse(); // chronological order
};