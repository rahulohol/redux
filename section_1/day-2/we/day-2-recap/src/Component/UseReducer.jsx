import React, { useReducer } from 'react'

export default function UseReducer() {

console.log(3+2)

const [state,dispatch]=useReducer((state,action)=>{
    if(action.type==="Add"){
      const incrementBy=action.count||1;
        return state+incrementBy;
    }
    else if(action.type==="Subtract"){
      const decrementBy=action.count||1;
        return state-decrementBy;
    }
},20);



  return (
    <div>
    <h1>Count:{state}</h1>
    <button onClick={()=>dispatch({type:"Add",count:2})}>incBy2</button>
    <button onClick={()=>dispatch({type:"Add"})}>incBy1</button>
    <button onClick={()=>dispatch({type:"Subtract",count:3})}>subBy3</button>
    <button onClick={()=>dispatch({type:"Subtract"})}>subBy1</button>

    </div>
  )
}
