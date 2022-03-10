//packages
import React from "react";

const TopMenu = ({ title, description, category, categoryIcon, treeChange, treeDelete }) => {
  const RenderButtons = () => {
    return (
      <div className="right floated ui icon buttons">
        <button className="ui icon button" onClick={() => treeChange()}>
          <i className="edit icon"/>
        </button>
        <button className="ui icon button" onClick={() => treeDelete()}>
          <i className="trash icon"/>
        </button>
      </div>
    )
  }

  return(
    <div className="ui green segment">
        <h2 className="ui floated header">{title}</h2>  
        <RenderButtons />
      <div className="ui clearing divider" />
      <h3 className="ui right floated header">
          <i className={`${categoryIcon} icon`}/>
          {category}
        </h3>
      <div>Beschreibung: {description}</div>
    </div>
  )
}

export default TopMenu