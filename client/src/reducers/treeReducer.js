//action types
import {
  CREATE_TREE,
  CREATE_CATEGORY,
  FETCH_TREE,
  FETCH_CATEGORIES
} from '../actions/types'

export default (state = {}, action) => {
  switch(action.type){
    case CREATE_TREE:
      return Object.assign(state, action.payload)
    case FETCH_TREE:
      return Object.assign(state, action.payload)
    case FETCH_CATEGORIES:
      return Object.assign(state, action.payload)
    case CREATE_CATEGORY:
      return 
    default: return state
  }
}

