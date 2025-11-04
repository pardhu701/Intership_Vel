import { QueryClient, queryOptions } from '@tanstack/react-query'
import React from 'react'




function UserOption(type) {
  
  return queryOptions({
    queryKey: ['users',type],
    initialData:[
      {id:0,name:"loading...",age:0}
    ],
   
    queryFn: async () => {
           // await new Promise(res => setTimeout(res, 1000)); // Simulate delay
              // Get the single key of the object
     
            const response = await fetch(`http://localhost:8080/api/users/name?name=${type}`);
            if (!response.ok) throw new Error('Network response was not ok');
            

            return response.json();},
      enabled:type!=="default"
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