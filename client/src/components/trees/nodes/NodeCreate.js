//packages
import React from "react";
import { connect } from "react-redux";
//components
import NodeForm from "./NodeForm";
import Modal from "../../Modal";
//functions
import { createNode } from "../../../actions";

const NodeCreate = ({ show, setShow, parentId, treeData, treeId, createNode }) => {
  const onSubmit = formValues => {
    const Child = {
      name: formValues.title,
      attributes: {
        node_id: Date.now(),
        type: formValues.type.value,
        description: formValues.description
      },
      children: []
    }
    if(formValues.type.value === "Checkbox"){
      Child.attributes.done = false
    } else {
      Child.attributes.done = { steps: formValues.steps, done: 0 }
    }

    createNode(parentId, treeData, treeId, Child)
    setShow(!show)
  }

  const modalContent = () => {
    return (
      <NodeForm onSubmit={onSubmit} />
    )
  }

  const modalActions = () => {
    return (
      <>
        <button type="submit" form="nodeForm" className="ui primary button"> 
          Zwischenziel erstellen
        </button>
        <button onClick={() => {setShow(!show)}} className="ui negative button">Abbrechen</button>
      </>
    )
  }

  return (
    <Modal 
      show={show}
      header="Neues Zwischenziel erstellen"
      content={modalContent()}
      actions={modalActions()}
      onDismiss={() => setShow(!show)}
    />
  )
}

export default connect(null, { createNode })(NodeCreate)