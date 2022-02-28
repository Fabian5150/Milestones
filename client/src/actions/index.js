//redux store
import store from "../store"
//api connection
import trees from '../apis/trees'
//action types
import {
  CREATE_TREE,
  CREATE_CATEGORY,
  FETCH_CATEGORIES
} from './types'

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
  return dispatch({ type: CREATE_TREE, payload: res.data })
}

