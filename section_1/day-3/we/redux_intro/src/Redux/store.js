import { legacy_createStore } from "redux";
import { reducer } from "./reducer";

const store = legacy_createStore(reducer, { count: 10 });

export { store };