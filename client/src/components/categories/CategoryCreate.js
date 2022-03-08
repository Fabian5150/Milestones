//packages
import React from "react";
import { connect } from "react-redux";
//components
import CategoryForm from "./CategoryForm";
import Modal from "../Modal";
import { createCategory } from "../../actions";

const CategoryCreate = ({ show, setShow, createCategory }) => {
  const onSubmit = formValues => {
    createCategory(formValues)
    setShow(!show)
  }

  const modalContent = () => {
    return (
      <CategoryForm onSubmit={onSubmit} />
    )
  }

  const modalActions = () => {
    return (
      <>
        <button type="submit" form="categoryForm" className="ui primary button"> 
          Kategorie erstellen
        </button>
        <button onClick={() => {setShow(!show)}} className="ui negative button">Abbrechen</button>
      </>
    )
  }

  return (
    <Modal 
      show={show}
      header="Neue Kategorie erstellen"
      content={modalContent()}
      actions={modalActions()}
      onDismiss={() => setShow(!show)}
    />
  )
}

export default connect(null, { createCategory })(CategoryCreate)