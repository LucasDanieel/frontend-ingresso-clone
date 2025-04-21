import { useEffect, useRef, useState } from "react";
import { IconSearch } from "../../../icons";
import SearchInput from "../../components-cinemas/search-input";
import "./styles.scss";

type moviesSearchInputProps = {
  searchMovie: string;
  isLoading: boolean;
  handleChange: (value: string) => void;
};

const MoviesSearchInput = ({ searchMovie, isLoading, handleChange }: moviesSearchInputProps) => {
  const [showInput, setShowInput] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchMovie) handleBlurSearchIcon();
  }, [searchMovie]);

  const handleClickSearchIcon = () => {
    if (searchMovie) return;
    setShowInput((s) => !s);
    if (searchInputRef.current) searchInputRef.current.focus();
  };

  const handleBlurSearchIcon = () => {
    if (searchMovie) return;
    setShowInput((s) => !s);
  };

  return (
    <div className={`wrapper-search-movies${showInput ? " show-input" : ""}`}>
      {!isLoading ? (
        <>
          <div className="icon-search-movies" onClick={handleClickSearchIcon}>
            <IconSearch />
          </div>
          <div className="search-movies">
            <SearchInput
              placeholder="Pesquise por filmes"
              value={searchMovie}
              hiddenIcon
              handleChange={(e) => handleChange(e.target.value)}
              handleBlur={handleBlurSearchIcon}
              ref={searchInputRef}
            />
          </div>
        </>
      ) : (
        <div className="wrapper-search-loading"></div>
      )}
    </div>
  );
};

export default MoviesSearchInput;
