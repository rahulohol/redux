import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getLoginData } from "../Redux/AuthReducer/action";

const initial={
  email:"",
  password:""
}

const Login = () => {
  const location = useLocation();
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const [text,setText] = useState(initial)
  const {isLoading,isError} = useSelector((state)=>{
    return{
      isLoading:state.AuthReducer.isLoading,
      isError:state.AuthReducer.isError
    }
  })

  const {email,password} = text;

  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(getLoginData(text)).then((res)=>{
      if (res.type==="LOGIN_SUCCESS"){
        const main = location.state.from || "/"
        navigate(main,{replace:true})
      }
    })
  }

  const handleChange=(e)=>{
    const {name,value} = e.target;
    setText({...text,[name]:value})
  }
  return (
    <div style={{textAlign:"center",border:"1px solid lightgray",width:'300px',margin:"auto",lineHeight:"30px"}}>
      <h2>LOGIN</h2>
      {isLoading?<h3>Wait a second</h3>:null}
      {isError?<h3>Something went wrong</h3>:<h3>Please Login</h3>}
      <form  onSubmit={handleSubmit}>
        <div>
          <label>User Email</label>
          <br />
          <input data-testid="login-email" value={email} name="email" onChange={handleChange}/>
        </div>
        <div>
          <label>User Password</label>
          <br />
          <input data-testid="login-password" value={password} name="password" onChange={handleChange}/>
        </div>
        
        <button type="submit" data-testid="login-submit">
          {isLoading?".....Loading.....":"Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
