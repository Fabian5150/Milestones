//packages
import React, { useEffect, useState } from "react";
import _ from "lodash";
//components
import TreeCreate from "./trees/TreeCreate";
import HomePreviewSegment from "./HomePreviewSegment";
//functions
import { fetchTreePreviews } from "../actions";

const Home = () => {
  const [show, setShow] = useState(false)
  const [treePreviews, setTreePreviews] = useState([])

  useEffect(() => {
    fetchTreePreviews()
    .then(({ payload }) => {
      setTreePreviews(payload)
    })
  }, [])

  return (
    <div>
      <button onClick={() => {setShow(true)}} className="right floated ui positive icon circular button">
        <i className="plus icon"/> Neuen Baum erstellen 
      </button>

      <h1>Willkommen zurück!</h1>
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

      <TreeCreate setShow={setShow} show={show}/>
    </div>
  )
}

export default Home;