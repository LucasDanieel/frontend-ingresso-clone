import { ChangeEvent, useState } from "react";
import { IconArrow2Way } from "../../../icons";
import "./styles.scss";
import SearchInput from "../search-input";

type cinemasFilterProps = {
  value: string;
  handleChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};
const CinemasFilter = ({ value, handleChangeSearch }: cinemasFilterProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className="wrapper-title-all-cinemas">
      <div className="title-all-cinemas">
        <h3>Todos os Cinemas</h3>
        <div className={`filter-all-cinemas${toggle ? " by-name" : ""}`} onClick={() => setToggle((s) => !s)}>
          <IconArrow2Way />
          <span>{toggle ? "Ordenar por nome" : "Ordenar por proximidade"}</span>
        </div>
      </div>
      <div className="wrapper-input-search">
        <div className="input-search">
          <SearchInput placeholder="Pesquise por cinemas" value={value} handleChange={handleChangeSearch} />
        </div>
      </div>
    </div>
  );
};

export default CinemasFilter;
