// components/Checkout.jsx
import React from "react";
import { Card, Descriptions, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import generateTransactionID from "./generateTransactionID";
import AddOrder from "./OrderMutation";
import { useMutation, useQueries, useQuery,useQueryClient } from "@tanstack/react-query";

import { addOrder } from "./addOrder";




const Checkout = () => {
  const queryClient = useQueryClient()
   const OneMutation=useMutation({
      mutationFn: addOrder,
       onSuccess: (data) => {
           queryClient.setQueryData(['orders'], (oldData) => {
    
        return oldData ? [...oldData, data] : [data];
      });
        // queryClient.invalidateQueries(['orders'],data)
      // Update the 'orders' query cache
      // queryClient.setQueryData(['orders'], (oldData) => {
      //   console.log(JSON.stringify(data)+"!!!!!!!!!!!!!");
      //   console.log(JSON.stringify(oldData));
      //   return oldData ? [...oldData, data] : [data];
      // });
       navigate('/');
    },
    
  });

  const { state: order } = useLocation();
  const navigate = useNavigate();
  console.log(order)

  if (!order) {
    return <Card>⚠️ No order found. Please go back to Order Form.</Card>;
  }

  const categoryCosts = {
  Electronics: 1200,
  Clothing: 80,
  Groceries: 50,
  Toys: 40,
  Books: 25,
  Kitchen: 150,
  SportsKit: 200,
};


  // const addOrderMutation = AddOrder({
  //   onSuccess: () => {

  //     navigate('/'); // redirect after successful order
  //   },
  //   onError: (error) => {
  //     console.error('Failed to add order:', error);
  //   },
  // });

 
 
  const orderAmount = (categoryCosts[order.category] * order.itemscount);

      const crypto = window.crypto;

    const randomBytes = new Uint8Array(6);
    crypto.getRandomValues(randomBytes);

    // Convert to a single big number and then to base36
    let num = 0n;
    for (let b of randomBytes) {
      num = (num << 8n) + BigInt(b);
    }

    const shortString = 'OID' + num.toString(36);

      const orderValue= {
  "orderid": shortString,
  "category": order.category,
  "transactionId": generateTransactionID(order.userid),
  "totalamount": orderAmount,
  "itemscount": order.itemscount,
  "payementmethod": order.payementmethod,
    "orderdate": new Date(),
  // "orderdate": new Date('2025-10-28').toISOString().slice(0, 10),

   "lastupdated": new Date() ,
  "status": "Pending",
  "user_id": order.userid
}

  const handleCancel = () => {

 
    // Array with the two options

    OneMutation.mutate(orderValue)
    
     
   
    
  };

  const handleCheckout = () => {
    navigate("/payment", { state: orderValue });
  };

  return (
    <Card title="Checkout Summary" style={{ maxWidth: 600, margin: "2rem auto" }}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="User ID">{order.userid}</Descriptions.Item>
        <Descriptions.Item label="Category">{order.category}</Descriptions.Item>
        <Descriptions.Item label="Payment Method">{order.payementmethod}</Descriptions.Item>
  
        <Descriptions.Item label="Order Amount">₹{orderAmount}</Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <Button onClick={handleCancel} style={{ marginRight: "1rem" }}>
          Cancel 
        </Button>
        <Button type="primary" onClick={handleCheckout}>
          Proceed to Payment
        </Button>
      </div>
    </Card>
  );
};

export default Checkout;


// // components/CheckoutModal.jsx
// import React from "react";
// import { Modal, Descriptions, Button } from "antd";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addOrder } from "./addOrder";
// import generateTransactionID from "./generateTransactionID";

// const CheckoutModal = ({ open, order, onNext, onCancel }) => {
//   const queryClient = useQueryClient();

//   const OneMutation = useMutation({
//     mutationFn: addOrder,
//     onSuccess: (data) => {
//       queryClient.setQueryData(["orders"], (oldData) =>
//         oldData ? [...oldData, data] : [data]
//       );
//       onCancel();
//     },
//   });

//   if (!order) return null;

//   const categoryCosts = {
//     Electronics: 1200,
//     Clothing: 80,
//     Groceries: 50,
//     Toys: 40,
//     Books: 25,
//     Kitchen: 150,
//     SportsKit: 200,
//   };

//   const orderAmount = categoryCosts[order.category] * order.itemscount;

//   const crypto = window.crypto;
//   const randomBytes = new Uint8Array(6);
//   crypto.getRandomValues(randomBytes);
//   let num = 0n;
//   for (let b of randomBytes) num = (num << 8n) + BigInt(b);
//   const shortString = "OID" + num.toString(36);

//   const orderValue = {
//     orderid: shortString,
//     category: order.category,
//     transactionId: generateTransactionID(order.userid),
//     totalamount: orderAmount,
//     itemscount: order.itemscount,
//     payementmethod: order.payementmethod,
//     orderdate: new Date(),
//     lastupdated: new Date(),
//     status: "Pending",
//     user_id: order.userid,
//   };

//   const handleCancel = () => OneMutation.mutate(orderValue);
//   const handleCheckout = () => onNext(orderValue);

//   return (
//     <Modal
//       open={open}
//       title="Checkout Summary"
//       onCancel={onCancel}
//       footer={null}
//       destroyOnClose
//     >
//       <Descriptions bordered column={1}>
//         <Descriptions.Item label="User ID">{order.userid}</Descriptions.Item>
//         <Descriptions.Item label="Category">{order.category}</Descriptions.Item>
//         <Descriptions.Item label="Payment Method">
//           {order.payementmethod}
//         </Descriptions.Item>
//         <Descriptions.Item label="Order Amount">
//           ₹{orderAmount}
//         </Descriptions.Item>
//       </Descriptions>

//       <div style={{ marginTop: 16, textAlign: "center" }}>
//         <Button onClick={handleCancel} style={{ marginRight: 8 }}>
//           Cancel
//         </Button>
//         <Button type="primary" onClick={handleCheckout}>
//           Proceed to Payment
//         </Button>
//       </div>
//     </Modal>
//   );
// };

// export default CheckoutModal;
