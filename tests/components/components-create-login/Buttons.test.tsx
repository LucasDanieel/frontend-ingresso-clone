import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Buttons from "../../../src/components/components-create-login/buttons";
import axios from "axios";
import { Mocked } from "vitest";

vi.mock("axios");

const mockedAxios = axios as Mocked<typeof axios>;

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

  it("should render both buttons", () => {
    render(
      <BrowserRouter>
        <Buttons {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continuar/i })).toBeInTheDocument();
  });

  it("should navigates back when clicking 'Voltar'", async () => {
    render(
      <BrowserRouter>
        <Buttons {...defaultProps} />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /voltar/i }));

    expect(window.location.pathname).toBe("/minha-conta");
  });

  it("should disables the 'Continuar' button when reCAPTCHA is null", () => {
    render(
      <BrowserRouter>
        <Buttons {...defaultProps} reCAPTCHA={null} />
      </BrowserRouter>
    );

    expect(screen.getByRole("button", { name: /continuar/i })).toBeDisabled();
  });

  it("should validate inputs before submitting", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: {} });
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

  it("should send request on submit", async () => {
    mockedAxios.post.mockResolvedValue({ data: {} });

    render(
      <BrowserRouter>
        <Buttons {...defaultProps} />
      </BrowserRouter>
    );
    
    const submitButton = screen.getByRole("button", { name: /Continuar/i });
    const user = userEvent.setup();
    await user.click(submitButton);

    expect(mockedAxios.post).toHaveBeenCalledWith("/user/create", expect.any(Object));
  });
});
