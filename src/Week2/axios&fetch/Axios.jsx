import React from 'react'
import axios from 'axios';
import axiosInstance from './axiosInstance';
function Axios() {

      const[user,setUser]=React.useState({})
         const[user1,setUser1]=React.useState({})

      React.useEffect(()=>{
         axiosInstance.get('items/1').then(res=>{
          setUser(res)
         })
         fetch('http://localhost:4000/items/1').then(res=>res.json()).then(user=>{
          setUser1(user)
         })

      },[]
       
      )

   

      

    // const[person,setPerson] = React.useState({});

//     React.useEffect(()=>{
//         axios.get('https://jsonplaceholder.typicode.com/users/1').then(res=>
//         {console.log(res.data)}
//         )

// //         axios.get('https://jsonplaceholder.typicode.com/posts/1')
// //   .then(response => {
// //     console.log(response.data);  // The response data
// //   })
// //   .catch(error => {
// //     console.error('Error fetching data:', error);
// //   });
// //         async function fetchPost() {
// //   try {
// //     const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
// //     console.log(response.data);
// //   } catch (error) {
// //     console.error('Error:', error);
// //   }
// // }

// // fetchPost();

//     },
    
//     )

  return (
    <>
    <div>{JSON.stringify(user)}</div>
    <h1>??????????????????????????????</h1>
    <div>{JSON.stringify(user1)}</div>
    </>
  )
}

export default Axios