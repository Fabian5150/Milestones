//packages
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="ui segment">
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Laden</div>
      </div>
      <p></p>
    </div>
  )
}

export default LoadingSpinner