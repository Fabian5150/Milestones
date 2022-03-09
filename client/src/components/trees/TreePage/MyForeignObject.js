//packages
import React from "react";
//components
import RenderNodeActions from "./RenderNodeActions";

const MyForeignObject = ({attributes, name, selectedNodeId, editNode, deleteNode, addNode, changeNode, treeData, treePreview}) => {
  if(attributes.node_id === selectedNodeId){
    if(attributes.node_id !== 0){
      return (
        <>
          <foreignObject x="-35" y="-42.5" width="50" height="50">
            <button className="small ui circular icon button" onClick={() => editNode()}>
              <i className="edit icon"></i>
            </button>
          </foreignObject>
          <foreignObject x="-35" y="-15" width="50" height="50">
            <button className="small ui circular icon button" onClick={() => deleteNode()}>
              <i className="trash icon"></i>
            </button>
          </foreignObject>
          <foreignObject x="-35" y="12.5" width="50" height="50">
            <button className="small ui circular icon button" onClick={() => addNode()}>
              <i className="add icon"></i>
            </button>
          </foreignObject>
          <foreignObject x="-300" y="-50" width="250" height="700">
            <div className="ui raised card">
              <div className="content">
                <div className="header">{name}</div>
              </div>
              <div className="content">
                <div className="summary">
                  {`${attributes.description ? attributes.description : "(keine Beschreibung vorhanden)"}`}
                </div>
              </div>
              <div className="extra content">
                <div className="right floated">
                  <RenderNodeActions 
                    type={attributes.type}
                    done={attributes.done}
                    node_id={attributes.node_id}  
                    changeNode={changeNode}
                    treeData={treeData}
                    treePreview={treePreview}
                  />
                </div>
              </div>
            </div>
          </foreignObject>
        </>        
      )
    } else{
      return (
        <foreignObject x="-25" y="0" width="50" height="50">
          <button className="mini ui circular icon button" onClick={() => addNode()}>
            <i className="add icon"></i>
          </button>
        </foreignObject>
      )
    }
    
  } else return <></>
}

export default MyForeignObject