import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div data-testid="navbar" style={{width:"90%", display:"flex", justifyContent:"space-between", alignItems:"center",margin:"auto"}}>
      <div data-testid="navbar-home-link">
        <Link to={"/"}><img
          src="/watch.png"
          width="60px"
          alt="logo"
          style={{ display: "block" }}
        /></Link>
      </div>

      <div>
        {/* Link button to /login page, if the user is not authenticated, else don't show it*/}
        <Link to={"/login"}><button data-testid="navbar-login-button" style={{padding:"10px", backgroundColor:"black",color:'white'}}>LOGIN</button></Link>
      </div>
    </div>
  );
};

export default Navbar;
