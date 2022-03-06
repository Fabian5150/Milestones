//packages
import React, { useState, useEffect } from "react";
import Tree from 'react-d3-tree';
import _ from "lodash";
//functions
import { fetchTree, createNote } from "../../actions";
//components
import NodeCreate from "./nodes/NodeCreate";

const TreePage = ({ match: { params } }) => {
  const [show, setShow] = useState(false)
  const [treeData, setTreeData] = useState() 
  const [selectedNodeId, setSelectedNodeId] = useState ("0")

  useEffect(() => {
    fetchTree(params.id)
    .then(({ payload }) => setTreeData(payload.data))
  }, [])

  const addNode = () => {
    setShow(true)
  }

  const MyForeignObject = ({node_id}) => {
    if(node_id === selectedNodeId){
      if(node_id !== 0){
        return (
          <>
            <foreignObject x="-35" y="-42.5" width="50" height="50">
              <button className="small ui circular icon button" onClick={() => console.log(node_id)}>
                <i className="edit icon"></i>
              </button>
            </foreignObject>
            <foreignObject x="-35" y="-15" width="50" height="50">
              <button className="small ui circular icon button" onClick={() => console.log("Holá!")}>
                <i className="trash icon"></i>
              </button>
            </foreignObject>
            <foreignObject x="-35" y="12.5" width="50" height="50">
              <button className="small ui circular icon button" onClick={() => addNode()}>
                <i className="add icon"></i>
              </button>
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

  const nodeColor = (type, done) => {
    if(type === "root"){
      return "blue"
    } else if(type === "Counter"){
      return "orange"
    } else {      
      if (done) return "green"
      else return "red"
    }
  }

  const done = (type, done) => {
    if(type === "Checkbox"){
      if (done) return "ja"
      else return "nein"
    } else{
      return `${done.done}/${done.steps}`
    }
  }

  const myCustomNode = ({ nodeDatum }) => (
    <g>
      <circle 
        r={20} 
        onClick={() => {
          setSelectedNodeId(nodeDatum.attributes.node_id)
        }} 
        fill={nodeColor(nodeDatum.attributes.type, nodeDatum.attributes.done)} 
      />
      
      <MyForeignObject node_id={nodeDatum.attributes.node_id}/>
      
      <text fill={`${nodeDatum.attributes.node_id === 0 ? "blue" : "black"}`} stroke={`${nodeDatum.attributes.node_id === 0 ? "blue" : "black"}`} strokeWidth="0.3" x="25">
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes.node_id !== 0 && (
        <text fill="black" x="25" y="25" strokeWidth="0.3">
          Erledigt: {done(nodeDatum.attributes.type, nodeDatum.attributes.done)}
        </text>
      )}
    </g>
  );
  
  if(!treeData){
    return <div>Loading...</div>
  } else {
    return (
      <div id="treeWrapper" style={{ width: "100vw", height: "100vh" }}>
        <Tree 
          data={treeData} 
          collapsible={false} 
          zoomable={false}
          orientation='vertical' 
          translate={{ x: window.innerWidth / 2, y: window.innerHeight / 2 }}
          renderCustomNodeElement={myCustomNode}          
        />
        <NodeCreate 
          setShow={setShow} 
          show={show} 
          parentId={selectedNodeId} 
          treeData={treeData}
          treeId={params.id}  
        />
      </div>
    )
  }  
}

export default TreePage;