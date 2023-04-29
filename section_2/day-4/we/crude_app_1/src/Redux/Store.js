import {
  legacy_createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { reducer as AppReducer } from "./App/Reducer";
import { reducer as AuthReducer } from "./Auth/Reducer";

const rootReducer = combineReducers({ AppReducer, AuthReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export { store };

// in this we are setting the redux-dev tool and applyMiddleware with thunk
