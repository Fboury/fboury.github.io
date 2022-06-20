import sportApi from "../../API/sportApi";
import { sportConstants } from "../../constants/sportConstants";
import { commonConstants } from "../../constants/commonConstants";

const createSport = (sport, navigate) => dispatch => {
  return sportApi
    .createSport(sport)
    .then(res => {
      dispatch({ type: sportConstants.CREATE_SPORT, payload: res.data });
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: res
      });
      navigate();
    })
    .catch(err => {
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: err.response
      });

      console.log("test de l'erreur", err.response);
    });
};
const getSports = () => dispatch => {
  return sportApi
    .getSports()
    .then(res => {
      dispatch({
        type: sportConstants.GET_SPORTS,
        payload: res.data.sports
      });
    })
    .catch(err => {
      dispatch({
        type: sportConstants.GET_SPORTS,
        payload: []
      });
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: err.response
      });

      console.log("test de l'erreur", err.response);
    });
};

const sportActions = {
  createSport,
  getSports
};
export default sportActions;
