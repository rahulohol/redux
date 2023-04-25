import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTaskFailure,
  addTaskRequest,
  addTaskSuccess,
  getTask
} from "../Redux/Action";

function TodosInput() {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (task) {
      const payload = {
        title: task,
        state: false,
      };
      dispatch(addTaskRequest());
      return axios
        .post("http://localhost:8080/todos", payload)
        .then((res) => {
            console.log(res)
          dispatch(addTaskSuccess());
          setTask('')
        })
        .catch((e) => {
          dispatch(addTaskFailure(e));
        });
    }
  };

const handleTodo=()=>{
  // add the data first in db.json file then we have to make get request from api or localhost 
  addTodo().then((res)=>{dispatch(getTask)})
}



  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleTodo}>Add</button>
    </div>
  );
}

export default TodosInput;
