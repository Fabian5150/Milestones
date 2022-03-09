//packages
import React from "react";
import { connect } from "react-redux"; 
//components
import Modal from "../../Modal";
//functions
import { changeNode } from "../../../actions";

const NodeDelete = ({ show, setShow, nodeId, treeData, treeId, changeNode }) => {
  const modalContent = () => {
    return "Bist du dir sicher? Wenn du dieses Zwischenziel löscht, werden alle darunter ebenfalls gelöscht!"
  }

  const modalActions = () => {
    return (
      <>
        <button className="ui negative button" onClick={() => {
            changeNode(nodeId, treeData, treeId, { delete: true })
            setShow(!show)
          }}> 
          Zwischenziel löschen
        </button>
        <button onClick={() => {setShow(!show)}} className="ui button">Abbrechen</button>
      </>
    )
  }

  return (
    <Modal 
      show={show}
      header="Zwischenziel löschen"
      content={modalContent()}
      actions={modalActions()}
      onDismiss={() => setShow(!show)}
    />
  )
}

export default connect(null, { changeNode })(NodeDelete);