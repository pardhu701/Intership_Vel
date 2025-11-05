// UserForm.jsx
import React from "react";
import { Form, Input, InputNumber, Button, Card,Select } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "../Week2/axios&fetch/axiosInstance";
import { Link } from "react-router";
import UserOrdersPage from "./UserOrdersPage";

import LoadingPage from "./LoadingPage";
import { BASE_URL } from "./Api";

//import { useQueryClient } from "@tanstack/react-query";





const useradd = async (newadd) => {

  const response = await axiosInstance.post(`http://localhost:8080/api/users`, newadd);
  return response.data;
};

const FormUser = () => {

  const queryClient = useQueryClient();
  const [form] = Form.useForm();
    const type = Form.useWatch("type", form);



  const mutation = useMutation({
    mutationFn: useradd,
    onSuccess: (data) => {
      console.log(data)
      queryClient.setQueryData(['users'], (oldData) => {
  return oldData
    ? [...oldData, data] // Add the new user
    : [data];            // If no previous data
});
      // Invalidate and refetch todos after adding a new one
      // queryClient.invalidateQueries(['users']);
      form.resetFields();
      //navigate('/'); 

    },

  });

  
  React.useEffect(() => {
    if (mutation.isSuccess) {
      // reset after 5 seconds
      const timer = setTimeout(() => {
        mutation.reset(); // resets mutation state (isSuccess → false)
      }, 2500);

      // cleanup in case the component unmounts early
      return () => clearTimeout(timer);
    }
  }, [mutation.isSuccess]);

  const handleFinish = (values) => {
    const crypto = window.crypto;

    const randomBytes = new Uint8Array(6);
    crypto.getRandomValues(randomBytes);

    // Convert to a single big number and then to base36
    let num = 0n;
    for (let b of randomBytes) {
      num = (num << 8n) + BigInt(b);
    }

    const shortString = 'PS' + num.toString(36);

    const value = { ...values, userid: shortString }
  
    mutation.mutate(value)


  };

    const validateAdminCode = async (_, value) => {
  const cachedData = queryClient.getQueryData(["users"]);

  if (!cachedData) {
    return Promise.reject("Admin codes not loaded yet. Try again.");
  }

  // Find the admin user explicitly
  const isValid = cachedData.some(user=>String(user.createadminpass) === String(value));


;

  if (!isValid) {
    return Promise.reject("Invalid admin pass code");
  }

  return Promise.resolve();
};


  if(mutation.isSuccess){
   
    return <LoadingPage/>
  }

  return (

    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Adjust as needed
      }}
    >
      <Card title="User Form" style={{ width: 400, }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ id: "", name: "", age: "" }}
        >


          <Form.Item
            label="Name"
            name="name"
            validateTrigger="onSubmit" // Only validate on submit
            rules={[
              { required: true, message: 'Please enter name' }, // separate rule for required
              {
                validator: (_, value) => {
                  if (!value || value.length >= 6) {
                    const users = queryClient.getQueryData(["users"]);
                    if (users.find(user => user.name.toLowerCase() === value.toLowerCase())) return Promise.reject(new Error('Alread Exist Name'));

                    return Promise.resolve() // ✅ pass
                  }
                  return Promise.reject(new Error('Must be at least 6 characters'));
                },
              },
            ]}
          >
            <Input placeholder="Enter Full Name" />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please enter age" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }}  placeholder="Enter Age" />
          </Form.Item>

            <Form.Item
          name="type"
          label="Account Type"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select payment method">
            <Option value="admin">Admin</Option>
            <Option value="individual">Individual</Option>
          </Select>
        </Form.Item>

         {type === "admin" && (
        <Form.Item
          name="adminpasscode"
          label="Admin Pass Code"
          rules={[{ required: true, message: "Please enter admin pass code" },{validator:  validateAdminCode}]}
          
        >
          <Input placeholder="Enter admin  pass code" />
        </Form.Item>
      )}

         {type === "admin" && (
        <Form.Item
          name="createadminpass"
          label="Create Pass"
          rules={[{ required: true, message: "Create Your Own Pass code"  }]}
        >
          <Input placeholder="Create Your Own Pass code" />
        </Form.Item>
      )}

          <Form.Item>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default FormUser;
