import { render, screen } from "@testing-library/react";
import ButtonTransparent from "../../../src/components/buttons-styles/button-transparent";

describe("ButtonTransparent", () => {
  const text = "teste";
  it("should render the button normally", () => {
    render(<ButtonTransparent text={text} />);

    const button = screen.getByRole("button", { name: text });
    expect(button).toBeInTheDocument();
  });

  it("should render the button with font weight bold", () => {
    render(<ButtonTransparent text={text} fontBold />);

    const button = screen.getByRole("button", { name: text });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("font-bold");
  });
});
