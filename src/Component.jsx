import React, {useState,createContext, useMemo} from "react";  
import Component1 from "./Component1";
import Component2 from "./Component2";

export const UseUser=createContext();

export default function Component(){



    const[user,setUser] = useState({name:"pardhu",age:"23"})

    const contextValue= useMemo(()=>({user,setUser}),[user])


    return(

        <>
        <h1>Component</h1>
        
          <UseUser.Provider value={contextValue}>
              < Component1  />
             

        </UseUser.Provider>

        <h2>!!!!!!!!!!!!!!!!!!!</h2>

        <UseUser.Provider value={contextValue}>
              
              <Component2 />

        </UseUser.Provider>
      

        <h1>{user.name}</h1>


      

        </>

    );

}