//packages
import React, { useState } from "react";
//components
import history from "../history";

const Searchbar = ({ placeholder }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    history.push(`/search/term/${term}`)
    setTerm('');
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="ui icon input">
      <input 
        type="text" 
        placeholder={placeholder} 
        value={term}
        onChange={(e) => setTerm(e.target.value)}    
      />
      <i className="search icon" />
    </form>    
  )
}

export default Searchbar;