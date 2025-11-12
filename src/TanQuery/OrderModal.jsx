// // components/OrderFlow.jsx
// import React, { useState } from "react";
// import { Modal, Button, Descriptions, Card, message } from "antd";
// import generateTransactionID from "./generateTransactionID";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addOrder } from "./addOrder";

// const categoryCosts = {
//   Electronics: 1200,
//   Clothing: 80,
//   Groceries: 50,
//   Toys: 40,
//   Books: 25,
//   Kitchen: 150,
//   SportsKit: 200,
// };

// const OrderModal = ({ order, onClose }) => {
//   const queryClient = useQueryClient();
//   const [isCheckoutVisible, setCheckoutVisible] = useState(true);
//   const [isPaymentVisible, setPaymentVisible] = useState(false);

//   const addOrderMutation = useMutation({
//     mutationFn: addOrder,
//     onSuccess: (data) => {
//       queryClient.setQueryData(["orders"], (old) => (old ? [...old, data] : [data]));
//       message.success("Order placed successfully!");
//       setPaymentVisible(false);
//       setCheckoutVisible(false);
//       onClose?.(); // close everything
//     },
//     onError: () => message.error("Failed to add order"),
//   });

//   if (!order) return null;

//   const orderAmount = categoryCosts[order.category] * order.itemscount;

//   // Generate order + transaction IDs
//   const randomBytes = new Uint8Array(6);
//   window.crypto.getRandomValues(randomBytes);
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

//   // ---- Checkout Modal ----
//   const CheckoutModal = (
//     <Modal
//       title="Checkout Summary"
//       open={isCheckoutVisible}
//       onCancel={() => {
//         setCheckoutVisible(false);
//         onClose?.();
//       }}
//       footer={[
//         <Button key="cancel" onClick={() => {
//           addOrderMutation.mutate({ ...orderValue, status: "Cancelled" });
//         }}>
//           Cancel Order
//         </Button>,
//         <Button key="pay" type="primary" onClick={() => {
//           setCheckoutVisible(false);
//           setPaymentVisible(true);
//         }}>
//           Proceed to Payment
//         </Button>,
//       ]}
//     >
//       <Descriptions bordered column={1}>
//         <Descriptions.Item label="User ID">{order.userid}</Descriptions.Item>
//         <Descriptions.Item label="Category">{order.category}</Descriptions.Item>
//         <Descriptions.Item label="Payment Method">{order.payementmethod}</Descriptions.Item>
//         <Descriptions.Item label="Order Amount">₹{orderAmount}</Descriptions.Item>
//       </Descriptions>
//     </Modal>
//   );

//   // ---- Payment Modal ----
//   const PaymentModal = (
//     <Modal
//       title="Payment"
//       open={isPaymentVisible}
//       onCancel={() => setPaymentVisible(false)}
//       footer={[
//         <Button key="cancel" onClick={() => addOrderMutation.mutate({ ...orderValue, status: "Cancelled" })}>
//           Cancel Payment
//         </Button>,
//         <Button key="pay" type="primary" onClick={() => {
//           const options = ["Paid", "Shipped"];
//           const randomStatus = options[Math.floor(Math.random() * options.length)];
//           addOrderMutation.mutate({ ...orderValue, status: randomStatus });
//         }}>
//           Pay Now
//         </Button>,
//       ]}
//     >
//       <p><strong>Amount Payable:</strong> ₹{orderAmount}</p>
//     </Modal>
//   );

//   return (
//     <>
//       {CheckoutModal}
//       {PaymentModal}
//     </>
//   );
// };

// export default OrderModal;


// components/OrderFlow.jsx
import React, { useState } from "react";
import { Modal, Button, Descriptions, Card, message } from "antd";
import generateTransactionID from "./generateTransactionID";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrder } from "./addOrder";
import OrderForm1 from "./OrderForm1";  // Import the OrderForm1 component

const categoryCosts = {
  Electronics: 1200,
  Clothing: 80,
  Groceries: 50,
  Toys: 40,
  Books: 25,
  Kitchen: 150,
  SportsKit: 200,
};

const OrderModal = ({ order, onClose }) => {
  const queryClient = useQueryClient();
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);
  const [isPaymentVisible, setPaymentVisible] = useState(false);
  const [isOrderFormModalVisible, setIsOrderFormModalVisible] = useState(true);  // State to toggle the OrderForm1 modal

  const addOrderMutation = useMutation({
    mutationFn: addOrder,
    onSuccess: (data) => {
      queryClient.setQueryData(["orders"], (old) => (old ? [...old, data] : [data]));
      message.success("Order placed successfully!");
      setPaymentVisible(false);
      setCheckoutVisible(false);
      onClose?.(); // Close everything
    },
    onError: () => message.error("Failed to add order"),
  });

  if (!order) return null;

  const orderAmount = categoryCosts[order.category] * order.itemscount;

  // Generate order + transaction IDs
  const randomBytes = new Uint8Array(6);
  window.crypto.getRandomValues(randomBytes);
  let num = 0n;
  for (let b of randomBytes) num = (num << 8n) + BigInt(b);
  const shortString = "OID" + num.toString(36);

  const orderValue = {
    orderid: shortString,
    category: order.category,
    transactionId: generateTransactionID(order.userid),
    totalamount: orderAmount,
    itemscount: order.itemscount,
    payementmethod: order.payementmethod,
    orderdate: new Date(),
    lastupdated: new Date(),
    status: "Pending",
    user_id: order.userid,
  };

  // ---- Checkout Modal ----
  const CheckoutModal = (
    <Modal
      title="Checkout Summary"
      open={isCheckoutVisible}
      onCancel={() => {
        setCheckoutVisible(false);
        onClose?.();
      }}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            addOrderMutation.mutate({ ...orderValue, status: "Cancelled" });
          }}
        >
          Cancel Order
        </Button>,
        <Button
          key="pay"
          type="primary"
          onClick={() => {
            setCheckoutVisible(false);
            setPaymentVisible(true);
          }}
        >
          Proceed to Payment
        </Button>,
        <Button
          key="create-order"
          type="primary"
          onClick={() => setIsOrderFormModalVisible(true)} // Open OrderForm1 modal
        >
          Create Order
        </Button>
      ]}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="User ID">{order.userid}</Descriptions.Item>
        <Descriptions.Item label="Category">{order.category}</Descriptions.Item>
        <Descriptions.Item label="Payment Method">{order.payementmethod}</Descriptions.Item>
        <Descriptions.Item label="Order Amount">₹{orderAmount}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );

  // ---- Payment Modal ----
  const PaymentModal = (
    <Modal
      title="Payment"
      open={isPaymentVisible}
      onCancel={() => setPaymentVisible(false)}
      footer={[
        <Button
          key="cancel"
          onClick={() => addOrderMutation.mutate({ ...orderValue, status: "Cancelled" })}
        >
          Cancel Payment
        </Button>,
        <Button
          key="pay"
          type="primary"
          onClick={() => {
            const options = ["Paid", "Shipped"];
            const randomStatus = options[Math.floor(Math.random() * options.length)];
            addOrderMutation.mutate({ ...orderValue, status: randomStatus });
          }}
        >
          Pay Now
        </Button>,
      ]}
    >
      <p><strong>Amount Payable:</strong> ₹{orderAmount}</p>
    </Modal>
  );

  // ---- Order Form Modal (OrderForm1) ----
  const OrderFormModal = (
    <Modal
      title="Create Order"
      open={isOrderFormModalVisible}
      onCancel={() => setIsOrderFormModalVisible(false)} // Close OrderForm1 modal
      footer={null} // Custom footer for OrderForm1 modal
    >
      <OrderForm1 />
    </Modal>
  );

  return (
    <>
      {CheckoutModal}
      {PaymentModal}
      {OrderFormModal} {/* Render OrderForm1 modal here */}
    </>
  );
};

export default OrderModal;
