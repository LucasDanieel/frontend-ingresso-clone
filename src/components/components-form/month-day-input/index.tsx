import { ChangeEvent, Dispatch, SetStateAction } from "react";
import "./styles.scss";
import { FormState } from "../../../@types/user";

type MonthDayInputProps = {
  month: string;
  day: string;
  setForm: Dispatch<SetStateAction<FormState>>;
};

const MonthDayInput = ({ month, day, setForm }: MonthDayInputProps) => {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const onChangeMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setForm((s) => ({ ...s, month: value }));

    if (value == "0") setForm((s) => ({ ...s, day: "0" }));
  };

  const onChangeDay = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm((s) => ({ ...s, day: e.target.value }));
  };

  const onGenerateDays = (selectedMonth: string) => {
    if (selectedMonth == "0") return;

    const daysInMonth = new Date(2024, parseInt(selectedMonth), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  return (
    <div className="wrapper-form-select-input">
      <div className="wrapper-select-input">
        <div className="select-month-day">
          <select id="month" value={month} onChange={onChangeMonth} data-testid="month-select">
            <option value="0">Mês de aniversário</option>
            {months.map((mon, idx) => (
              <option key={idx} value={idx + 1}>
                {mon}
              </option>
            ))}
          </select>
        </div>
        <div className="select-month-day">
          <select id="day" value={day} onChange={onChangeDay} data-testid="day-select">
            <option value="0">Dia do aniversário</option>
            {onGenerateDays(month)?.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MonthDayInput;
