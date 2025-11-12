import React from "react";
import { Menu } from "antd";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";

const Nav = () => {
  const [user, setUser] = React.useState({});
   const [isLoggedIn,setIsLoginIn] = React.useState(false);
  const userName = useSelector((state) => state.user.user);

 
  React.useEffect(() => {
    setUser(userName);
    setIsLoginIn(user.isLogged)
  }, [userName,user]);

  console.log(isLoggedIn+""+"////////")

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#001529", // Ant Design dark theme background
        padding: "0 20px",
      }}
    >
      {/* LEFT SIDE - Menu items */}
      <div>
        <Menu theme="dark" mode="horizontal">
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

      {/* RIGHT SIDE - Customer name + Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "white" }}>
        <span>
          {user.type === "admin" ? `${user.name} (Admin)` : user.name}
        </span>
        {isLoggedIn&&<LogoutButton />}
        
      </div>
    </div>
  );
};

export default Nav;
