import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import userApi from "../../API/userApi";
import { useNavigate } from "react-router-dom";
import { commonConstants } from "../../constants/commonConstants";
import { useDispatch } from "react-redux";

export function Login() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const { email, password } = formValues;

  const send = async () => {
    try {
      const response = await userApi.login(email, password);
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: response
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      navigate("/");
    } catch (error) {
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: error.response
      });

      console.log("test de l'erreur", error.response);
    }
  };
  const handleChange = event => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="Login">
      <h2 className="title-page">Se connecter</h2>
      <FormGroup controlId="email">
        <FormLabel>Email</FormLabel>
        <FormControl
          autoFocus
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup controlId="password">
        <FormLabel>Mot de passe</FormLabel>
        <FormControl
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
        />
      </FormGroup>
      <Button onClick={send} type="submit" className="my-3">
        Connexion
      </Button>
    </div>
  );
}
