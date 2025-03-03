import { render, screen } from "@testing-library/react";
import WrapperDropdown from "../../../src/components/components-header/wrapper-dropdown";

describe("WrapperDropdown", () => {
  it("should render children when passed", () => {
    render(
      <WrapperDropdown left={150}>
        <h1>Teste</h1>
      </WrapperDropdown>
    );

    expect(screen.getByRole("heading", { name: "Teste" })).toBeInTheDocument();
  });
});
