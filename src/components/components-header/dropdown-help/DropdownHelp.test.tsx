import { render, screen } from "@testing-library/react";
import DropdownHelp from ".";

describe("DropdownHelp", () => {
  const left = 1158;

  beforeEach(() => {
    render(<DropdownHelp left={left} />);
  });

  it("Deve renderizar todo o texto", () => {
    expect(screen.getByRole("heading", { name: "Quer cancelar um pedido?" })).toBeInTheDocument();
    expect(
      screen.getByText("Você mesmo pode cancelar seu pedido, sem contactar um atendente. É rápido e fácil!")
    ).toBeInTheDocument();
  });

  it("Deve renderizar os dois botões", () => {
    const button1 = screen.getByRole("button", { name: "Sim, quero cancelar um pedido" });
    expect(button1).toBeInTheDocument();

    const button2 = screen.getByRole("button", { name: "Não, quero outro tipo de atendimento" });
    expect(button2).toBeInTheDocument();
  });

  it("Deve estar visível na tela", () => {
    const dropdown = screen.getByTestId("help-component");
    expect(dropdown).toBeVisible();
  });

  it("Deve renderizar o dropdown na posição correta", () => {
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
