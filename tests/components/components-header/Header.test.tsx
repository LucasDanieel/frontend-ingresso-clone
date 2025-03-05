import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Header from "../../../src/components/components-header/header";

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
      searchButton: screen.getByTestId("icon-search"),
      loginCreateButton: screen.getByTestId("icon-login"),
      helpButton: screen.getByTestId("icon-help"),
      container,
    };
  };

  it("Deve renderizar o logo ingresso", () => {
    const { logoIngresso } = renderHeaderComponents();

    expect(logoIngresso).toHaveAttribute(
      "src",
      "https://ingresso-a.akamaihd.net/catalog/img/ingresso-logo-v1-desktop-final.svg"
    );
  });

  it("Deve renderizar o dropdown de 'city' ao clicar no botão e desaparecer ao clicar novamente", async () => {
    const { cityButton } = renderHeaderComponents();
    const user = userEvent.setup();

    await user.click(cityButton);
    expect(screen.getByTestId("city-component")).toBeInTheDocument();

    await user.click(cityButton);
    expect(screen.queryByTestId("city-component")).not.toBeInTheDocument();
  });

  it("Deve renderizar o dropdown de 'search' ao clicar no botão e desaparecer ao clicar novamente", async () => {
    const { searchButton } = renderHeaderComponents();
    const user = userEvent.setup();

    await user.click(searchButton);
    expect(screen.getByTestId("search-component")).toBeInTheDocument();

    await user.click(searchButton);
    expect(screen.queryByTestId("search-component")).not.toBeInTheDocument();
  });

  it("Deve renderizar o dropdown de 'login/create' ao clicar no botão e desaparecer ao clicar novamente", async () => {
    const { loginCreateButton } = renderHeaderComponents();
    const user = userEvent.setup();

    await user.click(loginCreateButton);
    expect(screen.getByTestId("login-create-component")).toBeInTheDocument();

    await user.click(loginCreateButton);
    expect(screen.queryByTestId("login-create-component")).not.toBeInTheDocument();
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
    const { cityButton, searchButton, loginCreateButton, helpButton, container } = renderHeaderComponents();
    const user = userEvent.setup();

    await user.click(cityButton);
    expect(screen.getByTestId("city-component")).toBeInTheDocument();

    await user.click(searchButton);
    expect(screen.queryByTestId("city-component")).not.toBeInTheDocument();
    expect(screen.getByTestId("search-component")).toBeInTheDocument();

    await user.click(loginCreateButton);
    expect(screen.queryByTestId("search-component")).not.toBeInTheDocument();
    expect(screen.getByTestId("login-create-component")).toBeInTheDocument();

    await user.click(helpButton);
    expect(screen.queryByTestId("login-create-component")).not.toBeInTheDocument();
    expect(screen.getByTestId("help-component")).toBeInTheDocument();

    await user.click(container);
    expect(screen.queryByTestId("help-component")).not.toBeInTheDocument();
  });
});
