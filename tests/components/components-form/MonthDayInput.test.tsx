import { render, screen } from "@testing-library/react";
import MonthDayInput from "../../../src/components/components-form/month-day-input";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { FormState } from "../../../src/@types/user";

describe("MonthDayInput", () => {
  const MockWrapper = () => {
    const [mockForm, setMockForm] = useState<FormState>({
      name: "",
      CPF: "",
      DDD: "",
      phone: "",
      email: "",
      confirmEmail: "",
      password: "",
      month: "0",
      day: "0",
      CEP: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      state: "",
      city: "",
      recieveNews: false,
    });

    return <MonthDayInput day={mockForm.day} month={mockForm.month} setForm={setMockForm} />;
  };

  beforeEach(() => {
    render(<MockWrapper />);
  });

  it("Deve carregar os componentes de 'select' de mês e dia", () => {
    const monthSelect = screen.getByTestId("month-select") as HTMLSelectElement;
    const daySelect = screen.getByTestId("day-select") as HTMLSelectElement;

    expect(monthSelect).toBeInTheDocument();
    expect(daySelect).toBeInTheDocument();
    expect(monthSelect.selectedOptions[0].textContent).toBe("Mês de aniversário");
    expect(daySelect.selectedOptions[0].textContent).toBe("Dia do aniversário");
  });

  it("Deve carregar o 'select' de mês preenchido e deixar o de dia vazio", () => {
    const monthSelect = screen.getByTestId("month-select") as HTMLSelectElement;
    const daySelect = screen.getByTestId("day-select") as HTMLSelectElement;

    expect(monthSelect.length).toBe(13);
    expect(daySelect.length).toBe(1);
  });

  it("Deve preencher o 'select' de dia após a seleção do mês", async () => {
    const user = userEvent.setup();
    const monthSelect = screen.getByTestId("month-select") as HTMLSelectElement;
    const daySelect = screen.getByTestId("day-select") as HTMLSelectElement;

    await user.selectOptions(monthSelect, "1");
    await user.selectOptions(daySelect, "20");

    expect(monthSelect.length).toBe(13);
    expect(daySelect.length).toBe(32);
    expect(monthSelect.selectedOptions[0].textContent).toBe("Janeiro");
    expect(daySelect.selectedOptions[0].textContent).toBe("20");
  });
});
