//packages
import React from "react";
//components
import Modal from "./Modal";

const Statistics = () => {
    return (
        <div>
            Statistiken
            <Modal 
                title="Titel"
                content={"hui"}
                actions={"yae"}
                onDismiss={() => console.log(":(")}
            />
        </div>
    )
}

export default Statistics;