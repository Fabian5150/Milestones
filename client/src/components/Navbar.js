//packages
import React from "react";
import { Link } from "react-router-dom";
//components
import Searchbar from "./SearchBar";
import Auth from "./Auth";

const Navbar = () => {
    return (
        <div className="ui borderless menu">
            <Link to="/" className="header item">
                Milestones
                <i className="icon angle double up"/>
            </Link>
            
            <div className="ui item">
                <Searchbar placeholder="Suche Bäume..."/>
            </div>

            <div className="ui simple dropdown item">
                Kategorien
                <i className="dropdown icon"></i>
                <div className="menu">
                    <Link to="/search/category/Lorem" className="item">Lorem</Link>
                    <Link to="/search/category/Ipsum" className="item">Ipsum</Link>
                    <Link to="/search/category/dolor" className="item">dolor</Link>
                    <Link to="/search/category/sit" className="item">sit</Link>
                    <Link to="/search/category/anet" className="item">anet</Link>
                </div>
            </div>

            <Link to="/statistics" className="ui item">
                Statistiken
            </Link>

            <div className="right menu">
                <div className="ui simple dropdown icon item">
                    <i className="icon cog"/>
                    <div className="menu">
                        <div className="item">Hier</div>
                        <div className="item">sind</div>
                        <div className="item">dann</div>
                        <div className="item">irgendwelche</div>
                        <div className="item">Einstellungen</div>
                    </div>
                </div>
                <div className="item">
                    <Auth />
                </div>
            </div>
        </div>
    )
}

export default Navbar;