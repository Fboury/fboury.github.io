import { commonConstants } from "../../constants/commonConstants";

const initialState = {
  notifications: []
};

export function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case commonConstants.NOTIFICATION_HANDLING:
      const arrayNotification = [];
      if (action.payload) {
        arrayNotification.push({
          status: action.payload.status,
          libelleNotification: action.payload.data.text
        });
      }

      return {
        ...state,
        notifications: arrayNotification
      };
    default:
      return state;
  }
}

export const getNotifications = state => {
  return state.notification.notifications;
};

export default notificationReducer;
