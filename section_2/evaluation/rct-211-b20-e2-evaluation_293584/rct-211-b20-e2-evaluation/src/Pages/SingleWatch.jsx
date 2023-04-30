import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

const SingleWatch = () => {
  const {id} = useParams()
  const watches = useSelector((store)=>store.AppReducer.watches);
  const isLoading = useSelector((state)=>state.AppReducer.isLoading);
  const isError = useSelector((state)=>state.AppReducer.isError);

  const [watch,setWatch] = useState({});

  // const findTheId=()=>{

    // }
    
    useEffect(()=>{
      if (id){
        const singleData = watches.find((el)=>el.id==id)
        setWatch(singleData)
        }
    },[])
    

  return (
    <div style={{textAlign:"center"}}>
            {isLoading?<h3>....loading....</h3>:null}
      {isError?<h3>Something went wrong</h3>:null}
      <h2>{watch.name}</h2>
      <div>
        <img src={watch.image} alt="Cover Pic" />
      </div>
      <div>
        <div style={{fontSize:"20px",fontWeight:"bold"}}>{watch.category}</div>
      </div>
    </div>
  );
};

export default SingleWatch;
