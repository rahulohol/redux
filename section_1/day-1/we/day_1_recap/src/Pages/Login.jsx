import React from 'react'
import { useLocation } from 'react-router-dom'

function Login() {
    // passing the data from the reqAuth page to here Via Navigate component
    const location =useLocation();
    console.log(location)
  return (
    <div>Login</div>
  )
}

export default Login