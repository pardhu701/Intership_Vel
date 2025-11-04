// App.jsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Com from "./Com";
import CachedCom from "./CachedCom";
import { createBrowserRouter, Outlet } from "react-router";






function AppCheck() {
  return (
  <Outlet/>
  );
}

export default AppCheck;
