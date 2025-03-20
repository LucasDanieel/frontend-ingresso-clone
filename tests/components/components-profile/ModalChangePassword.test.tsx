import { render, screen } from "@testing-library/react";
import ModalChangePassword from "../../../src/components/components-profile/modal-change-password";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

vi.mock("react-google-recaptcha", () => ({
  default: ({ onChange }: { onChange: (token: string | null) => void }) => (
    <button onClick={() => onChange("fake-token")}>Mocked ReCAPTCHA</button>
  ),
}));

vi.mock("axios");

describe("ModalChangePassword", () => {
  const mockSetOpenModalChangePassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Deve carregar todos os componentes", () => {
    render(<ModalChangePassword email="teste@gmail.com" setOpenModalChangePassword={mockSetOpenModalChangePassword} />);

    expect(screen.getByRole("heading", { name: "Alterar Senha" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha Atual")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite sua nova senha")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirme sua nova senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Alterar Senha" })).toBeInTheDocument();
  });

  it("Deve carregar a mensagem de erro do input 'Senha Atual' corretamente", async () => {
    render(<ModalChangePassword email="teste@gmail.com" setOpenModalChangePassword={mockSetOpenModalChangePassword} />);

    const input = screen.getByPlaceholderText("Senha Atual");

    const user = userEvent.setup();

    await user.click(input);
    await user.tab();

    expect(screen.getByText(/Por favor, digite sua senha/i)).toBeInTheDocument();

    await user.type(input, "t");

    expect(screen.queryByText(/Por favor, digite sua senha/i)).not.toBeInTheDocument();

    await user.type(input, "{backspace}");

    expect(screen.getByText(/Por favor, digite sua senha/i)).toBeInTheDocument();
  });

  it("Deve carregar a mensagem de erro do input 'Digite sua nova senha' corretamente", async () => {
    render(<ModalChangePassword email="teste@gmail.com" setOpenModalChangePassword={mockSetOpenModalChangePassword} />);

    const input = screen.getByPlaceholderText("Digite sua nova senha");

    const user = userEvent.setup();

    await user.click(input);
    await user.tab();

    expect(screen.getByText(/Por favor, digite uma senha/i)).toBeInTheDocument();

    await user.type(input, "T");

    expect(screen.getByText(/A senha não atende aos critérios necessários/i)).toBeInTheDocument();

    await user.type(input, "este123");

    expect(screen.queryByText(/A senha não atende aos critérios necessários/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Senhas não coincidem/i)).toBeInTheDocument();
  });

  it("Deve carregar a mensagem de erro do input 'Confirme sua nova senha' corretamente", async () => {
    render(<ModalChangePassword email="teste@gmail.com" setOpenModalChangePassword={mockSetOpenModalChangePassword} />);

    const inputConfirmNewPassword = screen.getByPlaceholderText("Confirme sua nova senha");
    const inputNewPassword = screen.getByPlaceholderText("Digite sua nova senha");

    const user = userEvent.setup();

    await user.click(inputConfirmNewPassword);
    await user.tab();

    expect(screen.getByText(/Por favor, digite a confirmação da senha/i)).toBeInTheDocument();

    await user.type(inputNewPassword, "Teste123");

    expect(screen.getByText(/Senhas não coincidem/i)).toBeInTheDocument();

    await user.type(inputConfirmNewPassword, "Teste123");

    expect(screen.queryByText(/Senhas não coincidem/i)).not.toBeInTheDocument();
  });

  it("Deve chamar o metodo 'setOpenModalChangePassword' quando clicar no icone 'x'", async () => {
    render(<ModalChangePassword email="teste@gmail.com" setOpenModalChangePassword={mockSetOpenModalChangePassword} />);

    await userEvent.click(screen.getByTestId("icon-close-modal"));

    expect(mockSetOpenModalChangePassword).toHaveBeenCalled();
  });

  it("Deve exibir um modal de sucesso quando a requisição for bem-sucedida", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: {} });
    vi.mocked(axios.put).mockResolvedValueOnce({ data: {} });

    render(
      <MemoryRouter>
        <ModalChangePassword email="teste@gmail.com" setOpenModalChangePassword={mockSetOpenModalChangePassword} />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Senha Atual"), "teste");
    await user.type(screen.getByPlaceholderText("Confirme sua nova senha"), "Teste123");
    await user.type(screen.getByPlaceholderText("Digite sua nova senha"), "Teste123");
    await user.click(screen.getByRole("button", { name: "Mocked ReCAPTCHA" }));

    expect(screen.getByRole("button", { name: "Alterar Senha" })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "Alterar Senha" }));

    expect(screen.getByTestId("modal-password-changed")).toBeInTheDocument();
  });

  it("Deve exibir uma mensagem de erro quando a senha estiver incorreta", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: {} });
    vi.mocked(axios.put).mockRejectedValueOnce({
      response: { data: { message: "Senha inválida" } },
    });

    render(<ModalChangePassword email="teste@gmail.com" setOpenModalChangePassword={mockSetOpenModalChangePassword} />);

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Senha Atual"), "teste");
    await user.type(screen.getByPlaceholderText("Confirme sua nova senha"), "Teste123");
    await user.type(screen.getByPlaceholderText("Digite sua nova senha"), "Teste123");
    await user.click(screen.getByRole("button", { name: "Mocked ReCAPTCHA" }));
    await user.click(screen.getByRole("button", { name: "Alterar Senha" }));

    expect(screen.getByText("Senha inválida.")).toBeInTheDocument();
  });

  it("Deve exibir um 'alert' quando algum outro erro for retornado", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: {} });
    vi.mocked(axios.put).mockRejectedValueOnce({
      response: { data: { message: "Erro generico" } },
    });

    render(<ModalChangePassword email="teste@gmail.com" setOpenModalChangePassword={mockSetOpenModalChangePassword} />);

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Senha Atual"), "teste");
    await user.type(screen.getByPlaceholderText("Confirme sua nova senha"), "Teste123");
    await user.type(screen.getByPlaceholderText("Digite sua nova senha"), "Teste123");
    await user.click(screen.getByRole("button", { name: "Mocked ReCAPTCHA" }));
    await user.click(screen.getByRole("button", { name: "Alterar Senha" }));

    expect(alertMock).toHaveBeenCalledWith("Erro generico");
  });
});
