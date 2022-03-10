//Quelle: Grider, streams/components/streams/StreamForm (modifiziert)
//packages
import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
//components
import Dropdown from "../Dropdown"; 
import LoadingSpinner from "../LoadingSpinner";
//functions
import { fetchCategories } from "../../actions";
//data
import icons from "../../categoryIcons";

const TreeForm = (props) => {
  useEffect(() => {
    props.fetchCategories()
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

  const [disabled, setDisabled] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(props.categories[0])
  useEffect(() => {
    if(props.initialValues){
      console.log(props.initialValues)
      setSelectedCategory({
        label: props.initialValues.category,
        value: props.initialValues.category,
        icon: props.initialValues.categoryIcon
      })
    }
  }, [])

  const renderCategoryDropdown = () => {
    if(!props.categories){
      return <LoadingSpinner />
    } else {
      return (
        <div className={`field ${disabled ? "disabled" : ""}`}>
          <Dropdown
            label="Kategorie: "
            options={props.categories}
            selected={selectedCategory}
            onSelectedChange={setSelectedCategory}
          />
        </div>
      )
    }   
  }


  const [selectedIcon, setSelectedIcon] = useState(icons[0])

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
    if(!formValues.newCategory){
      formValues.category = selectedCategory.value
    } else {
      formValues.newCategoryIcon = selectedIcon.value
    }

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
          if(formValues.newCategory.length > 20){
            errors.Category = "Kategorie darf nicht länger als 20 Zeichen sein."
          }
        } else{
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
                  <Field name="CategoryIcon" component={renderIconDropdown} />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    />
  );
};
 
const mapStateToProps = state => {
  return {
    categories: Object.values(state.categories)
  }
}

export default connect(mapStateToProps, { fetchCategories })(TreeForm);