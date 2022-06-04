import React from "react";
import { FormGroup, FormLabel, Form } from "react-bootstrap";

export function FormCheck({ formField, formErrors, disabled = true }) {
  return (
    <FormGroup controlId={formField.nomChamp}>
      <FormLabel>{formField.libelleChamp}</FormLabel>
      <Form.Check
        defaultChecked={false}
        disabled={disabled}
        type="checkbox"
        name={formField.nomChamp}
        onChange={event => handleSelect(event, user)}
        label={
          disabled
            ? "Demandez à l'administrateur de vous donner les droits"
            : ""
        }
      />
      {formErrors[formField.nomChamp] && (
        <p className="text-danger">{formErrors[formField.nomChamp]}</p>
      )}
    </FormGroup>
  );
}
