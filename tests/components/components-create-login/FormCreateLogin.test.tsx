import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FormCreateLogin from "../../../src/components/components-create-login/form-create-login";
import userEvent from "@testing-library/user-event";

vi.mock("react-google-recaptcha", () => ({
  default: ({ onChange }: { onChange: (token: string | null) => void }) => (
    <button onClick={() => onChange("fake-token")}>Mocked ReCAPTCHA</button>
  ),
}));

// vi.mock("../../form-inputs/simple-input", () => ({
//   default: ({ nameField, handleChange }: { nameField: string; handleChange: (e: any) => void }) => (
//     <input data-testid={nameField} placeholder={nameField} onChange={handleChange} type="text" />
//   ),
// }));

describe("FormCreateLogin", () => {
  const defaultProps = {
    isLoading: false,
    setLoading: vi.fn(),
    setUserCreated: vi.fn(),
  };

  it("deve renderizar todos os textos e o checkbox", () => {
    render(
      <BrowserRouter>
        <FormCreateLogin {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Campos obrigatórios/i)).toBeInTheDocument();
    expect(screen.getByText(/Quero receber novidades e mensagens da Ingresso.com/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("deve renderizar os campos obrigatórios", () => {
    render(
      <BrowserRouter>
        <FormCreateLogin {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("*Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*CPF")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*Confirmação de E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*Senha")).toBeInTheDocument();
  });

  it("deve permitir digitar no input 'Nome' e validar a entrada", async () => {
    render(
      <BrowserRouter>
        <FormCreateLogin {...defaultProps} />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText("*Nome");
    await userEvent.type(input, "Te");

    expect(input).toHaveValue("Te");
    expect(
      screen.getByText(/O nome precisa ter entre 3 e 60 caracteres e não possuir caracteres especiais/i)
    ).toBeInTheDocument();

    await userEvent.type(input, "ste");
    expect(input).toHaveValue("Teste");
    expect(
      screen.queryByText(/O nome precisa ter entre 3 e 60 caracteres e não possuir caracteres especiais/i)
    ).not.toBeInTheDocument();

    await userEvent.type(input, "@");
    expect(
      screen.getByText(/O nome precisa ter entre 3 e 60 caracteres e não possuir caracteres especiais/i)
    ).toBeInTheDocument();

    await userEvent.type(input, "{backspace}");
    expect(
      screen.queryByText(/O nome precisa ter entre 3 e 60 caracteres e não possuir caracteres especiais/i)
    ).not.toBeInTheDocument();
  });

  it("Deve carregar a máscara do CPF corretamente e validar se é válido", async () => {
    render(
      <BrowserRouter>
        <FormCreateLogin {...defaultProps} />
      </BrowserRouter>
    );
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText("*CPF");

    await user.click(input);
    expect(input).toHaveValue("___.___.___-__");

    await user.type(input, "12");
    expect(input).toHaveValue("12_.___.___-__");

    await user.type(input, "345678901");
    expect(input).toHaveValue("123.456.789-01");

    await user.type(input, "{backspace}");
    expect(input).toHaveValue("123.456.789-0_");
  });
});
