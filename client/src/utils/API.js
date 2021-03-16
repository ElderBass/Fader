import axios from "axios";

export default {
  // Gets all books
  getAllArtists: function () {
    return axios.get("/api/artists", {
      headers: { Authorization: localStorage.getItem("user") },
    });
  },
  getOtherArtists: function (id) {
    return axios.get("/api/artists/others/" + id, {
      headers: { Authorization: localStorage.getItem("user") },
    });
  },
  getOneArtist: function (id) {
    return axios.get("/api/artists/" + id, {
      headers: { Authorization: localStorage.getItem("user") },
    });
  },
  addUser: function (userData) {
    return axios.post("/api/artists/signup", userData);
  },
  // Deletes the book with the given id
  login: function (data) {
    return axios.post("/api/artists/login", data);
  },
  addConnection: function (data) {
    return axios.put("/api/artists/addconnection", data, {
      headers: { Authorization: localStorage.getItem("user") },
    });
  },

  addAbout: function (data) {
    return axios.put("/api/artists/about", data, {
      headers: { Authorization: localStorage.getItem("user") },
    });
  },

  leaveMessage: function (data) {
    return axios.put("/api/artists/message", data, {
      headers: { Authorization: localStorage.getItem("user") },
    });
  },

  changePicture: function (data) {
    return axios.put("/api/artists/changepicture", data, {
      headers: { Authorization: localStorage.getItem("user") },
    });
  },

  addMix: function (data) {
    return axios.put("/api/artists/addmix", data, {
      headers: { Authorization: localStorage.getItem("user") },
    });
  },
};
