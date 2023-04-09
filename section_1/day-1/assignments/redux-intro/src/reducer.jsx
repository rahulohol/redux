

const reduce=(oldState,action)=>{
  const {payload,type}=action;

  switch(type){
    case 'Add':return{...oldState,count:oldState.count+payload};
    case 'Reduce':return{...oldState,count:oldState.count+payload};
    default:
      return oldState;
  }
}

export {reduce}