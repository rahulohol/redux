import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleAdd, handleSub } from "../Redux/Action";

function Counter  ()  {
  const count = useSelector((reduxStore) => reduxStore.count);
  const dispatch = useDispatch();


  return (
    <div>
      <h1>Count :{count}</h1>
      <button onClick={() => dispatch(handleAdd(1))}>add</button>
      <button onClick={() => dispatch(handleSub(1))}>sub</button>
    </div>
  );
};

export { Counter };
