import { render, screen } from "@testing-library/react";
import ButtonGradient from ".";
import userEvent from "@testing-library/user-event";

describe("ButtonGradient", () => {
  const text = "teste";
  const mockEvent = vi.fn();

  it("Deve renderizar o botão normalmente", () => {
    render(<ButtonGradient text={text} />);

    const button = screen.getByRole("button", { name: text });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("Deve renderizar o botão desabilitado", () => {
    render(<ButtonGradient text={text} disabled />);

    const button = screen.getByRole("button", { name: text });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("Deve renderizar o botão com font-weight bold", () => {
    render(<ButtonGradient text={text} fontBold />);

    const button = screen.getByRole("button", { name: text });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("font-bold");
  });

  it("Deve renderizar o botão desabilitado e com font-weight bold", () => {
    render(<ButtonGradient text={text} fontBold disabled />);

    const button = screen.getByRole("button", { name: text });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveClass("font-bold");
  });

  it("Deve carregar o evento ao clicar no botão", async () => {
    render(<ButtonGradient text={text} handleClickEvent={mockEvent} />);

    const button = screen.getByRole("button", { name: text });
    const user = userEvent.setup();
    await user.click(button);

    expect(mockEvent).toBeCalled();
  });
});
