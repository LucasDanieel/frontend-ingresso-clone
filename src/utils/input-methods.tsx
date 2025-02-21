import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from "react";
import { genericObject, requiredInPassword } from "../pages/create";
import { FormState } from "../@types/user";

export const onChangeGenericTest = (
  e: ChangeEvent<HTMLInputElement>,
  mask: string,
  maskLength: number,
  setValue: Dispatch<SetStateAction<FormState>>,
  _nameField: string,
  setInputWrong: Dispatch<SetStateAction<boolean>> | null,
  refInput: HTMLInputElement | null,
  conditionLength: number | null = null
) => {
  const input = e.target.value.replace(/\D/g, "");
  const formated = applyMask(input, mask, maskLength);

  setValue((s) => ({ ...s, [_nameField]: formated }));

  if (conditionLength && setInputWrong) {
    if (input.length >= conditionLength) setInputWrong(false);
    else setInputWrong(true);
  }

  const cursorPosition = formated.indexOf("_");
  setTimeout(() => {
    refInput?.setSelectionRange(cursorPosition, cursorPosition);
  }, 1);
};

export const onChangeGeneric = (
  e: ChangeEvent<HTMLInputElement>,
  mask: string,
  maskLength: number,
  setValue: Dispatch<SetStateAction<genericObject>>,
  setInputWrong: Dispatch<SetStateAction<boolean>> | null,
  refInput: HTMLInputElement | null,
  conditionLength: number | null = null
) => {
  const input = e.target.value.replace(/\D/g, "");
  const formated = applyMask(input, mask, maskLength);

  setValue((s) => ({
    ...s,
    value: formated,
    hasValue: input.length == 0 ? false : true,
  }));

  if (conditionLength && setInputWrong) {
    if (input.length >= conditionLength) setInputWrong(false);
    else setInputWrong(true);
  }

  const cursorPosition = formated.indexOf("_");
  setTimeout(() => {
    refInput?.setSelectionRange(cursorPosition, cursorPosition);
  }, 1);
};

export const onKeyDownGenericTest = (
  e: KeyboardEvent<HTMLInputElement>,
  object: string,
  setValue: Dispatch<SetStateAction<FormState>>,
  _nameField: string,
  mask: string,
  maskLength: number
) => {
  if (e.key === "Backspace") {
    var numericValue = object.replace(/\D/g, "");
    numericValue = numericValue.slice(0, -1);

    setValue((s) => ({ ...s, [_nameField]: applyMask(numericValue, mask, maskLength) }));
  }
};

export const onKeyDownGeneric = (
  e: KeyboardEvent<HTMLInputElement>,
  object: genericObject,
  setValue: Dispatch<SetStateAction<genericObject>>,
  mask: string,
  maskLength: number
) => {
  if (e.key === "Backspace") {
    var numericValue = object.value.replace(/\D/g, "");
    numericValue = numericValue.slice(0, -1);

    setValue((s) => ({
      ...s,
      value: applyMask(numericValue, mask, maskLength),
      hasValue: numericValue.length == 0 ? false : true,
    }));
  }
};

export const onFocosGenericTest = (
  object: string,
  setValue: Dispatch<SetStateAction<FormState>>,
  _nameField: string,
  mask: string,
  refInput: HTMLInputElement | null,
  setInputWrong: Dispatch<SetStateAction<boolean>> | null = null
) => {
  var currentPosition = object.indexOf("_");

  if (object.replace(/\D/g, "").length == 0) {
    setValue((s) => ({ ...s, [_nameField]: mask }));
    setInputWrong && setInputWrong(true);
    currentPosition = 0;
  }

  setTimeout(() => {
    refInput?.setSelectionRange(currentPosition, currentPosition);
  }, 60);
};

export const onFocosGeneric = (
  object: genericObject,
  setValue: Dispatch<SetStateAction<genericObject>>,
  mask: string,
  refInput: HTMLInputElement | null,
  setInputWrong: Dispatch<SetStateAction<boolean>> | null = null
) => {
  var currentPosition = object.value.indexOf("_");

  if (!object.hasValue) {
    setValue((s) => ({ ...s, value: mask }));
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
