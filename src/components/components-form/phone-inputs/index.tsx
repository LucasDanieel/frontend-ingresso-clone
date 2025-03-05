import { ChangeEvent, Dispatch, forwardRef, KeyboardEvent, RefObject, SetStateAction } from "react";
import SimpleInput from "../simple-input";
import "./styles.scss";
import { FormState, inputPhoneRefs } from "../../../@types/user";
import { onChangeGeneric, onFocosGeneric, onKeyDownGeneric } from "../../../utils/input-methods";

type PhoneInutsProps = {
  form: FormState;
  inputDDDWrong: boolean;
  inputPhoneWrong: boolean;
  setForm: Dispatch<SetStateAction<FormState>>;
  setInputDDDWrong: Dispatch<SetStateAction<boolean>>;
  setInputPhoneWrong: Dispatch<SetStateAction<boolean>>;
};

const PhoneInputs = forwardRef<inputPhoneRefs, PhoneInutsProps>(
  ({ form, inputDDDWrong, inputPhoneWrong, setForm, setInputDDDWrong, setInputPhoneWrong }, ref) => {
    // DDD
    const onChangeDDD = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeGeneric(e, "__", 2, setForm, "DDD", (ref as RefObject<inputPhoneRefs>).current?.ddd!);
    };

    const onFocosDDD = () => {
      onFocosGeneric(form.DDD, setForm, "DDD", "__", (ref as RefObject<inputPhoneRefs>).current?.ddd!);
      setInputDDDWrong(false);
    };

    const onBlurDDD = () => {
      if (form.DDD.replace(/\D/g, "").length > 0) return;
      setInputDDDWrong(true);
      setForm((s) => ({ ...s, DDD: "" }));
    };

    // Phone
    const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeGeneric(e, "_____-____", 9, setForm, "phone", (ref as RefObject<inputPhoneRefs>).current?.phone!);
    };

    const onKeyDownPhone = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDownGeneric(e, form.phone, setForm, "phone", "_____-____", 9);
    };

    const onFocosPhone = () => {
      onFocosGeneric(form.phone, setForm, "phone", "_____-____", (ref as RefObject<inputPhoneRefs>).current?.phone!);
      setInputPhoneWrong(false);
    };

    const onBlurPhone = () => {
      if (form.phone.replace(/\D/g, "").length > 0) return;
      setInputPhoneWrong(true);
      setForm((s) => ({ ...s, phone: "" }));
    };

    return (
      <div className="wrapper-phone-double-input">
        <div className="wrapper-DDD">
          <SimpleInput
            nameField="*DDD"
            value={form.DDD}
            errorMessage="É obrigatório preencher o DDD."
            inputWrong={inputDDDWrong}
            maxLength={2}
            handleChange={onChangeDDD}
            handleFocos={onFocosDDD}
            handleBlur={onBlurDDD}
            ref={(el) => {
              ref = ref as RefObject<inputPhoneRefs>;
              if (ref.current) ref.current.ddd = el;
            }}
          />
        </div>
        <div className="wrapper-phone">
          <SimpleInput
            nameField="*Telefone"
            value={form.phone}
            errorMessage="É obrigatório preencher o número do telefone."
            inputWrong={inputPhoneWrong}
            maxLength={10}
            handleChange={onChangePhone}
            handleFocos={onFocosPhone}
            handleBlur={onBlurPhone}
            handleKeyDown={onKeyDownPhone}
            ref={(el) => {
              ref = ref as RefObject<inputPhoneRefs>;
              if (ref.current) ref.current.phone = el;
            }}
          />
        </div>
      </div>
    );
  }
);

export default PhoneInputs;
