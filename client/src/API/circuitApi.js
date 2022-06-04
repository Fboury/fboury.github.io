import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
  createCircuit: function(send) {
    return axios.post(`${burl}/circuit/create-circuit`, send, {
      headers: headers
    });
  },
  getCircuits: function(send) {
    return axios.post(`${burl}/circuit/get-circuits`, send, {
      headers: headers
    });
  },
  deleteCircuit: function(send) {
    return axios.post(`${burl}/circuit/delete-circuit`, send, {
      headers: headers
    });
  }
};
