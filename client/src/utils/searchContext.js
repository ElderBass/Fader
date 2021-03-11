import React from "react";

const SearchContext = React.createContext({
  search: "",
  results: [],
  filter: "",
  placeholder: "",
  searchArtists: () => {},
  handleInputChange: () => {}
});

export default SearchContext;
