import React, { useContext } from "react";

import SearchContext from "../../../utils/searchContext";

import "./style.css";

const SearchForm = (props) => {
  const { search, filter, placeholder } = useContext(SearchContext);

  return (
    <>
      <select
        onChange={(e) => props.handleFilterChange(e)}
        className="form-select"
        name="filter"
        aria-label="Choose Filter"
        value={filter}
      >
        <option selected disabled value="">
          Choose Filter
        </option>
        <option value="Genre">Genre</option>
        <option value="City">City</option>
        <option value="Stage Name">Stage Name</option>
      </select>
      <form
        className="input-group mb-3 searchForm"
        onSubmit={props.handleFormSubmit}
      >
        <input
          type="text"
          name="search"
          className="form-control"
          aria-describedby="searchBtn"
          placeholder={placeholder}
          onChange={props.handleInputChange}
          value={search}
        ></input>
        <button type="submit" className="btn btn-primary" id="searchBtn">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchForm;
