import React, { useState, useEffect } from "react";

import { useUserContext } from "../../utils/UserState";
import SearchResults from "../../components/Search/SearchResults";
import API from "../../utils/API";

import "./BrowseArtists.css";

const BrowseArtists = (props) => {
  const [state, dispatch] = useUserContext();

  const [searchState, setSearchState] = useState({
    search: "",
    results: [],
    filter: "",
    placeholder: "Please choose a filter first",
  });

  useEffect(() => {
    if (searchState.search !== "") {
      return;
    } else {
      getAllArtists();
    }
  }, [searchState.search]);

  const getAllArtists = () => {
    console.log("inside all artists");
    if (state.isLoggedIn) {
      let body = {
        id: state.user._id,
      };
      console.log("boyd inside get all artists if logged in = ", body)
      API.getOtherArtists(state.user._id).then((result) => {
        console.log("result inside get other artists = ", result.data);
        setSearchState({
          ...searchState,
          results: result.data,
        });
      });
    } else {
      API.getAllArtists()
        .then((results) => {
          console.log("results inside get all =", results.data);
          setSearchState({
            ...searchState,
            results: results.data,
          });
        })
        .catch((err) => console.log(err));
    }
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
            a.stageName.localeCompare(b.stageName)
          ),
        });
        break;
      case "Last Name":
        setSearchState({
          ...searchState,
          filter: filter,
          placeholder: "Start Typing a Stage Name to Filter Results",
          results: searchState.results.sort((a, b) =>
            a.lastName.localeCompare(b.lastName)
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
          res.stageName.toLowerCase().includes(query.toLowerCase())
        );
        setSearchState({
          ...searchState,
          results: filtered,
          search: query,
        });
        break;
      case "Last Name":
        filtered = searchState.results.filter((res) =>
          res.lastName.toLowerCase().includes(query.toLowerCase())
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
    <div className="container signupContainer"> {/* this container is what restricts the search bars from the entire page width*/}
      <div className="row">
        <div className="col">
          <h5 className="loginHeader" id="searchHeader">
            Search Artists
          </h5>
          <select
            onChange={handleFilterChange}
            className="form-select selectClass"
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
              className="form-control inputClass"
              aria-describedby="searchBtn"
              placeholder={searchState.placeholder}
              onChange={handleFilterResults}
              value={searchState.search}
            ></input>
            <button
              type="submit"
              className="btn btn-secondary"
              id="resetSearchBtn"
              onClick={handleResetSearch}
            >
              Reset Search
        </button>
          </form>
          <SearchResults results={searchState.results} />
        </div>
      </div>
    </div>
  );
};

export default BrowseArtists;
