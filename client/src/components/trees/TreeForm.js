//packages
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
//components
import Dropdown from "../Dropdown"; 
//data
import icons from "../../categoryIcons";
import categories from "../../categories";

const TreeForm = (props) => {
  const renderError = ({ error, touched }) => {
    //Quelle: Grider, streams/components/streams/StreamForm
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
 
  const renderInput = ({ input, label, meta }) => {
    //Quelle: Grider, streams/components/streams/StreamForm
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [disabled, setDisabled] = useState(false)
  const renderCategoryDropdown = () => {
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


  const [selectedIcon, setSelectedIcon] = useState(icons[0])
  const renderIconDropdown = () => {

    return (
      <Dropdown 
        label="Icon: "
        options={icons}
        selected={selectedIcon}
        onSelectedChange={setSelectedIcon}
      />
    )
  }

  const onSubmit = (formValues) => {
    //Quelle: Grider, streams/components/streams/StreamForm
    props.onSubmit(formValues);
  };

  return (
    //Quelle: Grider, streams/components/streams/StreamForm (modifiziert)
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={(formValues) => {
        const errors = {};
 
        if (!formValues.title) {
          errors.title = "Name kann nicht leer sein.";
        }
 
        if (!formValues.description) {
          errors.description = "Beschreibung kann nicht leer sein.";
        }
 
        if(formValues.newCategory){
          setDisabled(true)
        } else{
          setDisabled(false)
        }

        return errors;
      }}

      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="ui form error">
          <div className="ui two column very realxed grid">
            <div className="column">
              <Field name="title" component={renderInput} label="Baumname:" />
              <Field
                name="description"
                component={renderInput}
                label="Beschreibung:"
              />
            </div>
            <div className="column">
              <Field name="category" component={renderCategoryDropdown}/>
              <div className="ui two column very realxed grid">
                <div className="column">
                  <Field name="newCategory" component={renderInput} label="Oder erstelle neue Kategorie:" />
                </div>
                <div className="column">
                  <Field name="newCategoryIcon" component={renderIconDropdown} />
                </div>
              </div>
              <button className="ui button primary">{props.submitBtn}</button>
            </div>
          </div>
        </form>
      )}
    />
  );
};
 
export default TreeForm;