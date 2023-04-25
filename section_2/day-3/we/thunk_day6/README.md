# Class Notes [video](https://course.masaischool.com/lectures/38479)

## Pre Class [video](https://course.masaischool.com/lectures/38458)

1. Install all the dependencies for our react-app.
- axios,json-server,redux,react-redux
2. To create the folder structure
    - Redux
        - action.js
        - action.js 
        - reducer.js
        - store.js 
    - Pages
        - Home.jsx
    - Components
        - Todo.jsx
        - TodosInput.jsx
3. we have to rape with provide and pass store in it  in index.js

4. start the json-server

# change in code prev todo and this is more organized || optimized code 
5. we have done the getTask function prev we create in `Todo.jsx` now we shift in the ``Action.js  file so we can re use many time but we face some error import axios and put `dispatch`  in every getTask function where we assign in code / we can assign `useDispatch` hook which we get from redux we have to give as prop in every page .

6. what we did we change this 
```javascript 

getTask(dispatch)  --->  dispatch(getTask)

// but here we get error  if this   
error ->  `Uncaught Error: Actions must be plain objects. Instead, the actual type was: 'function'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions.`

// so we have to handle this we have yo take midleware in store.js 

```



# Codes 

### folder `Redux` -> Store.js

- In this we have figure-out the concept of thunk with scratch knowledge how thin work on side lin 52 to 55 have the logic base on how thunk work inside basically if we have getting function instead of object we can go to `middleware` and `thunk` we can handle the error.

``` javascript 

//! first step to code in this page 


import  {legacy_createStore,applyMiddleware} from 'redux';
import { reducer } from './Reducer';
import thunk from 'redux-thunk'

//! this is the logic what thunk do inside 👇
// next stand for dispatch 
// action stand for  object we assign that in action.js 
// but here  we have getting  function in action so we have to handle this error we have to give some logic in it .

/* const customMiddleware=(store)=>(next)=>(action)=>{

    if(typeof action === 'function'){
      return  action(store.dispatch)
    }
    return next(action)


}


const store=legacy_createStore(reducer,applyMiddleware(customMiddleware)); */



//? this is thunk code 
const store=legacy_createStore(reducer,applyMiddleware(thunk));

export {store}


```


### folder `Redux` -> ActionType.js

``` javascript 


//! second step to code in this page 

export const GET_TODOS_REQUEST="GET_TODOS_REQUEST"
export const GET_TODOS_SUCCESS="GET_TODOS_SUCCESS"
export const GET_TODOS_FAILURE="GET_TODOS_FAILURE"


export const ADD_TODOS_REQUEST="ADD_TODOS_REQUEST"
export const ADD_TODOS_SUCCESS="ADD_TODOS_SUCCESS"
export const ADD_TODOS_FAILURE="ADD_TODOS_FAILURE"

```

### folder `Redux` -> Action.js

``` javascript 

//! third step to code in this page
import * as types from "./ActionType";
import axios from "axios";

const getTaskRequest = () => {
  return {
    type: types.GET_TODOS_REQUEST,
  };
};
const getTaskSuccess = (payload) => {
  return {
    type: types.GET_TODOS_SUCCESS,
    payload,
  };
};
const getTaskFailure = () => {
  return {
    type: types.GET_TODOS_FAILURE,
  };
};

const addTaskRequest = () => {
  return {
    type: types.ADD_TODOS_REQUEST,
  };
};
const addTaskSuccess = () => {
  return {
    type: types.ADD_TODOS_SUCCESS
  };
};
const addTaskFailure = () => {
  return {
    type: types.ADD_TODOS_FAILURE,
  };
};

const getTask=(dispatch)=>{
  dispatch(getTaskRequest())
  axios.get('http://localhost:8080/todos').then((res)=>{
      dispatch(getTaskSuccess(res.data))
  }).catch(err=>{dispatch(getTaskFailure())})
}

export { getTaskRequest, getTaskSuccess, getTaskFailure,addTaskFailure,addTaskRequest,addTaskSuccess ,getTask};


```

### folder `Redux` -> Reduce.js

``` javascript 

import * as types from "./ActionType";

const initial = {
  isLoading: false,
  isError: false,
  todos: [],
};
const reducer = (oldState = initial, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_TODOS_REQUEST:
      return { ...oldState, isLoading: true };
    case types.GET_TODOS_SUCCESS:
      return { ...oldState, isLoading: false, todos: payload };
    case types.GET_TODOS_FAILURE:
      return { ...oldState, isLoading: false, todos: [], isError: true };

    case types.ADD_TODOS_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };
    case types.ADD_TODOS_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        // todos: [...oldState.todos, payload],
      };
    case types.ADD_TODOS_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };

    default:
      return oldState;
  }
};

export { reducer };


```

### folder `Component` -> Todo.jsx

``` javascript 

import React, { useEffect } from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import { getTask} from '../Redux/Action';
import TodosInput from './TodosInput';

const Todo=() =>{

    const dispatch=useDispatch();
    const todos=useSelector((state)=>state.todos)

   

    // console.log(todos)

    useEffect(()=>{
     dispatch(getTask)
    },[dispatch])

  return (
    <div>
        <h1>Todo</h1>
        <TodosInput />
        {todos.length > 0 && todos.map((el)=>{
            return(
                <div key={el.id}>
                    {el.title}-{el.status?'true':'false'}
                </div>
            )
        })}
    </div>
  )
}

export default Todo

```

### folder `Component` ->TodoInput.jsx

``` javascript 

import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTaskFailure,
  addTaskRequest,
  addTaskSuccess,
  getTask
} from "../Redux/Action";

function TodosInput() {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (task) {
      const payload = {
        title: task,
        state: false,
      };
      dispatch(addTaskRequest());
      return axios
        .post("http://localhost:8080/todos", payload)
        .then((res) => {
            console.log(res)
          dispatch(addTaskSuccess());
          setTask('')
        })
        .catch((e) => {
          dispatch(addTaskFailure(e));
        });
    }
  };

const handleTodo=()=>{
  // add the data first in db.json file then we have to make get request from api or localhost 
  addTodo().then((res)=>{dispatch(getTask)})
}



  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleTodo}>Add</button>
    </div>
  );
}

export default TodosInput;


```

### folder `Pages` -> Home.jsx


``` javascript 

import React from 'react'
import Todo from '../Component/Todo'

function Home() {
  return (
    <div>
    <h1>Home</h1>
    <Todo />
    </div>
  )
}

export default Home

```

### App.js

``` javascript 

import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
     <Home />
    </div>
  );
}

export default App;


```

### index.js


``` javascript 

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


```


