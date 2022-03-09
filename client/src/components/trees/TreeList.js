//packages
import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
//functions
import { fetchTreePreviews, fetchCategory, fetchCategories  } from "../../actions";
//components
import CategoryDelete from "../categories/CategoryDelete";
import CategoryEdit from "../categories/CategoryEdit";

const TreeList = ( {match: {params}, category, fetchCategory, treePreviews, fetchTreePreviews, categories, fetchCategories, } ) => {
  const [showCategoryDelete, setShowCategoryDelete] = useState(false)
  const [showCategoryEdit, setShowCategoryEdit] = useState(false)
  
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

  const RenderButtons = () => {
    if(params.searchBy !== "category") return <></>
    return (
      <div className="right floated ui icon buttons">
        <button className="ui icon button" onClick={() => setShowCategoryEdit(true)}>
          <i className="edit icon"/>
        </button>
        <button className="ui icon button" onClick={() => setShowCategoryDelete(true)}>
          <i className="trash icon"/>
        </button>
      </div>
    )
  }

  const RenderListSegment = ({header, items, label}) => {
    return (
      <>
        <RenderButtons />
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
  } else if(params.searchBy === "term"){
    const termTrees = []
    treePreviews.forEach(preview => {
      const title = preview.title
      const description = preview.description
      const category = preview.category
      const term = params.key.toLowerCase()
      if(title.toLowerCase().includes(term) || description.toLowerCase().includes(term) || category.toLowerCase().includes(term)){
        termTrees.push(preview)
      }
    })

    return (
      <RenderListSegment 
        header={`Suche nach "${params.key}"`} 
        items={_.cloneDeep(termTrees).reverse()} 
        label="Neueste zuerst"
      />
    )
  } else if (params.searchBy === "category") {
    const categoryTrees = []
    treePreviews.forEach(preview => {
      if(preview.category === category.value) categoryTrees.push(preview)
    })

    const categoryFormValues = { title: category.value, icon: category.icon }
    return (
    <>
      <RenderListSegment 
        header={`Alle Bäume aus "${category.value}"`} 
        items={_.cloneDeep(categoryTrees).reverse()} 
        label="Neueste zuerst"
      />
      <CategoryDelete 
        show={showCategoryDelete}
        setShow={setShowCategoryDelete}
        category={category}
        id={params.key}
        treeAmount={categoryTrees.length}
      />
      <CategoryEdit 
        show={showCategoryEdit}
        setShow={setShowCategoryEdit}
        category={categoryFormValues}
        id={params.key}
      />
    </>
    )
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