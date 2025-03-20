import { IconArrowDown, IconClockArrow, IconCursor } from "../../../icons";
import ButtonGradient from "../../buttons-styles/button-gradient";
import WrapperDropdown from "../wrapper-dropdown";
import "./styles.scss";

type DropdownCityProps = {
  left: number;
};

const DropdownCity = ({ left }: DropdownCityProps) => {
  const last_locations = ["São Paulo", "Campo Grande", "Macapá", "SINOP", "Aparecida de Goiânia"];

  return (
    <WrapperDropdown left={left}>
      <div className="container-location" data-testid="city-component">
        <div className="location">
          <h3>Você está em: {last_locations[0]}</h3>
          <div className="gps">
            <IconCursor />
            <span>Atualizar localização por GPS</span>
          </div>
          <div className="select-box">
            <div className="select">
              <select name="" id="" aria-label="Selecione o estado">
                <option value="0">Estado</option>
              </select>
              <div className="select-icon">
                <IconArrowDown />
              </div>
            </div>
            <div className="select">
              <select name="" id="" aria-label="Selecione a cidade">
                <option value="0">Cidade</option>
              </select>
              <div className="select-icon">
                <IconArrowDown />
              </div>
            </div>
            <ButtonGradient text="Trocar Cidade" />
          </div>
        </div>
        <div className="wrapper-last-location">
          <h3>Últimos Locais</h3>
          <ul>
            {last_locations.map((location, idx) => (
              <li key={idx}>
                <IconClockArrow />
                <span>{location}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WrapperDropdown>
  );
};

export default DropdownCity;
