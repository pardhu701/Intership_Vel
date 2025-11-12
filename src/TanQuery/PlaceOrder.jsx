import React, { useState } from "react";
import { Button } from "antd";
import AddOrder from "./AddOrders";

const PlaceOrder = ({trigger,settrigger}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Order
      </Button>
      <AddOrder visible={isModalVisible} onCancel={handleCancel}  trigger={trigger} settrigger={settrigger}/>
    </div>
  );
};

export default PlaceOrder;
