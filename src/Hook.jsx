import './App.css'
import { useState ,useEffect} from 'react';

export default function Hook(){

    const[name,setName]=useState(0);
    const[count,setCount]=useState(0);

    useEffect(
        ()=>{
           setTimeout(() => {
            setCount(prev=>{
                const i=prev+1
                 setName(i)
                 return i

            })
           
            
           }, 1000);        }
    )



    return (

        <>
        <h1>
           Count ------ {count}
        </h1>
        <h1>
           Name ------ {name}
        </h1>
        {/* <button onClick={()=>setCount(count+1)}>button</button> */}
        </>
        // <>
        // <h1>{name}</h1>
        // <input type="text" onChange={e=>setCount(e.target.value)}  />
        // <button onClick={()=>setName(count)}>button</button>
        // </>

    );

}