import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  Descriptions,
  Space,
  message,
  Typography,
} from "antd";
import { useMutation } from "@tanstack/react-query";

import { addOrder } from "./addOrder"; // your API call
import { useSelector } from "react-redux";
import generateTransactionID from "./generateTransactionID";

const { Option } = Select;
const { Text } = Typography;

const categoryCosts = {
  Electronics: 1200,
  Clothing: 80,
  Groceries: 50,
  Toys: 40,
  Books: 25,
  Kitchen: 150,
  SportsKit: 200,
};

const AddOrder = ({ visible, onCancel,trigger,settrigger }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [orderDetails, setOrderDetails] = useState({});
  const user = useSelector((state) => state.user.user);
  const [form] = Form.useForm();

const [timeoutId, setTimeoutId] = useState(null);


  // ✅ React Query mutation
  const mutation = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      message.success("Order placed successfully!");
      onCancel();
        onCancel(); 
    form.resetFields();
    setOrderDetails({});
    setCurrentStep(0);
    settrigger();
      
      
    },
    onError: () => {
      message.error("Failed to place order.");
    },
  });

  // Step 0 submit
  const onFinish = (values) => {
    setOrderDetails(values);
    setCurrentStep(1);
  };

  // Step 1 → Go to confirmation page
const onFinishCheckout = () => {
  // Step 1 → Calculate order amount
  const orderAmount = categoryCosts[orderDetails.category] * orderDetails.itemscount;

  // Step 1 → Generate a short, unique order ID
  const crypto = window.crypto;
  const randomBytes = new Uint8Array(6);
  crypto.getRandomValues(randomBytes);
  let num = 0n;
  for (let b of randomBytes) {
    num = (num << 8n) + BigInt(b);
  }
  const shortString = "OID" + num.toString(36);

  // Step 2 → Update order details with initial status
  const updatedOrderDetails = {
    ...orderDetails,
    totalamount: orderAmount,
    transactionId: generateTransactionID(orderDetails.user_id),
    orderid: shortString,
    orderdate: new Date(),
    lastupdated: new Date(),
    name: user.name,
    status: "Pending",
  };

  setOrderDetails(updatedOrderDetails);
  setCurrentStep(2);

  // Step 3 → Automatically cancel the order if not confirmed in 1 minute
  const timer = setTimeout(() => {
    console.log("Order timeout triggered. Cancelling order...");

    mutation.mutate({
      ...updatedOrderDetails,
      status: "Pending",
    });

  
    message.info("Order timed out after 1 minute. Returning to start.");
  }, 10000); // 1 minute

  setTimeoutId(timer);
};

const handleConfirm = () => {
 clearTimeout(timeoutId);

  const options = ["Paid", "Shipped"];
  const randomStatus = options[Math.floor(Math.random() * options.length)];

  mutation.mutate({
    ...orderDetails,
    status: randomStatus,
  });

   
};

const handleCancelOrder = () => {
clearTimeout(timeoutId);

  mutation.mutate({
    ...orderDetails,
    status: "Cancelled",
  });

  
};



  const handlePrevious = () => setCurrentStep(currentStep - 1);

  const renderForm = () => {
    const orderAmount =
      categoryCosts[orderDetails.category] * orderDetails.itemscount;

    switch (currentStep) {
      case 0:
        return (
          <>
            <Form.Item
              label="User ID"
              name="user_id"
              initialValue={user.id}
              rules={[{ required: true, message: "Please input user ID!" }]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select category!" }]}
            >
              <Select placeholder="Select Category">
                {Object.keys(categoryCosts).map((cat) => (
                  <Option key={cat} value={cat}>
                    {cat}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Items Count"
              name="itemscount"
              rules={[{ required: true, message: "Please input item count!" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Payment Method"
              name="payementmethod"
              rules={[{ required: true, message: "Please select payment method!" }]}
            >
              <Select placeholder="Select payment method">
                <Option value="Cash On Delivery">Cash on Delivery</Option>
                <Option value="Online">Online</Option>
              </Select>
            </Form.Item>

            <Space style={{ marginTop: 20 }}>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Space>
          </>
        );

      case 1:
        return (
          <>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="User ID">
                {orderDetails.user_id}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                {orderDetails.category}
              </Descriptions.Item>
              <Descriptions.Item label="Items Count">
                {orderDetails.itemscount}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Method">
                {orderDetails.payementmethod}
              </Descriptions.Item>
              <Descriptions.Item label="Order Amount">
                ₹{orderAmount}
              </Descriptions.Item>
            </Descriptions>

            <Space style={{ marginTop: 20 }}>
              <Button onClick={handlePrevious}>Previous</Button>
              <Button type="primary" onClick={onFinishCheckout}>
                Proceed to Confirmation
              </Button>
            </Space>
          </>
        );

      case 2:
        return (
          <div style={{ textAlign: "center" }}>
            <Text strong style={{ fontSize: 16 }}>
              Are you sure you want to place this order?
            </Text>
            <p>
              Once confirmed, order will be processed and status will be set
              automatically.
            </p>

            <Space style={{ marginTop: 20 }}>
              <Button onClick={handlePrevious}>Back</Button>
              <Button danger onClick={handleCancelOrder}>
                Cancel Order
              </Button>
              <Button
                type="primary"
                onClick={handleConfirm}
                loading={mutation.isPending}
              >
                {mutation.isPending ? "Placing Order..." : "Confirm Order"}
              </Button>
            </Space>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      open={visible}
      title="Add Order"
      onCancel={onCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {renderForm()}
      </Form>
    </Modal>
  );
};

export default AddOrder;
