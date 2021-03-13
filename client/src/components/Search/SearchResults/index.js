import React, { useContext } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import ArtistCard from "./ArtistCard";
//import ArtistProfile from "../../../pages/Profile/ArtistProfile/ArtistProfile";
import ResultsWrapper from "../SearchResults/ResultsWrapper";

const SearchResults = (props) => {
  return (
    <ResultsWrapper>
      
        {props.results.map((artist) => {
          return (
            <ArtistCard
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
