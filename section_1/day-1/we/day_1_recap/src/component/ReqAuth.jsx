import { useState } from "react"
import {Navigate} from 'react-router-dom'

const ReqAuth =({children})=>{

    const data='I am inside the ReqAuth Component';

// if the user is authenticated , navigate him/her to the page 
// else navigate him/her to the login page

    const [isAuth,setIsAuth]=useState(false);
    if(!isAuth){
        //navigate to the login page
        return <Navigate to='/login' state={{myData:data}} />
        // in this state content the info of line no 6 ☝️
    }
return children;



}
export default ReqAuth;