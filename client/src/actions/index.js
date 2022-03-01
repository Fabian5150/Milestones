//redux store
import store from "../store"
//api connection
import trees from '../apis/trees'
//action types
import {
  CREATE_TREE,
  FETCH_CATEGORIES
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
  await trees.post('/trees', {data: null})
  console.log(res.data)
  dispatch({ type: CREATE_TREE, payload: res.data })
  history.push(`/tree/${res.data.id}`)
}

export const fetchCategories = () => async (dispatch) => {
  const res = await trees.get('/categories')
  dispatch({ type: FETCH_CATEGORIES, payload: res.data })
}

