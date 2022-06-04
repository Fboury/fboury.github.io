import React from "react";
import userApi from "./API/userApi";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  if (userApi.isAuth() === false) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
