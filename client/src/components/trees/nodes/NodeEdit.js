//packages
import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
//components
import NodeForm from "./NodeForm";
import Modal from "../../Modal";
//functions
import { changeNode } from "../../../actions";
import { nestedObjPath } from "../../../functions";

const NodeEdit = ({ show, setShow, nodeId, treeData, treeId, changeNode }) => {
  const onSubmit = formValues => {
    const changes = {
      edit: true,
      name: formValues.title,
      attributes: {
        type: formValues.type.value,
        description: formValues.description
      }
    }

    if(formValues.description === undefined) changes.attributes.description = ""

    if(formValues.type.value === "Counter"){
      changes.attributes.done = {
        steps: formValues.steps,
        done: 0
      }
    } else if(formValues.type.value === "Checkbox") {
      changes.attributes.done = false
    }

    changeNode(nodeId, treeData, treeId, changes)
    setShow(!show)
  }

  const modalContent = () => {
    const nodePath = nestedObjPath(treeData, nodeId)
    const thisNode = _.get(treeData, nodePath)
    const initalValues = {}

    if(thisNode){
      initalValues.title = thisNode.name
      initalValues.description = thisNode.attributes.description
      initalValues.type = thisNode.attributes.type
      if(thisNode.attributes.done.steps) initalValues.steps = String(thisNode.attributes.done.steps)
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

export default connect(null, { changeNode })(NodeEdit)