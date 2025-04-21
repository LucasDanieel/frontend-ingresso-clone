import { render, screen } from "@testing-library/react";
import { UserContext } from "../../../providers/user-provider";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Cookies from "js-cookie";
import ModalPasswordChanged from ".";

vi.mock("js-cookie");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ModalPasswordChanged", () => {
  const mockSetOpenModalChangePassword = vi.fn();
  const mockSetUser = vi.fn();

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/minha-conta/edicao-de-cadastro"]}>
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
          <ModalPasswordChanged setOpenModalChangePassword={mockSetOpenModalChangePassword} />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });

  it("Deve carregar todos os componentes", () => {
    expect(screen.getByText("Senha alterada com sucesso!")).toBeInTheDocument();
    expect(
      screen.getByText("Para continuar navegando, por favor faça login novamente utilizando a nova senha.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continuar" }));
  });

  it("Deve chamar 'setOpenModalChangePassword' quando clicar no icone 'x'", async () => {
    await userEvent.click(screen.getByTestId("icon-close-modal"));

    expect(mockSetOpenModalChangePassword).toHaveBeenCalled();
  });

  it("Deve voltar para a tela de login quando clicar em 'Continuar'", async () => {
    await userEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(Cookies.remove).toHaveBeenCalledWith("token");
    expect(mockNavigate).toHaveBeenCalledWith("/minha-conta");
  });
});
