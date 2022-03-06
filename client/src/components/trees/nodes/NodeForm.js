//Quelle: Grider, streams/components/streams/StreamForm (modifiziert)
//packages
import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
//components
import Dropdown from "../../Dropdown"; 

const NodeForm = (props) => {
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
    const className = `field ${meta.error && meta.touched ? "error" : ""} ${disabled && label === "steps" ? "disabled" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const options = [
    {
      label: "Checkbox",
      value: "Checkbox",
      icon: "check square"
    },
    {
      label: "Counter",
      value: "Counter",
      icon: "list alternate"
    }
  ]


  const [selectedType, setSelectedType] = useState(options[0])
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if(selectedType.value === "Counter"){
      setDisabled(false)
    } else setDisabled(true)
  }, [selectedType])
  
  const renderTypeDropdown = () => {
    return (
      <div className={`field`}>
        <Dropdown 
          label="Typ: "
          options={options}
          selected={selectedType}
          onSelectedChange={setSelectedType}
        />
      </div>
    )
  }

  const onSubmit = (formValues) => {
    formValues.type = selectedType
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
        } else if(formValues.title.length > 25){
          errors.title = "Titel darf nicht länger als 25 Zeichen sein."
        }

        if(formValues.steps && formValues.steps.isNaN){
          errors.steps = "Gebe eine Zahl ein."
        } 

        return errors;
      }}

      render={({ handleSubmit }) => (
      <form id="nodeForm" onSubmit={handleSubmit} className="ui form error">
          <div className="ui two column grid">
            <div className="column">
              <Field name="title" component={renderInput} label="Zwischenziel Name:"/>  
              <Field name="description" component={renderInput} label="Zwischenziel Beschreibung:"/>
            </div>
            <div className="column">
              <Field name="type" component={renderTypeDropdown}/>
              <Field name="steps" component={renderInput} label="Anzahl Schritte: "/>
            </div>
          </div>
        </form>
      )}
    />
  );
};
 
export default NodeForm;