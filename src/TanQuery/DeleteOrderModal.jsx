import React from "react";
import { Modal, Button } from "antd";

const DeleteOrderModal = ({ visible, onCancel, onConfirm, order }) => {
  return (
    <Modal
      title="🗑️ Confirm Delete"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" danger type="primary" onClick={onConfirm}>
          Delete
        </Button>,
      ]}
    >
      <p>
        Are you sure you want to delete order{" "}
        <b>{order?.idN || "this order"}</b>?
      </p>
    </Modal>
  );
};

export default DeleteOrderModal;
