import { render, screen } from "@testing-library/react";
import StateInput from "../../../src/components/components-form/state-input";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

describe("StateInput", () => {
  const MockWrapper = () => {
    const [state, setState] = useState<string>("");
    return <StateInput state={state} handleChange={(e) => setState(e.target.value)} />;
  };

  it("Deve carregar o componente com os estados", () => {
    render(<MockWrapper />);

    const inputEstado = screen.getByTestId("state-input") as HTMLSelectElement;
    
    expect(inputEstado.selectedOptions[0].textContent).toBe("Estado");
    expect(inputEstado.length).toBe(28);
  });

  it("Deve alterar o valor do select quando uma opção for selecionada", async () => {
    render(<MockWrapper />);

    const user = userEvent.setup();
    const inputEstado = screen.getByTestId("state-input") as HTMLSelectElement;
    await user.selectOptions(inputEstado, "SP");
    
    expect(inputEstado.selectedOptions[0].textContent).toBe("SP");
  });
});
