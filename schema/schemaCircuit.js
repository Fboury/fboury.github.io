const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

const circuitSchema = mongoose.Schema(
  {
    nomCircuit: {
      type: String,
      required: true
    },
    paysCircuit: {
      type: String,
      required: true
    },
    anneeEnCours: {
      type: String,
      required: true
    },
    descriptionCircuit: {
      type: String,
      required: true
    },
    traceCircuit: {
      type: String
    },
    photoCircuit: {
      type: String
    },
    typeCircuit: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

circuitSchema.methods = {
  authenticate: function(password) {
    return passwordHash.verify(password, this.password);
  },
  getToken: function() {
    return jwt.encode(this, config.secret);
  }
};

module.exports = mongoose.model("Circuit", circuitSchema);
