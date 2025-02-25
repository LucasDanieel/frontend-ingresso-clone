import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useRef, useState } from "react";
import { FormState } from "../../../@types/user";
import StateInput from "../state-input";
import SimpleInput from "../simple-input";
import "./styles.scss";
import { onChangeGeneric, onFocosGeneric, onKeyDownGeneric, onSearchCEP } from "../../../utils/input-methods";

type AddressInputsProps = {
  form: FormState;
  setForm: Dispatch<SetStateAction<FormState>>;
};

const AddressInputs = ({ form, setForm }: AddressInputsProps) => {
  const [inputCEPWrong, setInputCEPWrong] = useState<boolean>(false);

  const cepRef = useRef<HTMLInputElement>(null);

  const onChangeCEP = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeGeneric(e, "_____-___", 8, setForm, "CEP", cepRef.current);
  };

  const onKeyDownCEP = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDownGeneric(e, form.CEP, setForm, "CEP", "_____-___", 8);
  };

  const onFocosCEP = () => {
    onFocosGeneric(form.CEP, setForm, "CEP", "_____-___", cepRef.current);
  };

  const onBlurCEP = () => {
    onSearchCEP(form, setForm, setInputCEPWrong);
  };

  return (
    <>
      <SimpleInput
        nameField="CEP"
        value={form.CEP}
        errorMessage="CEP inválido ou não encontrado"
        inputWrong={inputCEPWrong}
        isCep={true}
        handleChange={onChangeCEP}
        handleKeyDown={onKeyDownCEP}
        handleBlur={onBlurCEP}
        handleFocos={onFocosCEP}
        ref={cepRef}
      />
      <SimpleInput
        nameField="Logradouro"
        value={form.street}
        handleChange={(e) => setForm((s) => ({ ...s, street: e.target.value }))}
      />
      <div className="wrapper-address-double-input">
        <div className="first-input">
          <SimpleInput
            nameField="Número"
            value={form.number}
            handleChange={(e) => setForm((s) => ({ ...s, number: e.target.value }))}
          />
        </div>
        <div className="second-input">
          <SimpleInput
            nameField="Complemento"
            value={form.complement}
            handleChange={(e) => setForm((s) => ({ ...s, complement: e.target.value }))}
          />
        </div>
      </div>
      <SimpleInput
        nameField="Bairro"
        value={form.neighborhood}
        handleChange={(e) => setForm((s) => ({ ...s, neighborhood: e.target.value }))}
      />
      <div className="wrapper-address-double-input">
        <div className="first-input">
          <StateInput state={form.state} handleChange={(e) => setForm((s) => ({ ...s, state: e.target.value }))} />
        </div>
        <div className="second-input">
          <SimpleInput
            nameField="Cidade"
            value={form.city}
            handleChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
          />
        </div>
      </div>
    </>
  );
};

export default AddressInputs;
