import user from "./userReducer";
import sport from "./sportReducer";
import notification from "./notificationReducer";

// Export automatique de tous les selecteurs
export * from "./userReducer";
export * from "./sportReducer";
export * from "./notificationReducer";

export default {
  user,
  sport,
  notification
};
