import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logo from "../../../stitch.png";

import { useNavigate, useLocation } from "react-router-dom";
import navHelper from "../../../helpers/navHelper";

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const width = window.innerWidth;

  /**
   * Gère le clic sur le bouton ajouter et redirige vers la bonne page
   */
  const handleClickAdd = () => {
    console.log("location", location);

    switch (location.pathname) {
      case "/sports":
        navigate("sports/creer-sport");
        return;
      case "/livres":
        navigate("livres/creer-livre");
        return;

      case "/vacances":
        navigate("vacances/creer-vacance");
        return;

      case "/projets":
        navigate("projets/creer-projet");
        return;

      default:
        return;
    }
  };

  return (
    <div className="Navigation">
      <Navbar fixed="top" expand="lg" className="navbar-site">
        <Container className="container-nav">
          <Navbar.Brand>
            <img src={logo} className="imageLogo" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbar-scroll"
            data-bs-target="#navbarScroll"
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" activeKey={location.pathname} fill>
              <Nav.Link href="/">Accueil</Nav.Link>
              <Nav.Link href="/vacances">Vacances</Nav.Link>
              <Nav.Link href="/projets">Projets</Nav.Link>
              <Nav.Link href="/sports">Sport</Nav.Link>
              <Nav.Link href="/livres">Livres</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {navHelper.buildAddMessage(location.pathname) && width > 992 && (
            <Button
              className="create-button"
              variant="outline-dark"
              size="sm"
              onClick={handleClickAdd}
            >
              {navHelper.buildAddMessage(location.pathname)}
            </Button>
          )}

          {/* {currentUser && Object.keys(currentUser).length !== 0 && (
            <p className="pl-4">{`Bonjour ${currentUser.nomUser}`}</p>
          )} */}
        </Container>
      </Navbar>
    </div>
  );
}
