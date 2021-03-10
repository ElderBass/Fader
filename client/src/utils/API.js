import axios from "axios";

export default {
  // Gets all books
  getAllArtists: function() {
    return axios.get("/api/artists");
  },
  // Gets the book with the given id
  getArtistsGenre: function(genre) {
    return axios.get("/api/artists/" + genre);
  },
  getArtistsCity: function(city) {
    return axios.get("/api/artists/" + city);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
