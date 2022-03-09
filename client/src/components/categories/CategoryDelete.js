//packages
import React from "react";
import { connect } from "react-redux"; 
//components
import Modal from "../Modal";
//functions
import { deleteCategory } from "../../actions";

const CategoryDelete = ({ show, setShow, category, id, deleteCategory, treeAmount }) => {
  const modalContent = () => {
    if(treeAmount > 0){
      return "Du musst erst alle Bäume aus dieser Kategorie löschen oder verschieben, bevor du diese Kategorie löschen kannst"
    } else {
      return `Bist du sicher, dass du "${category.value}" löschen willst?`
    }
  }

  const modalActions = () => {
    if(treeAmount > 0 ){
      return <button onClick={() => {setShow(!show)}} className="ui button">Abbrechen</button>
    } else {
      return (
        <>
          <button className="ui negative button" onClick={() => deleteCategory(id)}> 
            Kategorie löschen
          </button>
          <button onClick={() => {setShow(!show)}} className="ui button">Abbrechen</button>
        </>
      )
    }
  }

  return (
    <Modal 
      show={show}
      header="Kategorie löschen"
      content={modalContent()}
      actions={modalActions()}
      onDismiss={() => setShow(!show)}
    />
  )
}

export default connect(null, { deleteCategory })(CategoryDelete);