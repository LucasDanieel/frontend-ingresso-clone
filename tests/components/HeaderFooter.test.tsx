import { render, screen } from "@testing-library/react";
import HeaderFooter from "../../src/components/header-footer";

describe("HeaderFooter", () => {
  it("Deve carregar todos dos componentes", () => {
    render(<HeaderFooter />);

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://ingresso-a.akamaihd.net/catalog/img/ingresso-logo-v1-desktop-final.svg"
    );
    expect(
      screen.getByText(
        "Ingresso.com Ltda / CNPJ: 008606400001-71 / Endereço: Rua da Quitanda, 86 - 9º andar - Centro - Rio de Janeiro, RJ - 20091-902 /"
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Atendimento ao cliente" })).toHaveAttribute(
      "href",
      "https://atendimento.ingresso.com/portal/pt-br/kb/atendimento-ingresso-com"
    );
    expect(screen.getByText("© Copyright Ingresso.com - Todos os direitos reservados ®")).toBeInTheDocument();
  });

  it("Deve carregar o componente passado", () => {
    render(
      <HeaderFooter>
        <h1>Teste</h1>
      </HeaderFooter>
    );

    expect(screen.getByRole("heading", { name: "Teste" })).toBeInTheDocument();
  });
});
