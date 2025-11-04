import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PlusButton = ({  text = 'Place Order', type = 'primary', shape = 'default', ...rest  }) => {
      const navigate = useNavigate()
    const userId=useSelector(state=>state.user.user.id)

      const handleAddClick = () => {
       
    // You can pass state if needed
    console.log("hello")
    console.log(userId)
    navigate('/orderForm1', { state: userId });
  };
  return (
    <Button
      type={type}
      shape={shape}
      icon={<PlusOutlined />} // Plus icon
      onClick={handleAddClick}
      {...rest} // Pass other props like style, className, etc.
    >
        
      {shape === 'circle' ? null : text} {/* Show text unless circular */}
    </Button>
  );
};

export default PlusButton;
