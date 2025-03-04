import { render, screen } from "@testing-library/react";
import ButtonGradient from "../../../src/components/buttons-styles/button-gradient";

describe("ButtonGradient", () => {
  const text = "teste";
  it("should render the button normally", () => {
    render(<ButtonGradient text={text} />);

    const button = screen.getByRole("button", { name: text });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("should render the button disabled", () => {
    render(<ButtonGradient text={text} disabled />);

    const button = screen.getByRole("button", { name: text });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("should render the button with font weight bold", () => {
    render(<ButtonGradient text={text} fontBold />);

    const button = screen.getByRole("button", { name: text });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("font-bold");
  });

  it("should render the button disabled and with font weight bold", () => {
    render(<ButtonGradient text={text} fontBold disabled />);

    const button = screen.getByRole("button", { name: text });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveClass("font-bold");
  });
});
