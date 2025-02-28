import WrapperScroll from "../wrapper-scroll";
import "./styles.scss";

import NewMovieCard from "../../new-movie-card";
import { NewFilmsProps } from "../../../@types/movie";

type TrendingMoviesProps = {
  list_films: NewFilmsProps[];
};

const TrendingMovies = ({ list_films }: TrendingMoviesProps) => {
  return (
    <WrapperScroll title="Em Alta">
      {list_films.map((film, idx) => (
        <NewMovieCard key={idx} film={film} />
      ))}
    </WrapperScroll>
  );
};

export default TrendingMovies;
