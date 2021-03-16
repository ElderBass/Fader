import React, { useState, useEffect } from "react";

import ArtistCard from "./ArtistCard";
import { useUserContext } from "../../../utils/UserState";
import ResultsWrapper from "../SearchResults/ResultsWrapper";

import "./style.css";

const SearchResults = (props) => {
  const [state, dispatch] = useUserContext();

  return (
    <ResultsWrapper>
      {props.results.map((artist) => {
        return (
          <ArtistCard
            artist={artist}
            key={artist._id}
            id={artist._id}
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
