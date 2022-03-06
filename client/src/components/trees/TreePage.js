//packages
import React, { useState, useEffect } from "react";
import Tree from 'react-d3-tree';
import _ from "lodash";
//functions
import { fetchTree } from "../../actions";
import { useIsMount } from "../customHooks";
//components
import NodeCreate from "./nodes/NodeCreate";
import TopMenu from "./TopMenu";

const TreePage = ({ match: { params } }) => {
  const [show, setShow] = useState(false)
  const [treeData, setTreeData] = useState() 
  const [treePreview, setTreePreview] = useState()
  const [selectedNodeId, setSelectedNodeId] = useState (0)

  useEffect(() => {
    fetchTree(params.id)
    .then(({ payload }) => {
      setTreeData(payload.data)
      setTreePreview(payload)
    })

  }, [])

  const addNode = () => {
    setShow(true)
  }

  const RenderNodeActions = ({type, done}) => {
    const isMount = useIsMount()
    const [isChecked, setIsChecked] = useState(done)
    const [inputValue, setInputValue] = useState(done.done)

    useEffect(() => {
      if(!isMount){
        console.log(isChecked)
      }      
    }, [isChecked])

    useEffect(() => {
      if(!isMount){
        console.log(inputValue)
      }      
    }, [inputValue])

    if(type === "Checkbox"){
      return (
        <div className="ui checkbox">
          <input 
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label>Erledigt</label>
        </div>
      )
    } else {
      return (
        <div className="ui mini action input">
          <button className="ui button" onClick={() => console.log("+1")}>+1</button>
          <input type="text" value={inputValue} onChange={(e) => {setInputValue(e.target.value)}}/>
          <div className="text">/{done.steps}</div>  
        </div>      
      )
    }
  }

  const MyForeignObject = ({attributes, name}) => {
    if(attributes.node_id === selectedNodeId){
      if(attributes.node_id !== 0){
        return (
          <>
            <foreignObject x="-35" y="-42.5" width="50" height="50">
              <button className="small ui circular icon button" onClick={() => console.log(attributes.node_id)}>
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
            <foreignObject x="-300" y="-25" width="250" height="700">
              <div className="ui blue card">
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
                    <RenderNodeActions type={attributes.type} done={attributes.done}/>
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

  const nodeColor = (type, done) => {
    if(type === "root"){
      return "#64a9c4"
    } else if(type === "Counter"){
      return "#ff8f00"
    } else {      
      if (done) return "#009a40"
      else return "#D80026"
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

  const myCustomNode = ({ nodeDatum: {attributes, name} }) => (
    <g>
      <circle 
        r={20} 
        onClick={() => {
          setSelectedNodeId(attributes.node_id)
        }} 
        fill={nodeColor(attributes.type, attributes.done)} 
      />
      
      <MyForeignObject attributes={attributes} name={name}/>
      
      <text fill={`${attributes.node_id === 0 ? "#64a9c4" : "black"}`} stroke={`${attributes.node_id === 0 ? "#64a9c4" : "black"}`} strokeWidth="0.3" x="25">
        {name}
      </text>
      {attributes.node_id !== 0 && (
        <text fill="black" x="25" y="25" strokeWidth="0.3">
          Erledigt: {done(attributes.type, attributes.done)}
        </text>
      )}
    </g>
  );
  
  if(!treeData || !treePreview){
    return <div>Loading...</div>
  } else {
    return (
      <>
        <TopMenu 
          title={treePreview.title} 
          description={treePreview.description} 
          category={treePreview.category}  
        />
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
      </>
    )
  }  
}

export default TreePage;