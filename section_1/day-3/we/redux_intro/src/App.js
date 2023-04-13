
import "./App.css";
import { store } from "./Redux/store";
import { useState } from "react";
import { handleAddCount, handleReduceCount } from "./Redux/action";

function App() {
  // destructure from the redux both
  const { dispatch, subscribe } = store;
  const { count } = store.getState();
  //this id for hack we never use this type of code bcz this is not a good practice we will create the state for update the data from UI.
  const [update, setUpdate] = useState(0);

  // this is form redux 
  subscribe(() => {
    //tell react here to re-render the component ,because  this function will only trigger if the state inside redux store has change.
    //1. if the state of the component has changed.
    //2. If the props of the component has change.

    // setUpdate is being used just to tell react  to re-render component.
    // this is just a trigger  function to re-render the component.
    setUpdate((prev) => prev + 1);
  });
  console.log(count);

  return (
    <div className="App">
      <h1>Count :{count}</h1>
      <button onClick={() => dispatch(handleAddCount(1))}>Add</button>
      <button onClick={() => dispatch(handleReduceCount(2))}>Reduce</button>
    </div>
  );
}

export default App;
