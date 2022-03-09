//Quelle Grider, streams/reducers/streamReducer (modifziziert)
//packages
import _ from "lodash"
//action types
import {
  FETCH_CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  FETCH_CATEGORY,
  EDIT_CATEGORY
} from '../actions/types'

export default (state = {}, { type, payload }) => {
  switch(type){
    case FETCH_CATEGORIES:
      return { ...state, ..._.mapKeys(payload, 'id') }
    case FETCH_CATEGORY:
      return { ...state, [payload.id] : payload }
    case CREATE_CATEGORY:
      return { ...state, [payload.id] : payload }
    case EDIT_CATEGORY:
      return { ...state, [payload.id] : payload }
    case DELETE_CATEGORY:
      return _.omit(state, payload)

    default: return state
  }
}