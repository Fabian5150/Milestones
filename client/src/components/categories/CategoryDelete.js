//packages
import React from "react";
//components
import Modal from "../Modal";

const CategoryDelete = ({ show, setShow, category, id }) => {
  modalContent = () => {
    if(!categories) return "Bist du sicher, dass du diese Kategorie löschen willst?"
    return `Bist du sicher, dass du "${category.value}" löschen willst?`
  }

  modalActions = () => {
    <>
      <button className="ui negative button"> 
        Kategorie löschen
      </button>
      <button onClick={() => {setShow(!show)}} className="ui button">Abbrechen</button>
    </>
  }

  return (
    <Modal 
      show={show}
      header="Kategorie löschen?"
      content={modalContent()}
      actions={modalActions()}
      onDismiss={() => setShow(!show)}
    />
  )
}

export default CategoryDelete;