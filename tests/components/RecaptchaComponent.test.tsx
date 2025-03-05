import { render, screen } from "@testing-library/react";
import axios from "axios";
import { Mocked } from "vitest";
import RecaptchaComponent from "../../src/components/components-form/recaptcha-component";
import userEvent from "@testing-library/user-event";

vi.stubGlobal("import.meta", {
  env: {
    VITE_RECAPTCHA_KEY: "fake-recaptcha-key",
  },
});

vi.mock("react-google-recaptcha", () => ({
  default: ({ onChange }: { onChange: (token: string | null) => void }) => (
    <button onClick={() => onChange("fake-token")}>Mocked ReCAPTCHA</button>
  ),
}));

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

const mockSetReCAPTCHA = vi.fn();

beforeEach(() => {
  render(<RecaptchaComponent setReCAPTCHA={mockSetReCAPTCHA} />);
});

describe("RecaptchaComponent", () => {
  it("Deve renderizar todo o texto e o componente 'reCAPTCHA'", () => {
    expect(
      screen.getByText(/Este site é protegido pelo reCAPTCHA e pelo Google aplicando as seguintes/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Políticas de Segurança/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Termos de Serviço/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mocked ReCAPTCHA" })).toBeInTheDocument();
  });

  it("Deve chamar 'setReCAPTCHA' com o token ao clicar", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: {} });

    const recaptchaButton = screen.getByRole("button", { name: "Mocked ReCAPTCHA" });
    await userEvent.click(recaptchaButton);

    expect(mockSetReCAPTCHA).toHaveBeenCalledWith("fake-token");
  });

  it("Deve chamar 'setReCAPTCHA' com null em caso de erro", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("ReCAPTCHA error"));

    const recaptchaButton = screen.getByRole("button", { name: "Mocked ReCAPTCHA" });
    await userEvent.click(recaptchaButton);

    expect(mockSetReCAPTCHA).toHaveBeenCalledWith(null);
  });
});
