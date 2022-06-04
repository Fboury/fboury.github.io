import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard.js";
import { Login } from "./components/Login/Login.js";
import { Signup } from "./components/Signup/Signup.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PrivateRoute } from "./PrivateRoute.js";
import { Navigation } from "./components/Commons/Navigation/Navigation.js";
import { Accueil } from "./components/Accueil/Accueil.js";
import { Circuits } from "./components/Circuits/Circuits.js";
import { useSelector } from "react-redux";
import { getNotifications } from "./redux/reducers/index.js";
import Notification from "./components/Commons/Notifications/Notification.js";
import { CreationCircuit } from "./components/Circuits/CreationCircuit.js";

export function App() {
  const notifications = useSelector(getNotifications);

  return (
    <div className="App">
      <Navigation />
      <Notification notifications={notifications} />
      <Routes>
        <Route exact path="/" element={<Accueil />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

        <Route exact path="/circuits" element={<Circuits />} />
        <Route
          exact
          path="/circuits/creer-circuit"
          element={<CreationCircuit />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
