
import { QueryClient, queryOptions } from '@tanstack/react-query'
import React from 'react'


import axios from 'axios';


function Orders() {
  return queryOptions({
    queryKey: ['orders'],

   
    queryFn: async () => {
        const { data } = await axios.get("http://localhost:8080/api/orders");
            return data;
           },
        staleTime: Infinity,
        gcTime:Infinity,
        refetchOnWindowFocus:false,
        refetchIntervalInBackground:true
        
        

  },
  
  
  )
}
export default Orders