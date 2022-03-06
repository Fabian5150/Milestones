//packages
import React, { useState, useEffect } from "react";
//functions
import { fetchTreePreviews } from "../../actions";

const TreeList = ( {match: {params}} ) => {
  const [treePreviews, setTreePreviews] = useState()

  useEffect(() => {
    fetchTreePreviews()
    .then(({ payload }) => {
      setTreePreviews(payload)
    })
  }, [])

  if(params.searchBy === "all"){
    return <div>Alle Bäume</div>
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