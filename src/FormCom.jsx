
import { Layout, Menu, Button, Form, Input, message } from 'antd';

import 'antd/dist/reset.css';

export default function FormCom() {

  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Form submitted successfully!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Form submission failed.');
  };


    return(

         <Form
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 8 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 8 }}>
            <Button children='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10'  type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

    )
    ;

}