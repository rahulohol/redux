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
