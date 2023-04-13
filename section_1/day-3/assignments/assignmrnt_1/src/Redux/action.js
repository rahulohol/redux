import { Add, Reduce } from "./constAction"

const handleAdd=(payload)=>{
    return{
        type:Add,payload
    }
}


const handleReduce=()=>{
    return{
        type:Reduce,payload
    }
}

export {handleAdd,handleReduce}