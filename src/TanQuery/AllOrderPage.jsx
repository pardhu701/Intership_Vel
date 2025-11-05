import React, { useState, useEffect, useCallback } from "react";
import { Card, Typography, Space, Button ,Modal, Input } from "antd";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "antd/dist/reset.css";
import axios from 'axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putOrder } from "./addOrder";
import { useSelector } from "react-redux";
import { BASE_URL } from "./Api";
import { useDispatch } from "react-redux";
import { setIsVerified, setPinInput, setShowPinPrompt } from "./authSlice.js";

const { Title } = Typography;


const AllOrderPage = () => {
  
  const queryClient = useQueryClient();
   const [trigger, setTrigger] = useState(false)
   const[user,setUser]= React.useState({})
const userName=useSelector(state=>state.user.user)

// ////////////////////
//  const [isVerified, setIsVerified] = useState(false);
//   const [pinInput, setPinInput] = useState("");
//   const [showPinPrompt, setShowPinPrompt] = useState(false);
//   ///////////////////
  const dispatch = useDispatch();
  const { isVerified, pinInput, showPinPrompt } = useSelector((state) => state.auth);


React.useEffect(()=>{
  
  setUser(userName);
    if (userName?.type === "admin" && !isVerified) {////////////
      // setShowPinPrompt(true);
      dispatch(setShowPinPrompt(true))
     
    }//////////////
},[userName])

 

  const putChange = useMutation({
    mutationFn: putOrder,
    onSuccess: (data, variables) => {
      // Optimistically update the order in cache
      queryClient.setQueryData(['orders'], oldData => {
        return oldData.map(order =>
          order.id === variables.id ? data : order
        );
      });
      setTrigger(false)
        
    },

  })

  
  function isEditable(params) {
    // allow editing only if current user is admin
    return user.type === 'admin' && isVerified;
    // you can add more logic: only certain rows, columns, etc.
  }


  // Define column definitions
  const columnDefs = [
    { headerName: "Order ID", field: "idN", filter: "agTextColumnFilter", cellStyle: { textAlign: 'left' }, },
    {
      headerName: "Customer Name",
      field: "name",
      filter: "agTextColumnFilter"
    },

    { headerName: "Transaction ID", field: "transactionId", filter: "agTextColumnFilter", cellStyle: { textAlign: 'left' } },
    { headerName: "Category", field: "category", filter: "agTextColumnFilter", cellStyle: { textAlign: 'left' },editable: params => isEditable(params),
   cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['Electronics', 'Clothing', 'Groceries', 'Toys', 'Books', 'Kitchen', 'SportsKit']
    },
  },
    { headerName: "Item Count", field: "itemscount", filter: "agNumberColumnFilter", cellStyle: { textAlign: 'left' }, editable:params => isEditable(params)},
    { headerName: "₹ Amount", field: "totalamount", filter: "agNumberColumnFilter", cellStyle: { textAlign: 'left' }},
    { headerName: "Payment Method", field: "payementmethod", filter: "agTextColumnFilter", cellStyle: { textAlign: 'left' }, },
    { headerName: "Order Date", field: "orderdate", filter: "agDateColumnFilter", cellStyle: { textAlign: 'left' }, editable: params => isEditable(params)},
    { headerName: "Last Update", field: "lastupdated", filter: "agDateColumnFilter", cellStyle: { textAlign: 'left' }, editable: params => isEditable(params) },
    {
      headerName: "Status",
      cellStyle: { textAlign: 'left' },
      editable: params => isEditable(params),
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Pending', 'Shipped', 'Paid', 'Cancelled'],  // dropdown options
         multiSelect: true
      },
      field: "status",
      filter: "agSetColumnFilter",
      cellRenderer: (params) => {
        const color =
          params.value === "Paid"
            ? "green"
            : params.value === "Pending"
              ? "orange"
              : params.value === "Shipped" ? "LightGreen" : "red"
        return (
          <span
            style={{
              color: color,
              fontWeight: "bold",
            }}
          >
            {params.value}
          </span>
        );
      },
    },
  ];

  // Sample row data (replace with API data)
  const [rowData, setRowData] = useState([]);
 

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`${BASE_URL}/orders`);
        console.log(response.data);
        setRowData(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    getUser();


  }, [trigger]);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    editable: false,
    headerStyle: { color: 'white', backgroundColor: 'black' },
    cellStyle: { textAlign: 'left' },
    floatingFilter: true, // Enables quick filter input under headers
  };



  const categoryCosts = {
    Electronics: 1200.5,
    Clothing: 80,
    Groceries: 50.01,
    Toys: 40,
    Books: 25,
    Kitchen: 150,
    SportsKit: 200.9,
  };




  // const orderAmount = (categoryCosts[order.category] * order.itemscount);


  const onCellValueChanged = (event) => {
    setTrigger(true)
    const newEvent = event.data;
  
    const orderAmount = (categoryCosts[newEvent.category] * newEvent.itemscount);

    const newEventLastDate = { ...newEvent, lastupdated: new Date(),totalamount:orderAmount }
    localStorage.setItem("changes", JSON.stringify(newEventLastDate))
    // console.log(newEventLastDate)




  };


  

      const handleClick = () => {
    const fromLocalStore = JSON.parse(localStorage.getItem("changes"));
  
  
    

    putChange.mutate({ id: fromLocalStore.id, putChange:{...fromLocalStore} })
    
  }




  // const onRowChange=(event)=>{
  //    console.log(JSON.stringify(event.data));
  //   console.log('Old value:', event.oldValue, 'New value:', event.newValue);

  // }

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <Card style={{ margin: 24 }} >
      <Space direction="vertical" style={{ width: "100%" }} >
        <Title level={3}>📦 All Orders</Title>

         {trigger && (
      <Button
        onClick={handleClick}
        style={{
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold",
          transition: "all 0.3s ease",
          transform: trigger ? "scale(1)" : "scale(0.8)",
          opacity: trigger ? 1 : 0,
        }}
      >
        Save Changes
      </Button>
    )}

       {/* ✅ PIN Modal (Ant Design) */}
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
            <Button onClick={() => dispatch(setShowPinPrompt(false))}>Cancel</Button>
          </Space>
        </Modal>

        {/* ✅ Blur the grid until verified */}
        <div
          style={{
            position: "relative",
            filter: user.type === "admin" && !isVerified ? "blur(4px)" : "none",
            pointerEvents: user.type === "admin" && !isVerified ? "none" : "auto",
          }}
          className="ag-theme-alpine"
        >
          <div
            style={{
              height: "80vh",
              width: "100%",
            }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={22}
              onGridReady={onGridReady}
              onCellValueChanged={onCellValueChanged}
            />
          </div>
        </div>
      </Space>
    </Card>
  );
};

export default AllOrderPage;
