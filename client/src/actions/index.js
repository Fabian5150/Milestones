//packages
import _ from "lodash"
//redux store
import store from "../store"
//api connection
import trees from '../apis/trees'
//action types
import {
  CREATE_TREE,
  FETCH_CATEGORIES,
  FETCH_TREE,
  CREATE_CATEGORY,
  EDIT_TREE,
  FETCH_TREE_PREVIEWS
} from './types'
//functions
import { nestedObjPath } from "../functions"
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
  await trees.post('/trees', {data: 
    {name: formValues.title, attributes: { node_id: 0, type: "root" }, children: []}
  })
  console.log(res.data)
  
  dispatch({ type: CREATE_TREE, payload: res.data })
  history.push(`/tree/${res.data.id}`)
}

export const fetchCategories = async () => {
  const res = await trees.get('/categories')

  return dispatch({ type: FETCH_CATEGORIES, payload: res.data })
}

export const fetchTree = async id => {
  const res1 = await trees.get(`/treePreviews/${id}`)
  const res2 = await trees.get(`/trees/${id}`)

  return dispatch({ type: FETCH_TREE, payload: Object.assign(res1.data, res2.data)})
}

export const fetchTreePreviews = async () => {
  const res = await trees.get("/treePreviews")

  return dispatch({ type: FETCH_TREE_PREVIEWS, payload: res.data })
}

export const createCategory = async formValues => {
  const data = {
    icon: formValues.icon,
    label: formValues.title,
    value: formValues.title
  }
  const res = await trees.post('/categories', data)

  history.push(`/search/category/${data.value}`)
  return dispatch({ type: CREATE_CATEGORY, payload: res.data })
}

export const createNode = async (parentId, treeData, treeId, newChild) => {
  let newTree = treeData
  if(parentId !== 0){
    const nodePath = nestedObjPath(treeData, parentId)
    const currentNode = _.get(treeData, nodePath)
    const newCurrent = currentNode

    newCurrent.children = _.concat(currentNode.children, newChild)
    _.set(newTree, nodePath, newCurrent)
  } else {
    newTree.children = _.concat(newTree.children, newChild)
  }
  

  const res = await trees.patch(`/trees/${treeId}`, {data: newTree})
  return dispatch({ type: EDIT_TREE, payload: res.data })
}

export const changeNode = async (nodeId, treeData, treeId, changes) => {
  let newTree = treeData
  const nodePath = nestedObjPath(treeData, nodeId)
  const currentNode = _.get(treeData, nodePath)

  const changedNode = () => {
    if(changes.attributes){
      if(currentNode.attributes.type === "Counter"){
        _.assign(currentNode.attributes.done, changes.attributes.done)
        return currentNode
      }
      _.assign(currentNode.attributes, changes.attributes)
      return currentNode
    } else {
      return _.assign(currentNode, changes)
    }
  }

  _.set(newTree, nodePath, changedNode())

  const res = await trees.patch(`/trees/${treeId}`, {data: newTree})
  return dispatch({ type: EDIT_TREE, payload: res.data })
}