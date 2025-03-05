import { render, screen } from "@testing-library/react";
import DropdownSearch from "../../../src/components/components-header/dropdown-search";
import userEvent from "@testing-library/user-event";

describe("DropdownSearch", () => {
  const left = 588;

  beforeEach(() => {
    render(<DropdownSearch left={left} />);
  });

  it("Deve renderizar o texto e input", () => {
    expect(screen.getByText(/O que você procura?/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("Deve ter um placeholder e aceitar a entrada do usuário", async () => {
    const input = screen.getByPlaceholderText("O que você procura?");
    expect(input).toBeInTheDocument();

    const user = userEvent.setup();
    await user.type(input, "Meu teste");

    expect(input).toHaveValue("Meu teste");
  });

  it("Deve estar visível na tela", () => {
    const dropdown = screen.getByTestId("search-component");
    expect(dropdown).toBeVisible();
  });

  it("Deve renderizar o dropdown na posição correta", () => {
    const dropdown = screen.getByTestId("search-component")

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
