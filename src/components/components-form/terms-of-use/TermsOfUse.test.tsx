import { render, screen } from "@testing-library/react";
import TermsOfUse from ".";

describe("TermsOfUse", () => {
  it("Deve carregar todos os textos e links corretamente", () => {
    render(<TermsOfUse />);

    expect(screen.getByText(/O uso de nosso site e aplicativo é regulado por nossos/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Termos de Uso/i })).toHaveAttribute(
      "href",
      "https://atendimento.ingresso.com/portal/pt-br/kb/articles/termos-de-uso"
    );
    expect(
      screen.getByText(/Maiores informações sobre como usamos seus dados pessoais podem ser encontradas em nossa/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Política de Privacidade/i })).toHaveAttribute(
      "href",
      "https://atendimento.ingresso.com/portal/pt-br/kb/articles/pol%C3%ADtica-de-privacidade"
    );
    expect(screen.getByRole("link", { name: /Política de Cookies/i })).toHaveAttribute(
      "href",
      "https://atendimento.ingresso.com/portal/pt-br/kb/articles/pol%C3%ADtica-de-cookies"
    );
    expect(screen.getByText(/Deseja excluir sua conta?/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /passos a seguir/i })).toHaveAttribute(
      "href",
      "https://atendimento.ingresso.com/portal/pt-br/kb/articles/quero-excluir-minha-conta-como-fa%C3%A7o"
    );
  });
});
