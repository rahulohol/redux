import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import Filter from "../Components/Filter";
import WatchCard from "../Components/WatchCard";
import { getWatchData } from "../Redux/AppReducer/action";

const Watches = () => {
  const [searchparams] = useSearchParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const watches = useSelector((state)=>state.AppReducer.watches)
  const isLoading = useSelector((state)=>state.AppReducer.isLoading)
  const isError = useSelector((state)=>state.AppReducer.isError)

  useEffect(()=>{
    if (location){
      const category = searchparams.getAll("category")
      const queryParams={
        params:{
          category:category
        }
      }
      dispatch(getWatchData(queryParams))
    }
  },[location.search])


  return (
    <div style={{width:"90%", display:"flex",margin:"auto",gap:"100px",marginTop:"50px"}}>
      <Filter />
      {isLoading?<h3>....loading....</h3>:null}
      {isError?<h3>Something went wrong</h3>:null}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"50px"}}>
        {watches.length>0 && watches.map((el)=>{
          return(
            <div key={el.id}>
              <WatchCard id={el.id} image={el.image} name={el.name} category={el.category}/>
            </div>
          )
        })}
        {/* Map through the watch list here using WatchCard Component */}
      </div>
    </div>
  );
};

export default Watches;
