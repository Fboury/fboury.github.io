import { userConstants } from "../../constants/userConstants";

const initialState = {
  user: {},
  users: [],
  token: ""
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.CREATE_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      };
    case userConstants.GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case userConstants.DELETE_USER:
      return {
        ...state
      };
    case userConstants.GET_USER_BY_ID:
      return {
        ...state,
        user: action.payload
      };
    case userConstants.UPDATE_DROITS_USER_BY_ID:
      return {
        ...state
      };
    case userConstants.CLEAR_USER:
      return {
        ...state,
        user: {}
      };
    default:
      return state;
  }
}

export const getUser = state => {
  return state.user.user;
};
export const getToken = state => {
  return state.user.token;
};
export const getUsers = state => {
  return state.user.users;
};

export default userReducer;
