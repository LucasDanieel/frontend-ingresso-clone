import { render, screen } from "@testing-library/react";
import HeaderProfile from "../../../src/components/components-profile/header";
import { UserContext } from "../../../src/providers/user-provider";

describe("HeaderProfile", () => {
  it("Deve carregar todos os componentes", async () => {
    render(
      <UserContext.Provider value={{ user: { name: "teste teste", email: "teste@gmail.com" }, setUser: vi.fn() }}>
        <HeaderProfile />
      </UserContext.Provider>
    );

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://ingresso-a.akamaihd.net/catalog/img/ingresso-logo-v1-desktop-final.svg"
    );
    expect(screen.getByTestId("icon-help-profile")).toBeInTheDocument();
    expect(screen.getByText("Olá, teste")).toBeInTheDocument();
  });
});
