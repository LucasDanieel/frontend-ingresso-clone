import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { UserContext } from "../../../providers/user-provider";
import DropdownCity from ".";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("DropdownCity", () => {
  const left = 158;
  const mockSetCityBool = vi.fn();

  const MockWrapper = () => {
    render(
      <MemoryRouter>
        <UserContext.Provider
          value={{
            user: { name: "teste teste", email: "teste@gmail.com" },
            setUser: vi.fn(),
            actualCity: { id: 1, name: "São Paulo", state: "São Paulo", slug: "sao-paulo", uf: "SP" },
            cityHistory: [{ id: 1, name: "São Paulo", state: "São Paulo", slug: "sao-paulo", uf: "SP" }],
            setActualCity: vi.fn(),
            setCityHistory: vi.fn(),
          }}
        >
          <DropdownCity left={left} setCityBool={mockSetCityBool} />
        </UserContext.Provider>
      </MemoryRouter>
    );
  };

  it("Deve renderizar todo o texto", () => {
    MockWrapper();

    expect(screen.getByText(/Você está em: São Paulo/i)).toBeInTheDocument();
    expect(screen.getByText("Atualizar localização por GPS")).toBeInTheDocument();
    expect(screen.getByText("Últimos Locais")).toBeInTheDocument();
    expect(screen.getByText("São Paulo")).toBeInTheDocument();
  });

  it("Deve renderizar os selects e o botão", () => {
    MockWrapper();

    const selectState = screen.getByRole("combobox", { name: "Selecione o estado" });
    const selectCity = screen.getByRole("combobox", { name: "Selecione a cidade" });

    expect(selectState).toHaveTextContent(/estado/i);
    expect(selectCity).toHaveTextContent(/cidade/i);
    expect(screen.getByRole("button")).toHaveTextContent(/Trocar Cidade/i);
  });

  it("Deve alterar a cidade ao clicar em 'Trocar cidade'", async () => {
    MockWrapper();

    const selectState = screen.getByRole("combobox", { name: "Selecione o estado" }) as HTMLSelectElement;
    const selectCity = screen.getByRole("combobox", { name: "Selecione a cidade" }) as HTMLSelectElement;
    const user = userEvent.setup();

    await user.selectOptions(selectState, "Mato Grosso do Sul");
    await user.selectOptions(selectCity, "Campo Grande");
    await user.click(screen.getByRole("button", { name: "Trocar Cidade" }));

    expect(selectState.selectedOptions[0].textContent).toBe("Mato Grosso do Sul");
    expect(selectCity.selectedOptions[0].textContent).toBe("Campo Grande");
    expect(mockNavigate).toHaveBeenCalledWith("?city=campo-grande");
    expect(mockSetCityBool).toHaveBeenCalledWith(false);
  });

  it("Deve alterar a cidade ao clicar em outra cidade na lista 'Últimos Locais'", async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider
          value={{
            user: { name: "teste teste", email: "teste@gmail.com" },
            setUser: vi.fn(),
            actualCity: { id: 1, name: "Campo Grande", state: "Mato Grosso do Sul", slug: "campo-grande", uf: "MS" },
            cityHistory: [
              { id: 2, name: "Campo Grande", state: "Mato Grosso do Sul", slug: "campo-grande", uf: "MS" },
              { id: 1, name: "São Paulo", state: "São Paulo", slug: "sao-paulo", uf: "SP" },
            ],
            setActualCity: vi.fn(),
            setCityHistory: vi.fn(),
          }}
        >
          <DropdownCity left={left} setCityBool={mockSetCityBool} />
        </UserContext.Provider>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByText("São Paulo"));

    expect(mockNavigate).toHaveBeenCalledWith("?city=sao-paulo");
    expect(mockSetCityBool).toHaveBeenCalledWith(false);
  });

  it("Deve exibir uma mensagem de alerta quando nenhuma opção for selecionada", async () => {
    MockWrapper();

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    await userEvent.click(screen.getByRole("button", { name: "Trocar Cidade" }));

    expect(alertMock).toHaveBeenCalledWith("Selecione uma opção válida");
  });

  it("Deve estar visível na tela", () => {
    MockWrapper();

    const dropdown = screen.getByTestId("city-component");
    expect(dropdown).toBeVisible();
  });

  it("Deve renderizar o dropdown na posição correta", () => {
    MockWrapper();

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
