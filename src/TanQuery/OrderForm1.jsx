// components/OrderForm.jsx
import React from "react";
import { Form, Input, Select, Button, Card, Space,InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate,useLocation } from "react-router-dom";

const { Option } = Select;



const OrderForm1 = () => {
  const [form] = Form.useForm();
  const location=useLocation();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const orderDetails = { ...values, userid: location.state };
    console.log(orderDetails)
    navigate("/checkout", { state: orderDetails });
  };

  return (
    <Card title="Create Order" style={{ maxWidth: 600, margin: "2rem auto" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* User ID */}
        <Form.Item label="User ID">
          <Input value={location.state} disabled />
        </Form.Item>

      <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please enter category" }]}
                
              >
                <Select placeholder="Select Category">
        <Select.Option value="Electronics">Electronics</Select.Option>
        <Select.Option value="Clothing">Clothing</Select.Option>
        <Select.Option value="Groceries">Groceries</Select.Option>
        <Select.Option value="Toys">Toys</Select.Option>
        <Select.Option value="Books">Books</Select.Option>

        <Select.Option value="Kitchen">Kitchen</Select.Option>
        <Select.Option value="SportsKit">SportsKit</Select.Option>
      </Select>
              </Form.Item>

          <Form.Item
            label="Items Count"
            name="itemscount"
            rules={[{ required: true, message: "Items Required" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
    


        {/* Payment and Location */}
        <Form.Item
          name="payementmethod"
          label="Payment Method"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select payment method">
            <Option value="Cash On Delivary">Cash on Delivery</Option>
            <Option value="Online">Online</Option>
          </Select>
        </Form.Item>

    

        <Button type="primary" htmlType="submit" block>
          Proceed to Checkout
        </Button>
      </Form>
    </Card>
  );
};

export default OrderForm1;



    //  {/* Dynamic List of Items */}
    //     {/* <Form.List
    //       name="items"
    //       rules={[
    //         {
    //           validator: async (_, items) => {
    //             if (!items || items.length < 1) {
    //               return Promise.reject(
    //                 new Error("Please add at least one item!")
    //               );
    //             }
    //           },
    //         },
    //       ]}
    //     >
    //       {(fields, { add, remove }) => (
    //         <>
    //           {fields.map(({ key, name, ...restField }) => (
    //             <Space
    //               key={key}
    //               style={{
    //                 display: "flex",
    //                 marginBottom: 8,
    //                 alignItems: "baseline",
    //               }}
    //               align="baseline"
    //             >
    //               <Form.Item
    //                 {...restField}
    //                 name={[name, "category"]}
    //                 label="Category"
    //                 rules={[{ required: true, message: "Select category!" }]}
    //               >
    //                 <Select placeholder="Select category" style={{ width: 160 }}>
    //                   <Option value="Electronics">Electronics</Option>
    //                   <Option value="Groceries">Groceries</Option>
    //                   <Option value="Clothing">Clothing</Option>
    //                 </Select>
    //               </Form.Item>

    //               <Form.Item
    //                 {...restField}
    //                 name={[name, "itemName"]}
    //                 label="Item Name"
    //                 rules={[{ required: true, message: "Enter item name!" }]}
    //               >
    //                 <Input placeholder="Enter item name" />
    //               </Form.Item>

    //               <Form.Item
    //                 {...restField}
    //                 name={[name, "quantity"]}
    //                 label="Qty"
    //                 rules={[{ required: true, message: "Enter qty!" }]}
    //               >
    //                 <Input type="number" min={1} style={{ width: 80 }} />
    //               </Form.Item>

    //               <MinusCircleOutlined
    //                 onClick={() => remove(name)}
    //                 style={{ color: "red", marginTop: 30 }}
    //               />
    //             </Space>
    //           ))}

    //           <Form.Item>
    //             <Button
    //               type="dashed"
    //               onClick={() => add()}
    //               block
    //               icon={<PlusOutlined />}
    //             >
    //               Add Item
    //             </Button>
    //           </Form.Item>
    //         </>
    //       )}
    //     </Form.List> */}