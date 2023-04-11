import {useRef,useEffect, useState} from "react";



// this is for the count example  in useRef

/* const Ref = () => {
  const count = useRef(40);

  //the component was not re render console here and after console line no 10 there will the increment will show 
  return (
    <>
      <h1>Count : {count.current}</h1>
      <button
        onClick={() => {
          (count.current += 1), console.log(count.current);
        }}
      >
        +
      </button>
    </>
  );
}; */


// now we see the element and component example in useRef

/* const Ref=()=>{

    const inputRef=useRef();
    useEffect(() => {
       inputRef.current.focus() ;
    }, []);
    return(<div>
        <input  ref={inputRef}/>
    </div>)
} */


//more example of useRef

const Ref=()=>{
    const [count,setCount]=useState(4);
    const temRef=useRef(0);
    
    useEffect(() => {
        temRef.current=count;
    }, [count]);
    console.log('increment data',count)
    console.log('previous data',temRef.current)
    
    return(<div>
       <h2>Current Count {count}</h2>
       <h2>Previous Count {temRef.current} </h2>
       <button onClick={()=>setCount((prev)=>prev+1)}>Add</button>
    </div>)
}

export default Ref