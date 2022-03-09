//packages
import _ from "lodash"
//api connection
import trees from '../apis/trees'
//action types
import {
  CREATE_TREE,
  FETCH_CATEGORIES,
  FETCH_CATEGORY,
  FETCH_TREE,
  CREATE_CATEGORY,
  EDIT_TREE,
  FETCH_TREE_PREVIEWS,
  FETCH_TREE_PREVIEW,
  EDIT_TREE_PREVIEW,
  DELETE_CATEGORY
} from './types'
//functions
import { nestedObjPath } from "../functions"
import history from '../history'

export const createTree = formValues => async dispatch => {
  if(formValues.newCategory){  
    formValues.category = formValues.newCategory
    delete formValues.newCategory
    delete formValues.newCategoryIcon
  }

  const res = await trees.post('/treePreviews', formValues)
  await trees.post('/trees', {data: 
    {name: formValues.title, attributes: { node_id: 0, type: "root" }, children: []}
  })
  
  dispatch({ type: CREATE_TREE, payload: res.data })
  history.push(`/tree/${res.data.id}`)
}

export const changeTreePreview = (id, changes) => async dispatch => {
  const res = trees.patch(`/treePreviews/${id}`, changes)

  //dispatch({ type: EDIT_TREE_PREVIEW, payload: res.data })
}

export const fetchTree = id => async dispatch => {
  const res1 = await trees.get(`/trees/${id}`)
  const res2 = await trees.get(`/treePreviews/${id}`)

  dispatch({ type: FETCH_TREE, payload: res1.data})
  dispatch({ type: FETCH_TREE_PREVIEW, payload: res2.data })
}

export const fetchTreePreviews = () => async dispatch => {
  const res = await trees.get("/treePreviews")

  dispatch({ type: FETCH_TREE_PREVIEWS, payload: res.data })
}

export const createCategory = formValues => async dispatch => {
  const data = {
    icon: formValues.icon,
    label: formValues.title,
    value: formValues.title
  }
  const res = await trees.post('/categories', data)

  dispatch({ type: CREATE_CATEGORY, payload: res.data })
}

export const fetchCategories = () => async dispatch => {
  const res = await trees.get('/categories')

  dispatch({ type: FETCH_CATEGORIES, payload: res.data })
}

export const fetchCategory = id => async dispatch => {
  const res = await trees.get(`/categories/${id}`)

  dispatch({ type: FETCH_CATEGORY, payload: res.data })
}

export const deleteCategory = id => async dispatch => {
  await trees.delete(`/categories/${id}`)

  dispatch({ type: DELETE_CATEGORY, payload:id })
  history.push("/")
}

export const createNode = (parentId, treeData, treeId, newChild) => async dispatch => {
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
  dispatch({ type: EDIT_TREE, payload: res.data })
}

export const changeNode = (nodeId, treeData, treeId, changes) => async dispatch => {
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
  dispatch({ type: EDIT_TREE, payload: res.data })
}