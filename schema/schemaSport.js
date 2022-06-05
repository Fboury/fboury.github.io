const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

const sportSchema = mongoose.Schema(
  {
    titreSeance: {
      type: String,
      required: true
    },
    typeSeance: {
      type: String,
      required: true
    },
    duree: {
      type: String,
      required: true
    },
    difficulte: {
      type: String,
      required: true
    },
    imageTrace: {
      type: String
    },
    dateSeance: {
      type: String,
      required: true
    },
    meteo: {
      type: String,
      required: true
    },
    sportifs: {
      type: Array,
      required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

sportSchema.methods = {
  authenticate: function(password) {
    return passwordHash.verify(password, this.password);
  },
  getToken: function() {
    return jwt.encode(this, config.secret);
  }
};

module.exports = mongoose.model("Sport", sportSchema);
