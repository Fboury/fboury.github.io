import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import errorHelper from "../../helpers/errorHelper";
import { formConstants } from "../../constants/formConstants";
import { FormInput } from "../Commons/FormInput/FormInput";
import circuitActions from "../../redux/actions/circuitActions";
import { FormInputSelect } from "../Commons/FormSelect/FormInputSelect";
import { circuitConstants } from "../../constants/circuitConstants";
import configHelper from "../../helpers/configHelper";

export function CreationCircuit() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    nomCircuit: "",
    paysCircuit: "",
    anneeEnCours: "2021",
    typeCircuit: "",
    descriptionCircuit: ""
  });
  const [annees] = useState(configHelper.generateArrayOfYears());

  const {
    nomCircuit,
    paysCircuit,
    anneeEnCours,
    descriptionCircuit,
    typeCircuit
  } = formValues;

  /**
   * Fonction appelée à la validation du formulaire
   * @param {*} values
   */
  const validateForm = values => {
    let errors = {};
    for (const [key, value] of Object.entries(values)) {
      if (!value) {
        errors[key] = errorHelper.buildErrorFieldRequired(
          formConstants[key].libelleChamp
        );
      }
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const navToCircuits = () => navigate("/circuits");

  /**
   * Fonction appelée au clic sur le bouton de validation du formulaire
   */
  const send = () => {
    if (validateForm(formValues)) {
      dispatch(
        circuitActions.createCircuit(
          {
            nomCircuit,
            paysCircuit,
            anneeEnCours,
            typeCircuit,
            descriptionCircuit
          },
          navToCircuits
        )
      );
    }
  };

  /**
   * Fonction appelée lors d'un changement sur un champ
   * @param {*} event
   */
  const handleChange = event => {
    console.log("event", event.target.name);
    console.log("event", event.target.value);

    setFormErrors({ ...formErrors, [event.target.name]: "" });
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="Login">
      <h2 className="title-page">Création de circuit</h2>
      <Form>
        <FormInput
          handleChange={handleChange}
          formField={formConstants["nomCircuit"]}
          type="text"
          value={formValues["nomCircuit"]}
          formErrors={formErrors}
        />
        <FormInputSelect
          handleChange={handleChange}
          formField={formConstants["paysCircuit"]}
          options={configHelper.paysList()}
          value={formValues["paysCircuit"]}
          formErrors={formErrors}
        />
        <FormInput
          handleChange={handleChange}
          formField={formConstants["descriptionCircuit"]}
          as="textarea"
          value={formValues["descriptionCircuit"]}
          formErrors={formErrors}
        />
        <FormInputSelect
          handleChange={handleChange}
          formField={formConstants["anneeEnCours"]}
          options={annees}
          value={formValues["anneeEnCours"]}
          formErrors={formErrors}
        />
        <FormInputSelect
          handleChange={handleChange}
          formField={formConstants["typeCircuit"]}
          options={circuitConstants.TYPES_CIRCUIT}
          value={formValues["typeCircuit"]}
          formErrors={formErrors}
        />
      </Form>
      <Button className="submit-button my-3" onClick={send} type="submit">
        Créer le circuit
      </Button>
    </div>
  );
}
