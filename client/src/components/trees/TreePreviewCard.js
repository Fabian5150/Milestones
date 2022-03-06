//packages
import React from "react";
import { Link } from "react-router-dom";

const TreePreviewCard = ({ treePreview }) => {
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
      <Link to={`/tree/${treePreview.id}`} className="ui bottom attached button">
        <i className="external icon"></i>
        Öffnen
      </Link>
    </div>
  )
}

export default TreePreviewCard