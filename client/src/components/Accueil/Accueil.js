import React from "react";

export function Accueil() {
  return (
    <div className="Accueil">
      <h2 className="title-page">Le petit monde de Bahia et Boubou</h2>
      <img className="banniere" src="images/banniere.png"></img>
      <div className="div-images">
        <div className="content-img">
          <img className="img-link" src="images/barcelone.png"></img>
          <div>Aller vers les voyages</div>
        </div>
        <div className="content-img">
          <img className="img-link" src="images/rocking.png"></img>
          <div>Aller vers les projets</div>
        </div>
        <div className="content-img">
          <img className="img-link" src="images/sportifs.png"></img>
          <div>Aller vers le sport</div>
        </div>
        <div className="content-img">
          <img className="img-link" src="images/bibliotheque.png"></img>
          <div>Aller vers les livres</div>
        </div>
      </div>
    </div>
  );
}
