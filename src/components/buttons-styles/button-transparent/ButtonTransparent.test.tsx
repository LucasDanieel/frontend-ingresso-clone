import { render, screen } from "@testing-library/react";
import ButtonTransparent from ".";
import userEvent from "@testing-library/user-event";

describe("ButtonTransparent", () => {
  const text = "teste";
  const mockEvent = vi.fn();

  it("Deve renderizar o botão normalmente", () => {
    render(<ButtonTransparent text={text} />);

    const button = screen.getByRole("button", { name: text });
    expect(button).toBeInTheDocument();
  });

  it("Deve renderizar o botão com font-weight bold", () => {
    render(<ButtonTransparent text={text} fontBold />);

    const button = screen.getByRole("button", { name: text });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("font-bold");
  });

  it("Deve carregar o evento ao clicar no botão", async () => {
    render(<ButtonTransparent text={text} handleClickEvent={mockEvent} />);

    const button = screen.getByRole("button", { name: text });
    const user = userEvent.setup();
    await user.click(button);

    expect(mockEvent).toBeCalled();
  });
});
