// OrderForm.jsx
import React from "react";
import { Form, Input, InputNumber, Button, Card, DatePicker, Select } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../Week2/axios&fetch/axiosInstance";

const orderAdd = async (newOrder) => {
  const response = await axiosInstance.post('http://localhost:5000/orders', newOrder);
  return response.data;
};

const OrderForm = (props) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: orderAdd,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      form.resetFields();
    },
  });

  const handleFinish = (values) => {
    // Convert date object to string if using DatePicker
    if (values.date) {
      values.date = values.date.format('YYYY-MM-DD');
    }

    


    mutation.mutate(values);
  };

  return (
      <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh', // Adjust as needed
    }}
  >
    <Card title="Order Form" style={{ width: 400 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          id: "",
          userId: "",
          category: "",
          transactionId: "",
          paymentMethod: "",
          amount: 0,
          date: null,
          status: "",
        }}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: "Please enter order ID" }]}
        >
          <Input  />
        </Form.Item>

        <Form.Item
          label="User ID"
          name="userId"
          rules={[{ required: true, message: "Please enter user ID" }]}
        >
          <Input placeholder={props.userId}/>
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please enter category" }]}
        >
          <Select>
  <Select.Option value="electronics">Electronics</Select.Option>
  <Select.Option value="clothing">Clothing</Select.Option>
  <Select.Option value="groceries">Groceries</Select.Option>
  <Select.Option value="beauty">Beauty & Personal Care</Select.Option>
  <Select.Option value="home">Home & Kitchen</Select.Option>
  <Select.Option value="sports">Sports & Outdoors</Select.Option>
</Select>
        </Form.Item>

        <Form.Item
          label="Transaction ID"
          name="transactionId"
          rules={[{ required: true, message: "Please enter transaction ID" }]}
        >
          <Input  />
        </Form.Item>

        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          rules={[{ required: true, message: "Please enter payment method" }]}
        >
          <Select>
            <Select.Option value="creditCard">Credit Card</Select.Option>
            <Select.Option value="paypal">PayPal</Select.Option>
            <Select.Option value="bankTransfer">Bank Transfer</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          
          rules={[{ required: true, message: "Please enter amount" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please enter status" , }]}
        >
          <Select>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
            <Select.Option value="failed">Failed</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card></div>
  );
};

export default OrderForm;
