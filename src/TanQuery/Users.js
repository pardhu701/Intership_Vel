import { QueryClient, queryOptions } from '@tanstack/react-query'
import React from 'react'


import axios from 'axios';
import { BASE_URL } from './Api';


function Users() {
  return queryOptions({
    queryKey: ['users'],

   
    queryFn: async () => {
        const { data } = await axios.get(`${BASE_URL}/users`);
            return data;
           },
        staleTime: Infinity,
        gcTime:Infinity,
        refetchOnWindowFocus:false
        
        

  },
  
  
  )
}
export default Users