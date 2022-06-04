import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import circuitActions from "../../redux/actions/circuitActions";
import { getCircuits } from "../../redux/reducers/circuitReducer";
import configHelper from "../../helpers/configHelper";

export function Circuits() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anneeEnCours, setAnneeEnCours] = useState("2021");
  const [annees] = useState(configHelper.generateArrayOfYears());

  const circuits = useSelector(getCircuits);

  const handleChangeAnnee = event => setAnneeEnCours(event.target.value);

  useEffect(() => {
    dispatch(circuitActions.getCircuits({ anneeEnCours }));
  }, [dispatch, anneeEnCours]);

  const onClickCreate = () => navigate("creer-circuit");

  return (
    <div className="Circuits">
      <h2 className="title-page">Circuits</h2>
      <Container>
        <Row>
          <Col md={2}>
            <Form.Select
              autoFocus
              name="anneeEnCours"
              value={anneeEnCours}
              onChange={handleChangeAnnee}
            >
              {annees.map((annee, index) => (
                <option key={index} value={annee.value}>
                  {annee.label}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={{ span: 2, offset: 8 }}>
            <Button variant="outline-primary" onClick={onClickCreate}>
              Créer un circuit
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <ListGroup>
              {circuits.map((circuit, index) => {
                return (
                  <ListGroupItem key={index}>
                    <p>{`${circuit.nomCircuit} - ${circuit.paysCircuit}`}</p>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
