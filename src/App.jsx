
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css'
import New from './New';
import { Button, ConfigProvider, Space } from 'antd';
import 'antd/dist/reset.css';
import UserOrdersPage from './TanQuery/UserOrdersPage';
import { Outlet } from "react-router";
import Nav from './TanQuery/Nav';
import React from 'react';

// function App() {

// // const custom= {
// //         container: {
// //             backgroundColor: 'white',
// //             padding: '20px',
// //             borderRadius: '8px',
// //             boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
// //             maxWidth: '400px',
// //             margin: '0 auto',
// //         },
// //         name: {
// //             fontSize: '2rem',
// //             color: '#333',
// //             marginBottom: '10px',
// //         },
// //         description: {
// //             fontSize: '1.1rem',
// //             color: '#666',
// //             marginBottom: '15px',
// //         },
// //         link: {
// //             fontSize: '1rem',
// //             color: '#007bff',
// //             textDecoration: 'none',
// //         },
// //     };

// // const p=false;

// // if(p){
// //   return (
// //   <>
// //     <div>
// //       <New name="pardhu" dec="Unidirectional Data Flow" link='https://www.youtube.com/'  custom={custom} />
// //        <New   dec="Component Reusability" link='https://www.programiz.com/' custom={custom} />
// //         <New name ="krish"  dec="Encapsulation and Separation of Concerns" link='https://www.youtube.com/' custom={custom} />
// //     </div>
// //   </>
// // );

// // }

// // else{
// //   return(
// //     <>
// //     <New name="pardhu" dec="Unidirectional Data Flow" link='https://www.youtube.com/'  custom={custom} />
// //     </>
// //   )
// // }



// const personas = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     age: 28,
//     occupation: "Software Engineer",
//     interests: ["coding", "gaming", "reading books"],
//     location: "San Francisco, CA",
//     bio: "A passionate software engineer who loves solving complex problems and building innovative solutions.",
//   },
//   {
//     id: 2,
//     name: "Bob Smith",
//     age: 35,
//     occupation: "Product Manager",
//     interests: ["startups", "fitness", "traveling"],
//     location: "New York, NY",
//     bio: "Experienced product manager with a focus on developing customer-centric products and leading cross-functional teams.",
//   },
//   {
//     id: 3,
//     name: "Claire Lee",
//     age: 24,
//     occupation: "Graphic Designer",
//     interests: ["art", "photography", "fashion"],
//     location: "Los Angeles, CA",
//     bio: "Creative graphic designer with a passion for visual storytelling and minimalistic design.",
//   },
//   {
//     id: 4,
//     name: "David Brown",
//     age: 40,
//     occupation: "Marketing Director",
//     interests: ["branding", "sports", "cooking"],
//     location: "Chicago, IL",
//     bio: "Seasoned marketing professional with expertise in brand strategy and digital marketing.",
//   },
//   {
//     id: 5,
//     name: "Emma Wilson",
//     age: 30,
//     occupation: "Data Scientist",
//     interests: ["machine learning", "cryptocurrency", "hiking"],
//     location: "Austin, TX",
//     bio: "Data enthusiast who enjoys analyzing data to uncover patterns and make data-driven decisions.",
//   },
// ];

// const MapList=personas.filter(person=>person.age>30).map(word=><li 
// key={word.id} 
//   style={{
//         border: "1px solid #ccc",
//         padding: "10px",
//         marginBottom: "10px",
//         borderRadius: "5px",
//         fontSize: "16px",
//         color: "teal",
//         listStyleType: "none",
//       }}
// >{word.name}<br/>{word.occupation}<br/>{word.bio}<br/>{word.location}</li>)

// return (
//   <>
//   <ul>{MapList}</ul>

//   </>
// );

// }

// export default App


import { useQuery } from '@tanstack/react-query';
import Users from './TanQuery/Users';
import Order from './TanQuery/Orders';
import Orders from './TanQuery/Orders';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;


export default function App() {

  useQuery(Users());
  useQuery(Orders());

  return (

   
   
     
        <div  style={{
        // full viewport width
        height: '100vh',   // full viewport height
        backgroundColor: '#f0f2f5', // optional
      }}>
          <Nav />
          <Outlet />

        </div>
    
  
   


  );



}


