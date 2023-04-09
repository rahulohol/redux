import { useState } from 'react';
import './App.css';
import {Counter} from './component/Counter'
import MainRoutes from './Pages/MainRoutes';
function App() {
  const [showCount,setShowCount]=useState(true)
  return (
    <div className="App">
   {/*   {showCount && <Counter />}
      <button  onClick={()=>setShowCount((prev)=>!prev)}>
        Toggle Counter
      </button> */}

      <MainRoutes />
    </div>
  );
}

export default App;
