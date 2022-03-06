//packages
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//functions
import { fetchTreePreviews, fetchCategories } from "../../actions";

const TreeList = ( {match: {params}} ) => {
  const [treePreviews, setTreePreviews] = useState()
  const [categories, setCategories] = useState()

  useEffect(() => {
    fetchTreePreviews()
    .then(({ payload }) => {
      setTreePreviews(payload)
    })

    fetchCategories()
    .then(({ payload }) => {
      setCategories(payload)
    })
  }, [])

  const categoryIcon = treePreview => {
    let icon = "sitemap"

    if(categories) {
      categories.forEach(category => {
        if(category.value === treePreview.category){
          icon = category.icon
        }
      })
    } 

    return icon
  }

  const renderList = () => {
    if(!treePreviews){
      return <div>Loading...</div>
    }

    return treePreviews.map(preview => {
      return (
        <div className="item" key={preview.id}>
          <Link to={`/tree/${preview.id}`} className="right floated ui icon button">
            <i className="external icon"></i>
          </Link>
          <i className={`${categoryIcon(preview)} large middle aligned icon`}/>
          <div className="content">
              {preview.title} ({preview.category})
              <div className="description">
                {preview.description}
              </div>
          </div>
        </div>
      )
    })
  }

  if(params.key === "all"){
    return (
      <>
        <h1>Alle Bäume</h1>
        <div className="ui green segment">
          <div className="ui celled list">
            {renderList()}
          </div>
        </div>        
      </>
    )
  } else {
    return (
      <div>
        <h1>TreeList</h1>
        <p>{`Trees filterd by ${params.searchBy}, with the key of ${params.key}.`}</p>
      </div>
    )
  }
}

export default TreeList;