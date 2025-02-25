import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from "react";
import { FormState, requiredInPassword } from "../@types/user";
import axios from "axios";

export const onChangeFormName = (
  e: ChangeEvent<HTMLInputElement>,
  setForm: Dispatch<SetStateAction<FormState>>,
  setInputNameWrong: Dispatch<SetStateAction<boolean>>
) => {
  if (e.target.value.length < 3 || e.target.value.length > 60) setInputNameWrong(true);
  else setInputNameWrong(false);

  setForm((s) => ({ ...s, name: e.target.value }));
};

export const onChangeGeneric = (
  e: ChangeEvent<HTMLInputElement>,
  mask: string,
  maskLength: number,
  setForm: Dispatch<SetStateAction<FormState>>,
  _nameField: string,
  refInput: HTMLInputElement | null,
  setInputWrong: Dispatch<SetStateAction<boolean>> | null = null,
  conditionLength: number | null = null
) => {
  const input = e.target.value.replace(/\D/g, "");
  const formated = applyMask(input, mask, maskLength);

  setForm((s) => ({ ...s, [_nameField]: formated }));

  if (conditionLength && setInputWrong) {
    if (input.length >= conditionLength) setInputWrong(false);
    else setInputWrong(true);
  }

  const cursorPosition = formated.indexOf("_");
  setTimeout(() => {
    refInput?.setSelectionRange(cursorPosition, cursorPosition);
  }, 1);
};

export const onKeyDownGeneric = (
  e: KeyboardEvent<HTMLInputElement>,
  object: string,
  setForm: Dispatch<SetStateAction<FormState>>,
  _nameField: string,
  mask: string,
  maskLength: number
) => {
  if (e.key === "Backspace") {
    var numericValue = object.replace(/\D/g, "");
    numericValue = numericValue.slice(0, -1);

    setForm((s) => ({ ...s, [_nameField]: applyMask(numericValue, mask, maskLength) }));
  }
};

export const onFocosGeneric = (
  object: string,
  setForm: Dispatch<SetStateAction<FormState>>,
  _nameField: string,
  mask: string,
  refInput: HTMLInputElement | null,
  setInputWrong: Dispatch<SetStateAction<boolean>> | null = null
) => {
  var currentPosition = object.indexOf("_");

  if (object.replace(/\D/g, "").length == 0) {
    setForm((s) => ({ ...s, [_nameField]: mask }));
    setInputWrong && setInputWrong(true);
    currentPosition = 0;
  }

  setTimeout(() => {
    refInput?.setSelectionRange(currentPosition, currentPosition);
  }, 60);
};

export const applyMask = (input: string, formattedMask: string, end: number): string => {
  let index = 0;
  for (let char of input) {
    formattedMask = formattedMask.replace("_", char);
    index++;
    if (index >= end) break;
  }

  return formattedMask;
};

export const validInputPassword = (
  value: string,
  setRequiredInPassword: Dispatch<SetStateAction<requiredInPassword>>
) => {
  const testMinusculas = /[a-z]/;
  const testMaiusculas = /[A-Z]/;
  const testNumeros = /[0-9]/;
  const testTamanho = /.{8,}/;

  const valorTesteMinusculas = testMinusculas.test(value);
  const valorTesteMaiusculas = testMaiusculas.test(value);
  const valorTesteNumeros = testNumeros.test(value);
  const valorTesteTamanho = testTamanho.test(value);

  setRequiredInPassword(() => ({
    letraMinuscula: valorTesteMinusculas,
    letraMaiuscula: valorTesteMaiusculas,
    hasNumber: valorTesteNumeros,
    minimumLength: valorTesteTamanho,
  }));

  if (valorTesteMinusculas && valorTesteMaiusculas && valorTesteNumeros && valorTesteTamanho) return true;
  else return false;
};

export const onSearchCEP = (
  form: FormState,
  setForm: Dispatch<SetStateAction<FormState>>,
  setInputCEPWrong: Dispatch<SetStateAction<boolean>>
) => {
  const cepClean = form.CEP.replace(/\D/g, "");
  if (cepClean.length > 0) {
    if (cepClean.length < 8) {
      resetAdrress(setForm, setInputCEPWrong);
    } else {
      axios
        .get(`https://viacep.com.br/ws/${form.CEP}/json`)
        .then((resp) => {
          const data = resp.data;
          if (data.erro == "true") {
            resetAdrress(setForm, setInputCEPWrong);
          } else {
            setForm((s) => ({ ...s, street: data.logradouro }));
            setForm((s) => ({ ...s, neighborhood: data.bairro }));
            setForm((s) => ({ ...s, city: data.localidade }));
            setForm((s) => ({ ...s, state: data.uf }));
            setInputCEPWrong(false);
          }
        })
        .catch(() => {
          resetAdrress(setForm, setInputCEPWrong);
        });
    }
  } else {
    setInputCEPWrong(false);
    setForm((s) => ({ ...s, CEP: "" }));
  }
};

const resetAdrress = (
  setForm: Dispatch<SetStateAction<FormState>>,
  setInputCEPWrong: Dispatch<SetStateAction<boolean>>
) => {
  setForm((s) => ({ ...s, street: "" }));
  setForm((s) => ({ ...s, neighborhood: "" }));
  setForm((s) => ({ ...s, state: "" }));
  setForm((s) => ({ ...s, city: "" }));
  setInputCEPWrong(true);
};
