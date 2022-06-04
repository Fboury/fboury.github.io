import React from "react";
import { FormGroup, FormLabel, Form } from "react-bootstrap";

export function FormInputSelect({
  handleChange,
  formField,
  value,
  formErrors,
  options
}) {
  return (
    <FormGroup controlId={formField.nomChamp}>
      <FormLabel>{formField.libelleChamp}</FormLabel>
      <Form.Select
        name={formField.nomChamp}
        value={value}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
      {formErrors[formField.nomChamp] && (
        <p className="text-danger">{formErrors[formField.nomChamp]}</p>
      )}
    </FormGroup>
  );
}
