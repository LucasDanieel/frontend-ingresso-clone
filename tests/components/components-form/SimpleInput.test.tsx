import { render, screen } from "@testing-library/react";
import SimpleInput from "../../../src/components/components-form/simple-input";
import { KeyboardEvent, useState } from "react";
import userEvent from "@testing-library/user-event";

type testeSimpleInput = {
  nameField?: string;
  errorMessage?: string;
  inputWrong?: boolean;
  isCep?: boolean;
  isPassword?: boolean;
  formLogin?: boolean;
  showError?: boolean;
  disabled?: boolean;
  handleFocos?: () => void;
  handleBlur?: () => void;
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleChangePassword?: () => void;
};

describe("SimpleInput", () => {
  const MockWrapper = ({
    nameField,
    errorMessage,
    inputWrong = false,
    isCep = false,
    isPassword = false,
    showError = true,
    disabled = false,
    handleFocos,
    handleBlur,
    handleKeyDown,
    handleChangePassword,
  }: testeSimpleInput) => {
    const [value, setValue] = useState<string>("");

    return (
      <SimpleInput
        nameField={nameField ? nameField : "Teste"}
        value={value}
        errorMessage={errorMessage}
        inputWrong={inputWrong}
        isCep={isCep}
        isPassword={isPassword}
        showError={showError}
        disabled={disabled}
        handleChange={(e) => setValue(e.target.value)}
        handleFocos={handleFocos}
        handleBlur={handleBlur}
        handleKeyDown={handleKeyDown}
        handleChangePassword={handleChangePassword}
      />
    );
  };

  it("Deve carregar o input com o placeholder correto e permitir a digitação", async () => {
    render(<MockWrapper />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/Teste/i);

    await user.type(input, "teste");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("teste");
  });

  it("Deve exibir a mensagem de erro corretamente", () => {
    render(<MockWrapper errorMessage="Mensagem de erro" inputWrong />);

    expect(screen.getByText("Mensagem de erro")).toBeInTheDocument();
    expect(screen.getByTestId("icon-input-wrong")).toBeInTheDocument();
  });

  it("Não deve exibir a mensagem de erro se a variável 'showError' for falsa", () => {
    render(<MockWrapper errorMessage="Mensagem de erro" inputWrong showError={false} />);

    expect(screen.queryByText("Mensagem de erro")).not.toBeInTheDocument();
    expect(screen.queryByTestId("icon-input-wrong")).not.toBeInTheDocument();
  });

  it("Deve exibir opções apenas para o input de CEP", () => {
    render(<MockWrapper isCep />);

    expect(screen.getByRole("link", { name: "Não sei meu CEP" })).toBeInTheDocument();
  });

  it("Deve exibir opções apenas para o input de senha", async () => {
    render(<MockWrapper isPassword />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/Teste/i);

    expect(input.getAttribute("type")).toBe("password");
    expect(screen.getByTestId("icon-hidden-password")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-visible-password")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("icon-hidden-password"));

    expect(input.getAttribute("type")).toBe("text");
    expect(screen.queryByTestId("icon-hidden-password")).not.toBeInTheDocument();
    expect(screen.getByTestId("icon-visible-password")).toBeInTheDocument();
  });

  it("Deve exibir a opção 'Alterar senha' no input de senha e chamar a função 'handleChangePassword' quando clicar no link", async () => {
    const mockHandleChangePassword = vi.fn();
    render(<MockWrapper nameField="Senha" handleChangePassword={mockHandleChangePassword} />);

    const user = userEvent.setup();
    const link = screen.getByText("Alterar senha");

    await user.click(link);

    expect(link).toBeInTheDocument();
    expect(mockHandleChangePassword).toHaveBeenCalled();
  });

  it("Deve desabilitar o input se a variável 'disabled' for verdadeira", () => {
    render(<MockWrapper disabled />);

    const input = screen.getByPlaceholderText(/Teste/i) as HTMLInputElement;

    expect(input.disabled).toBe(true);
  });

  it("Deve acionar os métodos 'handleFocus', 'handleBlur' e 'handleKeyDown' do input", async () => {
    const mockHandleFocus = vi.fn();
    const mockHandleBlur = vi.fn();
    const mockHandleKeyDown = vi.fn();
    render(<MockWrapper handleFocos={mockHandleFocus} handleBlur={mockHandleBlur} handleKeyDown={mockHandleKeyDown} />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/Teste/i) as HTMLInputElement;

    await user.type(input, "teste");
    await user.tab();

    expect(mockHandleFocus).toHaveBeenCalled();
    expect(mockHandleBlur).toHaveBeenCalled();
    expect(mockHandleKeyDown).toHaveBeenCalled();
  });
});
