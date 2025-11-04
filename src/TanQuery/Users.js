import { QueryClient, queryOptions } from '@tanstack/react-query'
import React from 'react'


import axios from 'axios';


function Users() {
  return queryOptions({
    queryKey: ['users'],

   
    queryFn: async () => {
        const { data } = await axios.get("http://localhost:8080/api/users");
            return data;
           },
        staleTime: Infinity,
        gcTime:Infinity,
        refetchOnWindowFocus:false
        
        

  },
  
  
  )
}
export default Users