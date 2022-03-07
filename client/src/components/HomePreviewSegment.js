//packages
import React from "react";
import { Link } from "react-router-dom";
//components
import TreePreviewCard from "./trees/TreePreviewCard";

const HomePreviewSegment = ({ previews, header, buttonLabel, link }) => {
  const renderCards = () => {
    if(previews.length === 0){
      return <div>Keine Bäume vorhanden</div>
    }

    return <>
      {previews.map(preview => {
        return <TreePreviewCard treePreview={preview} key={preview.id}/>
      })}
    </>
  }

  return(
    <div className="ui green segment">
        <h3 className="ui left floated header">{header}</h3>
        <Link to={link} className="right floated tiny ui right labeled icon button">
          <i className="right arrow icon" />
          {buttonLabel}
        </Link>

        <div className="ui clearing hidden divider" />

        <div className="ui content">
          <div className="ui four cards">
            {renderCards()}
          </div>
        </div>
        
      </div>
  )
}

export default HomePreviewSegment;