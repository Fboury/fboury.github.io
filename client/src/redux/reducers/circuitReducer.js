import { circuitConstants } from "../../constants/circuitConstants";

const initialState = {
  circuit: {},
  circuits: []
};

export function circuitReducer(state = initialState, action) {
  switch (action.type) {
    case circuitConstants.CREATE_CIRCUIT:
      return {
        ...state,
        circuit: action.circuit
      };
    case circuitConstants.GET_CIRCUITS:
      return {
        ...state,
        circuits: action.payload
      };
    default:
      return state;
  }
}

export const getCircuit = state => {
  return state.circuit.circuit;
};
export const getCircuits = state => {
  return state.circuit.circuits;
};

export default circuitReducer;
