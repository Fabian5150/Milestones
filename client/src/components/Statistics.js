//packages
import React, { useState } from "react";
//components
import Modal from "./Modal";

const Statistics = () => {
    const [show, setShow] = useState(true)

    return (
        <div>
            <h1>Statistiken</h1>
            
            <button onClick={() => setShow(!show)} className="circular ui icon button">
                <i className="plus icon"/>
            </button>

            <Modal 
                show={show}
                header="Titel"
                content={"hui"}
                actions={"yae"}
                onDismiss={() => setShow(!show)}
            />
        </div>
    )
}

export default Statistics;