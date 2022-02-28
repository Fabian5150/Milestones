//api connection
import trees from '../apis/trees'
//action types
import {
  CREATE_TREE
} from './types'


export const createTree = formValues => async dispatch => {
  const res = await trees.post('/treePreviews', formValues)
  console.log(res.data)
  dispatch({ type: CREATE_TREE, payload: res.data })
}

/* export const createTree = async formValues => {
  const res = await trees.post('/treePreviews', formValues)
  console.log(res.data)
} */
