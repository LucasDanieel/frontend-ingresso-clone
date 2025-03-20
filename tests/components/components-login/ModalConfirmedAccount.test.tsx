import { render, screen } from "@testing-library/react";
import ModalConfirmedAccount from "../../../src/components/components-login/modal-confirmed-account";
import userEvent from "@testing-library/user-event";

describe("ModalConfirmedAccount", () => {
  const mockSetConfirmedAccount = vi.fn();

  it("Deve carregar o ícone, o texto e o botão", () => {
    render(<ModalConfirmedAccount setConfirmedAccount={mockSetConfirmedAccount} />);

    expect(screen.getByTestId("icon-close-modal")).toBeInTheDocument();
    expect(screen.getByText(/Cadastro confirmado/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continuar/i })).toBeInTheDocument();
  });

  it("Deve chamar 'mockSetConfirmedAccount' ao clicar no ícone 'x'", async () => {
    render(<ModalConfirmedAccount setConfirmedAccount={mockSetConfirmedAccount} />);

    const icon = screen.getByTestId("icon-close-modal");
    await userEvent.click(icon);

    expect(mockSetConfirmedAccount).toHaveBeenCalled();
  });

  it("Deve chamar 'mockSetConfirmedAccount' ao clicar no botão 'Continuar'", async () => {
    render(<ModalConfirmedAccount setConfirmedAccount={mockSetConfirmedAccount} />);

    const button = screen.getByRole("button", { name: /continuar/i });
    await userEvent.click(button);

    expect(mockSetConfirmedAccount).toHaveBeenCalled();
  });
});
