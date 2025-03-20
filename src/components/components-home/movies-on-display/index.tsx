import WrapperScroll from "../wrapper-scroll";

import OldMovieCard from "../../old-movie-card";
import { FilmsProps } from "../../../@types/movie";

type MoviesOnDisplayProps = {
  list_films: FilmsProps[];
};

const MoviesOnDisplay = ({ list_films }: MoviesOnDisplayProps) => {
  return (
    <WrapperScroll title="Em Cartaz" title_link>
      {list_films.map((film, idx) => (
        <OldMovieCard key={idx} film={film} />
      ))}
    </WrapperScroll>
  );
};

export default MoviesOnDisplay;
