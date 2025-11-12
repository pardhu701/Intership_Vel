import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, Typography, Space, Button, Modal, Input } from "antd";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // ✅ Quartz theme style
import "antd/dist/reset.css";
import OrderModal from "./OrderModal.jsx";
import PlaceOrder from "./PlaceOrder.jsx";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder, putOrder } from "./addOrder";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "./Api";
import {
  setIsVerified,
  setPinInput,
  setShowPinPrompt,
} from "./authSlice.js";
import DeleteOrderModal from "./DeleteOrderModal.jsx";
import EditOrderModal from "./EditOrderModal.jsx";

const { Title } = Typography;
const { Search } = Input;

// ✅ Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

const AllOrderPage = () => {

  const [gridApi, setGridApi] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);



  const [quickFilterText, setQuickFilterText] = useState('');
  const queryClient = useQueryClient();
  const [trigger, setTrigger] = useState(false);
  const [user, setUser] = useState({});
  const userName = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { isVerified, pinInput, showPinPrompt } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    setUser(userName);
    if (userName?.type === "admin" && !isVerified) {
      dispatch(setShowPinPrompt(true));
    }
  }, [userName]);

  const putChange = useMutation({
    mutationFn: putOrder,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["orders"], (oldData) =>
        oldData.map((order) =>
          order.id === variables.id ? data : order
        )
      );
      setTrigger((prev)=>!prev);
    },
  });

  const deleteChange = useMutation({
    mutationFn: deleteOrder,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["orders"], (oldData) =>
        oldData.map((order) =>
          order.idn === variables.idN ? data : order
        )
      );
      setTrigger((prev)=>!prev);
    },
  });



  function isEditable(params) {
    return user.type === "admin" && isVerified;
  }

  const columnDefs = [
    {
      headerName: "Order ID", field: "idN", filter: "agTextColumnFilter", tooltipField: "idN",
      headerTooltip: "Order ID"
    },
    {
      headerName: "Customer Name",
      field: "name",
      tooltipField: "name",
      headerTooltip: "Customer Name",
    },
    {
      headerName: "Transaction ID", field: "transactionId", tooltipField: "transactionId",
      headerTooltip: "Transaction ID"
    },
    {
      headerName: "Category",
      field: "category",
      editable: isEditable,
      tooltipField: "category",
      headerTooltip: "Category",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [
          "Electronics",
          "Clothing",
          "Groceries",
          "Toys",
          "Books",
          "Kitchen",
          "SportsKit",
        ],
      },
    },
    {
      headerName: "Item Count", field: "itemscount", editable: isEditable, tooltipField: "itemscount",
      headerTooltip: "Item Count"
    },
    {
      headerName: "₹ Amount", field: "totalamount", tooltipField: "totalamount",
      headerTooltip: "₹ Amount"
    },
    {
      headerName: "Payment Method", field: "payementmethod", tooltipField: "payementmethod",
      headerTooltip: "Payment Method"
    },
    {
      headerName: "Order Date", field: "orderdate", editable: isEditable, tooltipField: "orderdate",
      headerTooltip: "Order Date"
    },
    {
      headerName: "Last Update", field: "lastupdated", editable: isEditable, tooltipField: "lastupdated",
      headerTooltip: "Last Update"
    },
    {
      headerName: "Status",
      field: "status",
      tooltipField: "status",
      headerTooltip: "Status",
      editable: isEditable,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Pending", "Shipped", "Paid", "Cancelled"],
        multiSelect: true,
      },
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

  const actionColumn = {
    headerName: "Action",
    field: "actions",
    cellRenderer: (params) => {
      return (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => handleEdit(params.data)}
          >
            Edit
          </Button>
          <Button
            danger
            size="small"
            onClick={() => handleDelete(params.data)}
          >
            Delete
          </Button>
        </Space>
      );
    },
  };

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await axios.get(`${BASE_URL}/orders`);
        setRowData(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    getOrders();
  }, [trigger]);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    // tooltipField: (params) => params.value, // show value as tooltip by default
    // tooltipComponentParams: { color: 'light' },
    // headerTooltip: 'Column info', 
    flex: 1,
  };

  const categoryCosts = useMemo(
    () => ({
      Electronics: 1200,
      Clothing: 80,
      Groceries: 50,
      Toys: 40,
      Books: 25,
      Kitchen: 150,
      SportsKit: 200,
    }),
    []
  );

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleEdit = (order) => {
    console.log(order)
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  const confirmDelete = async () => {
    deleteChange.mutate({idN:selectedOrder.idN})
     setShowDeleteModal(false);
         setTrigger((prev)=>!prev);
  };

  const handleSaveEdit = (event) => {
    // console.log(event)
    setRowData((prev) =>
      prev.map((o) => (o.id === event.id ? event : o))
    );
    setShowEditModal(false);
    const newEvent = event;
    const orderAmount =
      categoryCosts[newEvent.category] * newEvent.itemscount;
    const newEventLastDate = {
      ...newEvent,
      lastupdated: new Date(),
      totalamount: orderAmount,
    };
    localStorage.setItem("changes", JSON.stringify(newEventLastDate));
     setTrigger((prev)=>!prev);
     const fromLocalStore = JSON.parse(localStorage.getItem("changes"));
    putChange.mutate({
      id: fromLocalStore.id,
      putChange: { ...fromLocalStore },
    });
  };


  // const onCellValueChanged = (event) => {
  //   //setTrigger(true);
  //   // const newEvent = event.data;
  //   // const orderAmount =
  //   //   categoryCosts[newEvent.category] * newEvent.itemscount;
  //   // const newEventLastDate = {
  //   //   ...newEvent,
  //   //   lastupdated: new Date(),
  //   //   totalamount: orderAmount,
  //   // };
  //   // localStorage.setItem("changes", JSON.stringify(newEventLastDate));
  // };

  // const handleClick = () => {
  //   // const fromLocalStore = JSON.parse(localStorage.getItem("changes"));
  //   // putChange.mutate({
  //   //   id: fromLocalStore.id,
  //   //   putChange: { ...fromLocalStore },
  //   // });
  // };

  const finalColumnDefs = useMemo(() => {
    if (user.type === "admin" && isVerified) {
      return [...columnDefs, actionColumn];
    }
    return columnDefs;
  }, [user, isVerified]);

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
    setGridApi(params.api); // store API for later use
  }, []);

    // Function to toggle the state
  const toggleActive = useCallback(() => {
    setTrigger(prev => !prev);
  }, []);

  return (
    <Card style={{ margin: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <Title level={3}>📦 All Orders</Title>
    {/* PlaceOrder button at top-right */}
     {Object.keys(userName).length > 0 && (
         <PlaceOrder trigger={trigger} settrigger={toggleActive} />
      )}
   
  </div>

      <Space direction="vertical" style={{ width: "100%" }}>
        {/* <Title level={3}>📦 All Orders</Title> */}
        <Input
          placeholder="Search..."
          value={quickFilterText}
          onChange={(e) => setQuickFilterText(e.target.value)}
          allowClear
          style={{ width: '100%' }}
        />

         {/* {trigger && (
          <Button
            onClick={handleClick}
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
          >
            Save Changes
          </Button>
        )}  */}

        {/* PIN Modal */}
        <Modal
          title="🔒 Admin Verification"
          open={showPinPrompt}
          closable={false}
          footer={null}
        >
          <p>Please enter your admin PIN to enable editing:</p>
          <Input.Password
            placeholder="Enter PIN"
            value={pinInput}
            onChange={(e) => dispatch(setPinInput(e.target.value))}
            style={{ marginBottom: "1rem" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                if (Number(pinInput) === Number(userName.createadminpass)) {
                  dispatch(setIsVerified(true));
                  dispatch(setShowPinPrompt(false));
                } else {
                  Modal.error({
                    title: "Incorrect PIN",
                    content: "Please try again.",
                  });
                }
              }}
            >
              Verify
            </Button>
            <Button onClick={() => dispatch(setShowPinPrompt(false))}>
              Cancel
            </Button>
          </Space>
        </Modal>

        {/* ✅ Apply Quartz theme here */}
        <div
          style={{
            position: "relative",
            filter:
              user.type === "admin" && !isVerified ? "blur(4px)" : "none",
            pointerEvents:
              user.type === "admin" && !isVerified ? "none" : "auto",
          }}
          className="ag-theme-quartz" // ✅ Quartz theme applied
        >
          <div style={{ height: "80vh", width: "100%" }}>
            <AgGridReact
              quickFilterText={quickFilterText}

              rowData={rowData}
              columnDefs={finalColumnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={27}
              onGridReady={onGridReady}
              // onCellValueChanged={onCellValueChanged}
              theme={themeQuartz} // ✅ Quartz theme used
            />
          </div>
        </div>
      </Space>
      
     
      <DeleteOrderModal
        visible={showDeleteModal}
        order={selectedOrder}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      <EditOrderModal
        visible={showEditModal}
        order={selectedOrder}
        onCancel={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
      />


    </Card>
  );
};

export default AllOrderPage;
