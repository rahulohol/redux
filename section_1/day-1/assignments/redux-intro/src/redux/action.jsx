

const handleCountInc=(payload)=>{
  return{
    type:"Add",
    payload,
  };
};

const handleCountDec=(payload)=>{
  return {
    type:'Reduce',
    payload,
  }
}