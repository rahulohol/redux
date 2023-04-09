import { legacy_createStore } from 'redux';
import { reduce } from '../reducer';


const store =legacy_createStore(reduce,{count:0})

export {store};
