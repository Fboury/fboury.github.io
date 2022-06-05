const sport = require("./sport/lib.js");

module.exports = function(app) {
  app.post("/create-sport", sport.createSport);
  app.post("/get-sports", sport.getSports);
  app.post("/delete-sport", sport.deleteSport);
};
