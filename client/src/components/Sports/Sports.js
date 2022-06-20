import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

import sportActions from "../../redux/actions/sportActions";
import { getSports } from "../../redux/reducers/sportReducer";

export function Sports() {
  const dispatch = useDispatch();

  const sports = useSelector(getSports);

  useEffect(() => {
    dispatch(sportActions.getSports());
  }, []);

  return (
    <div className="Sports">
      <h2 className="title-page">Sports</h2>
      <Container>
        <Row className="mt-3">
          <Col>
            <ListGroup>
              {sports.map((sport, index) => {
                return (
                  <ListGroupItem key={index}>
                    <p>{`${sport.dateSeance} - ${sport.typeSeance}`}</p>
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
