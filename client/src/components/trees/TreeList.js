//packages
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//functions
import { fetchTreePreviews, fetchCategoriesNEW } from "../../actions";

const TreeList = ( {match: {params}, categoriesNEW, fetchCategoriesNEW } ) => {
  const [treePreviews, setTreePreviews] = useState()

  useEffect(() => {
    fetchCategoriesNEW()

    fetchTreePreviews()
    .then(({ payload }) => {
      setTreePreviews(payload)
    })
  }, [])

  const categoryIcon = treePreview => {
    let icon = "sitemap"

    if(categoriesNEW) {
      categoriesNEW.forEach(category => {
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

const mapStateToProps = state => {
  return {
    categoriesNEW: state.categories.categories
  }
}

export default connect(mapStateToProps, { fetchCategoriesNEW })(TreeList);