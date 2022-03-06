//Quelle: Grider, streams/components/streams/StreamForm (modifiziert)
//packages
import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
//components
import Dropdown from "../Dropdown"; 
//functions
import { fetchCategories } from "../../actions";
//data
import icons from "../../categoryIcons";

const TreeForm = (props) => {
  const [categories, setCategories] = useState()

  useEffect(() => {
    fetchCategories()
    .then(({ payload }) => {
      setCategories(payload)
    })
  }, [])

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
 
  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const [selectedCategory, setSelectedCategory] = useState("")
  const [disabled, setDisabled] = useState(false)

  const renderCategoryDropdown = () => {
    if(!categories){
      return <div>Loading...</div>
    } else {
      return (
        <div className={`field ${disabled ? "disabled" : ""}`}>
          <Dropdown
            label="Kategorie: "
            options={categories}
            selected={selectedCategory}
            onSelectedChange={setSelectedCategory}
          />
        </div>
      )
    }   
  }


  const [selectedIcon, setSelectedIcon] = useState("")
  
  const renderIconDropdown = () => {
    return (
      <div className={`field ${!disabled ? "disabled" : ""}`}>
        <Dropdown 
          label="Icon: "
          options={icons}
          selected={selectedIcon}
          onSelectedChange={setSelectedIcon}
        />
      </div>
    )
  }

  const onSubmit = (formValues) => {
    if(selectedCategory !== "") formValues.category = selectedCategory.value
    if(selectedIcon !== "") formValues.newCategoryIcon = selectedIcon.value
    props.onSubmit(formValues);
  };

  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={(formValues) => {
        const errors = {};

        if (!formValues.title) {
          errors.title = "Name kann nicht leer sein.";
        } else if(formValues.title.length > 20){
          errors.title = "Titel darf nicht länger als 20 Zeichen sein."
        }

        if(formValues.newCategory){
          setDisabled(true) 
          setSelectedCategory("")
          if(formValues.newCategory.length > 20){
            errors.newCategory = "Kategorie darf nicht länger als 20 Zeichen sein."
          }
        } else{
          setSelectedIcon("")
          setDisabled(false)
        }

        return errors;
      }}

      render={({ handleSubmit }) => (
        <form id="treeForm" onSubmit={handleSubmit} className="ui form error">
          <div className="ui two column grid">
            <div className="column">
              <Field name="title" component={renderInput} label="Baumname:" />
              <Field name="description" component={renderInput} label="Beschreibung:" />
            </div>
            <div className="column">
              <Field name="category" component={renderCategoryDropdown} />
              <div className="ui two column grid">
                <div className="column">
                  <Field name="newCategory" component={renderInput} label="Oder erstelle neue Kategorie:" />
                </div>
                <div className="column">
                  <Field name="newCategoryIcon" component={renderIconDropdown} />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    />
  );
};
 
export default TreeForm;