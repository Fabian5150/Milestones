//packages
import React from "react";

const TreeList = ( {match} ) => {
    return (
        <div>
            <h1>TreeList</h1>
            <p>{`Trees filterd by ${match.params.searchBy}, with the key of ${match.params.key}.`}</p>
        </div>
    )
}

export default TreeList;