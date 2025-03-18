import { ChangeEvent } from "react";
import "./styles.scss";

type InputStateProps = {
  state: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const InputState = ({ state, handleChange }: InputStateProps) => {
  const states = [
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RO",
    "RR",
    "RS",
    "SC",
    "SE",
    "SP",
    "TO",
  ];

  return (
    <select id="state" value={state} onChange={handleChange}>
      <option value="0">Estado</option>
      {states.map((value, idx) => (
        <option key={idx} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default InputState;
