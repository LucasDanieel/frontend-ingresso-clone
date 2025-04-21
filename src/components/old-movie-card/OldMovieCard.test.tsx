import { render, screen } from "@testing-library/react";
import OldMovieCard from ".";
import { MemoryRouter } from "react-router-dom";

describe("OldMovieCard", () => {
  const mockFilmProps = {
    id: 1,
    name: "Teste",
    classification: "10",
    gender: "Aventura",
    duration: "100",
    premiereDate: "2025-05-10",
    trending: false,
    preSale: false,
    slug: "teste",
    publicIdPosterImage: "imagem",
    publicIdBannerImage: "imagem",
    posterImage: "https://teste.com",
    bannerImage: "https://teste.com",
  };

  it("Deve carregar os componentes padrão", () => {
    render(
      <MemoryRouter>
        <OldMovieCard film={mockFilmProps} />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link");

    links.forEach((link) => {
      expect(link).toHaveAttribute("href", `/filme/${mockFilmProps.slug}`);
    });
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://teste.com");
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Teste")).toBeInTheDocument();
  });

  it("Deve ter a classe 'pre-venda' quando o filme tiver a propriedade 'pre_venda' verdadeira", () => {
    render(
      <MemoryRouter>
        <OldMovieCard film={{ ...mockFilmProps, preSale: true }} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("div-old-movie-img")).toHaveClass("pre-venda");
  });

  it("Deve carregar a div de estreia quando o filme tiver a propriedade 'premiereDate'", () => {
    render(
      <MemoryRouter>
        <OldMovieCard film={mockFilmProps} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("div-old-movie-premiere")).toBeInTheDocument();
  });

  it("Deve carregar a div de estreia hoje quando o lançamento do filme for hoje", () => {
    const date = new Date();

    render(
      <MemoryRouter>
        <OldMovieCard film={{ ...mockFilmProps, premiereDate: date.toISOString().split("T")[0] }} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("div-old-movie-premiere")).toHaveTextContent("Estreia hoje");
    expect(screen.getByTestId("div-old-movie-premiere")).toHaveClass("premiere today");
  });
});
