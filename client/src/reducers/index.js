//packages
import { combineReducers } from "redux";
//reducers
import treeReducer from "./treeReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  trees: treeReducer,
  categories: categoryReducer
})