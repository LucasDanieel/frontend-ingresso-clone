import { ChangeEvent, Key, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./styles.scss";

import { UserContext } from "../../providers/user-provider";
import { UserContextType } from "../../@types/user";
import WrapperCinema from "../../components/components-cinemas/wrapper-cinema";
import InformationCinemas from "../../components/components-cinemas/information-cinemas";
import CinemasFilter from "../../components/components-cinemas/cinemas-filter";
import { cinemaProps } from "../../@types/cinema";
import WrapperLoadingCinemas from "../../components/components-cinemas/wrapper-loading-cinemas";
import WithoutCinema from "../../components/components-cinemas/without-cinema";

const Cinemas = () => {
  const [search, setSearch] = useState<string>("");
  const [cinemas, setCinemas] = useState<cinemaProps[] | null>(null);
  const [filterCinemas, setFilterCinemas] = useState<cinemaProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [withoutCinemas, setWithoutCinemas] = useState<boolean>(false);

  const { actualCity } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    document.title = `Cinemas em ${actualCity?.name} - Ingresso.com`;

    getCinemas();
  }, [actualCity]);

  const getCinemas = () => {
    if (!actualCity) return;

    setIsLoading(true);
    axios
      .get<cinemaProps[]>(`cinema/get-by-city-id?cityId=${actualCity.id}`)
      .then((resp) => {
        setCinemas(resp.data);
        setWithoutCinemas(false);
      })
      .catch(() => {
        setCinemas([]);
        setWithoutCinemas(true);
      })
      .finally(() => setIsLoading(false));
  };

  const timeoutId = useRef<number>();

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      const filter = cinemas?.filter((cinema) => {
        return (
          cinema.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          cinema.street.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          cinema.neighborhood.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
      });

      if (filter) setFilterCinemas(filter);
    }, 400);
  };

  return (
    <div className="container-cinemas">
      <div className="wrapper-cinemas">
        <InformationCinemas isLoading={isLoading} />
        <CinemasFilter value={search} handleChangeSearch={handleChangeSearch} />
        <div className="wrapper-all-cinemas">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, idx) => <WrapperLoadingCinemas key={idx} />)
          ) : !withoutCinemas ? (
            filterCinemas && filterCinemas.length > 0 ? (
              filterCinemas?.map((cinemas: cinemaProps, idx: Key) => <WrapperCinema cinema={cinemas} key={idx} />)
            ) : (
              cinemas?.map((cinemas: cinemaProps, idx: Key) => <WrapperCinema cinema={cinemas} key={idx} />)
            )
          ) : (
            <WithoutCinema />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cinemas;
