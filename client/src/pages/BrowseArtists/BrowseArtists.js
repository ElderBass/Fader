import React from "react";

import SearchForm from "../../components/Search/SearchForm";
import SearchResults from "../../components/Search/SearchResults";

import "./style.css";

const BrowseArtists = (props) => {


    return (
        <div>
            <SearchForm />
            <SearchResults />
        </div>
    )
};

export default BrowseArtists;