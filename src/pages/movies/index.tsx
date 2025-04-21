import { useContext, useEffect, useRef, useState } from "react";
import "./styles.scss";

import { UserContextType } from "../../@types/user";
import { UserContext } from "../../providers/user-provider";
import SwitchPage from "../../components/switch-page";
import MoviesSearchInput from "../../components/components-movies/search-input";
import WrapperAllMovies from "../../components/components-movies/wrapper-all-movies";
import { useLocation } from "react-router-dom";
import axios from "axios";
import WithoutMovies from "../../components/components-movies/without-movies";
import { moviesProps } from "../../@types/movie";

const Movies = () => {
  const location = useLocation();
  const [switchValue, setSwitchValue] = useState<boolean>(() => {
    return location.hash === "#em-cartaz" || location.hash === "";
  });

  const [searchMovie, setSearchMovie] = useState<string>("");
  const [posterMovies, setPosterMovies] = useState<moviesProps[] | null>(null);
  const [comingSoonMovies, setComingSoonMovies] = useState<moviesProps[] | null>(null);
  const [filterMovies, setFilterMovies] = useState<moviesProps[] | null>(null);
  const [withoutMovies, setWithoutMovies] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { actualCity } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    document.title = `Filmes em ${actualCity?.name} - Ingresso.com`;

    getAllMovies();
  }, [actualCity]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = location.hash;

      if (hash === "#em-cartaz" || hash === "") {
        setSwitchValue(true);
      } else {
        setSwitchValue(false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [location.hash]);

  const getAllMovies = () => {
    if (!actualCity) return;

    setIsLoading(true);
    axios
      .get<moviesProps[]>(`movie/get-all?citySlug=${actualCity?.slug}`)
      .then((resp) => {
        setWithoutMovies(false);
        setPosterMovies(resp.data);
        setComingSoonMovies(resp.data);
      })
      .catch(() => {
        setPosterMovies([]);
        setComingSoonMovies([]);
        setWithoutMovies(true);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSwitchPage = (hash: string) => {
    setSearchMovie("");
    setFilterMovies(null);
    window.history.pushState(null, "", `#${hash}`);
    if (hash == "em-cartaz") setSwitchValue(true);
    else setSwitchValue(false);
  };

  const timeoutId = useRef<number>();

  const handleChangeSearch = (e: string) => {
    setSearchMovie(e);

    clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      var filter: moviesProps[] | undefined;
      if (switchValue == true) {
        filter = posterMovies?.filter((movie) => {
          return movie.name.toLocaleLowerCase().includes(e.toLocaleLowerCase());
        });
      } else {
        filter = comingSoonMovies?.filter((movie) => {
          return movie.name.toLocaleLowerCase().includes(e.toLocaleLowerCase());
        });
      }

      if (filter) setFilterMovies(filter);
    }, 400);
  };

  return (
    <div className="container-movies">
      <div className="wrapper-movies">
        <h3>Filmes - {actualCity?.name}</h3>
        <SwitchPage
          firstName="Em Cartaz"
          lastName="Em Breve"
          firstHash="em-cartaz"
          lastHash="em-breve"
          switchValue={switchValue}
          handleSwitchPage={handleSwitchPage}
        />
        {!withoutMovies ? (
          <>
            <MoviesSearchInput searchMovie={searchMovie} isLoading={isLoading} handleChange={handleChangeSearch} />
            <WrapperAllMovies
              posterMovies={posterMovies}
              comingSoonMovies={comingSoonMovies}
              filterMovies={filterMovies}
              isLoading={isLoading}
              switchValue={switchValue}
            />
          </>
        ) : (
          <WithoutMovies />
        )}
      </div>
    </div>
  );
};

export default Movies;
