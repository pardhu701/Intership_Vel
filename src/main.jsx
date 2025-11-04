import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 //import './index.css'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

import App from './App.jsx'
import Grid from './AgGrid/Grid.jsx';
import Component from './Component.jsx'
import Hook from './Hook.jsx'
import Appp from './Appp.jsx'
import Common from './redux/Common.jsx'
import ProviderReact from './React-redux/ProviderReact.jsx'
import Reactapp from './React-redux/Reactapp.jsx'
import Hooke from './Hooke.jsx'
import Tan from './TanQuery/Tan.jsx'
import Users from './TanQuery/Users.jsx';
import Parent from './children/Parent.jsx';
import UseState from './Hooks/UseState.jsx';
import UseMemo from './Hooks/UseMemo.jsx';
import Fetching from './Fetching.jsx';
import UseRef from './Hooks/UseRef.jsx';
import Axios from './Week2/axios&fetch/Axios.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import UserOrdersPage from './TanQuery/UserOrdersPage.jsx';
import { BrowserRouter ,Routes,Route, createBrowserRouter, RouterProvider} from "react-router";
import OrderForm from './TanQuery/OrderForm.jsx';
import FormUser from './TanQuery/FormUser.jsx';
import SearchWithFetch from './SearchBar/SearchWithFetch.jsx';
import AppCheck from './Check/App.jsx';
import CachedCom from './Check/CachedCom.jsx';
import Com from './Check/Com.jsx';
import { Provider } from 'react-redux';
import { store1 } from './TanQuery/Store!.js';
import Payment from './TanQuery/Payment.jsx';
import Checkout from './TanQuery/Checkout.jsx';
import OrderForm1 from './TanQuery/OrderForm1.jsx';
import AllOrderPage from './TanQuery/AllOrderPage.jsx';
import ReportPage from './TanQuery/ReportPage.jsx';

 const queryClient = new QueryClient();

 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <UserOrdersPage /> },
      
        {path: "/userform", element: <FormUser /> },
        {path: "/payment", element: <Payment /> },
        {path: "/checkout", element: <Checkout /> },
        {path: "/orderForm1", element: <OrderForm1 /> },
        {path: "/allorderpage", element: <AllOrderPage /> },
          {path: "/report", element: <ReportPage /> },



    
    ],
  },
]);


const router1 = createBrowserRouter([
  {
    path: "/",
    element: <AppCheck />,
    children: [
      { path: "/", element: <Com /> },
      {path: "/cached", element: <CachedCom /> },
      

    
    ],
  },
]);


createRoot(document.getElementById('root')).render(
   // <StrictMode>
      
   // <Tan/>
   // </StrictMode>
   // <Component/>

    // <SearchWithFetch />

 
    <QueryClientProvider client={queryClient}>
      <Provider store={store1}>
        <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
      </Provider>
      
    </QueryClientProvider>

    // <StrictMode>
    //   <Grid/>
    // </StrictMode>



    
  //  <QueryClientProvider client={queryClient}>
      
      
  //       <RouterProvider router={router1} />
  //             {/* React Query Devtools */}
  //     <ReactQueryDevtools initialIsOpen={true} />
  //   </QueryClientProvider>
   
   

   
 
)
