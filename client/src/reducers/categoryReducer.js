//action types
import {
  FETCH_CATEGORIES,
  CREATE_CATEGORY
} from '../actions/types'

export default (state = {}, action) => {
  switch(action.type){
    case FETCH_CATEGORIES:
      return Object.assign(state, {categories: action.payload})
    case CREATE_CATEGORY:
      return Object.assign(state, {category: action.payload})

    default: return state
  }
}