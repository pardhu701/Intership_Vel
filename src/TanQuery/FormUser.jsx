import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Card, Select, message, Radio } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../Week2/axios&fetch/axiosInstance";
import LoadingPage from "./LoadingPage";
import { BASE_URL } from "./Api";
import { setUserC } from "./UseSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { setIsVerified, setPinInput, setShowPinPrompt } from "./authSlice";



const { Option } = Select;

// ---- Register User API ----
const useradd = async (newadd) => {
  const response = await axiosInstance.post(`http://localhost:8080/api/users`, newadd);
  return response.data;
};

// ---- Login API ----

const LoginForm = ({ onSwitchToRegister }) => {
  const nav = useNavigate()
  const dispatch = useDispatch();
  const [loginForm] = Form.useForm();
  const queryClient = useQueryClient();
  const [loginType, setLoginType] = useState("admin"); // "admin" or "user"

  const handleLogin = (values) => {

    const cachedUsers = queryClient.getQueryData(["users"]);
    console.log(cachedUsers)

    if (!cachedUsers) {
      message.error("No user data found in cache. Please fetch users first.");
      return;
    }

    let matchedUser = null;

    if (loginType === "admin") {
      matchedUser = cachedUsers.find(
        (user) => {
          return user.name.toLowerCase() === values.name.toLowerCase() &&
            Number(user.createadminpass) === Number(values.adminpasscode) &&
            user.type === "admin"
        }
      );
    } else {
      // Normal user login — only check name
      matchedUser = cachedUsers.find(
        (user) => {
          console.log(user.name.toLowerCase() === values.name.toLowerCase())
          return user.name.toLowerCase() === values.name.toLowerCase()
        }
      );
    }
    console.log(matchedUser)

    if (matchedUser) {
      console.log(matchedUser)
      dispatch(
        setUserC({
          id: matchedUser.id ?? 0,
          name: matchedUser.name ?? "Customer",
          age: matchedUser.age ?? 0,
          type: matchedUser.type ?? "individual",
          adminpasscode: matchedUser.adminpasscode ?? 0,
          createadminpass: matchedUser.createadminpass ?? 0,
          isLogged: true
        })
      );
      dispatch(setPinInput(""));
      dispatch(setIsVerified(false));
      dispatch(setShowPinPrompt(false));
      message.success(`Welcome back, ${matchedUser.name}!`);
      nav('/allorderpage')
      
      

    } else {
  message.error(
    loginType === "admin"
      ? "Invalid admin name or passcode"
      : "User not found"
  );
}
  };

return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <Card title="Login" style={{ width: 400 }}>
      {/* TOGGLE LOGIN TYPE */}
      <div style={{ marginBottom: 20, textAlign: "center" }}>
        <Radio.Group
          value={loginType}
          onChange={(e) => {
            setLoginType(e.target.value);
            loginForm.resetFields();
          }}
        >
          <Radio.Button value="admin">Admin Login</Radio.Button>
          <Radio.Button value="user">User Login</Radio.Button>
        </Radio.Group>
      </div>

      {/* LOGIN FORM */}
      <Form
        form={loginForm}
        onFinish={handleLogin}
        layout="vertical"
        autoComplete="off"
      >
        {/* NAME FIELD (common for both types) */}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter your name" },
            {
              pattern: /^[A-Za-z\s]+$/,
              message: "Name should contain only letters and spaces",
            },
          ]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        {/* PASSCODE FIELD (only for admin login) */}
        {loginType === "admin" && (
          <Form.Item
            label="Admin Passcode"
            name="adminpasscode"
            rules={[
              { required: true, message: "Please enter your admin passcode" },
              {
                pattern: /^\d{6}$/,
                message: "Passcode must be exactly 6 digits",
              },
            ]}
          >
            <Input.Password placeholder="Enter 6-digit passcode" maxLength={6} />
          </Form.Item>
        )}

        {/* LOGIN BUTTON */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {loginType === "admin" ? "Login as Admin" : "Login as User"}
          </Button>
        </Form.Item>

        {/* SWITCH TO REGISTER */}
        <Form.Item>
          <Button type="link" onClick={onSwitchToRegister} block>
            Don’t have an account? Register here
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </div>
);
};


// ---- REGISTER FORM ----
const UserForm = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const type = Form.useWatch("type", form);
  const [isLogin, setIsLogin] = useState(false); // Toggle state

  const mutation = useMutation({
    mutationFn: useradd,
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], (oldData) => (oldData ? [...oldData, data] : [data]));
      message.success("User registered successfully!");
      form.resetFields();
    },
  });

  const handleFinish = (values) => {
    const randomBytes = new Uint8Array(6);
    window.crypto.getRandomValues(randomBytes);
    let num = 0n;
    for (let b of randomBytes) num = (num << 8n) + BigInt(b);
    const shortString = "PS" + num.toString(36);
    const newUser = { ...values, userid: shortString };
    mutation.mutate(newUser);
  };

  const validateAdminCode = async (_, value) => {
    const cachedData = queryClient.getQueryData(["users"]);
    if (!cachedData) return Promise.reject("Admin codes not loaded yet. Try again.");
    const isValid = cachedData.some((user) => String(user.createadminpass) === String(value));
    if (!isValid) return Promise.reject("Invalid admin pass code");
    return Promise.resolve();
  };

  if (mutation.isSuccess) return <LoadingPage />;

  // If "Login" selected → show LoginForm
  if (isLogin) return <LoginForm onSwitchToRegister={() => setIsLogin(false)} />;

  // Otherwise → show Registration Form
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card title="Register User" style={{ width: 400 }}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter name" },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  if (value.length < 6 || value.length > 32)
                    return Promise.reject("Name must be between 6 and 32 characters");
                  if (!/^[A-Za-z]+$/.test(value))
                    return Promise.reject("Only alphabets are allowed");
                  const users = queryClient.getQueryData(["users"]) || [];
                  if (users.find((u) => u.name.toLowerCase() === value.toLowerCase()))
                    return Promise.reject("Name already exists");
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="Enter Full Name" />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[
              { required: true, message: "Please enter age" },
              {
                validator: (_, value) => {
                  if (value < 18) return Promise.reject("Age must be 18 or above");
                  if (value > 100) return Promise.reject("Age cannot exceed 100");
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter Age" />
          </Form.Item>

          <Form.Item name="type" label="Account Type" rules={[{ required: true }]}>
            <Select placeholder="Select account type">
              <Option value="admin">Admin</Option>
              <Option value="individual">Individual</Option>
            </Select>
          </Form.Item>

          {type === "admin" && (
            <Form.Item
              name="adminpasscode"
              label="Admin Pass Code"
              rules={[
                { required: true, message: "Please enter admin pass code" },
                { validator: validateAdminCode },
              ]}
            >
              <Input placeholder="Enter admin pass code" />
            </Form.Item>
          )}

          {type === "admin" && (
            <Form.Item
              name="createadminpass"
              label="Create Pass"
              rules={[
                { required: true, message: "Create your own passcode" },
                {
                  validator: (_, value) => {
                    if (value && (value.length < 6 || value.length > 10))
                      return Promise.reject("Passcode must be 6–10 characters long");
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Create Your Own Pass code" maxLength={10} />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" onClick={() => setIsLogin(true)} block>
              Already have an account? Login here
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserForm;
