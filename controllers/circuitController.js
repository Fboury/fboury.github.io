const circuits = require("./circuit/lib.js");

module.exports = function(app) {
  app.post("/create-circuit", circuits.createCircuit);
  app.post("/get-circuits", circuits.getCircuits);
  app.post("/delete-circuit", circuits.deleteCircuit);
};
