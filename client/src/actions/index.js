//redux store
import store from "../store"
//api connection
import trees from '../apis/trees'
//action types
import {
  CREATE_TREE,
  FETCH_CATEGORIES
} from './types'

const dispatch = store.dispatch

export const createTree = async (formValues) => {
  const res = await trees.post('/treePreviews', formValues)
  console.log(res.data)
  return dispatch({ type: CREATE_TREE, payload: res.data })
}

export const fetchCategories = async dispatch => {
  
}
