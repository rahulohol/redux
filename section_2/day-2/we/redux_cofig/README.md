# Class Notes [Video](https://course.masaischool.com/lectures/38393)

### Pre-Class [video](https://course.masaischool.com/lectures/38298)

## MiddleWare Refer Notes [Notes](https://awesomeopensource.com/projects/redux-middleware)

# what we learn in this ?

- Redux

- React-Redux
    1. <Provider>    
    1. useSelector
    1. useDispatcher

# Step 
- Remove the initial state from the state.js file and add it as the default param in the reducer.js file, for oldState.
- Install the `redux` and `react-redux` library
- wrap our Application in the <Provider> component , and pass store as the only prop
- use the useSelector hook to access the data from the redux store
- use the useDispatch hook to access the dispatch method and update the state inside the redux store.




# <Provider>
- **In this we have to send data by props which is stored in store component of redux so ve pass in Provider as a prop in `index.js` file same as in `react` we use `AppContextProvider` way, and the draw-back of this is when many component are pass then the `UI` will render the all component wither other component will change or not they render all the component if one of the component will change**

# useSelector
- ***This is a hook to access the redux store's state. This hook is take a selector function as an argument .This Selector is called with the store state and useSelector have the call back function and  this will internally use `subscribe` functionality which we cover in day 3 redux in sprint 1***


## Todo's

1. Install `axios` and `json-server`
2. Create a script for running the json-server in the package.json file ,
"server":"json-server --watch db.json --port 8080"
3. Run this command, `npm run server` to run the json-server 
4. We would change the format of th db.json file, to store, our todo's.
5. We need to create some component, like Todos.jsx, and TodoInput.jsx.
6. Import Todos in App.js and TodoInput in Todo Component.
7. Persisting  the data
8. Case of multiple reducers.
9. MiddleWares.

### Steps for combineReduce

1. We create AppReduce and AuthReducer folders 
1. We shifts the current action.js,actionType.js, Reducer.js files in the  AppReducer folder 
1. We Create new action.js,actionTypes.js,Reducer.js in AuthReducer to handle the authentication logic 
1. We export both the reducers in store.js file and used the combineReducer method, that we get from the core -library of redux to combine multiple reducer into a single reducer 
1. And instead of passing the single reduce, we are passing the rootReducer to the legacy_createStore method.
1. And instead of accessing the data 
1. And instead of accessing the data directly from the store, we are accessing it from the store. <Reducer> 


### Code 

#### Folder `Redux`->Store.js

```javascript 

import { legacy_createStore,combineReducers,applyMiddleware,compose } from "redux";
import {reducer as AppReducer} from "./AppReducer/Reducer";
import {reducer as AuthReducer} from "./AuthReducer/Reducer";


// this for redux dev tool code for better debug the redux code 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// this is for the combine the all reducer at once 
const rootReducer=combineReducers({AppReducer,AuthReducer})

// this is middleware code or syntax for debug
const logger1=(state)=>(next)=>(action)=>{
    //state -> reduxStore -> state
    // next (dispatch function)-> the next middleware if there is any, or to the reducer function  
    // action is a in function or in code object 
    /* console.log(state)
    console.log(next ) */
    
    // next(action)

    //how data flow from middleware eg:-

    console.log('Inside the logger1:a')
    const temp=next(action);
    console.log('Inside the logger1:b')
    return temp
    
}


const logger2=(state)=>(next)=>(action)=>{
    console.log('Inside the logger2:c')
    const temp=next(action);
    console.log('Inside the logger2:d')
    return temp
}

// [state]=useReducer(reducerFunc , initialState)
const store = legacy_createStore(rootReducer,composeEnhancers(applyMiddleware(logger1,logger2)));

export { store };


```

#### Folder `Redux`->`AppReducer`->ActionType.js

```javascript 

import {
  add,
  GET_TODOS_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  POST_TODO_FAILURE,
  POST_TODO_REQUEST,
  POST_TODO_SUCCESS,
  reduce,
} from "./ConstAction";

export const handleAdd = (payload) => {
  return { type: add, payload };
};

export const handleReduce = (payload) => {
  return { type: reduce, payload };
};

const getTodosRequest = () => {
  return {
    type: GET_TODOS_REQUEST,
  };
};
const getTodosSuccess = (payload) => {
  return {
    type: GET_TODOS_SUCCESS,
    payload,
  };
};
const getTodosFailure = () => {
  return {
    type: GET_TODOS_FAILURE,
  };
};

const postTodoRequest = () => {
  return {
    type: POST_TODO_REQUEST,
  };
};
const postTodoSuccess = (payload) => {
  return {
    type: POST_TODO_SUCCESS,
    payload,
  };
};
const postTodoFailure = () => {
  return {
    type: POST_TODO_FAILURE,
  };
};

export {
  getTodosFailure,
  getTodosSuccess,
  getTodosRequest,
  postTodoRequest,
  postTodoFailure,
  postTodoSuccess,
};


```

#### Folder `Redux`->`AppReducer`->ConstAction.js


```javascript 
export const add = "ADD";
export const reduce = "REDUCE";

export const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODOS_FAILURE = "GET_TODOS_FAILURE";

export const POST_TODO_REQUEST="POST_TODO_REQUEST"
export const POST_TODO_SUCCESS="POST_TODO_SUCCESS"
export const POST_TODO_FAILURE="POST_TODO_FAILURE"

```

####  Folder `Redux`->`AppReducer`->Reducer.js

```javascript 
import { getLocalData, saveData } from "../../utils/localStorage";
import {
  add,
  GET_TODOS_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  reduce,
} from "./ConstAction";

const initial = {
  count: getLocalData("reduxCount") || 0,
  todos: [],
  isLoading: false,
  isError: false,
};

const reducer = (oldState = initial, action) => {
  switch (action.type) {
    case add:
      const newAddCount = oldState.count + action.payload;
      saveData("reduxCount", newAddCount);
      return { ...oldState, count: newAddCount };

    case reduce:
      const newReduceCount = oldState.count - action.payload;
      saveData("reduxCount", newReduceCount);
      return { ...oldState, count: newReduceCount };

    case GET_TODOS_REQUEST:
      return { ...oldState, isLoading: true };

    case GET_TODOS_SUCCESS:
      return { ...oldState, isLoading: false, todos: action.payload };

    case GET_TODOS_FAILURE:
      return { ...oldState, isLoading: false, todos: [], isError: true };

    default:
      return oldState;
  }
};

export { reducer };


```

####  Folder `Redux`->`AuthReducer`->Action.js


```javascript 
import * as types from './ActionType';

const userLoginRequest=()=>{
   return{type:types.USER_LOGIN_REQUEST} 
}
const userLoginSuccess=(payload)=>{
   return{type:types.USER_LOGIN_SUCCESS,payload} 
}
const userLoginFailure=()=>{
   return{type:types.USER_LOGIN_FAILURE} 
}

export {userLoginFailure,userLoginRequest,userLoginSuccess}

```

####  Folder `Redux`->`AuthReducer`->ActionType.js


```javascript 
export const USER_LOGIN_REQUEST='USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS='USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE='USER_LOGIN_FAILURE';
```

#### Folder `Redux`->`AuthReducer`->Reducer.js

```javascript 
import * as types from "./ActionType";

const initialState = {
  isAuth: false,
  token: "",
  isAuthLoading: false,
  isAuthError: false,
};

const reducer = (oldState = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.USER_LOGIN_REQUEST:
      return {
        ...oldState,
        isAuthLoading: true,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...oldState,
        isAuthLoading: false,
        token: payload,
        isAuth: true,
      };
    case types.USER_LOGIN_REQUEST:
      return {
        ...oldState,
        isAuthLoading: true,
        isAuthLoading: false,
        token: "",
        isAuth: false,
        isAuthError: true,
      };
    default:
      return oldState;
  }
};

export { reducer };

```

### Folder `Component` -> Counter.js

```javascript
// import { store } from "./Redux/Store";
import { handleAdd, handleReduce } from "../Redux/AppReducer/ActionType";
// import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";

function Counter() {
  /* const {dispatch,subscribe}=store;
 
  const {count}=store.getState();

  const [counts, setCounts] = useState(0);

  subscribe(()=>{
    setCounts(prev=>prev+1)
  }) */

  // console.log(count)

  // instated of the prev code you can code this way in below code refer this

  // to access the redux store ,and to subscribe the data from the redux store.
  const count = useSelector((state) => {
    // console.log(state)
    return state.AppReducer.count
  });
  // console.log(count)
  //dispatch method along with actionObj,allows us to update the redux store.
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(handleAdd(2))}>Add</button>
      <button onClick={() => dispatch(handleReduce(1))}>Reduce</button>
    </div>
  );
}

export {Counter };

```

### folder `component` -> Todo.js

```javascript
import React, { useEffect } from "react";
import { TodoInput } from "./TodoInput";
import axios from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getTodosFailure,
  getTodosRequest,
  getTodosSuccess,
  postTodoFailure,
  postTodoRequest,
  postTodoSuccess,
} from "../Redux/AppReducer/ActionType";

function Todo() {
  const dispatch = useDispatch(); //this is from react-redux
  /*  const isLoading=useSelector((state)=>state.isLoading);
  const {todos}=useSelector((state)=>state.todos) */
  //both are same ☝️👇
  const { todos, isLoading, isError } = useSelector((state) => {
    return {
      todos: state.AppReducer.todos,
      isLoading: state.AppReducer.isLoading,
      isError: state.AppReducer.isError,
    };
  }, shallowEqual);

  const getTodo = () => {
    // this is for the request fetch and showing isLoading true
    dispatch(getTodosRequest());
    return axios
      .get("http://localhost:8080/Todos")
      .then((res) => {
        // this is for the api successfully pass and give with payload as the data
        dispatch(getTodosSuccess(res.data));
      })
      .catch((err) => {
        // this is for error occurs
        dispatch(getTodosFailure());
      });
  };
  // get all the todos that we have in the db.json file

  const addTodo = (title) => {
    if (title) {
      const payload = {
        title,
        status: false,
      };
      dispatch(postTodoRequest());
      return axios
        .post(" http://localhost:8080/Todos", payload)
        .then((res) => {
          dispatch(postTodoSuccess(res.data));
        })
        .catch((err) => {
          dispatch(postTodoFailure());
        });
    }
  };

  const handleAddTodo = (text) => {
    addTodo(text)
      .then(() => getTodo())
      .then(() => {
        console.log("Data added successfully");
      });
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <TodoInput handleAddTodo={handleAddTodo} />
      )}
      {todos.length > 0 &&
        todos.map((items) => {
          return (
            <div key={items.id}>
              {items.title}-{items.status ? "True" : "False"}
            </div>
          );
        })}
    </div>
  );
}

export { Todo };

```

### folder `component` -> TodoInput.js

```javascript
import React, { useState } from "react";

const TodoInput = ({ handleAddTodo }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text) {
      handleAddTodo(text);
      setText("");
    }
  };
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export { TodoInput };

```
