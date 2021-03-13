import axios from "axios";

export default {
  // Gets all books
  getAllArtists: function () {
    return axios.get("/api/artists");
  },
  //can't get this to work and not sure why
  getOneArtist: function (id) {
    return axios.get("/api/artists/", id);
  },
  addUser: function (userData) {
    return axios.post("/api/artists/signup", userData);
  },
  // Deletes the book with the given id
  login: function (data) {
    return axios.post("/api/artists/login", data);
  },
  addConnection: function (data) {
    return axios.put("/api/artists/addconnection", data);
  },
};
