//packages
import _ from "lodash"
//action types
import {
  FETCH_CATEGORIES,
  CREATE_CATEGORY
} from '../actions/types'

export default (state = {}, { type, payload }) => {
  switch(type){
    case FETCH_CATEGORIES:
      return { ...state, ..._.mapKeys(payload, 'id') }
    case CREATE_CATEGORY:
      return { ...state, [payload.id] : payload }

    default: return state
  }
}