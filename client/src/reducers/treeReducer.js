//action types
import {
  CREATE_TREE
} from '../actions/types'

export default (state = {}, action) => {
  switch(action.type){
    case CREATE_TREE:
      return Object.assign(state, action.payload)

    default: return state
  }
}

