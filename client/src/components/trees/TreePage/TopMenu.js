//packages
import React from "react";

const TopMenu = ({ title, description, category, categoryIcon }) => {
  return(
    <div className="ui green segment">
        <h2 className="ui floated header">{title}</h2>
        <h3 className="ui right floated header">
          <i className={`${categoryIcon} icon`}/>
          {category}
        </h3>
      <div className="ui clearing divider" />
      <div>Beschreibung: {description}</div>
    </div>
  )
}

export default TopMenu