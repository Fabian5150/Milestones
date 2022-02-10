//packages
import React from "react";
import { Link } from "react-router-dom";
//components
import Searchbar from "./SearchBar";
import Auth from "./Auth";

const Header = () => {
    return (
        <div className="ui menu">
            <Link to="/" className="header item">
                Milestones
                <i className="icon angle double up"/>
            </Link>
            <div className="ui item">
                <Searchbar placeholder="Suche Bäume..."/>
            </div>
            <div className="ui item">
                Kategorien
            </div>
            <div className="ui item">
                Statistiken
            </div>

            <div className="right menu">
                <div className="item">
                    <Auth />
                </div>
            </div>
        </div>
    )
}

export default Header;