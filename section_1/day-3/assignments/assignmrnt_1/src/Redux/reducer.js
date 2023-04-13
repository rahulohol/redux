import { Add, Reduce } from "./constAction";

const reducer=(state,action)=>{
    switch (action.type) {
        case Add:
        return {...state,count:state+action.payload};
        case Reduce:
            return {...state,count:state+action.payload}
        default:
            return state;
    }
}
export {reducer}