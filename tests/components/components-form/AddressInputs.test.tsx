import { render, screen } from "@testing-library/react";
import AddressInputs from "../../../src/components/components-form/address-inputs";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { FormState } from "../../../src/@types/user";
import axios from "axios";
import { Mocked } from "vitest";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("AddressInputs", () => {
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

    return <AddressInputs form={mockForm} setForm={setMockForm} />;
  };

  it("Deve exibir mensagem de erro quando o CEP for inválido", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("error"));

    render(<MockWrapper />);

    const input = screen.getByPlaceholderText("CEP");
    const user = userEvent.setup();

    await user.type(input, "1");
    await user.tab();
    expect(input).toHaveValue("1____-___");
    expect(screen.getByText(/CEP inválido ou não encontrado/i)).toBeInTheDocument();

    await user.click(input);
    await user.type(input, "2345678");
    await user.tab();
    expect(input).toHaveValue("12345-678");
    expect(screen.getByText(/CEP inválido ou não encontrado/i)).toBeInTheDocument();
  });

  it("Deve preencher os inputs 'logradouro', 'bairro', 'estado' e 'cidade' quando o CEP for válido", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        bairro: "Jardim Paulista",
        cep: "01407-200",
        complemento: "de 4701 ao fim - lado ímpar",
        ddd: "11",
        estado: "São Paulo",
        gia: "1004",
        ibge: "3550308",
        localidade: "São Paulo",
        logradouro: "Avenida Nove de Julho",
        regiao: "Sudeste",
        siafi: "7107",
        uf: "SP",
        unidade: "",
      },
    });

    render(<MockWrapper />);

    const user = userEvent.setup();
    const inputCEP = screen.getByPlaceholderText("CEP");
    const inputLogradouro = screen.getByPlaceholderText("Logradouro");
    const inputBairro = screen.getByPlaceholderText("Bairro");
    const inputEstado = screen.getByTestId("state-input");
    const inputCidade = screen.getByPlaceholderText("Cidade");

    await user.type(inputCEP, "01407200");
    await user.tab();

    expect(inputCEP).toHaveValue("01407-200");
    expect(screen.queryByText(/CEP inválido ou não encontrado/i)).not.toBeInTheDocument();

    expect(inputLogradouro).toHaveValue("Avenida Nove de Julho");
    expect(inputBairro).toHaveValue("Jardim Paulista");
    expect(inputEstado).toHaveValue("SP");
    expect(inputCidade).toHaveValue("São Paulo");
  });

  it("Deve permitir digitar nos outros inputs normalmente", async () => {
    render(<MockWrapper />);

    const user = userEvent.setup();

    const inputLogradouro = screen.getByPlaceholderText("Logradouro");
    const inputNumero = screen.getByPlaceholderText("Número");
    const inputComplemento = screen.getByPlaceholderText("Complemento");
    const inputBairro = screen.getByPlaceholderText("Bairro");
    const inputEstado = screen.getByTestId("state-input");
    const inputCidade = screen.getByPlaceholderText("Cidade");

    await user.type(inputLogradouro, "Avenida Nove de Julho");
    await user.type(inputNumero, "1234");
    await user.type(inputComplemento, "casa 15");
    await user.type(inputBairro, "Jardim Paulista");
    await user.selectOptions(inputEstado, "SP");
    await user.type(inputCidade, "São Paulo");

    expect(inputLogradouro).toHaveValue("Avenida Nove de Julho");
    expect(inputNumero).toHaveValue("1234");
    expect(inputComplemento).toHaveValue("casa 15");
    expect(inputBairro).toHaveValue("Jardim Paulista");
    expect(inputEstado).toHaveValue("SP");
    expect(inputCidade).toHaveValue("São Paulo");
  });
});
