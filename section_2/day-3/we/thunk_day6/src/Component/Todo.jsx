import React, { useEffect } from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import { getTask} from '../Redux/Action';
import TodosInput from './TodosInput';

const Todo=() =>{

    const dispatch=useDispatch();
    const todos=useSelector((state)=>state.todos)

   

    // console.log(todos)

    useEffect(()=>{
     dispatch(getTask)
    },[dispatch])

  return (
    <div>
        <h1>Todo</h1>
        <TodosInput />
        {todos.length > 0 && todos.map((el)=>{
            return(
                <div key={el.id}>
                    {el.title}-{el.status?'true':'false'}
                </div>
            )
        })}
    </div>
  )
}

export default Todo