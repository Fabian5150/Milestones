//packages
import { combineReducers } from "redux";

const platzhalterReducer = () => {
  return [
    { title: 'Lorem', id: 'ipsum' },
    { title: 'dolor', id: 'sit' },
  ]
}

export default combineReducers({
  platzhalter: platzhalterReducer
})