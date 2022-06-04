import React from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";

export function FormInput({
  handleChange,
  formField,
  type,
  value,
  formErrors,
  as,
  placeholder
}) {
  return (
    <FormGroup controlId={formField.nomChamp}>
      <FormLabel>{formField.libelleChamp}</FormLabel>
      <FormControl
        type={type}
        name={formField.nomChamp}
        value={value}
        onChange={handleChange}
        as={as}
        placeholder={placeholder}
      />
      {formErrors[formField.nomChamp] && (
        <p className="text-danger">{formErrors[formField.nomChamp]}</p>
      )}
    </FormGroup>
  );
}
