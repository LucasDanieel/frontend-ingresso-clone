import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import ConfirmEmail from "../../../src/components/components-create-login/confirm-email";
import { userCreated } from "../../../src/@types/user";

describe("ConfirmEmail", () => {
  const mockUserCreated: userCreated = { name: "Teste", isCompleted: true };
  const mockSetUserCreated = vi.fn();

  beforeEach(() => {
    render(
      <BrowserRouter>
        <ConfirmEmail userCreated={mockUserCreated} setUserCreated={mockSetUserCreated} />
      </BrowserRouter>
    );
  });

  it("Deve renderizar todo o texto", () => {
    expect(screen.getByText(/Falta Pouco!/i)).toBeInTheDocument();
    expect(screen.getByText(`Olá, ${mockUserCreated.name}!`)).toBeInTheDocument();
    expect(
      screen.getByText("Confirme seu cadastro clicando no link que acabamos de enviar para o seu e-mail.")
    ).toBeInTheDocument();
  });

  it("Deve carregar o evento simulado ao clicar no ícone de fechar", async () => {
    const iconClose = screen.getByTestId("icon-close-confirm-email");
    expect(iconClose).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(iconClose);

    expect(mockSetUserCreated).toHaveBeenCalledWith({ name: "", isCompleted: false });
  });

  it("Deve mudar a rota ao clicar no botão 'Continuar'", async () => {
    const button = screen.getByRole("button", { name: "Continuar" });
    expect(button).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(button);

    expect(window.location.pathname).toBe("/minha-conta");
  });
});
