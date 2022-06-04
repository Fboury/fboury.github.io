import circuitApi from "../../API/circuitApi";
import { circuitConstants } from "../../constants/circuitConstants";
import { commonConstants } from "../../constants/commonConstants";

const createCircuit = (circuit, navigate) => dispatch => {
  return circuitApi
    .createCircuit(circuit)
    .then(res => {
      dispatch({ type: circuitConstants.CREATE_CIRCUIT, payload: res.data });
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
const getCircuits = anneeEnCours => dispatch => {
  return circuitApi
    .getCircuits(anneeEnCours)
    .then(res => {
      dispatch({
        type: circuitConstants.GET_CIRCUITS,
        payload: res.data.circuits
      });
    })
    .catch(err => {
      dispatch({
        type: circuitConstants.GET_CIRCUITS,
        payload: []
      });
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: err.response
      });

      console.log("test de l'erreur", err.response);
    });
};

const circuitActions = {
  createCircuit,
  getCircuits
};
export default circuitActions;
