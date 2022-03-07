//action types
import {
  FETCH_CATEGORIES,
  CREATE_CATEGORY
} from '../actions/types'

export default (state = {}, { type, payload }) => {
  switch(type){
    case FETCH_CATEGORIES:
      return {...state, categories: payload}
    case CREATE_CATEGORY:
      return state

    default: return state
  }
}