import { ChangeEvent } from "react";
import "./styles.scss";

type MonthDayInputProps = {
  month: string;
  day: string;
  handleChangeMonth?: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleChangeDay?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const MonthDayInput = ({
  month,
  day,
  handleChangeMonth = () => {},
  handleChangeDay = () => {},
}: MonthDayInputProps) => {
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

  const onGenerateDays = (selectedMonth: string) => {
    if (selectedMonth == "0") return;

    const daysInMonth = new Date(2024, parseInt(selectedMonth), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  return (
    <div className="wrapper-form-select-input">
      <div className="wrapper-select-input">
        <div className="select-month-day">
          <select id="month" value={month} onChange={handleChangeMonth}>
            <option value="0">Mês de aniversário</option>
            {months.map((mon, idx) => (
              <option key={idx} value={idx + 1}>
                {mon}
              </option>
            ))}
          </select>
        </div>
        <div className="select-month-day">
          <select id="day" value={day} onChange={handleChangeDay}>
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
