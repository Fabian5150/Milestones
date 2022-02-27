//action types
import {
  CREATE_TREE
} from './types'

export const createTree = formValues => {
  return {
    type: CREATE_TREE,
    payload: formValues
  }
}