import { moviesProps } from "../../../@types/movie";
import OldMovieCard from "../../old-movie-card";
import MovieNotFound from "../Movie-Not-Found";
import "./styles.scss";

type wrapperAllMoviesProps = {
  posterMovies: moviesProps[] | null;
  comingSoonMovies: moviesProps[] | null;
  filterMovies: moviesProps[] | null;
  isLoading: boolean;
  switchValue: boolean;
};

const WrapperAllMovies = ({
  posterMovies,
  comingSoonMovies,
  filterMovies,
  isLoading,
  switchValue,
}: wrapperAllMoviesProps) => {
  return (
    <div className="wrapper-all-movies">
      {!isLoading ? (
        filterMovies ? (
          filterMovies.length > 0 ? (
            filterMovies.map((movie, idx) => <OldMovieCard film={movie} key={idx} />)
          ) : (
            <MovieNotFound />
          )
        ) : switchValue ? (
          posterMovies?.map((movie, idx) => <OldMovieCard film={movie} key={idx} />)
        ) : (
          comingSoonMovies?.map((movie, idx) => <OldMovieCard film={movie} key={idx} />)
        )
      ) : (
        <>
          {Array.from({ length: 24 }).map((_, idx) => (
            <div key={idx} className="wrapper-movie-loading"></div>
          ))}
        </>
      )}
    </div>
  );
};

export default WrapperAllMovies;
