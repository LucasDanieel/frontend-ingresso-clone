import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FormCreateLogin from "../../../src/components/components-create-login/form-create-login";
import userEvent from "@testing-library/user-event";

vi.mock("react-google-recaptcha", () => ({
  default: ({ onChange }: { onChange: (token: string | null) => void }) => (
    <button type="button" onClick={() => onChange("fake-token")}>
      Mocked ReCAPTCHA
    </button>
  ),
}));

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

    await userEvent.click(input);
    await userEvent.tab();
    expect(
      screen.getByText(/O nome precisa ter entre 3 e 60 caracteres e não possuir caracteres especiais/i)
    ).toBeInTheDocument();

    await userEvent.click(input);
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

  it("Deve carregar a máscara do CPF corretamente e validar a entrada", async () => {
    render(
      <BrowserRouter>
        <FormCreateLogin {...defaultProps} />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("*CPF");

    await user.click(input);
    expect(input).toHaveValue("___.___.___-__");
    expect(screen.getByText(/É obrigatório preencher o CPF/i)).toBeInTheDocument();

    await user.type(input, "12");
    expect(input).toHaveValue("12_.___.___-__");

    await user.type(input, "345678901");
    expect(input).toHaveValue("123.456.789-01");
    expect(screen.queryByText(/É obrigatório preencher o CPF/i)).not.toBeInTheDocument();

    await user.type(input, "{backspace}");
    expect(input).toHaveValue("123.456.789-0_");
    expect(screen.getByText(/É obrigatório preencher o CPF/i)).toBeInTheDocument();
  });

  it("Deve permitir digitar no input 'E-mail' e validar se o e-mail é válido", async () => {
    render(
      <BrowserRouter>
        <FormCreateLogin {...defaultProps} />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const inputEmail = screen.getByPlaceholderText("*E-mail");

    await user.click(inputEmail);
    await user.tab();
    expect(
      screen.getByText(/Informe um endereço de e-mail válido. Ele será utilizado mais tarde para validar seus dados/i)
    ).toBeInTheDocument();

    await user.click(inputEmail);
    await user.type(inputEmail, "teste");
    expect(
      screen.getByText(/Informe um endereço de e-mail válido. Ele será utilizado mais tarde para validar seus dados/i)
    ).toBeInTheDocument();

    await user.type(inputEmail, "@gmail.com");
    expect(
      screen.queryByText(/Informe um endereço de e-mail válido. Ele será utilizado mais tarde para validar seus dados/i)
    ).not.toBeInTheDocument();
    expect(inputEmail).toHaveValue("teste@gmail.com");

    expect(screen.getByText(/Este campo deve ser igual ao de e-mail/i)).toBeInTheDocument();
  });

  it("Deve permitir digitar no input 'Confirmação de E-mail' e validar se a entrada é igual ao e-mail", async () => {
    render(
      <BrowserRouter>
        <FormCreateLogin {...defaultProps} />
      </BrowserRouter>
    );

    const email = "teste@gmail.com";
    const user = userEvent.setup();
    const inputEmail = screen.getByPlaceholderText("*E-mail");
    const inputConfirmEmail = screen.getByPlaceholderText("*Confirmação de E-mail");

    await user.type(inputEmail, email);
    expect(screen.getByText(/Este campo deve ser igual ao de e-mail/i)).toBeInTheDocument();
    expect(inputEmail).toHaveValue(email);

    await user.type(inputConfirmEmail, email);
    expect(screen.queryByText(/Este campo deve ser igual ao de e-mail/i)).not.toBeInTheDocument();
    expect(inputConfirmEmail).toHaveValue(email);
  });

  it("Deve permitir digitar no input 'Senha' e validar se a entrada atende aos requisitos", async () => {
    render(
      <BrowserRouter>
        <FormCreateLogin {...defaultProps} />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("*Senha");

    await user.click(input);
    await user.tab();
    expect(screen.getByText(/A senha é obrigatória/i)).toBeInTheDocument();

    await user.type(input, "Teste");
    expect(screen.getByText(/A senha não atende aos critérios necessários/i)).toBeInTheDocument();

    await user.type(input, "123");
    expect(screen.queryByText(/A senha não atende aos critérios necessários/i)).not.toBeInTheDocument();
    expect(input).toHaveValue("Teste123");
  });

  it("Não deve renderizar o componente ReCAPTCHA quando a propriedade 'loading' for verdadeira", () => {
    render(
      <BrowserRouter>
        <FormCreateLogin {...defaultProps} isLoading={true} />
      </BrowserRouter>
    );

    const button = screen.queryByText("Mocked ReCAPTCHA");

    expect(button).not.toBeInTheDocument();
  });
});
