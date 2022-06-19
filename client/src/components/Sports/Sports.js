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

import sportActions from "../../redux/actions/sportActions";
import { getSports } from "../../redux/reducers/sportReducer";
import configHelper from "../../helpers/configHelper";

export function Sports() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anneeEnCours, setAnneeEnCours] = useState("2021");
  const [annees] = useState(configHelper.generateArrayOfYears());

  const sports = useSelector(getSports);

  const handleChangeAnnee = event => setAnneeEnCours(event.target.value);

  useEffect(() => {
    dispatch(sportActions.getSports({ anneeEnCours }));
  }, [dispatch, anneeEnCours]);

  const onClickCreate = () => navigate("creer-sport");

  return (
    <div className="Sports">
      <h2 className="title-page">Sports</h2>
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={{ span: 2, offset: 8 }}>
            <Button variant="outline-primary" onClick={onClickCreate}>
              Créer un sport
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <ListGroup>
              {sports.map((sport, index) => {
                return (
                  <ListGroupItem key={index}>
                    <p>{`${sport.nomSport} - ${sport.paysSport}`}</p>
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
