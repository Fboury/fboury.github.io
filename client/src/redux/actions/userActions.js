import { userConstants } from "../../constants/userConstants";
import userApi from "../../API/userApi";
import { commonConstants } from "../../constants/commonConstants";

const createUser = (user, navigate) => dispatch => {
  return userApi
    .signup(user)
    .then(res => {
      dispatch({ type: userConstants.CREATE_USER, payload: res.data });
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: res
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.user._id);
      navigate();
    })
    .catch(err => {
      console.log("test de l'erreur create user", err);

      return dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: err.response
      });
    });
};

const getUsers = () => dispatch => {
  return userApi
    .getUsers()
    .then(res => {
      dispatch({ type: userConstants.GET_USERS, payload: res.data.users });
      return res.data.users;
    })
    .catch(err => {
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: err.response
      });

      console.log("test de l'erreur", err.response);
    });
};

const getUser = idUser => dispatch => {
  return userApi
    .getCurrentUserById(idUser)
    .then(res => {
      dispatch({ type: userConstants.GET_USER_BY_ID, payload: res.data.user });
    })
    .catch(err => {
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: err.response
      });

      console.log("test de l'erreur get user", err.response);
    });
};

const deleteUser = idUser => dispatch => {
  return userApi
    .deleteUser({ idUser })
    .then(res => {
      dispatch({ type: userConstants.DELETE_USER });
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: res
      });
    })
    .catch(err => {
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: err.response
      });

      console.log("test de l'erreur delete user", err.response);
    });
};

const updateDroitsUserById = user => dispatch => {
  return userApi
    .updateDroitsUserById(user)
    .then(res => {
      dispatch({
        type: userConstants.UPDATE_DROITS_USER_BY_ID
      });
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: res
      });
    })
    .catch(err => {
      dispatch({
        type: commonConstants.NOTIFICATION_HANDLING,
        payload: err.response
      });

      console.log("test de l'erreur update user", err.response);
    });
};

const clearUser = () => dispatch => {
  dispatch({ type: userConstants.CLEAR_USER });
};

const userActions = {
  createUser,
  getUsers,
  getUser,
  clearUser,
  updateDroitsUserById,
  deleteUser
};
export default userActions;
