//packages
import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
//components
import Modal from "../Modal";
import TreeForm from "./TreeForm";
//functions
import { createCategory, changeTree, changeTreePreview } from "../../actions";

const TreeEdit = ({ show, setShow, createCategory, initialValues, treeId }) => {
  const onSubmit = formValues => {
    if(formValues.newCategory){
      createCategory({
        title: formValues.newCategory,
        icon: formValues.newCategoryIcon
      })
    }

    changeTreePreview(treeId, _.pick(formValues, ["title", "description", "category"]))

    if(formValues.title !== initialValues.title){
      changeTree(treeId, { data: { name: formValues.title } })
    }
  }

  const modalContent = () => {
    return (
      <TreeForm onSubmit={onSubmit} initialValues={initialValues}/>
    )
  }

  const modalActions = () => {
    return (
      <>
        <button type="submit" form="treeForm" className="ui primary button"> 
          Baum Bearbeiten
        </button>
        <button onClick={() => {setShow(!show)}} className="ui negative button">Abbrechen</button>
      </>
    )
  }

  return (
    <Modal 
      show={show}
      header="Baum bearbeiten"
      content={modalContent()}
      actions={modalActions()}
      onDismiss={() => setShow(!show)}
    />
  )
}

export default connect(null, { changeTree, changeTreePreview, createCategory })(TreeEdit)