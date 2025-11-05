import React, { useState } from 'react';
import { Row, Col, Card, Radio } from 'antd';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';




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
  const list = {}

  switch (timeRange) {
    case '7D':
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(now.getDate() - i); // subtract i days
        const formate = date.toISOString().split('T')[0];
        orders.forEach(order => {
          if (order.orderdate.split(' ')[0] === formate && (order.status === 'Paid' || order.status === 'Shipped')) {
            // Add amount if name exists, else set it
            list[order.name] = (list[order.name] || 0) + order.totalamount;
          }
        }); //date

      }
      break;

    case '1D':

      break;

    case '4HR':
      // no implementation
      break;

    case '1HR':
      // eslint-disable-next-line no-constant-condition
      if (1 === 1) {
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour in milliseconds

        orders.forEach(order => {
          const orderTime = new Date(order.orderdate);

          if (
            orderTime >= oneHourAgo &&
            orderTime <= now &&
            (order.status === 'Paid' || order.status === 'Shipped')
          ) {
            list[order.name] = (list[order.name] || 0) + order.totalamount;
          }
        });
      }
      break;

    default:
      // no implementation
      break;
  }

  return list;
};


const PieChartData = (timeRange, orders) => {
  const now = new Date();
  const list = {
    "Pending": 0,
    "Cancelled": 0,
    "Shipped": 0,
    "Paid": 0

  }

  switch (timeRange) {
    case '7D':
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(now.getDate() - i); // subtract i days
        const formate = date.toISOString().split('T')[0];
        orders.forEach(order => {
          if (order.orderdate.split(' ')[0] === formate) {
            // Add amount if name exists, else set it
            list[order.status] = (list[order.status] || 0) + 1;
          }
        }); //date

      }
      break;

    case '1D':
      // no implementation
      break;

    case '4HR':
      // no implementation
      break;

    case '1HR':
      // no implementation
      break;

    default:
      // no implementation
      break;
  }

  return list;
};





// Utility function to generate X-axis dynamically
const generateXAxis = (timeRange) => {
  const now = new Date();
  const labels = [];

  switch (timeRange) {


    case '7D': // last 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(now.getDate() - i); // subtract i days
        labels.push(date.toISOString().split('T')[0]);

      }
      break;

    case '1D': // last 5 weeks

      break;

    case '4HR': // last 12 months

      break;

    case '1HR': // last 5 years
      for (let i = 59; i >= 0; i--) {
        const date = new Date(now);
        date.setMinutes(now.getMinutes() - i); // subtract i minutes

        const formatted =
          String(date.getHours()).padStart(2, '0') + ':' +
          String(date.getMinutes()).padStart(2, '0');

        labels.push(formatted);
      }
      break;

    default:
      break;
  }

  return labels;
};

const generateYAxis = (timeRange, orders) => {
  const now = new Date();
  const labels = [];

  switch (timeRange) {


    case '7D': // last 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(now.getDate() - i); // subtract i days

        // Format as YYYY-MM-DD
        const formatted = date.toISOString().split('T')[0];

        // Filter orders for this date
        const dateOrders = orders.filter(order => {
          const orderDate = new Date(order.orderdate);
          const orderDateStr = orderDate.toISOString().split('T')[0];
          return orderDateStr === formatted;
        });

        // Sum totalamount for that day
        const total = dateOrders.reduce((sum, order) => {
          if (order.status === 'Paid' || order.status == 'Shipped') {
            return sum + order.totalamount
          }
          return sum;
        }, 0);
        labels.push(total);
      }
      break;


    case '1D': // last 5 weeks

      break;

    case '4HR': // last 12 months

      break;

    case '1HR': // last 5 years
      // for (let i = 59; i >= 0; i--) {
      //   const date = new Date(now).toUTCString();
      //   date.setMinutes(now.getMinutes() - i); // subtract i minutes

      //   // Format as HH:mm

      //   // Define 1-minute range
      //   const start = new Date(date).toUTCString();
      //   const end = new Date(date).toUTCString();
      //   end.setMinutes(start.getMinutes() + 1);

      //   // Filter orders within this minute
      //   const minuteOrders = orders.filter(order => {
      //     const orderDate = new Date(order.orderdate);
      //     return (
      //       orderDate >= start &&
      //       orderDate < end &&
      //       (order.status === 'Paid' || order.status === 'Shipped')
      //     );
      //   });

        // Sum totalamount for that minute
      //   const total = minuteOrders.reduce((sum, order) => sum + order.totalamount, 0);


      //   labels.push(total);
      // }
      break;

    default:
      break;
  }

  return labels;
};




