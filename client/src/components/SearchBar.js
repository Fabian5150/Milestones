//packages
import React from "react";

const Searchbar = ({ placeholder }) => {
    return (
        <div class="ui icon input">
            <input type="text" placeholder={placeholder} />
            <i class="search icon" />
        </div>
    )
}

export default Searchbar;