import React, { useContext } from "react";

//import SearchContext from "../../../utils/searchContext";
import ArtistCard from "./ArtistCard";
import ResultsWrapper from "../SearchResults/ResultsWrapper";

const SearchResults = (props) => {

    //const { results } = useContext(SearchContext);

  return (
    <ResultsWrapper>
      {props.results.map((artist) => {
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
