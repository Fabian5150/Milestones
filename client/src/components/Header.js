//packages
import React from "react";
import { Link } from "react-router-dom";
//components
import Auth from "./Auth";

const Header = () => {
    return (
        <div className="ui menu">
            <Link to="/" className="header item">
                Milestones
                <i className="icon angle double up"/>
            </Link>
            <Link to="/search" className="item">
                    (Searchbar)
                </Link>
            <div className="right menu">
                <Auth />
            </div>
        </div>
    )
}

export default Header;