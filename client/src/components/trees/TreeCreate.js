//packages
import React from "react";
//components
import Modal from "../Modal";
import TreeForm from "./TreeForm";

const TreeCreate = ({ show, setShow }) => {
  const modalContent = () => {
    return (
      <TreeForm onSubmit={() => console.log("yaay")} />
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

export default TreeCreate;