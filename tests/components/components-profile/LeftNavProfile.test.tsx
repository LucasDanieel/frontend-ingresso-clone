import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LeftNavProfile from "../../../src/components/components-profile/left-nav";
import { UserContext } from "../../../src/providers/user-provider";
import userEvent from "@testing-library/user-event";

describe("LeftNavProfile", () => {
  it("Deve carregar todos os componentes", () => {
    render(
      <MemoryRouter initialEntries={["/minha-conta/meus-pedidos"]}>
        <UserContext.Provider value={{ user: { name: "teste", email: "teste@gmail.com" }, setUser: vi.fn() }}>
          <LeftNavProfile />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Voltar para a página principal" })).toBeInTheDocument();
    expect(screen.getByText(/Olá, teste :\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Essa é a sua conta/i)).toBeInTheDocument();
    expect(screen.getByText("teste@gmail.com")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Meus pedidos: Cinema" }));
    expect(screen.getByRole("link", { name: "Meus Pedidos: Shows, Teatro e mais" }));
    expect(screen.getByRole("link", { name: "Dados Pessoais" }));
    expect(screen.getByTestId("icon-logout-profile")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });

  it("Deve aplicar a classe 'isActive' ao link correto", () => {
    render(
      <MemoryRouter initialEntries={["/minha-conta/meus-pedidos"]}>
        <UserContext.Provider value={{ user: { name: "teste", email: "teste@gmail.com" }, setUser: vi.fn() }}>
          <LeftNavProfile />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Meus pedidos: Cinema" })).toHaveClass("isActive");
  });

  it("Deve alterar a classe 'isActive' quando a rota mudar", async () => {
    render(
      <MemoryRouter initialEntries={["/minha-conta/meus-pedidos"]}>
        <UserContext.Provider value={{ user: { name: "teste", email: "teste@gmail.com" }, setUser: vi.fn() }}>
          <LeftNavProfile />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Meus pedidos: Cinema" })).toHaveClass("isActive");
    
    await userEvent.click(screen.getByRole("link", { name: "Dados Pessoais" }));
    
    expect(screen.getByRole("link", { name: "Meus pedidos: Cinema" })).not.toHaveClass("isActive");
    expect(screen.getByRole("link", { name: "Dados Pessoais" })).toHaveClass("isActive");
  });
});
