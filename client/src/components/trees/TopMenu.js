//packages
import React from "react";

const TopMenu = ({ title, description, category }) => {
  return(
    <div className="ui green segment">
        <h2 className="ui floated header">{title}</h2>
        <h3 className="ui right floated header">
          <i className="sitemap icon"/>
        </h3>
      <div className="ui clearing divider" />
    </div>
  )
}

export default TopMenu