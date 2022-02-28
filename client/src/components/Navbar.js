//packages
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
//components
import Searchbar from "./SearchBar";
import Auth from "./Auth";
//data
import categories from "../categories";

const renderCategories = () => {
  return categories.map(category => {
    return(
      <Link to={`/search/category/${category.value}`} className="item" key={category.value}>
        <i className={`icon ${category.icon}`}/>
        {category.value}
      </Link>
    )
  })
}

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
          {renderCategories()}
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