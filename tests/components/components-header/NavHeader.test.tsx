import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavHeader from "../../../src/components/components-header/nav-header";
import userEvent from "@testing-library/user-event";

describe("NavHeader", () => {
  it("Deve renderizar todos os links de navegação", () => {
    render(
      <MemoryRouter>
        <NavHeader />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "FILMES" })).toHaveAttribute("href", "/filmes");
    expect(screen.getByRole("link", { name: "CINEMAS" })).toHaveAttribute("href", "/cinemas");
    expect(screen.getByRole("link", { name: "TEATRO" })).toHaveAttribute("href", "/teatros");
    expect(screen.getByRole("link", { name: "EVENTOS" })).toHaveAttribute("href", "/eventos");
    expect(screen.getByRole("link", { name: "NOTÍCIAS" })).toHaveAttribute("href", "/noticias");
  });

  it("Deve aplicar a classe 'active-link' ao link correto", async () => {
    render(
      <MemoryRouter initialEntries={["/filmes"]}>
        <NavHeader />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "FILMES" });
    expect(link).toHaveClass("active-link");
  });

  it("Deve mudar a classe 'active-link' ao clicar em outra rota", async () => {
    render(
      <MemoryRouter initialEntries={["/filmes"]}>
        <NavHeader />
      </MemoryRouter>
    );

    const link_filmes = screen.getByRole("link", { name: "FILMES" });
    expect(link_filmes).toHaveClass("active-link");

    const link_cinemas = screen.getByRole("link", { name: "CINEMAS" });
    const user = userEvent.setup();
    await user.click(link_cinemas);

    expect(link_filmes).not.toHaveClass("active-link");
    expect(link_cinemas).toHaveClass("active-link");
  });
});
