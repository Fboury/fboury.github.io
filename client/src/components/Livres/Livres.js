import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import sportActions from "../../redux/actions/sportActions";

export function Livres() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sportActions.getSports());
  }, []);

  return (
    <div className="Sports">
      <h2 className="title-page">Livres</h2>
      <img className="section-banniere" src="images/librairie.png"></img>
    </div>
  );
}
