const user = require("./user/lib.js");

module.exports = function(app) {
  app.post("/login", user.login);
  app.post("/signup", user.signup);
  app.post("/getUsers", user.getUsers);
  app.post("/getUser", user.getUser);
  app.post("/deleteUser", user.deleteUser);
  app.post("/updateDroitsUser", user.updateDroitsUser);
};
