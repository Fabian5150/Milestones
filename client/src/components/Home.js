//packages
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
//components
import TreeCreate from "./trees/TreeCreate";
import HomePreviewSegment from "./HomePreviewSegment";
//functions
import { fetchTreePreviewsNEW } from "../actions";

const Home = ({ treePreviews, fetchTreePreviewsNEW }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    fetchTreePreviewsNEW()
    //console.log(treePreviews)
  }, [])

  const renderSegments = () => {
    if(!treePreviews){
      return <div>Loading...</div>
    } else {
      return(
        <>
          <HomePreviewSegment 
            previews={ _.take( _.orderBy(treePreviews, 'lastWorkedOn').reverse() , 4) }
            header="Daran haben sie zuletzt gearbeitet:"
            buttonLabel="Zeige alle Bäume"
            link="/search/latestFirst/all"
          />
          <HomePreviewSegment 
            previews={ _.take(treePreviews.reverse(), 4) }
            header="Kürzlich erstellt: "
            buttonLabel="Zeige alle Bäume"
            link="/search/latestFirst/all"
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

export default connect(mapStateToProps, { fetchTreePreviewsNEW })(Home);