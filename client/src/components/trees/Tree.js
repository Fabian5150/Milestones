//packages
import React from "react";

const Tree = ({match:{params}}) => {
  return (
    <div>
      <h1><i className="sitemap icon"/> Tree</h1> 
      {`Tree with id ${params.id}`}
    </div>
  )
}

export default Tree;