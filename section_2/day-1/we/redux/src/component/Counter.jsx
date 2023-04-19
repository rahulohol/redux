// import { store } from "./Redux/Store";
import { handleAdd, handleReduce } from "../Redux/ActionType";
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
  const count = useSelector((state) => state.count);

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
