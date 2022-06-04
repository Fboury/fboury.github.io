import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import userActions from "../../redux/actions/userActions";
import { getUser } from "../../redux/reducers/userReducer";
import { ModalCommon } from "../Commons/Modal/Modal";
import { commonConstants } from "../../constants/commonConstants";

export function Dashboard() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getUser);
  const [newUsers, setNewUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(userActions.getUsers()).then(res => {
      setNewUsers(res);
    });
  }, [dispatch]);

  const handleClickConfirm = id => {
    const user = newUsers.find(user => user._id === id);
    dispatch(userActions.updateDroitsUserById(user));
  };

  const handleCloseModal = () => {
    setShow(false);
    setId("");
  };

  const handleConfirmModal = () => {
    dispatch(userActions.deleteUser(id));
    setNewUsers(newUsers.filter(user => user._id !== id));
    setShow(false);
  };

  const handleClickTrash = id => {
    if (id === currentUser._id) {
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: {
          status: 300,
          data: {
            text:
              "Suppression impossible, cet utilisateur est connecté actuellement"
          }
        }
      });
    } else {
      setShow(true);
      setId(id);
    }
  };

  const handleSelect = (event, currentUser) => {
    const index = newUsers.findIndex(user => user._id === currentUser._id);

    newUsers[index] = {
      ...currentUser,
      [event.target.name]: event.target.checked
    };
  };

  return (
    <div className="Dashboard">
      <ModalCommon
        show={show}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmModal}
        title="Suppression d'utilisateur"
        body="Êtes vous sur de vouloir supprimer cet utilisateur ?"
      />
      <h3 className="title-page">Liste des utilisateurs et de leurs droits</h3>
      <ListGroup>
        {newUsers.map((user, index) => (
          <ListGroupItem key={index}>
            <Container fluid="md">
              <Row className="mb-2">
                <Col sm={2}>{user.email}</Col>
                <Col sm={4}>
                  <Form.Check
                    defaultChecked={user.droitsCreation}
                    type="checkbox"
                    name="droitsCreation"
                    label="Droits de création"
                    onChange={event => handleSelect(event, user)}
                  />
                </Col>
                <Col sm={4}>
                  <Form.Check
                    defaultChecked={user.droitsEdition}
                    type="checkbox"
                    name="droitsEdition"
                    label="Droits d'édition"
                    onChange={event => handleSelect(event, user)}
                  />
                </Col>
                <Col sm={2}>
                  <Button
                    className="me-1"
                    variant="success"
                    onClick={() => handleClickConfirm(user._id)}
                  >
                    <i className="bi-check2"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleClickTrash(user._id)}
                  >
                    <i className="bi-trash"></i>
                  </Button>
                </Col>
              </Row>
            </Container>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
