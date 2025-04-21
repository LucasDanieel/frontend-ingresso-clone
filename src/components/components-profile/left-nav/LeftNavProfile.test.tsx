import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Cookies from "js-cookie";
import { UserContext } from "../../../providers/user-provider";
import LeftNavProfile from ".";

vi.mock("js-cookie");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("LeftNavProfile", () => {
  const mockSetUser = vi.fn();

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/minha-conta/meus-pedidos"]}>
        <UserContext.Provider
          value={{
            user: { name: "teste", email: "teste@gmail.com" },
            setUser: mockSetUser,
            actualCity: { id: 1, name: "São Paulo", state: "São Paulo", slug: "sao-paulo", uf: "SP" },
            cityHistory: [{ id: 1, name: "São Paulo", state: "São Paulo", slug: "sao-paulo", uf: "SP" }],
            setActualCity: vi.fn(),
            setCityHistory: vi.fn(),
          }}
        >
          <LeftNavProfile />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });

  it("Deve carregar todos os componentes", () => {
    expect(screen.getByRole("link", { name: "Voltar para a página principal" })).toBeInTheDocument();
    expect(screen.getByText(/Olá, teste :\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Essa é a sua conta/i)).toBeInTheDocument();
    expect(screen.getByText("teste@gmail.com")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Meus pedidos: Cinema" })).toHaveAttribute(
      "href",
      "/minha-conta/meus-pedidos"
    );
    expect(screen.getByRole("link", { name: "Meus Pedidos: Shows, Teatro e mais" })).toHaveAttribute(
      "href",
      "/minha-conta/meus-pedidos-eventos"
    );
    expect(screen.getByRole("link", { name: "Dados Pessoais" })).toHaveAttribute(
      "href",
      "/minha-conta/edicao-de-cadastro"
    );
    expect(screen.getByTestId("icon-logout-profile")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });

  it("Deve aplicar a classe 'isActive' ao link correto", () => {
    expect(screen.getByRole("link", { name: "Meus pedidos: Cinema" })).toHaveClass("isActive");
  });

  it("Deve alterar a classe 'isActive' quando a rota mudar", async () => {
    expect(screen.getByRole("link", { name: "Meus pedidos: Cinema" })).toHaveClass("isActive");

    await userEvent.click(screen.getByRole("link", { name: "Dados Pessoais" }));

    expect(screen.getByRole("link", { name: "Meus pedidos: Cinema" })).not.toHaveClass("isActive");
    expect(screen.getByRole("link", { name: "Dados Pessoais" })).toHaveClass("isActive");
  });

  it("Deve desconectar da conta quando clicar em 'Sair'", async () => {
    const button = screen.getByTestId("button-logout-left-nav");

    await userEvent.click(button);

    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(Cookies.remove).toHaveBeenCalledWith("token");
    expect(Cookies.remove).toHaveBeenCalledWith("info_profile");
    expect(mockNavigate).toHaveBeenCalledWith("/minha-conta");
  });
});
