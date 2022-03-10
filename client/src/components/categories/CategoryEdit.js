//package
import React, { useEffect } from "react";
import { connect } from "react-redux"
import _ from "lodash";
//components
import CategoryForm from "./CategoryForm"
import Modal from "../Modal";
//functions
import { editCategory, fetchTreePreviews, changeTreePreview } from "../../actions";

const CategoryEdit = ({ show, setShow, category, id, editCategory, fetchTreePreviews, treePreviews, changeTreePreview }) => {
  useEffect(() => {
    fetchTreePreviews()
  }, [])

  const onSubmit = formValues => {
    formValues.value = formValues.title
    formValues.label = formValues.title
    editCategory(id, formValues)
    
    if(treePreviews){
      treePreviews.forEach((preview, index) => {
        if(preview.category === category.title){
          changeTreePreview(index, { category: formValues.value })
        }
      })
    }
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

const mapStateToProps = state => {
  return {treePreviews: state.trees.treePreviews}
}

export default connect(mapStateToProps, { editCategory, fetchTreePreviews, changeTreePreview })(CategoryEdit)