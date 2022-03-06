//packages
import React from "react";

const TreePreview = ({ treePreview }) => {
  return (
    <div className="card">
      <div className="content">
        <div className="header">
          {treePreview.title}
        </div>
        <div className="meta">
          {treePreview.category}
        </div>
        <div className="description">
          {treePreview.description}
        </div>
      </div>
      <div className="ui bottom attached button">
        <i className="external icon"></i>
        Öffnen
      </div>
    </div>
  )
}

export default TreePreview