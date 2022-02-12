//packages
import React, { useState } from "react";
//components
import TreeCreate from "./trees/TreeCreate";

const Home = () => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => {setShow(true)}} className="circular ui icon button">
        <i className="plus icon"/>
      </button>

      <TreeCreate setShow={setShow} show={show}/>
    </div>
  )
}

export default Home;