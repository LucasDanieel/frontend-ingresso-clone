import { render, screen } from "@testing-library/react";
import HeaderProfile from ".";
import { UserContext } from "../../../providers/user-provider";

describe("HeaderProfile", () => {
  it("Deve carregar todos os componentes", async () => {
    render(
      <UserContext.Provider
        value={{
          user: { name: "teste teste", email: "teste@gmail.com" },
          setUser: vi.fn(),
          actualCity: { id: 1, name: "São Paulo", state: "São Paulo", slug: "sao-paulo", uf: "SP" },
          cityHistory: [{ id: 1, name: "São Paulo", state: "São Paulo", slug: "sao-paulo", uf: "SP" }],
          setActualCity: vi.fn(),
          setCityHistory: vi.fn(),
        }}
      >
        <HeaderProfile />
      </UserContext.Provider>
    );

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://ingresso-a.akamaihd.net/catalog/img/ingresso-logo-v1-desktop-final.svg"
    );
    expect(screen.getByTestId("icon-help")).toBeInTheDocument();
    expect(screen.getByText("Olá, teste")).toBeInTheDocument();
  });
});
