import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router";
import { useSelector } from "react-redux";


const Nav = () => {
//   const location = useLocation();

//   const selectedKey = () => {
//     switch (location.pathname) {
//       case "/user":
//         return "user";
//       case "/order":
//         return "order";
//       case "/user-orders":
//         return "userOrders";
//       default:
//         return "";
//     }
//   };

const[user,setUser]= React.useState("Customer")
const userName=useSelector(state=>state.user.user.name)

React.useEffect(()=>{
  
  setUser(userName)
},[userName])





 
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#001529', // Ant Design dark theme background
        padding: '0 20px',
      }}
    >
      {/* LEFT SIDE - Menu items */}
      <div>
        <Menu theme="dark" mode="horizontal" >
          <Menu.Item key="user">
            <Link to="/userform">User Form</Link>
          </Menu.Item>

          <Menu.Item key="userOrders">
            <Link to="/">User Orders</Link>
          </Menu.Item>
            <Menu.Item key="allOrders">
            <Link to="/allorderpage">ALL Orders</Link>
          </Menu.Item>

           <Menu.Item key="report">
            <Link to="/report">Orders Report</Link>
          </Menu.Item>
          
        </Menu>
      </div>

      {/* RIGHT SIDE - Customer name */}
      <div style={{ color: 'white', fontWeight: '500' }}>
        {user}
      </div>
    </div>
  );
};

export default Nav;