//redux store
import store from "../store"
//api connection
import trees from '../apis/trees'
//action types
import {
  CREATE_TREE,
  FETCH_CATEGORIES,
  FETCH_TREE
} from './types'
//components
import history from '../history'

const dispatch = store.dispatch

export const createTree = async formValues => {
  if(formValues.newCategory){
    //create new category
    const category = {}
    category.label = formValues.newCategory
    category.value = formValues.newCategory
    category.icon = `${formValues.newCategoryIcon ? formValues.newCategoryIcon : "book"}`
  
    await trees.post('/categories', category)
    formValues.category = formValues.newCategory
    delete formValues.newCategory
    delete formValues.newCategoryIcon
  }

  const res = await trees.post('/treePreviews', formValues)
  await trees.post('/trees', {data: {name: formValues.title, root: true}})
  console.log(res.data)
  
  dispatch({ type: CREATE_TREE, payload: res.data })
  history.push(`/tree/${res.data.id}`)
}

export const fetchCategories = () => async (dispatch) => {
  const res = await trees.get('/categories')

  dispatch({ type: FETCH_CATEGORIES, payload: res.data })
}

export const fetchTree = async id => {
  const res1 = await trees.get(`/treePreviews/${id}`)
  const res2 = await trees.get(`/trees/${id}`)

  return dispatch({ type: FETCH_TREE, payload: Object.assign(res1.data, res2.data)})
}