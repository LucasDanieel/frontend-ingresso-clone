import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DropdownLoginCreate from ".";

describe("DropdownLoginCreate", () => {
  const left = 1058;

  beforeEach(() => {
    render(
      <BrowserRouter>
        <DropdownLoginCreate left={left} />
      </BrowserRouter>
    );
  });

  it("Deve renderizar todo o texto", () => {
    expect(screen.getByText(/Ainda não é cliente/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Compre ingressos e combos de pipoca para ir ao cinema com segurança e mais comodidade!/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Cliente Ingresso.com")).toBeInTheDocument();
  });

  it("Deve renderizar o botão e o link", () => {
    const button = screen.getByRole("button", { name: "Criar uma nova conta" });
    expect(button).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Entrar na minha Conta" });
    expect(link).toHaveAttribute("href", "/minha-conta");
  });

  it("Deve estar visível na tela", () => {
    const dropdown = screen.getByTestId("login-create-component");
    expect(dropdown).toBeVisible();
  });

  it("Deve renderizar o dropdown na posição correta", () => {
    const dropdown = screen.getByTestId("login-create-component");

    vi.spyOn(dropdown, "getBoundingClientRect").mockReturnValue({
      x: left,
      y: 66,
      width: 200,
      height: 100,
      top: 66,
      left: left,
      right: left + 200,
      bottom: 200,
      toJSON: () => {},
    });

    expect(dropdown.getBoundingClientRect().left).toBe(left);
  });
});
