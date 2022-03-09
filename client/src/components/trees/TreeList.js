//packages
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
//functions
import { fetchTreePreviews, fetchCategory, fetchCategories  } from "../../actions";

const TreeList = ( {match: {params}, category, fetchCategory, treePreviews, fetchTreePreviews, categories, fetchCategories, } ) => {
  useEffect(() => {
    if(params.searchBy === "category"){
      fetchCategory(params.key)
    }
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

  const RenderCrudButtons = () => {
    if(params.searchBy !== "category") return <></>
    return (
      <div className="right floated ui icon buttons">
        <button className="ui icon button">
          <i className="edit icon"/>
        </button>
        <button className="ui icon button">
          <i className="trash icon"/>
        </button>
      </div>
    )
  }

  const RenderListSegment = ({header, items, label}) => {
    return (
      <>
        <RenderCrudButtons />
        <h1 className="floated header">{header}</h1>
        <div className="tiny ui label">{label}</div>
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

  if(params.searchBy === "latest"){
    return <RenderListSegment header="Alle Bäume" items={_.cloneDeep(treePreviews).reverse()} label="Neueste zuerst"/>
  } else if(params.searchBy === "lastEdited"){
    return <RenderListSegment header="Alle Bäume" items={_.orderBy( _.cloneDeep(treePreviews), 'lastWorkedOn').reverse()} label="Zuletzt geöffnete zuerst"/>
  } else if (params.searchBy === "category") {
    const categoryTrees = []
    treePreviews.forEach(preview => {
      if(preview.category === category.value) categoryTrees.push(preview)
    })

    return <RenderListSegment header={`Alle Bäume aus "${category.value}"`} items={_.cloneDeep(categoryTrees).reverse()} label="Neueste zuerst"/>
  }
}

const mapStateToProps = (state, ownProps) => {
  if(ownProps.match.params.searchBy !== "category"){
    return {
      categories: Object.values(state.categories),
      treePreviews: state.trees.treePreviews
    }
  } else {
    return {
      categories: Object.values(state.categories),
      category: state.categories[ownProps.match.params.key],
      treePreviews: state.trees.treePreviews
    }
  }
}

export default connect(mapStateToProps, { fetchCategory, fetchTreePreviews, fetchCategories })(TreeList);