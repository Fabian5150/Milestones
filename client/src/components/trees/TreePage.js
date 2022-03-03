//packages
import React, { useState, useEffect } from "react";
import Tree from 'react-d3-tree';
//componets
import { fetchTree } from "../../actions";

const TreePage = ({ match: { params } }) => {
  const [treeData, setTreeData] = useState() 
  const [showNodeActions, setShowNodeActions] = useState(false)
  const [currentNodeId, setCurrentNodeId] = useState ()

  useEffect(() => {
    fetchTree(params.id)
    .then(({ payload }) => setTreeData(payload.data))
  }, [])

  const MyForeignObject = ({id}) => {
    if(showNodeActions && id === currentNodeId){
      return (
        <foreignObject x="-25" y="0" width="50" height="50">
          <button className="mini ui circular icon button" onClick={() => console.log("Holá!")}>
            <i className="add icon"></i>
          </button>
        </foreignObject>
      )
    } else return <></>
  }

  const myCustomNode = ({ nodeDatum }) => (
    <g>
      <circle 
        r={20} 
        onClick={() => {
          setCurrentNodeId(nodeDatum.__rd3t.id)
          setShowNodeActions(!showNodeActions)
          console.log(nodeDatum.__rd3t.id)
        }} 
        fill={`${nodeDatum.attributes?.done ? "green" : "red"}`} 
        onMouseOver={() => {}}
        onMouseOut={() => {}}
      />
      
      <MyForeignObject id={ nodeDatum.__rd3t.id }/>
      
      <text fill={`${nodeDatum.name === "CEO" ? "red" : "black"}`} stroke={`${nodeDatum.name === "CEO" ? "red" : "black"}`} strokeWidth="0.3" x="25">
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes?.department && (
        <text fill="black" x="25" y="25" strokeWidth="0.3">
          Department: {nodeDatum.attributes?.department}
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
      </div>
    )
  }  
}

export default TreePage;