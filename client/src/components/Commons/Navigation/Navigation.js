import React, { useEffect } from "react";
import { Navbar, Nav, Container, Button, ButtonGroup } from "react-bootstrap";
import logo from "../../../logo.png";
import userApi from "../../../API/userApi";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/reducers/userReducer";
import userActions from "../../../redux/actions/userActions";
import { commonConstants } from "../../../constants/commonConstants";

export function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userConnected = userApi.isAuth();
  const currentUser = useSelector(getUser);
  const idUser = localStorage.getItem("id");

  useEffect(() => {
    idUser && dispatch(userActions.getUser({ idUser }));
  }, [idUser, dispatch]);
  /**
   * Gère le clic sur le bouton connexion si un user est déja connecté ou pas
   */
  const handleClickConnexion = async () => {
    if (userConnected) {
      userApi.logout();
      dispatch(userActions.clearUser());
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: {
          data: {
            text: "Déconnexion réussie"
          },
          status: 200
        }
      });
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const displayDashboardButton =
    userConnected &&
    currentUser &&
    (currentUser.droitsCreation || currentUser.droitsEdition);
  return (
    <div className="Navigation">
      <Navbar fixed="top" expand="lg" bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/sports">Vacances</Nav.Link>
            <Nav.Link href="/sports">Projets</Nav.Link>
            <Nav.Link href="/sports">Sport</Nav.Link>
          </Nav>
          <ButtonGroup vertical>
            <Button
              className="mb-2"
              variant="outline-dark"
              size="sm"
              onClick={handleClickConnexion}
            >
              {userConnected ? "Deconnexion" : "Se connecter"}
            </Button>
            {!userConnected && (
              <Button
                variant="outline-dark"
                size="sm"
                onClick={() => navigate("/signup")}
              >
                S'inscrire
              </Button>
            )}
            {displayDashboardButton && (
              <Button
                variant="outline-dark"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                Accéder au dashboard
              </Button>
            )}
          </ButtonGroup>
          {currentUser && Object.keys(currentUser).length !== 0 && (
            <p className="pl-4">{`Bonjour ${currentUser.nomUser}`}</p>
          )}
        </Container>
      </Navbar>
    </div>
  );
}
