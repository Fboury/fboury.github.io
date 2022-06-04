import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import errorHelper from "../../helpers/errorHelper";
import { formConstants } from "../../constants/formConstants";
import { FormInput } from "../Commons/FormInput/FormInput";
import userActions from "../../redux/actions/userActions";
import { FormCheck } from "../Commons/FormCheck/FormCheck";

export function Signup() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  //const [showMessage, setShowMessage] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    cpassword: "",
    nomUser: "",
    droitsCreation: false,
    droitsEdition: false
  });

  const {
    email,
    password,
    nomUser,
    droitsCreation,
    droitsEdition
  } = formValues;

  /**
   * Fonction appelée à la validation du formulaire
   * @param {*} values
   */
  const validateForm = values => {
    let errors = {};
    for (const [key, value] of Object.entries(values)) {
      const droitsCreaOrEdit =
        key === formConstants.droitsCreation.nomChamp ||
        key === formConstants.droitsEdition.nomChamp;

      if (!value && !droitsCreaOrEdit) {
        errors[key] = errorHelper.buildErrorFieldRequired(
          formConstants[key].libelleChamp
        );
      }

      const passwordOrConfirmPassword =
        key === formConstants.password.nomChamp ||
        key === formConstants.cpassword.nomChamp;
      if (passwordOrConfirmPassword && values.password !== values.cpassword) {
        errors.password = "Les deux mots de passe ne sont pas identiques";
        errors.cpassword = "Les deux mots de passe ne sont pas identiques";
      }

      //email field
      if (
        key === formConstants.email.nomChamp &&
        !/\S+@\S+\.\S+/.test(values.email)
      ) {
        errors.email = errorHelper.buildErrorMessageFormat(
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

  const navToAccueil = () => navigate("/");

  /**
   * Fonction appelée au clic sur le bouton de validation du formulaire
   */
  const send = () => {
    // if (!email || email.length === 0) return;
    // if (!password || password.length === 0 || password !== cpassword) return;
    if (validateForm(formValues)) {
      dispatch(
        userActions.createUser(
          {
            email,
            password,
            nomUser,
            droitsCreation,
            droitsEdition
          },
          navToAccueil
        )
      );
    }
  };

  /**
   * Fonction appelée lors d'un changement sur un champ
   * @param {*} event
   */
  const handleChange = event => {
    setFormErrors({ ...formErrors, [event.target.name]: "" });
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="Login">
      <h2 className="title-page">Création d'utilisateur</h2>
      <Form>
        <FormInput
          handleChange={handleChange}
          formField={formConstants["email"]}
          type="email"
          value={formValues["email"]}
          formErrors={formErrors}
        />
        <FormInput
          handleChange={handleChange}
          formField={formConstants["password"]}
          type="password"
          value={formValues["password"]}
          formErrors={formErrors}
        />
        <FormInput
          handleChange={handleChange}
          formField={formConstants["cpassword"]}
          type="password"
          value={formValues["cpassword"]}
          formErrors={formErrors}
        />
        <FormInput
          handleChange={handleChange}
          formField={formConstants["nomUser"]}
          type="text"
          value={formValues["nomUser"]}
          formErrors={formErrors}
        />
        <FormCheck
          formField={formConstants["droitsCreation"]}
          formErrors={formErrors}
        />
        <FormCheck
          formField={formConstants["droitsEdition"]}
          formErrors={formErrors}
        />
      </Form>
      <Button className="submit-button my-3" onClick={send} type="submit">
        Inscription
      </Button>
    </div>
  );
}
