//packages
import React from "react";
//components
import Modal from "../Modal"
//functions
import { deleteTree } from "../../actions"

const TreeDelete = ({ show, setShow, id, treeTitle }) => {
  const modalContent = () => {
    return `Bist du sicher, dass du "${treeTitle}" löschen willst?`
  }

  const modalActions = () => {
    return(
      <>
        <button className="ui negative button" onClick={() => deleteTree(id)}> 
          Baum löschen
        </button>
        <button onClick={() => {setShow(!show)}} className="ui button">Abbrechen</button>
      </>
    )
  }

  return (
    <Modal 
      show={show}
      setShow={setShow}
      header="Baum löschen"
      content={modalContent()}
      acitons={modalActions()}
      onDismiss={() => setShow(!show)}
    />
  )
}

export default TreeDelete