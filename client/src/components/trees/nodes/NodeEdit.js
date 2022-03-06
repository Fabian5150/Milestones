//packages
import React from "react";
import _ from "lodash";
//components
import NodeForm from "./NodeForm";
import Modal from "../../Modal";
//functions
import { changeNode } from "../../../actions";
import { nestedObjPath } from "../../../functions";

const NodeEdit = ({ show, setShow, nodeId, treeData, treeId }) => {
  const onSubmit = formValues => {
    const changes = {
      name: formValues.title,
      attributes: {
        type: formValues.type.value,
        description: formValues.description
      }
    }

    if(formValues.type === "Counter"){
      changes.attributes.done = {
        steps: formValues.steps
      }
    } else {
      changes.attributes.done = false
    }

    //changeNode(nodeId, treeData, treeId, changes)
    console.log("Diese Funktion kommt noch :,)")

    setShow(!show)
  }

  const modalContent = () => {
    const nodePath = nestedObjPath(treeData, nodeId)
    const thisNode = _.get(treeData, nodePath)
    const initalValues = {}

    if(thisNode){
      initalValues.title = thisNode.name
      if(thisNode.attributes.description) initalValues.description = thisNode.attributes.description
    }

    return (
      <NodeForm 
        onSubmit={onSubmit} 
        initalValues={initalValues}
      />
    )
  }

  const modalActions = () => {
    return (
      <>
        <button type="submit" form="nodeForm" className="ui primary button"> 
          Zwischenziel verändern
        </button>
        <button onClick={() => {setShow(!show)}} className="ui negative button">Abbrechen</button>
      </>
    )
  }

  return (
    <Modal 
      show={show}
      header="Zwischenziel verändern"
      content={modalContent()}
      actions={modalActions()}
      onDismiss={() => setShow(!show)}
    />
  )
}

export default NodeEdit