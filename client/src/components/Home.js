//packages
import React, { useState } from "react";
//components
import Modal from "./Modal";
import TreeForm from "./trees/TreeForm";

const Home = () => {
  const [show, setShow] = useState(false)

  const modalContent = () => {
    return (
      <TreeForm onSubmit={() => console.log("yaay")} submitBtn="Baum erstellen"/>
    )
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => {setShow(!show)}} className="circular ui icon button">
        <i className="plus icon"/>
      </button>

      <Modal 
        show={show}
        header="Neuen Baum erstellen"
        content={modalContent()}
        actions={<></>}
        onDismiss={() => setShow(!show)}
      />
    </div>
  )
}

export default Home;