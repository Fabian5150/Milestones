//action types
import {
  CREATE_TREE,
  FETCH_TREE,
  EDIT_TREE,
  FETCH_TREE_PREVIEWS
} from '../actions/types'

export default (state = {}, action) => {
  switch(action.type){
    case CREATE_TREE:
      return Object.assign(state, action.payload)
    case FETCH_TREE:
      return Object.assign(state, {tree: action.payload})
    case EDIT_TREE:
      return Object.assign(state, {tree: action.payload})
    case FETCH_TREE_PREVIEWS:
      return Object.assign(state, {treePreviews: action.payload})

    default: return state
  }
}

