import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import LoginWithGoogle from ".";

vi.mock("js-cookie");
vi.mock("axios");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.stubEnv("VITE_CLIENT_ID", "mock_key");

describe("LoginWithGoogle", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("Deve carregar o botão e o texto", async () => {
    render(
      <MemoryRouter>
        <LoginWithGoogle />
      </MemoryRouter>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Continuar com o Google")).toBeInTheDocument();
  });

  it("Deve alterar a rota quando clicar em 'Continuar com o Google'", async () => {
    vi.stubGlobal("location", { href: window.location.href });

    render(
      <MemoryRouter>
        <LoginWithGoogle />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByText("Continuar com o Google"));

    expect(window.location.href).toContain("https://accounts.google.com/o/oauth2/auth");
  });

  it("Deve entrar no site quando selecionar um email do google ja cadastrado no site", async () => {
    vi.stubGlobal("location", { href: `${window.location.href}#access_token=teste` });
    vi.mocked(axios.get)
      .mockResolvedValueOnce({ data: { verified_email: true, email: "teste@gmail.com" } })
      .mockResolvedValueOnce({ data: { name: "teste", email: "teste@gmail.com", token: "token-backend" } });

    render(
      <MemoryRouter>
        <LoginWithGoogle />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith("access_token", "teste");
      expect(Cookies.set).toHaveBeenCalledWith("token", "token-backend", { expires: 10 });
      expect(Cookies.set).toHaveBeenCalledWith(
        "info_profile",
        JSON.stringify({ name: "teste", email: "teste@gmail.com" }),
        {
          expires: 10,
        }
      );
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(mockNavigate).toHaveBeenCalledWith("/minha-conta/edicao-de-cadastro");
    });
  });

  it("Não deve fazer a chamada para o back-end quando o email não for verificado", async () => {
    vi.stubGlobal("location", { href: `${window.location.href}#access_token=teste` });
    vi.mocked(axios.get).mockResolvedValueOnce({ data: { verified_email: false, email: "teste@gmail.com" } });

    render(
      <MemoryRouter>
        <LoginWithGoogle />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith("access_token", "teste");
      expect(Cookies.set).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
