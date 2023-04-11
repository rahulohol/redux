# Lecture [video](https://course.masaischool.com/lectures/37844)

# Class Notes Day-2-recap

- State Management ✅
- useState ✅
- useReducer ✅
- useRef ✅

# State Management

- state = `data`
- management = `access the data` & `store the data` & `modify/update the data `

# useState Hooks

```javascript
const data = useState(
  "you can give initial value as array,string,boolean,numbers"
);

const state = data[0];
const setState = data[0];

// now we can write this way 👇✅

const [state, setState] = useState(2);
```

- useState return two things first is variable's and second is function that allow to modify or update the data which you store in state

- For better under standing use this link all doubts will clear [links](https://drive.google.com/file/d/1LU8pW1sdHiUbfpxx8JIB8XCeAjIHkSh7/view)

# different between `useState` Vs `useReducer`

- there id the mane different is `useReducer` create less function according to `useState` and it is more efficient or easy to manage the code and debug.

```javascript
const [state, dispatch] = useReducer(
  "first params this content some logic in function form",
  "second params content the initial-stage value"
);
```

# Count.jsx (Page)

```javascript
import { useState } from "react";

function Count() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
    </div>
  );
}

export default Count;
```

# usReducer.jsx (Page)

```javascript
import React, { useReducer } from "react";

export default function UseReducer() {
  console.log(3 + 2);

  const [state, dispatch] = useReducer((state, action) => {
    if (action.type === "Add") {
      const incrementBy = action.count || 1;
      return state + incrementBy;
    } else if (action.type === "Subtract") {
      const decrementBy = action.count || 1;
      return state - decrementBy;
    }
  }, 20);

  return (
    <div>
      <h1>Count:{state}</h1>
      <button onClick={() => dispatch({ type: "Add", count: 2 })}>
        incBy2
      </button>
      <button onClick={() => dispatch({ type: "Add" })}>incBy1</button>
      <button onClick={() => dispatch({ type: "Subtract", count: 3 })}>
        subBy3
      </button>
      <button onClick={() => dispatch({ type: "Subtract" })}>subBy1</button>
    </div>
  );
}
```

# form.jsx (Page)

```javascript
import React, { useReducer } from "react";

const initialVal = {
  username: "",
  useremail: "",
};

const formReducerFn = (state, action) => {
  switch (action.type) {
    case "USER_NAME":
      return {
        ...state,
        username: action.payload,
      };

    case "USER_EMAIL":
      return {
        ...state,
        useremail: action.payload,
      };

    case "RESET":
      return initialVal;

    default:
      return state;
  }
};

function Form() {
  const [formData, dispatch] = useReducer(formReducerFn, initialVal);
  //   console.log(formData);
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch({ type: "RESET" });
  };

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={formSubmit}>
        <div>
          <lable>Username</lable>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              dispatch({ type: "USER_NAME", payload: e.target.value })
            }
          />
        </div>
        <div>
          <lable>Useremail</lable>
          <input
            type="email"
            value={formData.useremail}
            onChange={(e) =>
              dispatch({ type: "USER_EMAIL", payload: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
```



# useRef Hook
- This is also the state or data management same as useState and useReduce .
- This is will not render the data inside useRef  this will not 100% sure the data is store or not. 
- this is for eg when we want to go top of the page we click some arrow then they direct us to top , this functionality will come from useRef
- useRef is directly get the data from `JSX` TO `DOM`. 'To access the DOM element '

```javascript
const ref=useRef(data)
//👇
// {current:data} and this data can be primitive or non-primitive

// we can access the data -> ref.current
// modify -> ref.current ="new data".
```

# useRef code 


```javascript 
import {useRef,useEffect, useState} from "react";

// this is for the count example  in useRef

 const Ref = () => {
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
}; 


// now we see the element and component example in useRef

 const Ref=()=>{

    const inputRef=useRef();
    useEffect(() => {
       inputRef.current.focus() ;
    }, []);
    return(<div>
        <input  ref={inputRef}/>
    </div>)
} 


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

```