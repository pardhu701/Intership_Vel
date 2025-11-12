// components/Payment.jsx
import React from "react";
import { Card, Button, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import AddOrder from "./OrderMutation";
import { useQueryClient ,useMutation} from "@tanstack/react-query";
import { addOrder } from "./addOrder";

const Payment = () => {
      const queryClient = useQueryClient()
  const { state: paymentInfo } = useLocation();
  const navigate = useNavigate();

    const addOrderMutation = useMutation({
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
  if (!paymentInfo) {
    return <Card>No payment details found.</Card>;
  }

 


  const options = ["Paid", "Shipped"];
const randomSelection = options[Math.floor(Math.random() * options.length)];

  const handlePayNow = () => {
   addOrderMutation.mutate({...paymentInfo,status:randomSelection})
  };
  const Cancel = () => {
   addOrderMutation.mutate({...paymentInfo,status:"Cancelled"})
  };

  return (
    <Card title="Payment Page" style={{ maxWidth: 500, margin: "2rem auto", textAlign: "center" }}>
      <p><strong>Amount Payable:</strong> ₹{paymentInfo.totalamount}</p>
      <Button type="primary" size="large" onClick={handlePayNow}>
        Pay Now
      </Button>
      <Button type="red" size="large" onClick={Cancel}>
        Cancell Order
      </Button>
    </Card>
  );
};

export default Payment;


// // components/PaymentModal.jsx
// import React from "react";
// import { Modal, Button } from "antd";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addOrder } from "./addOrder";

// const PaymentModal = ({ open, paymentInfo, onCancel }) => {
//   const queryClient = useQueryClient();

//   const addOrderMutation = useMutation({
//     mutationFn: addOrder,
//     onSuccess: (data) => {
//       queryClient.setQueryData(["orders"], (oldData) =>
//         oldData ? [...oldData, data] : [data]
//       );
//       onCancel();
//     },
//   });

//   if (!paymentInfo) return null;

//   const options = ["Paid", "Shipped"];
//   const randomSelection = options[Math.floor(Math.random() * options.length)];

//   const handlePayNow = () => {
//     addOrderMutation.mutate({ ...paymentInfo, status: randomSelection });
//   };

//   const handleCancelOrder = () => {
//     addOrderMutation.mutate({ ...paymentInfo, status: "Cancelled" });
//   };

//   return (
//     <Modal
//       open={open}
//       title="Payment"
//       onCancel={onCancel}
//       footer={null}
//       destroyOnClose
//       centered
//     >
//       <p style={{ fontSize: 16 }}>
//         <strong>Amount Payable:</strong> ₹{paymentInfo.totalamount}
//       </p>

//       <div style={{ textAlign: "center" }}>
//         <Button type="primary" onClick={handlePayNow} style={{ marginRight: 8 }}>
//           Pay Now
//         </Button>
//         <Button danger onClick={handleCancelOrder}>
//           Cancel Order
//         </Button>
//       </div>
//     </Modal>
//   );
// };

// export default PaymentModal;

