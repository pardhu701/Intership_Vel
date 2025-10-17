import Store from "./store";
import { increment,decrement } from "./actions.js";
import React from "react";
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';

export default function Counter(){
    const[counter,setCounter]=React.useState(Store.getState().count)
    

    React.useEffect(
        ()=>{
            const unsub=Store.subscribe(
                ()=>{
                    setCounter(Store.getState().count);
                }
            )

            return ()=>{
                unsub();
            }
        },
        []
    )


     return (
        <>
       
        <h1>{counter}</h1>
      <button onClick={() => Store.dispatch(increment())}>+</button>
      <button onClick={() => Store.dispatch(decrement())}>-</button>
       <Button    onClick={() => Store.dispatch(increment())}  type="primary" shape="round" icon={<DownloadOutlined />} size={'middle'} />
   
        </>
     );
  
}