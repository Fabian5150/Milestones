//packages
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
//components
import Dropdown from "../Dropdown"; 

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
 
  const options = [
    //TODO: fetch users categories drom API
    {
        label: 'Musik',
        value: 'Musik'
    },
    {
        label: 'Sport',
        value: 'Sport'
    },
    {
        label: 'Programmieren',
        value: 'Programmieren'
    }
  ];

  const [selected, setSelected] = useState(options[0])
  const renderCategory = ({label}) => {
    return (
      <Dropdown
        label={label}
        options={options}
        selected={selected}
        onSelectedChange={setSelected}
      />
    )
  }

  const onSubmit = (formValues) => {
    //Quelle: Grider, streams/components/streams/StreamForm
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
        }
 
        if (!formValues.description) {
          errors.description = "Beschreibung kann nicht leer sein.";
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
              <Field name="category" component={renderCategory} label="Kategorie: "/>
              <button className="ui button primary">{props.submitBtn}</button>
            </div>
          </div>
        </form>
      )}
    />
  );
};
 
export default TreeForm;