//Quelle: Grider, streams/components/streams/StreamForm (modifiziert)
//packages
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
//components
import Dropdown from "../Dropdown"; 
//data
import icons from "../../categoryIcons";

const CategoryForm = (props) => {
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
    )
  }

  const [selectedIcon, setSelectedIcon] = useState("")
  
  const renderIconDropdown = () => {
    return (
      <div className="field">
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
    if(selectedIcon != "") formValues.categoryIcon = selectedIcon.value
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

        return errors;
      }}

      render={({ handleSubmit }) => (
        <form id="categoryForm" onSubmit={handleSubmit} className="ui form error">
          <Field name="title" component={renderInput} label="Kategoriename:"/>
          <Field name="categoryIcon" component={renderIconDropdown}/>
          <button className="ui button">Drück mich ;)</button>
        </form>
      )}
    />
  );
};
 
export default CategoryForm;