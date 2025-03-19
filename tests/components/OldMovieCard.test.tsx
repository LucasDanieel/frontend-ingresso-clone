import { render, screen } from "@testing-library/react";
import OldMovieCard from "../../src/components/old-movie-card";

describe("OldMovieCard", () => {
  const mockFilmProps = {
    name: "teste",
    age: 10,
    img: "https://teste.com",
    premiere: null,
    pre_venda: false,
  };

  it("Deve carregar os componentes padrão", () => {
    render(<OldMovieCard film={mockFilmProps} />);

    expect(screen.getByRole("img")).toHaveAttribute("src", "https://teste.com");
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("teste")).toBeInTheDocument();
  });

  it("Deve ter a classe 'pre-venda' quando o filme tiver a propriedade 'pre_venda' verdadeira", () => {
    render(<OldMovieCard film={{ ...mockFilmProps, pre_venda: true }} />);

    expect(screen.getByTestId("div-movie-img")).toHaveClass("pre-venda");
  });

  it("Deve carregar a div de estreia quando o filme tiver a propriedade 'premiere'", () => {
    render(<OldMovieCard film={{ ...mockFilmProps, premiere: "01/01" }} />);

    expect(screen.getByTestId("div-old-movie-premiere")).toBeInTheDocument();
  });
});
