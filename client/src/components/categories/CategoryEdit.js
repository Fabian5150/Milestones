//package
import React from "react";
import { connect } from "react-redux"
import _ from "lodash";
//components
import CategoryForm from "./CategoryForm"
import Modal from "../Modal";
//functions
import { editCategory } from "../../actions";

const CategoryEdit = ({ show, setShow, category, id, editCategory }) => {
  const onSubmit = formValues => {
    editCategory(id, formValues)
    setShow(!show)
  }

  const modalContent = () => {
    return <CategoryForm onSubmit={onSubmit} initialValues={category} />
  }

  const modalActions = () => {
    return (
      <>
        <button type="submit" form="categoryForm" className="ui primary button"> 
          Kategorie bearbeiten
        </button>
        <button onClick={() => {setShow(!show)}} className="ui negative button">Abbrechen</button>
      </>
    )
  }

  return(
    <Modal 
      show={show}
      header={`Kategorie "${category.title}" bearbeiten`}
      content={modalContent()}
      actions={modalActions()}
      onDismiss={() => setShow(!show)}
    />
  )
}

export default connect(null, { editCategory })(CategoryEdit)