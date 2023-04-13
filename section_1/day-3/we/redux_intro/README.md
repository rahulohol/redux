# Class Notes [REDUX INTRO]

# PPT OF NOTES  [notes_ppt](https://docs.google.com/presentation/d/1OBpJoHfnh_qz1leXulKXvd0qlkGwhO2htHuUPg7yzjM/edit?usp=sharing)

 ### What is Redux ?

 - A predictable and global state container/state ,management library for JavaScript application ,that follows flux pattern   image refer in ppt notes.

 Since ,Redux isn't related to 
 react itself , it can be used  with plain JS and direct DOM update ,as well as with other Front-End  or Backend frameworks like Angular JS ,VueJs , etc.

 ### Why should we redux ?

 - Central State Management 
 - Debugging 
 - Performance Optimization 
 - Separation of Concerns (Cleaner Code )
 - Resolve Scaling Complexity

 ## Redux Flow 
 - watch in ppt over there.

 ## When should we  use Redux
 - watch in ppt over there.


# Code Part Start

1. Install `redux` library , using `npm install redux`
2. Create the folder structure.
  - Redux folder 
  - action.js
  - store .js
  - reduce.js
3. Create the store.js file contents.
4. Create the reducer.js file contents.`

# how to write redux code.

1. store.js page [step-1]

```javascript 

import { legacy_createStore } from "redux";
import { reducer } from "./reducer";

const store = legacy_createStore(reducer, { count: 10 });

export { store };

```


2. reducer.js page [step-2]

```javascript

const reducer = (oldState, action) => {
  switch (action.type) {
    case 'Add':
        return{...oldState, count:oldState.count+1}
    case 'Reduce':
        return{...oldState, count:oldState.count-1}
    default:
      return oldState;
  }
};
export { reducer };


```

3. App.js page [step-3]

```javascript 

import "./App.css";
import { store } from "./Redux/store";
import { useState } from "react";
import { handleAddCount, handleReduceCount } from "./Redux/action";

function App() {
  const { dispatch, subscribe } = store;
  const { count } = store.getState();
  //this id for hack we never use this type of code bcz this is not a good practice we will create the state for update the data from UI.
  const [update, setUpdate] = useState(0);

  subscribe(() => {
    //tell react here to re-render the component ,because  this function will only trigger if the state inside redux store has change.
    //1. if the state of the component has changed.
    //2. If the props of the component has change.

    // setUpdate is being used just to tell react  to re-render component.
    // this is just a trigger  function to re-render the component.
    setUpdate((prev) => prev + 1);
  });
  console.log(count);

  return (
    <div className="App">
      <h1>Count :{count}</h1>
      <button onClick={() => dispatch(handleAddCount(1))}>Add</button>
      <button onClick={() => dispatch(handleReduceCount(2))}>Reduce</button>
    </div>
  );
}

export default App;


```








4. action.js page [step-4]

```javascript

const handleAddCount = (payload) => {
  return {
    type: "Add",
    payload,
  };
};

const handleReduceCount=(payload)=>{
    return{
        type:"Reduce",payload
    }
}


export  {handleAddCount,handleReduceCount}

```