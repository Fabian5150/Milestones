//packages
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//functions
import { fetchTreePreviews, fetchCategories } from "../../actions";

const TreeList = ( {match: {params}, categories, fetchCategories, treePreviews, fetchTreePreviews } ) => {
  useEffect(() => {
    fetchCategories()
    fetchTreePreviews()
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

  const RenderListSegment = ({header, items}) => {
    return (
      <>
        <h1>{header}</h1>
        <div className="ui green segment">
          <div className="ui celled list">
            {
              items.map(preview => {
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
          </div>
        </div>        
      </>
    )
  }

  if(!treePreviews){
    return <div>Loading...</div>
  }

  if(params.key === "all"){
    return <RenderListSegment header="Alle Bäume" items={treePreviews}/>
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
    categories: state.categories.categories,
    treePreviews: state.trees.treePreviews
  }
}

export default connect(mapStateToProps, { fetchCategories, fetchTreePreviews })(TreeList);