//packages
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
//components
import TreeCreate from "./trees/TreeCreate";
import HomePreviewSegment from "./HomePreviewSegment";
import LoadingSpinner from "./LoadingSpinner";
//functions
import { fetchTreePreviews } from "../actions";

const Home = ({ treePreviews, fetchTreePreviews }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    fetchTreePreviews()
  }, [])

  const renderSegments = () => {
    if(!treePreviews){
      return <LoadingSpinner />
    } else { 
      return(
        <>
          <HomePreviewSegment 
            previews={ _.take( _.orderBy( _.cloneDeep(treePreviews), 'lastWorkedOn').reverse() , 4) }
            header="Daran haben sie zuletzt gearbeitet:"
            buttonLabel="Zeige alle Bäume"
            link="/search/lastEdited/all"
          />
          <HomePreviewSegment 
            previews={ _.take(_.cloneDeep(treePreviews).reverse(), 4) }
            header="Kürzlich erstellt: "
            buttonLabel="Zeige alle Bäume"
            link="/search/latest/all"
          />
        </>
      )
    }
  }
  

  return (
    <div>
      <button onClick={() => {setShow(true)}} className="right floated ui positive icon circular button">
        <i className="plus icon"/> Neuen Baum erstellen 
      </button>

      <h1>Willkommen zurück!</h1>
      
      {renderSegments()}

      <TreeCreate setShow={setShow} show={show}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    treePreviews: state.trees.treePreviews
  }
}

export default connect(mapStateToProps, { fetchTreePreviews })(Home);