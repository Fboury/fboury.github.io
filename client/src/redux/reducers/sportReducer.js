import { sportConstants } from "../../constants/sportConstants";

const initialState = {
  sport: {},
  sports: []
};

export function sportReducer(state = initialState, action) {
  switch (action.type) {
    case sportConstants.CREATE_SPORT:
      return {
        ...state,
        sport: action.sport
      };
    case sportConstants.GET_SPORTS:
      return {
        ...state,
        sports: action.payload
      };
    default:
      return state;
  }
}

export const getSport = state => {
  return state.sport.sport;
};
export const getSports = state => {
  return state.sport.sports;
};

export default sportReducer;
