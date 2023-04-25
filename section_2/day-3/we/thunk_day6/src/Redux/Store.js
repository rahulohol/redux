
//! first step to code in this page 


import  {legacy_createStore,applyMiddleware} from 'redux';
import { reducer } from './Reducer';
import thunk from 'redux-thunk'

//! this is the logic what thunk do inside 👇
// next stand for dispatch 
// action stand for  object we assign that in action.js 
// but here  we have getting  function in action so we have to handle this error we have to give some logic in it .

/* const customMiddleware=(store)=>(next)=>(action)=>{

    if(typeof action === 'function'){
      return  action(store.dispatch)
    }
    return next(action)


}


const store=legacy_createStore(reducer,applyMiddleware(customMiddleware)); */



//? this is thunk code 
const store=legacy_createStore(reducer,applyMiddleware(thunk));

export {store}