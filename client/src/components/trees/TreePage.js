//packages
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Tree from 'react-d3-tree';
import _ from "lodash";
//functions
import { fetchTree, changeNode, changeTreePreview, fetchCategories } from "../../actions";
import { useIsMount } from "../customHooks";
//components
import NodeCreate from "./nodes/NodeCreate";
import NodeEdit from "./nodes/NodeEdit";
import NodeDelete from "./nodes/NodeDelete";
import TreeEdit from "./TreeEdit";
import TreeDelete from "./TreeDelete";
import TopMenu from "./TopMenu";
import LoadingSpinner from "../LoadingSpinner";

const TreePage = ({ match: { params }, fetchTree, treePreview, changeTreePreview, changeNode, treeData, categories }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showTreeEdit, setShowTreeEdit] = useState(false)
  const [showTreeDelete, setShowTreeDelete] = useState(false)
  const [selectedNodeId, setSelectedNodeId] = useState (0)

  useEffect(() => {
    fetchTree(params.id)
    changeTreePreview( params.id, { lastWorkedOn: Date.now() })
  }, [])

  const addNode = () => setShowCreateModal(true)
  const editNode = () => setShowEditModal(true)
  const deleteNode = () => setShowDeleteModal(true)

  const RenderNodeActions = ({type, done, node_id}) => {
    const isMount = useIsMount()
    const [isChecked, setIsChecked] = useState(done)
    const [inputValue, setInputValue] = useState(done.done)
    const [deboundcedInputVal, setDebouncedVal] = useState(inputValue)

    useEffect(() => {
      if(type === "Counter"){
        if(!isNaN(inputValue) || inputValue.match(/^[0-9\b]+$/)){
          const timerId = setTimeout(() => {
            setDebouncedVal(inputValue)
          }, 1000)
    
          return () => {
            clearTimeout(timerId)
          }
        } 
      }  
    }, [inputValue])

    useEffect(() => {
      if(!isMount){
        changeNode(node_id, treeData, treePreview.id, {
          attributes: {
            done: isChecked
          }
        })
      }      
    }, [isChecked])

    useEffect(() => {
      if(!isMount){
        if(deboundcedInputVal > done.steps){
          setInputValue(done.steps)
          return
        }
        changeNode(node_id, treeData, treePreview.id, {
          attributes: {
            done: {
              done: parseInt(deboundcedInputVal)
            }
          }
        })
      }      
    }, [deboundcedInputVal])

    if(type === "Checkbox"){
      return (
        <div className="ui checkbox">
          <input 
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              setIsChecked(!isChecked)
            }}
          />
          <label>Erledigt</label>
        </div>
      )
    } else {
      return (
        <div className="ui mini action input">
          <button 
            className="ui green button right pointing label" 
            onClick={() => setDebouncedVal(inputValue+1)}>
            +1
          </button>
          <input type="text" value={inputValue} onChange={(e) => {setInputValue(e.target.value)}}/>
          /{done.steps}
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

  const nodeColor = (type, done) => {
    if(type === "root"){
      return "#64a9c4"
    } else if(type === "Counter"){
      if(done.done !== done.steps){
        return "#ff8f00"
      } else return "#009a40"
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
    return <LoadingSpinner />
  } else {
    let categoryIcon = "sitemap"
    if(categories){
      categories.forEach(category => {
      if(category.value === treePreview.category){
        categoryIcon = category.icon
      }
    })
    }

    const treeChange = () => setShowTreeEdit(true)
    const treeDelete = () => setShowTreeDelete(true)

    return (
      <>
        <div className="ui segments">
          <div className="ui segment">
          <TopMenu 
              title={treePreview.title} 
              description={treePreview.description} 
              category={treePreview.category}  
              categoryIcon={categoryIcon}
              treeChange={treeChange}
              treeDelete={treeDelete}
            />
            <div className="ui green segment" id="treeWrapper" style={{ width: "100%", height: "75vh" }}>
              <Tree 
                data={treeData} 
                collapsible={false} 
                zoomable={true}
                orientation='vertical' 
                translate={{ x: window.innerWidth / 2 - 400, y: window.innerHeight / 2 - 300 }}
                renderCustomNodeElement={myCustomNode}          
              />
            </div>
          </div>
        </div>
        <NodeCreate 
          setShow={setShowCreateModal} 
          show={showCreateModal} 
          parentId={selectedNodeId} 
          treeData={treeData}
          treeId={params.id}  
        />
        <NodeEdit 
          show={showEditModal}
          setShow={setShowEditModal}
          nodeId={selectedNodeId}
          treeData={treeData}
          treeId={params.id}
        />
        <NodeDelete 
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          nodeId={selectedNodeId}
          treeData={treeData}
          treeId={params.id}
        />
        <TreeEdit 
          show={showTreeEdit}
          setShow={setShowTreeEdit}
          treeId={params.id}
          treeData={treeData}
          initialValues={{
            title: treePreview.title, 
            description: treePreview.description, 
            category: treePreview.category,
            categoryIcon
          }}
        />
      </>
    )
  }  
}

const mapStateToProps = state => {
  return {
    treeData: state.trees.tree?.data,
    treePreview: state.trees.treePreview,
    categories: Object.values(state.categories)
  }
}

export default connect(mapStateToProps, { fetchTree, changeTreePreview, changeNode, fetchCategories })(TreePage);