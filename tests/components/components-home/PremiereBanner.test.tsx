import { render, screen } from "@testing-library/react";
import PremiereBanner from "../../../src/components/components-home/premiere-banner";

describe("PremiereBanner", () => {
  const mockPremiereFilm = {
    name: "Teste",
    age: "L",
    type: "Drama",
    description: `Um ano depois de encerrar o ensino médio, o jovem Isaías Wright não tem planos para o futuro.`,
    img: "https://teste.webp",
    premiere: null,
    pre_venda: false,
  };

  it("Deve carregar todas as informações do filme", () => {
    render(<PremiereBanner film={mockPremiereFilm} />);

    expect(screen.getByRole("img")).toHaveAttribute("src", "https://teste.webp");
    expect(screen.getByText("L")).toBeInTheDocument();
    expect(screen.getByText("Drama")).toBeInTheDocument();
    expect(screen.getByText("Teste")).toBeInTheDocument();
    expect(
      screen.getByText("Um ano depois de encerrar o ensino médio, o jovem Isaías Wright não tem planos para o futuro.")
    ).toBeInTheDocument();
  });

  it("Deve exibir aviso de pré venda e data de estreia", () => {
    render(<PremiereBanner film={{ ...mockPremiereFilm, premiere: "01/01", pre_venda: true }} />);

    expect(screen.getByText("ESTREIA 01/01")).toBeInTheDocument();
    expect(screen.getByText("PRÉ-VENDA")).toBeInTheDocument();
  });
});
