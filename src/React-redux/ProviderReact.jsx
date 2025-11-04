import React from 'react'
import {useSelector,useDispatch} from 'react-redux';

import { increment,decrement } from './useStore.js';


export default function ProviderReact(){
    const count = useSelector(state=>state.count)
            const [isHovered, setIsHovered] = React.useState(false);
    
    
    const dispatch =useDispatch();

    const backgroundColor = count > 0 
    ? 'lightgreen'      // positive
    : count < 0 
      ? 'lightcoral'    // negative
      : 'lightgray';    // zero




  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const dynamicStyle = {
    backgroundColor: isHovered ? 'blue' : 'red', // Change color based on hover state
    padding: '20px',
    cursor: 'pointer',
  };

  return (
    <div style={{
      background: backgroundColor,
      padding: '20px',
      textAlign: 'center',
      borderRadius: '10px',
      width: '200px',
      margin: '20px auto'
    }}>
      <h1  >Count: {count}</h1>
      <button  style={dynamicStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}  onClick={() => dispatch({type:"INC"})}>+</button>
      <button style={dynamicStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}  onClick={() => dispatch(decrement())}>-</button>
    </div>

       
    )
    ;

}
