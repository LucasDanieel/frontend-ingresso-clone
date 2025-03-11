import { render, screen } from "@testing-library/react";
import InputCode from "../../../src/components/components-login/input-code";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

describe("InputCode", () => {
  const MockWrapper = () => {
    const [arrayCode, setArrayCode] = useState(Array(6).fill(""));

    return <InputCode arrayCode={arrayCode} setArrayCode={setArrayCode} />;
  };

  beforeEach(() => {
    render(<MockWrapper />);
  });

  it("Deve carregar todos os inputs", () => {
    expect(screen.getByTestId("input-code-0")).toBeInTheDocument();
    expect(screen.getByTestId("input-code-1")).toBeInTheDocument();
    expect(screen.getByTestId("input-code-2")).toBeInTheDocument();
    expect(screen.getByTestId("input-code-3")).toBeInTheDocument();
    expect(screen.getByTestId("input-code-4")).toBeInTheDocument();
    expect(screen.getByTestId("input-code-5")).toBeInTheDocument();
  });

  it("Deve alternar o foco do input conforme for digitando o código", async () => {
    const input0 = screen.getByTestId("input-code-0");
    const input1 = screen.getByTestId("input-code-1");
    const input2 = screen.getByTestId("input-code-2");
    const input3 = screen.getByTestId("input-code-3");
    const input4 = screen.getByTestId("input-code-4");
    const input5 = screen.getByTestId("input-code-5");

    await userEvent.click(input0);
    expect(input0).toHaveFocus();

    await userEvent.type(input0, "1");
    expect(input1).toHaveFocus();

    await userEvent.type(input1, "2");
    expect(input2).toHaveFocus();

    await userEvent.type(input2, "3");
    expect(input3).toHaveFocus();

    await userEvent.type(input3, "4");
    expect(input4).toHaveFocus();

    await userEvent.type(input4, "5");
    expect(input5).toHaveFocus();

    await userEvent.type(input5, "6");
    expect(input5).toHaveFocus();
  });

  it("Deve voltar ao input anterior quando apagar os numeros", async () => {
    const input0 = screen.getByTestId("input-code-0");
    const input1 = screen.getByTestId("input-code-1");
    const input2 = screen.getByTestId("input-code-2");
    const input3 = screen.getByTestId("input-code-3");
    const input4 = screen.getByTestId("input-code-4");
    const input5 = screen.getByTestId("input-code-5");

    await userEvent.type(input0, "123456");
    expect(input5).toHaveFocus();

    await userEvent.type(input5, "{backspace}");
    await userEvent.type(input5, "{backspace}");
    expect(input4).toHaveFocus();

    await userEvent.type(input4, "{backspace}");
    await userEvent.type(input4, "{backspace}");
    expect(input3).toHaveFocus();

    await userEvent.type(input3, "{backspace}");
    await userEvent.type(input3, "{backspace}");
    expect(input2).toHaveFocus();

    await userEvent.type(input2, "{backspace}");
    await userEvent.type(input2, "{backspace}");
    expect(input1).toHaveFocus();

    await userEvent.type(input1, "{backspace}");
    await userEvent.type(input1, "{backspace}");
    expect(input0).toHaveFocus();
  });

  it("Deve preencher os inputs caso o usuario cole o código", async () => {
    const input0 = screen.getByTestId("input-code-0");
    const input5 = screen.getByTestId("input-code-5");

    await userEvent.click(input0);
    await userEvent.paste("123456");

    expect(input5).toHaveFocus();
    expect(input0).toHaveValue("1");
    expect(input5).toHaveValue("6");
  });
});
