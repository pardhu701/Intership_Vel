// App.js
import React from 'react';
import { Layout, Menu, Button, Form, Input, message } from 'antd';
// Import Ant Design styles
import 'antd/dist/reset.css';
import { QRCode, Space } from 'antd';
import FormCom from './FormCom';

const { Header, Content, Footer } = Layout;

const Appp = () => {
 
 const[text,setText] = React.useState("https://www.youtube.com/watch?v=6Tjfi8gEMoI")
  return (
    <Layout>
      <Header>
        <Menu    theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">About</Menu.Item>
        </Menu>
      </Header>
      
      <Content style={{ padding: '70px' }}>
        <h1 style={{ padding: '0 0 0 50px' ,border:'' }}>         Welcome to Ant Design Example</h1>
        
        <FormCom />
       
      </Content>

       <Space direction="vertical" align="center">
      <QRCode value={text || '-'} />
      <Input placeholder="-" maxLength={60} value={text} onChange={e => setText(e.target.value)} />
    </Space>

      <Footer style={{ textAlign: 'center' }}>
        Ant Design Example ©2025
      </Footer>
    </Layout>
  );
};

export default Appp;
