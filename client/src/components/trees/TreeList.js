//packages
import React from "react";

const TreeList = ( {match: {params}} ) => {
    return (
        <div>
            <h1>TreeList</h1>
            <p>{`Trees filterd by ${params.searchBy}, with the key of ${params.key}.`}</p>
        </div>
    )
}

export default TreeList;