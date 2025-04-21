import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Cookies from "js-cookie";
import { UserContext } from "../../../providers/user-provider";
import DropdownMenuProfile from ".";

vi.mock("js-cookie");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("DropdownMenuProfile", () => {
  const left = 754;
  const mockSetUser = vi.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <UserContext.Provider
          value={{
            user: null,
            setUser: mockSetUser,
            actualCity: { id: 1, name: "São Paulo", state: "São Paulo", slug: "sao-paulo", uf: "SP" },
            cityHistory: [{ id: 1, name: "São Paulo", state: "São Paulo", slug: "sao-paulo", uf: "SP" }],
            setActualCity: vi.fn(),
            setCityHistory: vi.fn(),
          }}
        >
          <DropdownMenuProfile left={left} user={{ name: "teste teste", email: "teste@gmail.com" }} />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });

  it("Deve renderizar todo o texto", () => {
    expect(screen.getByText("Olá, teste teste")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Meus Pedidos" })).toHaveAttribute("href", "/minha-conta/meus-pedidos");
    expect(screen.getByRole("link", { name: "Meus Pedidos: Shows, Teatro e Mais" })).toHaveAttribute(
      "href",
      "/minha-conta/meus-pedidos-eventos"
    );
    expect(screen.getByRole("link", { name: "Dados Pessoais" })).toHaveAttribute(
      "href",
      "/minha-conta/edicao-de-cadastro"
    );
    expect(screen.getByText("Sair da Conta")).toBeInTheDocument();
  });

  it("Deve desconectar da conta quando clicar em 'Sair da Conta'", async () => {
    const link = screen.getByText("Sair da Conta");

    await userEvent.click(link);

    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(Cookies.remove).toHaveBeenCalledWith("token");
    expect(Cookies.remove).toHaveBeenCalledWith("info_profile");
    expect(mockNavigate).toHaveBeenCalledWith("/minha-conta");
  });

  it("Deve renderizar o dropdown na posição correta", () => {
    const dropdown = screen.getByTestId("menu-profile-component");

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
