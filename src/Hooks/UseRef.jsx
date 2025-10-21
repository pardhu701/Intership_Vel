import React from 'react'

function UseRef() {
//     const inputRef = React.useRef(null);

//   const handleClick = () => {
//     inputRef.current.focus(); // Accessing the DOM node
//   };


    const[change,setChange]=React.useState(0);

    const timerRef = React.useRef(null);

function startCooking() {
  timerRef.current = setTimeout(() => {
    alert("Dish is ready!");
  }, 5000);
}

function cancelCooking() {
  clearTimeout(timerRef.current);
}


  return (
    <>
      {/* <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button> */}

       
       <h1>{change}</h1>
       <h1>{timerRef.current}</h1>
      <button onClick={()=>setChange(change+1)}>count</button>
      <button onClick={startCooking}>SC</button>
      <button onClick={cancelCooking}>CC</button>
    </>
  );
}

export default UseRef