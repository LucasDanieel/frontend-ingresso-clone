import { render, screen } from "@testing-library/react";
import DropdownLoginCreate from "../../../src/components/components-header/dropdown-login-create";
import { BrowserRouter } from "react-router-dom";

describe("DropdownLoginCreate", () => {
  const left = 1058;

  beforeEach(() => {
    render(
      <BrowserRouter>
        <DropdownLoginCreate left={left} />
      </BrowserRouter>
    );
  });

  it("should render all text", () => {
    expect(screen.getByText(/Ainda não é cliente/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Compre ingressos e combos de pipoca para ir ao cinema com segurança e mais comodidade!/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Cliente Ingresso.com")).toBeInTheDocument();
  });

  it("should render button and link", () => {
    const button = screen.getByRole("button", { name: "Criar uma nova conta" });
    expect(button).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Entrar na minha Conta" });
    expect(link).toHaveAttribute("href", "/minha-conta");
  });

  it("should be visible on the screen", () => {
    const dropdown = screen.getByTestId("login-create-component");
    expect(dropdown).toBeVisible();
  });

  it("should render the dropdown in the correct position", () => {
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
