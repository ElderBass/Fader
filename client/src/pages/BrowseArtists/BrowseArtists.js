import React, { useState, useEffect } from "react";


import SearchResults from "../../components/Search/SearchResults";
import API from "../../utils/API";

import "./style.css";

const BrowseArtists = (props) => {
  
  const [searchState, setSearchState] = useState({
    search: "",
    results: [],
    filter: "",
    placeholder: "Choose a Filter to Optimize Your Search",
  });

  useEffect(() => {
    if (searchState.search !== "") {
      return;
    } else {
      getAllArtists();
    }
  }, [searchState.search]);

  const getAllArtists = () => {
    API.getAllArtists()
      .then((results) => {
        setSearchState({
          ...searchState,
          results: results.data,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    let filter = e.target.value;
    switch (filter) {
      case "Genre":
        setSearchState({
          ...searchState,
          filter: filter,
          placeholder: "Start Typing a Genre to Filter Results",
          results: searchState.results.sort((a, b) =>
            a.genre.localeCompare(b.genre)
          ),
        });
        break;
      case "City":
        setSearchState({
          ...searchState,
          filter: filter,
          placeholder: "Start Typing a City to Filter Results",
          results: searchState.results.sort((a, b) =>
            a.city.localeCompare(b.city)
          ),
        });
        break;
      case "Stage Name":
        setSearchState({
          ...searchState,
          filter: filter,
          placeholder: "Start Typing a Stage Name to Filter Results",
          results: searchState.results.sort((a, b) =>
            a.stage_name.localeCompare(b.stage_name)
          ),
        });
        break;
      case "Last Name":
        setSearchState({
          ...searchState,
          filter: filter,
          placeholder: "Start Typing a Stage Name to Filter Results",
          results: searchState.results.sort((a, b) =>
            a.last_name.localeCompare(b.last_name)
          ),
        });
        break;
    }
  };

  const handleFilterResults = (event) => {
    event.preventDefault();
    const query = event.target.value;
    let filtered;

    switch (searchState.filter) {
      case "Genre":
        filtered = searchState.results.filter((res) =>
          res.genre.toLowerCase().includes(query.toLowerCase())
        );
        setSearchState({
          ...searchState,
          results: filtered,
          search: query,
        });
        break;
      case "City":
        filtered = searchState.results.filter((res) =>
          res.city.toLowerCase().includes(query.toLowerCase())
        );
        setSearchState({
          ...searchState,
          results: filtered,
          search: query,
        });
        break;
      case "Stage Name":
        filtered = searchState.results.filter((res) =>
          res.stage_name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchState({
          ...searchState,
          results: filtered,
          search: query,
        });
        break;
      case "Last Name":
        filtered = searchState.results.filter((res) =>
          res.last_name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchState({
          ...searchState,
          results: filtered,
          search: query,
        });
        break;
    }
  };

  const handleResetSearch = (e) => {
    e.preventDefault();
    setSearchState({
      ...searchState,
      search: "",
      filter: "",
    });
  };


  return (
    <div>
      <select
        onChange={handleFilterChange}
        className="form-select"
        name="filter"
        aria-label="Choose Filter"
        value={searchState.filter}
      >
        <option selected disabled value="">
          Choose Filter
        </option>
        <option value="Genre">Genre</option>
        <option value="City">City</option>
        <option value="Stage Name">Stage Name</option>
        <option value="Last Name">Last Name</option>
      </select>
      <form className="input-group mb-3 searchForm">
        <input
          type="text"
          name="search"
          className="form-control"
          aria-describedby="searchBtn"
          placeholder={searchState.placeholder}
          onChange={handleFilterResults}
          value={searchState.search}
        ></input>
        <button
          type="submit"
          className="btn btn-primary"
          id="searchBtn"
          onClick={handleResetSearch}
        >
          Reset Search
        </button>
      </form>
      <SearchResults results={searchState.results} />
    </div>
  );
};

export default BrowseArtists;
