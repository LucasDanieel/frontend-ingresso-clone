import { render, screen } from "@testing-library/react";
import DropdownHelp from "../../../src/components/components-header/dropdown-help";

describe("DropdownHelp", () => {
  const left = 1158;

  beforeEach(() => {
    render(<DropdownHelp left={left} />);
  });

  it("should render all text", () => {
    expect(screen.getByRole("heading", { name: "Quer cancelar um pedido?" })).toBeInTheDocument();
    expect(
      screen.getByText("Você mesmo pode cancelar seu pedido, sem contactar um atendente. É rápido e fácil!")
    ).toBeInTheDocument();
  });

  it("should render all buttons", () => {
    const button1 = screen.getByRole("button", { name: "Sim, quero cancelar um pedido" });
    expect(button1).toBeInTheDocument();

    const button2 = screen.getByRole("button", { name: "Não, quero outro tipo de atendimento" });
    expect(button2).toBeInTheDocument();
  });

  it("should be visible on the screen", () => {
    const dropdown = screen.getByTestId("help-component");
    expect(dropdown).toBeVisible();
  });

  it("should render the dropdown in the correct position", () => {
    const dropdown = screen.getByTestId("help-component");

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
