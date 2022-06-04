import user from "./userReducer";
import circuit from "./circuitReducer";
import notification from "./notificationReducer";

// Export automatique de tous les selecteurs
export * from "./userReducer";
export * from "./circuitReducer";
export * from "./notificationReducer";

export default {
  user,
  circuit,
  notification
};
