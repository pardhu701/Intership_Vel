import { QueryClient, queryOptions } from '@tanstack/react-query'
import React from 'react'
import { BASE_URL } from './Api';




function UserOption(type) {
  
  return queryOptions({
    queryKey: ['users',type],
   
    queryFn: async () => {
           // await new Promise(res => setTimeout(res, 1000)); // Simulate delay
              // Get the single key of the object
     
            const response = await fetch(`${BASE_URL}/users/name?name=${type}`);
            if (!response.ok) throw new Error('Network response was not ok');
            

            return response.json();},
      enabled:type!=="Customer"
      //  staleTime: Infinity,
  // refetchInterval: (data, query) => {
  //   
  //   return query.isStale() ? 1000 : false; 
  // },
  // refetchOnMount: true,
  // refetchOnWindowFocus: true,
        

  },
  
  
  )
}
export default UserOption