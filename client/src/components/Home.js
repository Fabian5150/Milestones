//packages
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
//functions
import { fetchTreePreviews } from "../actions";
//components
import TreeCreate from "./trees/TreeCreate";
import TreePreview from "./trees/TreePreview";

const Home = () => {
  const [show, setShow] = useState(false)
  const [treePreviews, setTreePreviews] = useState()

  useEffect(() => {
    fetchTreePreviews()
    .then(({ payload }) => {
      setTreePreviews(payload)
    })
  }, [])

  const renderCards = () => {
    if(!treePreviews){
      return <div>Loading...</div>
    } else {
      if(treePreviews.length === 0){
        return <div>Keine Bäume vorhanden</div>
      }

      const first4 = _.take(treePreviews, 4)

      return <>
        {first4.map(preview => {
          return <TreePreview treePreview={preview} key={preview.id}/>
        })}
      </>
    }
  }

  return (
    <div>
      <button onClick={() => {setShow(true)}} className="right floated ui positive icon circular button">
        <i className="plus icon"/> Neuen Baum erstellen 
      </button>

      <h1>Willkommen zurück!</h1>
      <div className="ui green segment">
        <h3 className="ui left floated header">Daran haben sie zuletzt gearbeitet:</h3>
        <Link to="/search/all/latestFirst" className="right floated tiny ui right labeled icon button">
          <i className="right arrow icon" />
          Zeige alle Bäume
        </Link>

        <div className="ui clearing hidden divider" />

        <div className="ui content">
          <div className="ui four cards">
            {renderCards()}
          </div>
        </div>
        
      </div>

      <TreeCreate setShow={setShow} show={show}/>
    </div>
  )
}

export default Home;