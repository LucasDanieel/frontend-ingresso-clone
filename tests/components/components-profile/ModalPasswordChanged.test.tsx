import { render, screen } from "@testing-library/react";
import ModalPasswordChanged from "../../../src/components/components-profile/modal-password-changed";
import { UserContext } from "../../../src/providers/user-provider";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Cookies from "js-cookie";

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

  it("Deve carregar todos os componentes", () => {
    render(
      <MemoryRouter initialEntries={["/minha-conta/meus-pedidos"]}>
        <UserContext.Provider value={{ user: { name: "teste", email: "teste@gmail.com" }, setUser: mockSetUser }}>
          <ModalPasswordChanged setOpenModalChangePassword={mockSetOpenModalChangePassword} />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Senha alterada com sucesso!")).toBeInTheDocument();
    expect(
      screen.getByText("Para continuar navegando, por favor faça login novamente utilizando a nova senha.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continuar" }));
  });

  it("Deve chamar 'setOpenModalChangePassword' quando clicar no icone 'x'", async () => {
    render(
      <MemoryRouter initialEntries={["/minha-conta/meus-pedidos"]}>
        <UserContext.Provider value={{ user: { name: "teste", email: "teste@gmail.com" }, setUser: mockSetUser }}>
          <ModalPasswordChanged setOpenModalChangePassword={mockSetOpenModalChangePassword} />
        </UserContext.Provider>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByTestId("icon-close-password-changed"));

    expect(mockSetOpenModalChangePassword).toHaveBeenCalled();
  });

  it("Deve voltar para a tela de login quando clicar em 'Continuar'", async () => {
    render(
      <MemoryRouter initialEntries={["/minha-conta/meus-pedidos"]}>
        <UserContext.Provider value={{ user: { name: "teste", email: "teste@gmail.com" }, setUser: mockSetUser }}>
          <ModalPasswordChanged setOpenModalChangePassword={mockSetOpenModalChangePassword} />
        </UserContext.Provider>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(Cookies.remove).toHaveBeenCalledWith("token");
    expect(mockNavigate).toHaveBeenCalledWith("/minha-conta");
  });
});
