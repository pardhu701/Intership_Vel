import React, { useState, useEffect, useMemo } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  colorSchemeLightWarm,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // ✅ Quartz theme stylesheet
import debounce from "lodash.debounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Layout,
  Card,
  Descriptions,
  Typography,
  Space,
  Input,
  AutoComplete,
  Button,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setUserC } from "./UseSlice";
import { setIsVerified, setPinInput, setShowPinPrompt } from "./authSlice";
import UserOption from "./UserOption";
import OrderForm1 from "./OrderForm1";
import PlusButton from "./PlusButton";

// ✅ Register AG Grid community modules
ModuleRegistry.registerModules([AllCommunityModule]);

const { Header, Content } = Layout;
const { Title } = Typography;

// ✅ Use AG Grid Quartz Light Warm theme
const myLightWarmTheme = themeQuartz.withPart(colorSchemeLightWarm);

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Customer");
  const [user, setUser] = useState({ id: 0, name: "Customer", age: 0 });
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(UserOption(searchTerm));

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      editable: false,
      headerStyle: { color: "white", backgroundColor: "black" },
      cellStyle: { textAlign: "left" },
    }),
    []
  );

  const columnDefs = [
    { headerName: "Order ID", field: "idN" },
    { headerName: "Transaction ID", field: "transactionId" },
    { headerName: "Category", field: "category" },
    { headerName: "Item Count", field: "itemscount" },
    { headerName: "₹ Amount", field: "totalamount" },
    { headerName: "Payment Method", field: "payementmethod" },
    { headerName: "Order Date", field: "orderdate" },
    { headerName: "Last Update", field: "lastupdated" },
    {
      headerName: "Status",
      field: "status",
      filter: "agSetColumnFilter",
     cellRenderer: (params) => {
  const status = params.value;
  let color;

  switch (status) {
    case "Paid":
      color = "green";
      break;
    case "Pending":
      color = "orange";
      break;
    case "Shipped":
      color = "lightgreen";
      break;
    case "Cancelled":
      color = "red";
      break;
    default:
      color = "gray"; // fallback for unexpected statuses
      break;
  }

  return (
    <span style={{ color, fontWeight: "bold" }}>{status}</span>
  );
},

    },
  ];

  const fetchSuggestions = async (value) => {
    if (!value.trim()) return setOptions([]);

    try {
      const users = queryClient.getQueryData(["users"]) || [];
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

  useEffect(() => {
    if (!data) return;

    const userData = data;
    setUser({
      id: userData.id ?? 0,
      name: userData.name ?? "Customer",
      age: userData.age ?? 0,
    });

    

   

    setOrders(data.orders ?? []);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data</p>;

  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Header
        style={{
         
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

          <Card
            title="Orders"
            bordered
            extra={
              <div>
                <PlusButton />
              </div>
            }
          >
            {/* ✅ Apply Quartz Light Warm theme here */}
            <div
              className="ag-theme-quartz" // Quartz theme class
              style={{ height: 500, width: "100%" }}
            >
              <AgGridReact
                rowData={orders}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination
                paginationPageSize={10}
                theme={myLightWarmTheme} // ✅ Use light warm variant
              />
            </div>
          </Card>
        </Space>
      </Content>
    </Layout>
  );
};

export default UserOrdersPage;
