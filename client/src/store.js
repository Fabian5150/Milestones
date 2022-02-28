//Quelle: Grider, streams/client/index.js (modifiziert)
//packages
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from 'redux-thunk';
//reducers
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
)

export default store;