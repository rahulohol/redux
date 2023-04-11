import {useState} from 'react'

function Count() {
  const [count,setCount]=useState(0)
  
  
  return (
    <div>
     <h1>Counter: {count}</h1>
     <button onClick={()=>setCount((prev)=>prev+1)}>+</button>
     <button onClick={()=>setCount((prev)=>prev-1)}>-</button>
    </div>
  );
}

export default Count;