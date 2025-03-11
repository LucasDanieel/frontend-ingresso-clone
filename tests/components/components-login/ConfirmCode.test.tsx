import { render, screen } from "@testing-library/react";
import ConfirmCode from "../../../src/components/components-login/confirm-code";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Mocked } from "vitest";

vi.mock("axios");

const mokedAxios = axios as Mocked<typeof axios>;

describe("ConfirmCode", () => {
  const maskedUser = {
    email: "teste@gmail.com",
    maskedEmail: "te***@gm***.com",
  };
  const mockSetLoading = vi.fn();
  const mockSetWrongCode = vi.fn();
  const mockSetConfirmCode = vi.fn();
  const mockHandleBackToLogin = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() =>
    render(
      <ConfirmCode
        maskedUser={maskedUser}
        setLoading={mockSetLoading}
        setWrongCode={mockSetWrongCode}
        setConfirmCode={mockSetConfirmCode}
        handleBackToLogin={mockHandleBackToLogin}
        navigate={mockNavigate}
      />
    )
  );

  it("Deve carregar todos os textos e botões corretamente", () => {
    expect(screen.getByText(/Verifique seu Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Enviamos um código de confirmação para o e-mail cadastrado/i)).toBeInTheDocument();
    expect(screen.getByText(maskedUser.maskedEmail)).toBeInTheDocument();
    expect(screen.getByText(/Digite-o abaixo e clique em Entrar/i)).toBeInTheDocument();
    expect(
      screen.getByText("Não encontrou o e-mail? Verifique sua caixa de Spam ou a aba Promoções.")
    ).toBeInTheDocument();
    expect(screen.getByText(/Reenviar código/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continuar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Voltar ao login" })).toBeInTheDocument();
  });

  it("Deve confirmar o código quando clicar no botão 'Continuar'", async () => {
    mokedAxios.post.mockResolvedValueOnce({ data: {} });

    const inputCode0 = screen.getByTestId("input-code-0");
    const button = screen.getByRole("button", { name: "Continuar" });

    await userEvent.type(inputCode0, "123456");
    await userEvent.click(button);

    expect(mockSetLoading).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("Deve dar erro quando clicar no botão 'Continuar'", async () => {
    mokedAxios.post.mockRejectedValueOnce(new Error("Erro"));

    const inputCode0 = screen.getByTestId("input-code-0");
    const button = screen.getByRole("button", { name: "Continuar" });

    await userEvent.type(inputCode0, "12345");
    await userEvent.click(button);

    expect(mockSetLoading).toHaveBeenCalled();
    expect(mockSetWrongCode).toHaveBeenCalled();
    expect(mockSetConfirmCode).toHaveBeenCalled();
  });

  it("Deve enviar outro código quando clicar em 'Reenviar código'", async () => {
    mokedAxios.get.mockResolvedValueOnce({ data: {} });

    const button = screen.getByText("Reenviar código");

    await userEvent.click(button);

    expect(screen.getByTestId("sent-new-code")).toBeInTheDocument();
  });

  it("Deve voltar para tela de login quando clicar em 'Voltar ao login'", async () => {
    const button = screen.getByRole("button", { name: "Voltar ao login" });

    await userEvent.click(button);

    expect(mockHandleBackToLogin).toHaveBeenCalled();
  });
});
