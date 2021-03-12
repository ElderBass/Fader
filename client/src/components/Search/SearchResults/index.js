import React, { useContext } from "react";


import ArtistCard from "./ArtistCard";
import ResultsWrapper from "../SearchResults/ResultsWrapper";

const SearchResults = (props) => {

  return (
    <ResultsWrapper>
      {props.results.map((artist) => {
        return (
          <ArtistCard
            key={artist._id}
            image={artist.image}
            stageName={artist.stageName}
            firstName={artist.firstName}
            lastName={artist.lastName}
            genre={artist.genre}
            city={artist.city}
          />
        );
      })}
    </ResultsWrapper>
  );
};

export default SearchResults;
