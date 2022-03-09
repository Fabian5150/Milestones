//packages
import _ from "lodash";
//action types
import {
  CREATE_TREE,
  FETCH_TREE,
  FETCH_TREE_PREVIEW,
  EDIT_TREE,
  FETCH_TREE_PREVIEWS,
  EDIT_TREE_PREVIEW
} from '../actions/types'

export default (state = {}, {type, payload}) => {
  switch(type){
    case CREATE_TREE:
      return { ...state, payload }
    case FETCH_TREE:
      return { ...state, tree: payload }
    case FETCH_TREE_PREVIEW:
      return { ...state, treePreview: payload }
    case EDIT_TREE:
      return { ...state, tree: payload }
    case FETCH_TREE_PREVIEWS:
      return { ...state, treePreviews: payload }
    case EDIT_TREE_PREVIEW:
      return { ...state, treePreviews: _.assign(state.treePreviews, payload)}

    default: return state
  }
}

