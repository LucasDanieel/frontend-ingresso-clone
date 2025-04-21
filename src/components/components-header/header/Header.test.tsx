import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { UserContext } from "../../../providers/user-provider";
import Header from ".";

describe("Header", () => {
  const renderHeaderComponents = () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    return {
      logoIngresso: screen.getByTestId("logo-ingresso"),
      cityButton: screen.getByTestId("icon-location"),
      loginCreateButton: screen.getByTestId("button-login"),
      helpButton: screen.getByTestId("icon-help"),
      container,
    };
  };

  const renderHeaderValuesComponents = () => {
    render(
      <MemoryRouter>
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
          <Header />
        </UserContext.Provider>
      </MemoryRouter>
    );
  };

  it("Deve renderizar todos os componentes de 'Header'", () => {
    const { logoIngresso, loginCreateButton, helpButton } = renderHeaderComponents();

    expect(logoIngresso).toHaveAttribute(
      "src",
      "https://ingresso-a.akamaihd.net/catalog/img/ingresso-logo-v1-desktop-final.svg"
    );
    expect(screen.getByTestId("div-city-header")).toBeInTheDocument();
    expect(screen.getByTestId("div-header-input-search")).toBeInTheDocument();
    expect(loginCreateButton).toBeInTheDocument();
    expect(helpButton).toBeInTheDocument();
  });

  it("Deve renderizar o componente 'menu profile' de 'Header'", () => {
    renderHeaderValuesComponents();

    expect(screen.getByTestId("button-menu-profile")).toBeInTheDocument();
    expect(screen.getByText("Olá, teste")).toBeInTheDocument();
    expect(screen.getByText("Meus Pedidos")).toBeInTheDocument();
  });

  it("Deve carregar a cidade atual corretamente", () => {
    renderHeaderValuesComponents();

    expect(screen.getByTestId("div-city-header")).toHaveTextContent("São Paulo");
  });

  it("Deve renderizar o dropdown de 'city' ao clicar no botão e desaparecer ao clicar novamente", async () => {
    const { cityButton } = renderHeaderComponents();
    const user = userEvent.setup();

    await user.click(cityButton);
    expect(screen.getByTestId("city-component")).toBeInTheDocument();

    await user.click(cityButton);
    expect(screen.queryByTestId("city-component")).not.toBeInTheDocument();
  });

  it("Deve renderizar o dropdown de 'login/create' ao clicar no botão e desaparecer ao clicar novamente", async () => {
    const { loginCreateButton } = renderHeaderComponents();
    const user = userEvent.setup();

    await user.click(loginCreateButton);
    expect(screen.getByTestId("login-create-component")).toBeInTheDocument();

    await user.click(loginCreateButton);
    expect(screen.queryByTestId("login-create-component")).not.toBeInTheDocument();
  });

  it("Deve renderizar o dropdown de 'menu profile' ao clicar no botão e desaparecer ao clicar novamente", async () => {
    renderHeaderValuesComponents();

    const button = screen.getByTestId("button-menu-profile");
    const user = userEvent.setup();

    await user.click(button);
    expect(screen.getByTestId("menu-profile-component")).toBeInTheDocument();

    await user.click(button);
    expect(screen.queryByTestId("menu-profile-component")).not.toBeInTheDocument();
  });

  it("Deve renderizar o dropdown de 'help' ao clicar no botão e desaparecer ao clicar novamente", async () => {
    const { helpButton } = renderHeaderComponents();
    const user = userEvent.setup();

    await user.click(helpButton);
    expect(screen.getByTestId("help-component")).toBeInTheDocument();

    await user.click(helpButton);
    expect(screen.queryByTestId("help-component")).not.toBeInTheDocument();
  });

  it("Deve trocar os componentes do dropdown e fechar ao clicar fora dos componentes", async () => {
    const { cityButton, loginCreateButton, helpButton, container } = renderHeaderComponents();
    const user = userEvent.setup();

    await user.click(cityButton);
    expect(screen.getByTestId("city-component")).toBeInTheDocument();

    await user.click(loginCreateButton);
    expect(screen.queryByTestId("city-component")).not.toBeInTheDocument();
    expect(screen.getByTestId("login-create-component")).toBeInTheDocument();

    await user.click(helpButton);
    expect(screen.queryByTestId("login-create-component")).not.toBeInTheDocument();
    expect(screen.getByTestId("help-component")).toBeInTheDocument();

    await user.click(container);
    expect(screen.queryByTestId("help-component")).not.toBeInTheDocument();
  });
});
