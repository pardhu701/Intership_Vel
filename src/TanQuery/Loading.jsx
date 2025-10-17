import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Spin />
    </div>
  );
};

export default Loading;