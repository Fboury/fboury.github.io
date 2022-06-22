import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import errorHelper from "../../helpers/errorHelper";
import { formConstants } from "../../constants/formConstants";
import { FormInput } from "../Commons/FormInput/FormInput";
import sportActions from "../../redux/actions/sportActions";
import { FormInputSelect } from "../Commons/FormSelect/FormInputSelect";
import { sportConstants } from "../../constants/sportConstants";

const CreationSport = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    titreSeance: "",
    typeSeance: "Course à pied",
    duree: "",
    difficulte: "Fastoche",
    imageTrace: "",
    dateSeance: new Date().toLocaleDateString("fr"),
    meteo: "",
    sportifs: []
  });

  const {
    titreSeance,
    duree,
    typeSeance,
    difficulte,
    imageTrace,
    dateSeance,
    meteo,
    sportifs
  } = formValues;

  /**
   * Fonction appelée à la validation du formulaire
   * @param {*} values
   */
  const validateForm = values => {
    let errors = {};
    for (const [key, value] of Object.entries(values)) {
      console.log("key", key);
      console.log("value", value);

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

  const navToSports = () => navigate("/sports");

  /**
   * Fonction appelée au clic sur le bouton de validation du formulaire
   */
  const send = () => {
    console.log("validateForm(formValues)", validateForm(formValues));

    // if (validateForm(formValues)) {
    dispatch(
      sportActions.createSport(
        {
          titreSeance,
          duree,
          typeSeance,
          difficulte,
          imageTrace,
          dateSeance,
          meteo,
          sportifs
        },
        navToSports
      )
    );
    //}
  };

  /**
   * Fonction appelée lors d'un changement sur un champ
   * @param {*} event
   */
  const handleSelect = values => {
    const newSportifs = values.reduce((prev, curr) => {
      return [...prev, curr.value];
    }, []);
    setFormErrors({ ...formErrors, sportifs: "" });
    setFormValues({
      ...formValues,
      sportifs: newSportifs
    });
  };

  const handleChange = event => {
    setFormErrors({ ...formErrors, [event.target.name]: "" });
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="creation-div">
      <h2 className="title-page">Création de la séance</h2>
      <Form className="form-create">
        <FormInput
          handleChange={handleChange}
          formField={formConstants["titreSeance"]}
          type="text"
          value={formValues["titreSeance"]}
          formErrors={formErrors}
        />
        <FormInputSelect
          handleChange={handleChange}
          formField={formConstants["typeSeance"]}
          options={sportConstants.TYPES_SEANCE}
          value={formValues["typeSeance"]}
          formErrors={formErrors}
        />
        <FormInput
          handleChange={handleChange}
          formField={formConstants["duree"]}
          type="text"
          value={formValues["duree"]}
          formErrors={formErrors}
        />
        <FormInput
          handleChange={handleChange}
          formField={formConstants["dateSeance"]}
          type="text"
          value={formValues["dateSeance"]}
          formErrors={formErrors}
        />
        <FormInput
          handleChange={handleChange}
          formField={formConstants["meteo"]}
          type="text"
          value={formValues["meteo"]}
          formErrors={formErrors}
        />
        <div>
          <p className="p-sportifs">Qui était la ?</p>
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={sportConstants.SPORTIFS}
            onChange={values => handleSelect(values)}
            placeholder="Veuillez choisir au moins une personne"
            noOptionsMessage={() => "Y'a tout le monde"}
          />
        </div>
        <FormInputSelect
          handleChange={handleChange}
          formField={formConstants["difficulte"]}
          options={sportConstants.DIFFICULTES}
          value={formValues["difficulte"]}
          formErrors={formErrors}
        />
        {/* <FormInput
          handleChange={handleChange}
          formField={formConstants["imageTrace"]}
          type="file"
          value={formValues["imageTrace"]}
          formErrors={formErrors}
        /> */}
      </Form>
      <div className="buttons">
        <Button className="buttons-bottom my-3" onClick={navToSports}>
          Retour
        </Button>

        <Button className="buttons-bottom my-3" onClick={send} type="submit">
          Créer la séance
        </Button>
      </div>
    </div>
  );
};
export default CreationSport;
