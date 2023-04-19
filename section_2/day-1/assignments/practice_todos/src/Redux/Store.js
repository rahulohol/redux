import {legacy_createStore} from 'redux';
import { reduce } from './Reducer';

const store=legacy_createStore(reduce);

export {store}