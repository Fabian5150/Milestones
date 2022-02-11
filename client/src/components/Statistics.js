//packages
import React from "react";
//components
import Modal from "./Modal";

const Statistics = () => {
    return (
        <div>
            Statistiken
            <Modal 
                show={false}
                header="Titel"
                content={"hui"}
                actions={"yae"}
                onDismiss={() => console.log(":(")}
            />
        </div>
    )
}

export default Statistics;