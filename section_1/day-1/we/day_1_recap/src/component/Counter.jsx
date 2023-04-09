import React, { useState ,useEffect} from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);


  //! perfect example of side-effect
/*   useEffect(() => {
    const id = setInterval(() => {
      console.log("Inside the setInterval",Date.now());
    }, 1000);
    //this will run when unmounting 👇
    return () => {
      clearInterval(id);
    };
  }, []); */





  console.log("1");

  useEffect(() => {
    console.log("2");

    return () => {
      //this will always run first before useEffect or 'side-effect code because first clear the prev code in useEffect then after this code useEffect will run ;
      console.log('5')
    };
  }, [count]);

  useEffect(() => {
    console.log("3");

    return () => {
      //this will always run first before useEffect or 'side-effect code because first clear the prev code in useEffect then after this code useEffect will run ;
    console.log('6')
    };
  }, [count]);

  console.log("4"); 

  return (
    <>
      <h1>Counter :{count}</h1>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Add
      </button>
    </>
  );
};

//***********************************************************

/* import React, { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {

    const id=setInterval(()=>{
      console.log("1",Date.now());

    },1000)
    return()=>{
      clearInterval(id)
    }
  }, [count]);

  return (
    <>
      <div>Counter :{count}</div>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Add
      </button>
    </>
  );
};
 */
