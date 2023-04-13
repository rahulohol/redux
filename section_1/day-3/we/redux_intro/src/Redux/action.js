const handleAddCount = (payload) => {
  return {
    type: "Add",
    payload,
  };
};

const handleReduceCount=(payload)=>{
    return{
        type:"Reduce",payload
    }
}


export  {handleAddCount,handleReduceCount}