import React, { useState, useEffect, useMemo } from "react";
import { AllCommunityModule, ModuleRegistry, themeQuartz, colorSchemeLightWarm } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import debounce from "lodash.debounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Layout, Card, Descriptions, Typography, Space, Input, AutoComplete,Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {  useDispatch } from "react-redux";
import { setUserC } from "./UseSlice";

import UserOption from "./UserOption";
import OrderForm1 from "./OrderForm1";
import PlusButton from "./PlusButton";

ModuleRegistry.registerModules([AllCommunityModule]);

const { Header, Content } = Layout;
const { Title } = Typography;

const myLightWarmTheme = themeQuartz.withPart(colorSchemeLightWarm);

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("default");
  const [user, setUser] = useState({ id: 0, name: "default", age: 0 });
  const [options, setOptions] = useState([]);

  // const userSet = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Fetch user data
  const { data, isLoading, error } =  useQuery(UserOption(searchTerm));

  // Default column settings
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    editable: false,
    headerStyle: { color: 'white', backgroundColor: 'black' },
    cellStyle: { textAlign: 'left' },
  }), []);

  // AG Grid columns
  const columnDefs = [
    { headerName: "Order ID", field: "id" },

    { headerName: "Transaction ID", field: "transactionId" },
    { headerName: "Category", field: "category" },
    { headerName: "Item Count", field: "itemscount" },
    { headerName: "₹ Amount", field: "totalamount" },
    { headerName: "Payment Method", field: "payementmethod" },
    { headerName: "Order Date", field: "orderdate" },
    { headerName: "Last Update", field: "lastupdated" },
    { headerName: "Status", field: "status" },
  ];

  // Search suggestions
  // const fetchSuggestions = async (value) => {
  //   if (!value.trim()) return setOptions([]);
  //   try {
  //     const res = await queryClient.getQueryData(['users']);
  //     console.log(res)
  //     const data = await res.json();
  //     setOptions(
  //       data
  //         .filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()) || item.id === Number(value))
  //         .map(item => ({ value: item.name }))
  //     );
  //   } catch {
  //     setOptions([]);
  //   }
  // };

  const fetchSuggestions = async (value) => {
  if (!value.trim()) return setOptions([]);

  try {
    // Get cached users data
    const users = queryClient.getQueryData(['users']) || [];

    // Filter users based on input value
    const filtered = users
      .filter(
        (item) =>
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.id === Number(value)
      )
      .map((item) => ({ value: item.name }));

    setOptions(filtered);
  } catch (error) {
    console.error(error);
    setOptions([]);
  }
};


  const debouncedFetch = useMemo(() => debounce(fetchSuggestions, 300), []);

  const onSelect = (value) => setSearchTerm(value);

  // Update user and orders when data changes
  useEffect(() => {
    if (!data) return;

    const userData = data;
    setUser({
      id: userData.id ?? 0,
      name: userData.name ?? "default",
      age: userData.age ?? 0,
    });

    dispatch(setUserC({
      id: userData.id ?? 0,
      name: userData.name ?? "default",
      age: userData.age ?? 0,
    }));

    setOrders(data.orders ?? []);
  }, [data, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data</p>;

  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Header
        style={{
          background: "#001529",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <Title level={3} style={{ color: "white", margin: 0 }}>
          User Dashboard
        </Title>

        <AutoComplete
          options={options}
          onSearch={debouncedFetch}
          onSelect={onSelect}
          placeholder="Search by user or Id"
          style={{ width: "45%" }}
        >
          <Input.Search enterButton />
        </AutoComplete>
      </Header>

      <Content style={{ padding: "24px 48px" }}>
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Card title="User Details" bordered>
            <Descriptions column={2}>
              <Descriptions.Item label="User ID">{user.id}</Descriptions.Item>
              <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
              <Descriptions.Item label="Age">{user.age}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Orders" bordered extra={
            <>
            <div>
             
                <PlusButton />
           
            </div>
            </>
          }  >
  <div className={myLightWarmTheme} style={{ height: 500 }}>
    <AgGridReact
      rowData={orders}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      pagination
      paginationPageSize={10}
    />
  </div>
</Card>
        </Space>
      </Content>

     
    </Layout>
  );
};

export default UserOrdersPage;

















// import React, { useState, useEffect, useMemo } from "react";
// import { AllCommunityModule, ModuleRegistry, themeQuartz, colorSchemeLightWarm } from "ag-grid-community";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
// import debounce from "lodash.debounce";
// import { useQuery } from "@tanstack/react-query";
// import { Layout, Card, Descriptions, Tag, Typography, Space, Input, AutoComplete } from "antd";

// import UserOption from "./UserOption";
// import OrderForm from "./OrderForm";
// import { useSelector, useDispatch } from 'react-redux';
// import { setUserC } from "./UseSlice";
// import OrderForm1 from "./OrderForm1";
// ModuleRegistry.registerModules([AllCommunityModule]);

// const { Header, Content } = Layout;
// const { Title } = Typography;

// const myLightWarmTheme = themeQuartz.withPart(colorSchemeLightWarm);

// const UserOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("Shaurya Jain");
//   const [user, setUser] = useState({ id: 0, name: "default", age: 0 });
//   const [options, setOptions] = useState([]);

//   const { data, isLoading, error } = useQuery(UserOption(searchTerm));
//     const userSet = useSelector((state) => state.user.user);
//   const dispatch = useDispatch();

//   const defaultColDef = useMemo(() => ({
//     headerStyle: { color: 'white', backgroundColor: 'black' },
//     sortable: true,
//     filter: true,
//     resizable: true,
//     flex: 1,
//     editable: false,
//      cellStyle: { textAlign: 'left' }
//   }), []);

//   const columnDefs = [
//     { headerName: "Order ID", field: "id" },
//     { headerName: "Transaction ID", field: "transactionId" },
//     { headerName: "Category", field: "category" },
//     { headerName: "Item Count", field: "itemscount" },
//      {
//       headerName: " ₹ Amount",
//       field: "totalamount",
    
//     },
 
//     { headerName: "Payment Method", field: "paymentmethod" },
   
//     { headerName: "Order Date", field: "orderdate" },
//     { headerName: "Last Update", field: "lastupdate" },
//     {
//       headerName: "Status",
//       field: "status",
      
//     },
//   ];

//   const fetchSuggestions = async (value) => {
//     if (!value.trim()) return setOptions([]);
//     try {
//       const response = await fetch(`http://localhost:8080/api/users`);
//       console.log()
//       const data = await response.json();
//       setOptions(
//         data
//           .filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()) || item.id === Number(value))
//           .map((item) => ({ value: item.name }))
//       );
//     } catch {
//       setOptions([]);
//     }
//   };

//   const debouncedFetch = useMemo(() => debounce(fetchSuggestions, 300), []);

//   const onSelect = (value) => {
//     // if (!isNaN(value)) setSearchTerm({ id: Number(value) });
//     // else {setSearchTerm({ name: value });}
//     setSearchTerm(value)
//   };

//   useEffect(() => {

//       const userData = data;
//     //  console.log(userData)
//    // dispatch(setUser(userData))
//       setUser({
//         id: userData.id ?? 0,
//         name: userData.name ?? "default",
//         age: userData.age ?? 0,
//       });

//         dispatch(setUserC({
//       id: userData.id ?? 0,
//       name: userData.name ?? "default",
//       age: userData.age ?? 0,
//     }));
    

//       setOrders(data.orders ?? [])
//     }
//   , [data]);

 

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading user data</p>;

//   return   (
//     <Layout style={{ minHeight: "100vh", display: "flex" }}>
//       {/* Header */}
//       <Header
//         style={{
//           background: "#001529",
//           color: "white",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "0 20px",
//         }}
//       >
//         <Title level={3} style={{ color: "white", margin: 0 }}>
//           User Dashboard
//         </Title>

//         <AutoComplete
//           options={options}
//           onSearch={debouncedFetch}
//           onSelect={onSelect}
//           placeholder="Search by user or Id"
//           style={{ width: "45%" }}
//         >
//           <Input.Search enterButton />
//         </AutoComplete>
//       </Header>

//       {/* Content */}
//       <Content style={{ padding: "24px 48px" }}>
//         <Space direction="vertical" style={{ width: "100%" }} size="large">
//           {/* User Info */}
//           <Card title="User Details" bordered>
//             <Descriptions column={2}>
//               <Descriptions.Item label="User ID">{user.id}</Descriptions.Item>
//               <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
//               <Descriptions.Item label="Age">{user.age}</Descriptions.Item>
//             </Descriptions>
//           </Card>

//           {/* Orders */}
//           <Card title="Orders" bordered>
//             <div className={myLightWarmTheme} style={{ height: 400 }}>
//               <AgGridReact
//                 rowData={orders}
//                 columnDefs={columnDefs}
//                 defaultColDef={defaultColDef}
//                 pagination
//                 paginationPageSize={5}
//               />
//             </div>
//           </Card>
//         </Space>
//       </Content>
//         <OrderForm1 user={userSet.id} />    
//     </Layout>
//   );
// };

// export default UserOrdersPage;















































// // import React, { useState, useEffect } from "react";
// // import { AllCommunityModule, ModuleRegistry ,themeQuartz} from "ag-grid-community";
// // ModuleRegistry.registerModules([AllCommunityModule]);

// // import { AgGridReact } from "ag-grid-react";

// // // ✅ 3. Import AG Grid styles (required)
// // import "ag-grid-community/styles/ag-grid.css";
// // import "ag-grid-community/styles/ag-theme-quartz.css";
// // import { colorSchemeLightWarm } from 'ag-grid-community';
// // import debounce from "lodash.debounce";

// // import { useQuery , QueryClient } from "@tanstack/react-query";
// // import UserOption from "./UserOption";
// // import {
// //   Layout,
// //   Card,
// //   Descriptions,
// //   Table,
// //   Tag,
// //   Typography,
// //   Space,
// //   Button,
// //   Input,
// //   AutoComplete
// // } from "antd";
// // import axiosInstance from "../Week2/axios&fetch/axiosInstance";
// // import SearchWithFetch from "../SearchBar/SearchWithFetch";

// // const { Header, Content, Footer } = Layout;
// // const { Title } = Typography;
// // const { Search } = Input;

// // const myLightWarmTheme = themeQuartz.withPart(colorSchemeLightWarm);

// // const query=new QueryClient();


// // const UserOrdersPage = () => {


// //  const [orders, setOrders] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState(
// //     {}
// //   );
 
// //   const { data, isLoading, error } = useQuery(UserOption(searchTerm));

// //   const [user, setUser] = useState({
// //     id: 0,
// //     name: "default",
// //     age: 0,
// //   });

  
// // const defaultColDef = React.useMemo(() => ({
// //      headerStyle: { color: 'white', 'background-color': 'black' },
// //     sortable: true,       // enable sorting
// //     filter: true,         // enable filtering
// //     resizable: true,      // allow resizing
// //     flex: 1,              // make columns share available width
// //    // minWidth: 100,        // minimum width per column
// //     editable: false,      // disable editing by default
// //     // floatingFilter: true, // show floating filter below header
// //   }), []);

// //    const [options, setOptions] = useState([]);
  
  
// //     const fetchSuggestions = async (value) => {
// //     if (!value.trim()) {
// //       setOptions([]);
// //       return;
// //     }
  
// //     try {
// //       const response = await fetch(`http://localhost:5000/users`);
// //       const data = await response.json();
// //       console.log(data); // check the structure of data
  
// //       setOptions(
// //         data
// //           .filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()) || item.id===value )
// //           .map((item) => ({ value:item.name }))
// //       );
// //     } catch (error) {
// //       console.error("Error fetching suggestions:", error);
// //       setOptions([]);
// //     }
// //   };
  
  
// //     // Debounce to avoid too many API calls
// //     const debouncedFetch = React.useMemo(() => debounce(fetchSuggestions, 300), []);



// // const onSelect=(value)=>{
// //     if (!isNaN(value)) {
// //     setSearchTerm({ id: Number(value) });
// //   } else {
// //     setSearchTerm({ name: value });
// //     //console.log(query.getQueriesData(["users",{"name":"Dianay"}]))
// //   }
// // }

 

// //   // ⛓ When data changes, update user & orders
// //     useEffect(() => {
// //     if (data && Array.isArray(data) && data.length > 0) {
// //       const userData = data[0]; // take first object from array
// //         console.log(userData)
// //       setUser({
// //         id: userData.id ?? 0,
// //         name: userData.name ?? "default",
// //         age: userData.age ?? 0,
// //       });

// //       fetch(`http://localhost:5000/orders?userId=${userData.id}`).then(data=>data.json()).then(data=>{
// //             setOrders(data ?? []);
// //       })
     
// //     }
// //   }, [data]);


// //   // Fetch suggestions from Wikipedia API
  

 

 
// //   // 📊 Table Columns
// //   // const columns = [
// //   //   {
// //   //     title: "Transaction ID",
// //   //     dataIndex: "transactionId",
// //   //     key: "transactionId",
      
// //   //   },
// //   //   {
// //   //     title: "Category",
// //   //     dataIndex: "category",
// //   //     key: "category",
// //   //   },
// //   //   {
// //   //     title: "Payment Method",
// //   //     dataIndex: "paymentMethod",
// //   //     key: "paymentMethod",
// //   //   },
// //   //   {
// //   //     title: "Amount (Rp)",
// //   //     dataIndex: "amount",
// //   //     key: "amount",
// //   //     render: (value) => <strong>{value?.toLocaleString()}</strong>,
// //   //   },
// //   //   {
// //   //     title: "Date",
// //   //     dataIndex: "date",
// //   //     key: "date",
// //   //   },
// //   //   {
// //   //     title: "Status",
// //   //     dataIndex: "status",
// //   //     key: "status",
// //   //     render: (status) => (
// //   //       <Tag color={status === "Placed" ? "blue" : "gray"}>{status}</Tag>
// //   //     ),
// //   //   },
// //   // ];

// //   const columnDefs = [
// //   {
// //     headerName: "Transaction ID",
// //     field: "transactionId",
// //   },
// //   {
// //     headerName: "Category",
// //     field: "category",
// //   },
// //   {
// //     headerName: "Payment Method",
// //     field: "paymentMethod",
// //   },
// //   {
// //     headerName: "Amount (Rp)",
// //     field: "amount",
// //     cellRendererFramework: (params) => (
// //       <strong>{params.value?.toLocaleString()}</strong>
// //     ),
// //   },
// //   {
// //     headerName: "Date",
// //     field: "date",
// //   },
// //   {
// //     headerName: "Status",
// //     field: "status",
// //     cellRendererFramework: (params) => {
// //       const color = params.value === "Placed" ? "blue" : "gray";
// //       return <Tag color={color}>{params.value}</Tag>;
// //     },
// //   },
// // ];

// //   if (isLoading) return <p>Loading...</p>;
// //   if (error) return <p>Error loading user data</p>;

// //   return (
// //     <Layout style={{ minHeight: "100vh", display:"flex"}}>
// //       {/* 🔹 Header */}
// //        <Header
// //       style={{
// //         background: "#001529",
// //         color: "white",
// //         display: "flex",
// //         justifyContent: "space-between", // places items left & right
// //         alignItems: "center", // vertically centers them
// //         padding: "0 20px",
// //       }}
// //     >
// //       <Title level={3} style={{ color: "white", margin: 0 }}>
// //         User Dashboard
// //       </Title>
      

// //       {/* <Search
// //         placeholder="Search by user or Id"
// //         enterButton="Search"
// //         size="large"
// //          onSearch={onSearch}
// //         style={{ maxWidth: 400 }}
// //       /> */}

// //         <AutoComplete
// //        options={options}
// //         onSearch={debouncedFetch}
// //         onSelect={onSelect}
// //         placeholder="Search by user or Id"
// //         style={{ width: "45%" }}
// //       >
// //         <Input.Search  enterButton />
// //       </AutoComplete>

// //     </Header>

// //       {/* 🔹 Content */}
// //       <Content style={{ padding: "24px 48px" }}>
// //         <Space direction="vertical" style={{ width: "100%" }} size="large">
// //           {/* 🧍 User Info */}
// //           <Card title="User Details" bordered>
// //             <Descriptions column={2}>
// //               <Descriptions.Item label="User ID">{user.id}</Descriptions.Item>
// //               <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
// //               <Descriptions.Item label="Age">{user.age}</Descriptions.Item>
// //             </Descriptions>
// //           </Card>

// //           {/* 📦 Orders */}
// //           <Card title="Orders" bordered>
// //             {/* <Table
// //               dataSource={orders}
// //               columns={columns}
// //               rowKey="id"
// //               pagination={true}
// //             /> */}

// //              <div
// //                   className={myLightWarmTheme} // ✅ Required theme
// //                    // ✅ Set both height and width
// //                    style={{ height: 400 }}
// //                 >
// //                   <AgGridReact
// //                     rowData={orders}
// //                     columnDefs={columnDefs}
// //                     pagination={true}
// //                      defaultColDef={defaultColDef}
// //                     paginationPageSize={5}
// //                   />
// //                 </div>
// //           </Card>

         
// //         </Space>
// //       </Content>

    
// //     </Layout>
// //   );
// // };

// // export default UserOrdersPage;
