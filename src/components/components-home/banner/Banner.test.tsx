import { render, screen } from "@testing-library/react";
import Banner from ".";

describe("Banner", () => {
  const mockFilmDetail = {
    name: "Teste",
    age: 16,
    type: "Drama, Suspense",
    description: "Após os eventos do primeiro filme, Arthur Fleck está internado em um hospital psiquiátrico.",
    img: "https://teste.webp",
  };

  it("Deve carregar todas as informações do filme", () => {
    render(<Banner film={mockFilmDetail} />);

    expect(screen.getByRole("img")).toHaveAttribute("src", "https://teste.webp");
    expect(screen.getByText("16")).toBeInTheDocument();
    expect(screen.getByText("Drama, Suspense")).toBeInTheDocument();
    expect(screen.getByText("Teste")).toBeInTheDocument();
    // expect(
    //   screen.getByText("Após os eventos do primeiro filme, Arthur Fleck está internado em um hospital psiquiátrico.")
    // ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ingressos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Assistir Trailer" })).toBeInTheDocument();
  });
});
