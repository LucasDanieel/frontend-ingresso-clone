import { render, screen } from "@testing-library/react";
import DropdownCity from "../../../src/components/components-header/dropdown-city";

describe("DropdownCity", () => {
  const left = 158;

  beforeEach(() => {
    render(<DropdownCity left={left} />);
  });

  it("Deve renderizar todo o texto", () => {
    expect(screen.getByText(/Você está em:/i)).toBeInTheDocument();
    expect(screen.getByText(/Atualizar localização por GPS/i)).toBeInTheDocument();
    expect(screen.getByText(/Últimos Locais/i)).toBeInTheDocument();
  });

  it("Deve renderizar os selects e o botão", () => {
    const selectState = screen.getByRole("combobox", { name: "Selecione o estado" });
    const selectCitye = screen.getByRole("combobox", { name: "Selecione a cidade" });

    expect(selectState).toHaveTextContent(/estado/i);
    expect(selectCitye).toHaveTextContent(/cidade/i);
    expect(screen.getByRole("button")).toHaveTextContent(/Trocar Cidade/i);
  });

  it("Deve estar visível na tela", () => {
    const dropdown = screen.getByTestId("city-component");
    expect(dropdown).toBeVisible();
  });

  it("Deve renderizar o dropdown na posição correta", () => {
    const dropdown = screen.getByTestId("city-component");

    vi.spyOn(dropdown, "getBoundingClientRect").mockReturnValue({
      x: left,
      y: 66,
      width: 200,
      height: 100,
      top: 66,
      left: left,
      right: left + 200,
      bottom: 200,
      toJSON: () => {},
    });

    expect(dropdown.getBoundingClientRect().left).toBe(left);
  });
});
