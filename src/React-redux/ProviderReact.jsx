import React from 'react'
import {useSelector,useDispatch} from 'react-redux';

import { increment,decrement } from './useStore.js';


export default function ProviderReact(){
    const count = useSelector(state=>state.count)
    const dispatch =useDispatch();

    return(
   
   
            <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>

       
    )
    ;

}
