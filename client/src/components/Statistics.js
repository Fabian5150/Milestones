//packages
import React, { useState } from "react";
//components
import Modal from "./Modal";
import CategoryForm from "./categories/CategoryForm";

const Statistics = () => {
  const [show, setShow] = useState(true)

  return (
    <div>
      <h1>Statistiken</h1>
      
      <button onClick={() => setShow(!show)} className="circular ui icon button">
        <i className="plus icon"/>
      </button>

      <CategoryForm />
    </div>
  )
}

export default Statistics;