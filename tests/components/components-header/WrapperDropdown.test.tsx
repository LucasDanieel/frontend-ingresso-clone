import { render, screen } from "@testing-library/react";
import WrapperDropdown from "../../../src/components/components-header/wrapper-dropdown";

describe("WrapperDropdown", () => {
  it("Deve renderizar a propriedade 'children' quando for passada", () => {
    render(
      <WrapperDropdown left={150}>
        <h1>Teste</h1>
      </WrapperDropdown>
    );

    expect(screen.getByRole("heading", { name: "Teste" })).toBeInTheDocument();
  });
});
