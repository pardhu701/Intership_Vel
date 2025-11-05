
import { QueryClient, queryOptions } from '@tanstack/react-query'
import React from 'react'


import axios from 'axios';
import { BASE_URL } from './Api';


function Orders() {
  return queryOptions({
    queryKey: ['orders'],

   
    queryFn: async () => {
        const { data } = await axios.get(`${BASE_URL}/orders`);
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