//packages
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//components
import Searchbar from "./SearchBar";
import Auth from "./Auth";
import CategoryCreate from "./categories/CategoryCreate";
import { fetchCategories } from "../actions";

const Navbar = () => {
  const [categories, setCategories] = useState()

  useEffect(() => {
    fetchCategories()
    .then(({ payload }) => {
      setCategories(payload)
    })
  }, [])

  const [show, setShow] = useState(false)
  const renderCategories = () => {
    if(!categories){
      return <div>Loading...</div>
    } else {
      return <>
        <div className="item" onClick={() => setShow(true)}>
          <i className="add icon circular"/>
          Kategorie hinzufügen
        </div>
        {categories.map(category => {
          return(
            <Link to={`/search/category/${category.value}`} className="item" key={category.value}>
              <i className={`icon ${category.icon}`}/>
              {category.value}
            </Link>
          )
        })}
      </> 
    }   
  }

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
      <CategoryCreate setShow={setShow} show={show}/>
    </div>
  )
}

export default Navbar;