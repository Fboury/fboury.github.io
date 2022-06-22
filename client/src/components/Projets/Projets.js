import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import sportActions from "../../redux/actions/sportActions";
import { getSports } from "../../redux/reducers/sportReducer";

export function Projets() {
  const dispatch = useDispatch();

  const sports = useSelector(getSports);

  useEffect(() => {
    dispatch(sportActions.getSports());
  }, []);

  return (
    <div className="Sports">
      <h2 className="title-page">Projets</h2>
      <img className="section-banniere" src="images/maison.png"></img>
    </div>
  );
}
