import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";

const EditOrderModal = ({ visible, onCancel, onSave, order }) => {
  const [form] = Form.useForm();
  const [editedOrder, setEditedOrder] = useState(order);

  useEffect(() => {
    form.setFieldsValue(order);
  }, [order]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave({ ...order, ...values });
    });
  };

  return (
    <Modal
      title="✏️ Edit Order"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save Changes
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Category" name="category">
          <Select
            options={[
              { value: "Electronics" },
              { value: "Clothing" },
              { value: "Groceries" },
              { value: "Toys" },
              { value: "Books" },
              { value: "Kitchen" },
              { value: "SportsKit" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Item Count" name="itemscount">
          <Input type="number" />
        </Form.Item>



        <Form.Item label="Status" name="status">
          <Select
            options={[
              { value: "Pending" },
              { value: "Shipped" },
              { value: "Paid" },
              { value: "Cancelled" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditOrderModal;
