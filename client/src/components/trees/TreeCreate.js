//packages
import React from "react";
import { connect } from "react-redux";
//components
import Modal from "../Modal";
import TreeForm from "./TreeForm";
//functions
import { createTree, createCategory } from "../../actions";

const TreeCreate = ({ show, setShow, createTree, createCategory }) => {
  const onSubmit = formValues => {
    if(formValues.newCategory){
      createCategory({
        title: formValues.newCategory,
        icon: formValues.newCategoryIcon
      })
    }
    createTree(formValues)
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

export default connect(null, { createTree, createCategory })(TreeCreate)