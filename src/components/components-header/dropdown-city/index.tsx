import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

import { IconArrowDown, IconClockArrow, IconCursor } from "../../../icons";
import ButtonGradient from "../../buttons-styles/button-gradient";
import WrapperDropdown from "../wrapper-dropdown";
import { cityHistoryType, UserContextType } from "../../../@types/user";
import { UserContext } from "../../../providers/user-provider";
import { getCity } from "../../../utils/crud-methods";
import { toSlug } from "../../../utils/input-methods";

type DropdownCityProps = {
  left: number;
  setCityBool: (value: boolean) => void;
};

const DropdownCity = ({ left, setCityBool }: DropdownCityProps) => {
  const [state, setState] = useState<string>("0");
  const [city, setCity] = useState<string>("0");
  const navigate = useNavigate();

  const { actualCity, cityHistory, setUpdateCityHistory } = useContext(UserContext) as UserContextType;

  const handleChangeCity = async () => {
    if (city == "0" || state == "0") return alert("Selecione uma opção válida");

    if (actualCity?.name == city) return;

    if (cityHistory) {
      if (cityHistory.findIndex((obj) => obj.name == city) != -1) {
        const obj = cityHistory.find((obj) => obj.name == city);
        return obj && handleClickLastCity(obj);
      }

      var objCity = await getCity(toSlug(city));

      if (objCity) {
        cityHistory.unshift(objCity);
        localStorage.setItem("city_history", JSON.stringify(cityHistory));

        setUpdateCityHistory((s) => !s);
        navigate(`?city=${city}`);
        setCityBool(false);
      } else {
        alert("Cidade não encontrada");
      }
    }
  };

  const handleClickLastCity = (location: cityHistoryType) => {
    if (actualCity?.name == location.name) return;

    if (cityHistory) {
      var index = cityHistory.findIndex((obj) => obj.name === location.name);
      var newCity = cityHistory.splice(index, 1);
      cityHistory.unshift(newCity[0]);

      localStorage.setItem("city_history", JSON.stringify(cityHistory));

      setUpdateCityHistory((s) => !s);
      navigate(`?city=${newCity[0].slug}`);
      setCityBool(false);
    }
  };

  return (
    <WrapperDropdown left={left}>
      <div className="container-location" data-testid="city-component">
        <div className="location">
          <h3>Você está em: {actualCity && actualCity.name}</h3>
          <div className="gps">
            <IconCursor />
            <span>Atualizar localização por GPS</span>
          </div>
          <div className="select-box">
            <div className="select">
              <select name="" value={state} onChange={(e) => setState(e.target.value)} aria-label="Selecione o estado">
                <option value="0">Estado</option>
                <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
              </select>
              <div className="select-icon">
                <IconArrowDown />
              </div>
            </div>
            <div className="select">
              <select name="" value={city} onChange={(e) => setCity(e.target.value)} aria-label="Selecione a cidade">
                <option value="0">Cidade</option>
                {state != "0" && <option value="Campo Grande">Campo Grande</option>}
              </select>
              <div className="select-icon">
                <IconArrowDown />
              </div>
            </div>
            <ButtonGradient text="Trocar Cidade" handleClickEvent={handleChangeCity} />
          </div>
        </div>
        <div className="wrapper-last-location">
          <h3>Últimos Locais</h3>
          <ul>
            {cityHistory?.map((location, idx) => (
              <li key={idx} onClick={() => handleClickLastCity(location)}>
                <IconClockArrow />
                <span>{location.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WrapperDropdown>
  );
};

export default DropdownCity;
