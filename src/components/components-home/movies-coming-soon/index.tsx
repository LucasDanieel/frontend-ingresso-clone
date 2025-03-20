import WrapperScroll from "../wrapper-scroll";

import OldMovieCard from "../../old-movie-card";
import { FilmsProps } from "../../../@types/movie";

type MoviesComingSoonProps = {
  list_films: FilmsProps[];
};

const MoviesComingSoon = ({ list_films }: MoviesComingSoonProps) => {
  return (
    <WrapperScroll title="Em Breve" title_link>
      {list_films.map((film, idx) => (
        <OldMovieCard key={idx} film={film} />
      ))}
    </WrapperScroll>
  );
};

export default MoviesComingSoon;
