import React from "react";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  return (
    <div className="Footer">
      <p>
        <b>© 2022 Site réalisé par Florian BOURY (s/o Bahia MOREAU)</b>
      </p>

      <div className="instagram">
        <i>Notre instagram :</i>
        <img
          onClick={() =>
            window.open("https://www.instagram.com/mitoufles_and_cie/?hl=fr")
          }
          className="insta-logo"
          src="images/logo-instagram.png"
        />
        <i>Instagram dessin Bouillaaa :</i>
        <img
          onClick={() =>
            window.open("https://www.instagram.com/aquabeille/?hl=fr")
          }
          className="insta-logo"
          src="images/logo-instagram.png"
        />
      </div>
    </div>
  );
}
