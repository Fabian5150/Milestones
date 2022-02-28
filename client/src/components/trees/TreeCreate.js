//packages
import React from "react";
import { useDispatch, connect } from 'react-redux'
//components
import Modal from "../Modal";
import TreeForm from "./TreeForm";
import { createTree } from "../../actions";
//api connection
import trees from '../../apis/trees'

const TreeCreate = ({ show, setShow }) => {
  const dispatch = useDispatch()

  const onSubmit = async formValues => {
    const res = await trees.post('/treePreviews', formValues)
    console.log(res.data)
    dispatch({ type: "CREATE_TREE", payload: res.data })
    //createTree(formValues)
  }

  const modalContent = () => {
    return (
      <TreeForm onSubmit={onSubmit} />
    )
  }

  const modalActions = () => {
    return (
      <>
        <button type="submit" form="treeForm" className="ui primary button"> 
          Baum erstellen
        </button>
        <button onClick={() => {setShow(!show)}} className="ui negative button">Abbrechen</button>
      </>
    )
  }

  return (
    <Modal 
      show={show}
      header="Neuen Baum erstellen"
      content={modalContent()}
      actions={modalActions()}
      onDismiss={() => setShow(!show)}
    />
  )
}

export default connect(null, { createTree })(TreeCreate);
//export default TreeCreate