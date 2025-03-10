import { render, screen } from "@testing-library/react";
import PhoneInputs from "../../../src/components/components-form/phone-inputs";
import { useRef, useState } from "react";
import { FormState, inputPhoneRefs } from "../../../src/@types/user";
import userEvent from "@testing-library/user-event";

describe("PhoneInputs", () => {
  const MockWrapper = () => {
    const [mockForm, setMockForm] = useState<FormState>({
      name: "",
      CPF: "",
      DDD: "",
      phone: "",
      email: "",
      confirmEmail: "",
      password: "",
      month: "0",
      day: "0",
      CEP: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      state: "",
      city: "",
      recieveNews: false,
    });
    const [inputDDDWrong, setInputDDDWrong] = useState<boolean>(false);
    const [inputPhoneWrong, setInputPhoneWrong] = useState<boolean>(false);

    const inputPhoneRefs = useRef<inputPhoneRefs>({
      ddd: null as HTMLInputElement | null,
      phone: null as HTMLInputElement | null,
    });

    return (
      <PhoneInputs
        form={mockForm}
        setForm={setMockForm}
        inputDDDWrong={inputDDDWrong}
        inputPhoneWrong={inputPhoneWrong}
        setInputDDDWrong={setInputDDDWrong}
        setInputPhoneWrong={setInputPhoneWrong}
        ref={inputPhoneRefs}
      />
    );
  };

  beforeEach(() => {
    render(<MockWrapper />);
  });

  it("Deve carregar os componentes DDD e Telefone", () => {
    expect(screen.getByPlaceholderText("*DDD")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*Telefone")).toBeInTheDocument();
  });

  it("Deve carregar a máscara dos componentes corretamente", async () => {
    const user = userEvent.setup();
    const ddd = screen.getByPlaceholderText("*DDD");
    const telefone = screen.getByPlaceholderText("*Telefone");

    await user.click(ddd);
    expect(ddd).toHaveValue("__");

    await user.click(telefone);
    expect(telefone).toHaveValue("_____-____");
  });

  it("Deve permitir digitar nos inputs e carregar a máscara corretamente", async () => {
    const user = userEvent.setup();
    const ddd = screen.getByPlaceholderText("*DDD");
    const telefone = screen.getByPlaceholderText("*Telefone");

    await user.type(ddd, "6");
    await user.type(telefone, "12345");

    expect(ddd).toHaveValue("6_");
    expect(telefone).toHaveValue("12345-____");
  });

  it("Deve exibir a mensagem de erro corretamente", async () => {
    const user = userEvent.setup();
    const ddd = screen.getByPlaceholderText("*DDD");
    const telefone = screen.getByPlaceholderText("*Telefone");

    await user.click(ddd);
    await user.tab();
    await user.tab();

    expect(screen.getByText(/É obrigatório preencher o DDD/i)).toBeInTheDocument();
    expect(screen.getByText(/É obrigatório preencher o número do telefone/i)).toBeInTheDocument();

    await user.type(ddd, "1");
    await user.type(telefone, "1");
    expect(screen.queryByText(/É obrigatório preencher o DDD/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/É obrigatório preencher o número do telefone/i)).not.toBeInTheDocument();
  });
});
