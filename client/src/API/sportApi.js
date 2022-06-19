import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
  createSport: function(send) {
    return axios.post(`${burl}/sport/create-sport`, send, {
      headers: headers
    });
  },
  getSports: function(send) {
    return axios.post(`${burl}/sport/get-sports`, send, {
      headers: headers
    });
  },
  deleteSport: function(send) {
    return axios.post(`${burl}/sport/delete-sport`, send, {
      headers: headers
    });
  }
};
