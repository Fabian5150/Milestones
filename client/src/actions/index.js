//api connection
import trees from '../apis/trees'
//action types
import {
  CREATE_TREE
} from './types'


export const createTree = async (formValues, dispatch) => {
  const res = await trees.post('/treePreviews', formValues)
  console.log(res.data)
  return dispatch({ type: CREATE_TREE, payload: res.data })
}
