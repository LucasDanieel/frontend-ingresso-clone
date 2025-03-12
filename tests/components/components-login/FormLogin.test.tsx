import { render, screen } from "@testing-library/react";
import FormLogin from "../../../src/components/components-login/form-login";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Mocked } from "vitest";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("FormLogin", () => {
  const mockSetLoading = vi.fn();
  const mockSetMaskedUser = vi.fn();
  const mockSetConfirmCode = vi.fn();

  beforeEach(() => vi.clearAllMocks());

  it("Deve carregar todos os textos, inputs, links e o botão 'Entrar'", () => {
    render(
      <BrowserRouter>
        <FormLogin
          wrongCode={false}
          setLoading={mockSetLoading}
          setMaskedUser={mockSetMaskedUser}
          setConfirmCode={mockSetConfirmCode}
        />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("*CPF ou E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*Senha")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("Mantenha-me conectado")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Problemas para entrar/i })).toBeInTheDocument();
    expect(screen.getByText("Ou entre com uma rede social")).toBeInTheDocument();
    expect(screen.getByText("Não possui cadastro?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Criar uma nova conta" })).toBeInTheDocument();
  });

  it("Deve permitir a digitação nos inputs", async () => {
    render(
      <BrowserRouter>
        <FormLogin
          wrongCode={false}
          setLoading={mockSetLoading}
          setMaskedUser={mockSetMaskedUser}
          setConfirmCode={mockSetConfirmCode}
        />
      </BrowserRouter>
    );

    const cpf_email = screen.getByPlaceholderText("*CPF ou E-mail");
    const senha = screen.getByPlaceholderText("*Senha");

    await userEvent.type(cpf_email, "teste@gmail.com");
    await userEvent.type(senha, "123456");

    expect(cpf_email).toHaveValue("teste@gmail.com");
    expect(senha).toHaveValue("123456");
  });

  it("Deve carregar a mensagem de erro quando 'wrongCode' for verdadeiro", () => {
    render(
      <BrowserRouter>
        <FormLogin
          wrongCode={true}
          setLoading={mockSetLoading}
          setMaskedUser={mockSetMaskedUser}
          setConfirmCode={mockSetConfirmCode}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(/Usuário, senha ou código inválidos/i)).toBeInTheDocument();
  });

  it("Deve chamar 'mockSetMaskedUser' e 'mockSetConfirmCode' quando o clique em 'Entrar' for bem-sucedido", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: "teste@gmail.com" });
    render(
      <BrowserRouter>
        <FormLogin
          wrongCode={false}
          setLoading={mockSetLoading}
          setMaskedUser={mockSetMaskedUser}
          setConfirmCode={mockSetConfirmCode}
        />
      </BrowserRouter>
    );
    const cpf_email = screen.getByPlaceholderText("*CPF ou E-mail");
    const senha = screen.getByPlaceholderText("*Senha");
    const button = screen.getByRole("button", { name: "Entrar" });

    await userEvent.type(cpf_email, "teste@gmail.com");
    await userEvent.type(senha, "123456");
    await userEvent.click(button);

    expect(mockedAxios.post).toHaveBeenCalledWith("/user/login", {
      cpf: null,
      email: "teste@gmail.com",
      password: "123456",
    });
    expect(mockSetMaskedUser).toHaveBeenCalledWith({
      email: "teste@gmail.com",
      maskedEmail: "te***@gm***.com",
    });
    expect(mockSetConfirmCode).toHaveBeenCalled();
  });

  it("Deve exibir uma mensagem de erro ao clicar em 'Entrar' se a requisição for mal-sucedida", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Erro"));
    render(
      <BrowserRouter>
        <FormLogin
          wrongCode={false}
          setLoading={mockSetLoading}
          setMaskedUser={mockSetMaskedUser}
          setConfirmCode={mockSetConfirmCode}
        />
      </BrowserRouter>
    );
    const cpf_email = screen.getByPlaceholderText("*CPF ou E-mail");
    const senha = screen.getByPlaceholderText("*Senha");
    const button = screen.getByRole("button", { name: "Entrar" });

    await userEvent.type(cpf_email, "teste@gmail.com");
    await userEvent.type(senha, "123456");
    await userEvent.click(button);

    expect(mockedAxios.post).toHaveBeenCalledWith("/user/login", {
      cpf: null,
      email: "teste@gmail.com",
      password: "123456",
    });
    expect(
      screen.getByText("Usuário ou senha inválidos. Se o problema persistir, entre em contato com o nosso atendimento.")
    ).toBeInTheDocument();
  });

  it("Deve mudar de rota ao clicar em 'Criar uma nova conta'", async () => {
    render(
      <BrowserRouter>
        <FormLogin
          wrongCode={false}
          setLoading={mockSetLoading}
          setMaskedUser={mockSetMaskedUser}
          setConfirmCode={mockSetConfirmCode}
        />
      </BrowserRouter>
    );
    const link = screen.getByRole("link", { name: "Criar uma nova conta" });
    await userEvent.click(link);

    expect(window.location.pathname).toBe("/minha-conta/cadastro");
  });
});
