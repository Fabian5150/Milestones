//packages
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Tree from 'react-d3-tree';
import _ from "lodash";
//functions
import { fetchTree, changeNode, changeTreePreview, fetchCategories } from "../../../actions";
//components
import NodeCreate from "../nodes/NodeCreate";
import NodeEdit from "../nodes/NodeEdit";
import NodeDelete from "../nodes/NodeDelete";
import TopMenu from "./TopMenu";
import LoadingSpinner from "../../LoadingSpinner";
import MyForeignObject from "./MyForeignObject";

const TreePage = ({ match: { params }, fetchTree, treePreview, changeTreePreview, changeNode, treeData, categories }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedNodeId, setSelectedNodeId] = useState (0)

  useEffect(() => {
    fetchTree(params.id)
    changeTreePreview( params.id, { lastWorkedOn: Date.now() })
  }, [])

  const addNode = () => setShowCreateModal(true)
  const editNode = () => setShowEditModal(true)
  const deleteNode = () => setShowDeleteModal(true)

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
      
      <MyForeignObject 
        attributes={attributes} 
        name={name}
        editNode={editNode}
        deleteNode={deleteNode}
        addNode={addNode}
        changeNode={changeNode}
        treeData={treeData} 
        treePreview={treePreview}
        selectedNodeId={selectedNodeId}
      />
      
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

    return (
      <>
        <div className="ui segments">
          <div className="ui segment">
          <TopMenu 
              title={treePreview.title} 
              description={treePreview.description} 
              category={treePreview.category}  
              categoryIcon={categoryIcon}
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