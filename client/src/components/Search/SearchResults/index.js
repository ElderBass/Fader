import React, { useState, useEffect } from "react";

import API from "../../../utils/API";
import ArtistCard from "./ArtistCard";
import ResultsWrapper from "../SearchResults/ResultsWrapper";

const SearchResults = (props) => {
  const [searchState, setSearchState] = useState({
    search: "",
    results: [],
  });

  useEffect(() => {
    API.getAllArtists()
      .then((results) => {
        console.log(results);
        setSearchState({
          ...searchState,
          results: results.data,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ResultsWrapper>
      {searchState.results.map((artist) => {
        return (
          <ArtistCard
            key={artist._id}
            image={artist.image}
            stageName={artist.stage_name}
            firstName={artist.first_name}
            lastName={artist.last_name}
            genre={artist.genre}
            city={artist.city}
          />
        );
      })}
    </ResultsWrapper>
  );
};

export default SearchResults;
