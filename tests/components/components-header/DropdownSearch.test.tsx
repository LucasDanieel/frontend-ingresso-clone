import { render, screen } from "@testing-library/react";
import DropdownSearch from "../../../src/components/components-header/dropdown-search";
import userEvent from "@testing-library/user-event";

describe("DropdownSearch", () => {
  const left = 588;

  beforeEach(() => {
    render(<DropdownSearch left={left} />);
  });

  it("should render text and input", () => {
    expect(screen.getByText(/O que você procura?/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should have a placeholder and accept user input", async () => {
    const input = screen.getByPlaceholderText("O que você procura?");
    expect(input).toBeInTheDocument();

    const user = userEvent.setup();
    await user.type(input, "Meu teste");

    expect(input).toHaveValue("Meu teste");
  });

  it("should be visible on the screen", () => {
    const dropdown = screen.getByTestId("search-component");
    expect(dropdown).toBeVisible();
  });

  it("should render the dropdown in the correct position", () => {
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
