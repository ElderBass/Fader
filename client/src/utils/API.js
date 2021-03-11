import axios from "axios";

export default {
  // Gets all books
  getAllArtists: function() {
    return axios.get("/api/artists");
  },
  addUser: function(userData) {
    return axios.post("/api/artists/signup", userData);
  },
  // Deletes the book with the given id
  login: function(data) {
    return axios.post("/api/artists/login" + data);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
