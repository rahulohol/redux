# Class Notes [video-1](https://course.masaischool.com/lectures/38614)
# Class Notes [video-2](https://course.masaischool.com/lectures/38615)

0. Install some dependencies/packages.
1. Part-1 steps
    - Redux folder  (Complete)
        - Action.js
        - Reducer.js
        - ActionType.js
        -Store.js
    - JSON Server  (complete)
    - Routing (Complete)
    - Pages (Complete)
        - EditMusicRecord.jsx
        - Login.jsx
        - MainRouters.jsx
        - MusicRecorder.jsx
        - MainRouters.jsx
        - SingleMusicRecorder.jsx
    - component (Complete)
        - FilterSort.jsx
        - MusicAlbum.jsx

#### After that we have to code the program.

# Code Notes



### folder `Redux`  -> Store.js  


```javascript

import { legacy_createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {reducer} from './Reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

export { store };

// in this we are setting the redux-dev tool and applyMidleware with thunk


```

### folder `Redux` ->  `App` -> ActionType.js  

```javascript

export const GET_MUSIC_RECORD_REQUEST = "GET_MUSIC_RECORD_REQUEST";
export const GET_MUSIC_RECORD_SUCCESS = "GET_MUSIC_RECORD_SUCCESS";
export const GET_MUSIC_RECORD_FAILURE = "GET_MUSIC_RECORD_FAILURE";

export const UPDATE_MUSIC_RECORD_REQUEST = "UPDATE_MUSIC_RECORD_REQUEST";

export const UPDATE_MUSIC_RECORD_SUCCESS = "UPDATE_MUSIC_RECORD_SUCCESS";

export const UPDATE_MUSIC_RECORD_FAILURE = "UPDATE_MUSIC_RECORD_FAILURE";


```

### folder `Redux` ->  `App` -> Action.js  

```javascript
import * as types from "./ActionType";
import axios from "axios";

const postLoginRequired = () => {
  return {
    type: types.USER_LOGIN_REQUEST,
  };
};

const postLoginSuccess = (payload) => {
  return {
    type: types.USER_LOGIN_SUCCESS,
    payload,
  };
};

const postLoginFailure = () => {
  return {
    type: types.USER_LOGIN_FAILURE,
  };
};

const login = (payload)=>(dispatch) => {
  dispatch(postLoginRequired());
  // this is one of the form which we take fetch the data ot axios code
  return axios({
    method: "post",
    url: "/api/login",
    baseURL: "https://reqres.in",
    data: payload,
  })
    .then((res) => {
     return  dispatch(postLoginSuccess(res.data.token));
    })
    .catch((err) => {
      dispatch(postLoginFailure(err));
    });
};

export { login, postLoginFailure, postLoginSuccess, postLoginRequired };


```

### folder `Redux` ->  `App` -> Reducer.js  

```javascript

import * as types from "./ActionType";

const initialState = {
  musicRecords: [],
  isLoading: false,
  isError: false,
};

const reducer = (oldState = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_MUSIC_RECORD_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };

    case types.GET_MUSIC_RECORD_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        musicRecords: payload,
      };
    case types.GET_MUSIC_RECORD_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        musicRecords:[]
      };
    default:
      return oldState;
  }
};

export { reducer };


```

### folder `Pages` -> EditMusicRecord.jsx 

```javascript
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMusicRecord, updateMusicRecord } from "../Redux/App/Action";

function EditMusicRecord() {
  const { id } = useParams(); //this is return the object which is present in the url which is all dynamic params.

  const album = useSelector((state) => state.AppReducer.musicRecords);
  const [musicName, setMusicName] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
    console.log(musicName)
    e.preventDefault()
    if(musicName){
      const payload={
        name:musicName
      }
      dispatch(updateMusicRecord(id, payload)).then(()=>{navigate("/")})
    }
  }

  useEffect(() => {
    if (album.length === 0) {
      dispatch(getMusicRecord());
    }
  }, [album.length, dispatch]);

  useEffect(() => {
    if (id) {
      const currentMusic = album.find((album) => album.id == id);
      if (currentMusic) {
        setMusicName(currentMusic.name);
      }
    }
  }, [id, album]);

  return (
    <div>
      <h1>EDIT PAGE</h1>
      <div>
        <form  onSubmit={handleSubmit}>
          <div>
            <label>Edits music name</label>
            <input
              value={musicName}
              onChange={(e) => setMusicName(e.target.value)}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditMusicRecord;


```

### folder `Pages` -> Login.jsx  

```javascript
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../Redux/Auth/Action";
import { USER_LOGIN_SUCCESS } from "../Redux/Auth/ActionType";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const location = useLocation();
  console.log("Inside in Login Page ", location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      /* 
      if the user has logged in successfully then, navigate or redirect the user to the user to the page where he was going initially.
      */

      dispatch(login({ email, password })).then((res) => {
        if (res.type === "USER_LOGIN_SUCCESS") {
          const comingFrom = location.state.form || "/";
          // navigate("/")
          // navigate(location.state.form);
          navigate(comingFrom, { replace: true });
          console.log(res);
        }
        // return "hello world"
      });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User_email</label>
          <input
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>user_password</label>
          <input
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;


```

### folder `Pages` -> MainRouters.jsx 

```javascript
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EditMusicRecord from './EditMusicRecord'
import Login from './Login'
import MusicRecords from './MusicRecords'
import SingleMusicRecords from './SingleMusicRecords'
import ReqAuth from '../component/ReqAuth'

function MainRouters() {
  return ( 
    <Routes>
        <Route path='/' element={<MusicRecords />}></Route>
        <Route path='/music/:id' element={<SingleMusicRecords />}></Route>
        <Route path='/music/:id/edit' element={<ReqAuth><EditMusicRecord /></ReqAuth>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<h3>Page Not Found</h3>}></Route>
    </Routes>
  )
}

export default MainRouters

```
### folder `Pages` -> MusicRecorder.jsx

```javascript

import React from 'react'
import MusicAlbum from '../component/MusicAlbum'
import styled from 'styled-components'
import FilterSort from '../component/FilterSort'

function MusicRecords() {
  return (
    <Wrapper color='green'>
    <WrapperFilterSort>
      <FilterSort />
    </WrapperFilterSort>
    <WrapperMusicAlbum>
    <MusicAlbum />
    </WrapperMusicAlbum>

    </Wrapper>
  );
};

const Wrapper =styled.div`
  border:${({color})=>`1px solid ${color};`}
  display:flex;
  min-height:100vh;
`;

const WrapperFilterSort=styled.div`
  width:200px;
  border:1px solid black ;
`;

const WrapperMusicAlbum=styled.div`
  border:1px solid blue;
  width:100%;
  display:grid;
  grid-template-columns: repeat(auto-fit,minmax(200px,max-content));
  justify-content:center;
  grid-gap:10px;
`;

export default MusicRecords

```
### folder `Pages` -> SingleMusicRecorder.jsx 


```javascript

import React from 'react'

function SingleMusicRecords() {
  return (
    <div>SingleMusicRecords</div>
  )
}

export default SingleMusicRecords
```

### folder `Component` -> FilterSort.jsx

```javascript
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/* 

1. The user should be able to toggle the checkbox
2. The user should be able to update that data in the URL Search Params 
3. The Checkbox should rename selected (if it was already selected), when the page refreshes.

*/

const FilterSort = () => {
  const [searchParams,setSearchParams]=useSearchParams();
  const [category, setCategory] = useState(searchParams.getAll("genre")||[]);

  const [sortBy,setSortBy]=useState(searchParams.get('sortBy')||'');


  const handleFilter = (e) => {
    //!  if the option is present in the category array,remove it
    //? else add it to the category array

    const option = e.target.value; // This  is for handling the event.

    let newCategory = [...category]; // this is connected with useState and spreading the data form there.

    if (newCategory.includes(option)) {
      //! remove it
      newCategory.splice(newCategory.indexOf(option), 1);
    } else {
      //* add it
      newCategory.push(option);
    }
    setCategory(newCategory)

    
  };
  console.log(category)

  const handleSortBy=(e)=>{
    setSortBy(e.target.value)
  }

  useEffect(() => {
    const params={};
    category && (params.genre=category) //if category is present add in params line 37
    sortBy && (params.sortBy=sortBy);//if sortBy is present add in params line 37

    setSearchParams(params)
  
  }, [category,setSearchParams,sortBy]);

  return (
    <div>
      <h2>Filter</h2>
      <div>
        <input type="checkbox" value="K-Pop" onChange={handleFilter} defaultChecked={category.includes('K-Pop')}/>
        <label>K-Pop</label>
      </div>
      <div>
        <input type="checkbox" value="Country" onChange={handleFilter} defaultChecked={category.includes('Country')}/>
        <label>Country</label>
      </div>
      <div>
        <input type="checkbox" value="Pop" onChange={handleFilter} defaultChecked={category.includes('Pop')}/>
        <label>Pop</label>
      </div>
      <div>
        <input type="checkbox" value="heavy metal" onChange={handleFilter} defaultChecked={category.includes('heavy metal')}/>
        <label>Heavy Metal</label>
      </div>
      
      <h2>Sort</h2>
      <div onChange={handleSortBy}>
        <div>
          <input type='radio' value='asc' name='sortBy' defaultChecked={sortBy === 'asc'} />
          <label>Ascending</label>
        </div>
        <div>
          <input type='radio' value='desc' name='sortBy' defaultChecked={sortBy === 'desc'} />
          <label>Descending</label>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;


```

### folder `Component`  -> MusicAlbum.jsx

```javascript

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getMusicRecord } from "../Redux/Action";

function MusicAlbum() {
  const dispatch = useDispatch();
  const [searchParams]=useSearchParams();
  const musicRecords = useSelector((store) => store.musicRecords);
  const location=useLocation();

  //? whenever  the filters 

  useEffect(() => {

    if(location || musicRecords.length===0){
      const genre= searchParams.getAll('genre');
      const queryParams={
        params:{
          genre:genre,
          _sort:searchParams.get('sortBy')&&'year',
          _order:searchParams.get('sortBy')
        }
      }
      dispatch(getMusicRecord(queryParams));
    }
  }, [location.search]);

  return (
    <>
      {musicRecords.length > 0 &&
        musicRecords.map((el) => {
          return (
            <div key={el.id}>
              <div>
                <div>{el.name}</div>
              </div>
              <div>
                <img src={el.img} alt={el.name} />
              </div>
              <div>{el.genre}</div>
              <div>{el.year}</div>
            </div>
          );
        })}
    </>
  );
}

export default MusicAlbum;


```

## Day-2

- `Notes` modify some data in store.js files

## Create folder `Auth` --> ActionTypes.js

```javascript

export const USER_LOGIN_REQUEST= "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS= "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE= "USER_LOGIN_FAILURE";

```

## Create folder `Auth`  --> Action.js

```javascript
import * as types from "./ActionType";
import axios from "axios";

const postLoginRequired = () => {
  return {
    type: types.USER_LOGIN_REQUEST,
  };
};

const postLoginSuccess = () => {
  return {
    type: types.USER_LOGIN_SUCCESS,
  };
};

const postLoginFailure = () => {
  return {
    type: types.USER_LOGIN_FAILURE,
  };
};

const login = (payload)=>(dispatch) => {
  dispatch(postLoginRequired());
  // this is one of the form which we take fetch the data ot axios code
  return axios({
    method: "post",
    url: "/api/login",
    baseURL: "https://reqres.in",
    data: payload,
  })
    .then((res) => {
      dispatch(postLoginSuccess(res.data.token));
    })
    .catch((err) => {
      dispatch(postLoginFailure(err));
    });
};

export { login, postLoginFailure, postLoginSuccess, postLoginRequired };

```

## Create folder `Auth`  --> Reducer.js

```javascript
import * as types from "./ActionType";

const initialState = {
  isAuth: false,
  token: "",
  isAuthLoading: false,
  isError: false,
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
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...oldState,
        isAuthLoading: false,
        isError: true,
        token: "",
      };
      default :
      return oldState
  }
};

export { reducer };

```

## folder `component` -> ReqAuth.jsx

```javascript
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

/* To check id the user is authenticated, if yes,redirect/navigate him/her to the protected route/page else navigate him/her to the login page.  */


function ReqAuth({ children }) {
  const auth = useSelector((store) => store.AuthReducer.isAuth);
  // console.log(auth)
  const location = useLocation();
  console.log("Inside in reqAuth ", location);

  if (!auth) {
    //navigate at the login pages
    return <Navigate to="/login" state={{ form: location.pathname }} replace/>;
  }
  // return <Navigate to='login' />
  return children;
};

export default ReqAuth;


```



