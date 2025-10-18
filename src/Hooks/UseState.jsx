import React, { useState } from "react";


function reducer(state,action){
    switch(action.mode){
        case 'Inc':
            return {...state,count:state.count+1}
        case 'Dec':
            return {...state,count:state.count-1}
        case 'Res':
            return {...state,count:0}
    }

}


export default function UseState(){
    // const[count,setCount] =useState(0);
    const[state,dispatch]= React.useReducer(reducer,{count:0})

    console.log("hello");
    // React.useEffect(
    //     // ()=>setCount(count+1) ,[count]
    //    ()=> console.log("Use Effect") ,[]
    // )

    return(
       <>
        <h1>{state.count}</h1>
        {/* <button 
        style={{background:"blue",color:'white'}} 
        onClick={()=>setCount(count+1)}
        >Button</button> */}
         <button 
        style={{background:"blue",color:'white', margin: '10px' }} 
        onClick={()=>dispatch({mode:'Inc'})}
        >Button +</button>
        <br/>
         <button 
        style={{background:"blue",color:'white', margin: '10px'}} 
        onClick={()=>dispatch({mode:'Dec'})}
        >Button -</button>
        <br/>
         <button 
        style={{background:"blue",color:'white', margin: '10px'}} 
        onClick={()=>dispatch({mode:'Res'})}
        >Button 0</button>
       </>
       
    );
}

