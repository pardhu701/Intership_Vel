import './App.css'
import { useState ,useEffect} from 'react';

export default function Hooke(){

    const[users,setUsers]=useState({})



    useEffect(
        ()=>{
            setTimeout(()=>{
                     fetch("https://official-joke-api.appspot.com/random_joke").then(res=>res.json()).then(data=>setUsers(data))
            },0)
           

        },[]

    );

    console.log(users);


    return (

        <>
   
  <div >
    <h2>{users.setup}</h2>
   
  </div>


        {/* <button onClick={()=>setCount(count+1)}>button</button> */}
        </>
        // <>
        // <h1>{name}</h1>
        // <input type="text" onChange={e=>setCount(e.target.value)}  />
        // <button onClick={()=>setName(count)}>button</button>
        // </>

    );

}