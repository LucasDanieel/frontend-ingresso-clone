import { render, screen } from "@testing-library/react";
import ValidPassword from ".";

describe("ValidPassword", () => {
  it("Deve carregar todos os textos corretamente", () => {
    const requiredInPassword = {
      letraMinuscula: false,
      letraMaiuscula: false,
      hasNumber: false,
      minimumLength: false,
    };
    render(<ValidPassword requiredInPassword={requiredInPassword} />);

    expect(screen.getByText(/Sua senha precisa atender aos seguintes critérios:/i)).toBeInTheDocument();
    expect(screen.getByText(/Mínimo uma letra minúscula */i)).toBeInTheDocument();
    expect(screen.getByText(/Mínimo uma letra maiúscula */i)).toBeInTheDocument();
    expect(screen.getByText(/Mínimo um número */i)).toBeInTheDocument();
    expect(screen.getByText(/Mínimo de 8 caracteres */i)).toBeInTheDocument();
  });

  it("Deve carregar a classe 'valid' no componente quando o requisito for verdadeiro", () => {
    const requiredInPassword = {
      letraMinuscula: true,
      letraMaiuscula: true,
      hasNumber: true,
      minimumLength: true,
    };
    render(<ValidPassword requiredInPassword={requiredInPassword} />);

    const minimoLetraMinuscula = screen.getByTestId("minimo-letra-minuscula");
    const minimoLetraMaiuscula = screen.getByTestId("minimo-letra-maiuscula");
    const minimoUmNumero = screen.getByTestId("minimo-um-numero");
    const minimo8Caracteres = screen.getByTestId("minimo-8-caracteres");

    expect(minimoLetraMinuscula).toHaveClass("valid");
    expect(minimoLetraMaiuscula).toHaveClass("valid");
    expect(minimoUmNumero).toHaveClass("valid");
    expect(minimo8Caracteres).toHaveClass("valid");
  });
});
