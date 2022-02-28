//api connection
import trees from '../apis/trees'
//action types
import {
  CREATE_TREE
} from './types'

/* export const createTree = formValues => {
  return {
    type: CREATE_TREE,
    payload: formValues
  }
} */

export const createTree = formValues => async dispatch => {
  const res = trees.post('/treePreviews', formValues)
  dispatch({ type: CREATE_TREE, payload: res.data })
}
