import React ,{useContext} from "react";
import { UseUser } from "./Component";


export default function Component2(){

    const {user,setUser}= useContext(UseUser);

return(
    <>
    <h1>Componet2</h1>
    <h1>{user.name}</h1>
    </>
);

}