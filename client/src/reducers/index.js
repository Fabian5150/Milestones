//packages
import { combineReducers } from "redux";
//reducers
import treeReducer from "./treeReducer";

export default combineReducers({
  trees: treeReducer
})