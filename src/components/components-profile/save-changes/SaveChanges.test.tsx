import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from "../../../providers/user-provider";
import SaveChanges from ".";

vi.mock("js-cookie");

vi.mock("axios");
vi.mock("react-google-recaptcha", () => ({
  default: ({ onChange }: { onChange: (token: string | null) => void }) => (
    <button onClick={() => onChange("fake-token")}>Mocked ReCAPTCHA</button>
  ),
}));

describe("SaveChanges", () => {
  const mockSetState = vi.fn();
  const mockSetUser = vi.fn();
  const mockSetProfileUpdated = vi.fn();

  const defaultProps = {
    form: {
      id: "1",
      name: "Teste",
      CPF: "123.456.789-00",
      DDD: "11",
      phone: "99999-9999",
      email: "teste@email.com",
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
    setForm: mockSetState,
    setInputNameWrong: mockSetState,
    setInputDDDWrong: mockSetState,
    setInputPhoneWrong: mockSetState,
    setProfileUpdated: mockSetProfileUpdated,
    inputNameRef: { current: null },
    inputPhoneRefs: { current: null },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <UserContext.Provider
        value={{
          user: { name: "teste", email: "teste@gmail.com" },
          setUser: mockSetUser,
          actualCity: { id: 1, name: "São Paulo", state: "São Paulo", slug: "sao-paulo", uf: "SP" },
          cityHistory: [{ id: 1, name: "São Paulo", state: "São Paulo", slug: "sao-paulo", uf: "SP" }],
          setActualCity: vi.fn(),
          setCityHistory: vi.fn(),
        }}
      >
        <SaveChanges {...defaultProps} />
      </UserContext.Provider>
    );
  });

  it("Deve carregar todos os componentes", () => {
    expect(screen.getByText("Salvar Alterações")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Por questões de segurança, você precisa digitar sua senha para confirmar as alterações feitas no seu cadastro."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mocked ReCAPTCHA" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("Deve habilitar o botão 'Salvar' quando clicar no botão ReCAPTCHA", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: {} });

    expect(screen.getByRole("button", { name: "Salvar" })).toBeDisabled();

    await userEvent.click(screen.getByRole("button", { name: "Mocked ReCAPTCHA" }));

    expect(screen.getByRole("button", { name: "Salvar" })).toBeEnabled();
  });

  it("Deve chamar 'setUser' e 'setProfileUpdated' quando a requisição for bem-sucedida", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: {} });
    vi.mocked(axios.put).mockResolvedValueOnce({ data: true });

    await userEvent.click(screen.getByRole("button", { name: "Mocked ReCAPTCHA" }));
    await userEvent.click(screen.getByRole("button", { name: "Salvar" }));

    expect(mockSetUser).toHaveBeenCalledWith({ name: "Teste", email: "teste@email.com" });
    expect(Cookies.set).toHaveBeenCalledWith(
      "info_profile",
      JSON.stringify({ name: "Teste", email: "teste@email.com" }),
      {
        expires: 10,
      }
    );
    expect(mockSetProfileUpdated).toHaveBeenCalledWith(true);
  });

  it("Deve exibir uma mensagem de erro quando a senha estiver incorreta", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: {} });
    vi.mocked(axios.put).mockRejectedValueOnce({ response: { data: { message: "Senha inválida" } } });

    await userEvent.click(screen.getByRole("button", { name: "Mocked ReCAPTCHA" }));
    await userEvent.click(screen.getByRole("button", { name: "Salvar" }));

    expect(screen.getByText("Senha inválida.")).toBeInTheDocument();
  });
});
