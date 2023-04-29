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
