import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Buttons from ".";

vi.mock("axios");

describe("Buttons", () => {
  const mockSetState = vi.fn();
  const mockValidateAllInputs = vi.fn().mockReturnValue(true);

  const defaultProps = {
    form: {
      name: "Teste",
      CPF: "123.456.789-00",
      DDD: "11",
      phone: "99999-9999",
      email: "teste@email.com",
      confirmEmail: "teste@email.com",
      password: "Teste@123",
      month: "5",
      day: "10",
      CEP: "12345-678",
      street: "Rua Teste",
      number: "123",
      complement: "Apto 1",
      neighborhood: "Centro",
      state: "SP",
      city: "São Paulo",
      recieveNews: false,
    },
    reCAPTCHA: "mock-captcha",
    setForm: mockSetState,
    setLoading: mockSetState,
    setUserCreated: mockSetState,
    setCpfInvalidValue: mockSetState,
    setEmailInvalidValue: mockSetState,
    setReCAPTCHA: mockSetState,
    setInputCPFWrong: mockSetState,
    setInputEmailWrong: mockSetState,
    setRequiredInPassword: mockSetState,
    validateAllInputs: mockValidateAllInputs,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Deve renderizar os dois botões", () => {
    render(
      <BrowserRouter>
        <Buttons {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continuar/i })).toBeInTheDocument();
  });

  it("Deve navegar de volta ao clicar em 'Voltar'", async () => {
    render(
      <BrowserRouter>
        <Buttons {...defaultProps} />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /voltar/i }));

    expect(window.location.pathname).toBe("/minha-conta");
  });

  it("Deve desabilitar o botão 'Continuar' quando o reCAPTCHA for nulo", () => {
    render(
      <BrowserRouter>
        <Buttons {...defaultProps} reCAPTCHA={null} />
      </BrowserRouter>
    );

    expect(screen.getByRole("button", { name: /continuar/i })).toBeDisabled();
  });

  it("Deve validar os campos antes de enviar", async () => {
    vi.mocked(axios.post).mockResolvedValueOnce({ data: {} });
    render(
      <BrowserRouter>
        <Buttons {...defaultProps} />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole("button", { name: /Continuar/i });
    const user = userEvent.setup();
    await user.click(submitButton);

    expect(mockValidateAllInputs).toHaveBeenCalled();
  });

  it("Deve enviar a requisição ao clicar no botão 'Continuar'", async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: {} });
    render(
      <BrowserRouter>
        <Buttons {...defaultProps} />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole("button", { name: /Continuar/i });
    const user = userEvent.setup();
    await user.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith("/user/create", expect.any(Object));
  });
});
