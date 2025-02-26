import { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";
import isEmail from "validator/lib/isEmail";
import axios from "axios";

import {
  FormState,
  inputFormRefs,
  inputPhoneRefs,
  requiredInPassword,
  userCreated,
  UserDTO,
} from "../../../@types/user";
import "./styles.scss";
import ButtonGradient from "../../buttons-styles/button-gradient";
import ButtonTransparent from "../../buttons-styles/button-transparent";
import { useNavigate } from "react-router-dom";

type ButtonsProps = {
  form: FormState;
  reCAPTCHA: string | null;
  requiredInPassword: requiredInPassword;
  setForm: Dispatch<SetStateAction<FormState>>;
  setLoading: (value: boolean) => void;
  setUserCreated: (value: userCreated) => void;
  setCpfInvalidValue: Dispatch<SetStateAction<string>>;
  setEmailInvalidValue: Dispatch<SetStateAction<string>>;
  setReCAPTCHA: Dispatch<SetStateAction<string | null>>;
  setInputNameWrong: Dispatch<SetStateAction<boolean>>;
  setInputCPFWrong: Dispatch<SetStateAction<boolean>>;
  setInputDDDWrong: Dispatch<SetStateAction<boolean>>;
  setInputPhoneWrong: Dispatch<SetStateAction<boolean>>;
  setInputEmailWrong: Dispatch<SetStateAction<boolean>>;
  setInputConfirmEmailWrong: Dispatch<SetStateAction<boolean>>;
  setInputPasswordWrong: Dispatch<SetStateAction<boolean>>;
  setRequiredInPassword: Dispatch<SetStateAction<requiredInPassword>>;
  inputRefs: RefObject<inputFormRefs>;
  inputPhoneRefs: RefObject<inputPhoneRefs>;
};

const Buttons = ({
  form,
  reCAPTCHA,
  requiredInPassword,
  setForm,
  setLoading,
  setUserCreated,
  setCpfInvalidValue,
  setEmailInvalidValue,
  setReCAPTCHA,
  setInputNameWrong,
  setInputCPFWrong,
  setInputDDDWrong,
  setInputPhoneWrong,
  setInputEmailWrong,
  setInputConfirmEmailWrong,
  setInputPasswordWrong,
  setRequiredInPassword,
  inputRefs,
  inputPhoneRefs,
}: ButtonsProps) => {
  const navigate = useNavigate();

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    var isValid = validateAllInputs();
    if (isValid == false) return;

    var date;
    if (form.month == "0") {
      date = undefined;
    } else {
      date = new Date(2024, Number(form.month) - 1, Number(form.day));
    }

    var num;
    if (form.number == "") num = undefined;
    else num = Number(form.number);

    const user: UserDTO = {
      name: form.name,
      cpf: form.CPF.replace(/\D/g, ""),
      phoneDdd: form.DDD.replace(/\D/g, ""),
      phoneNumber: form.phone.replace(/\D/g, ""),
      email: form.email,
      password: form.password,
      dateOfBirth: date,
      address: {
        cep: form.CEP.replace(/\D/g, ""),
        street: form.street,
        houseNumber: num,
        complement: form.complement,
        neighborhood: form.neighborhood,
        state: form.state,
        city: form.city,
      },
      receiveNotification: form.recieveNews,
    };

    setLoading(true);
    axios
      .post(`/user/create`, user)
      .then(() => {
        setUserCreated({ name: form.name, isCompleted: true });
        cleanAllInputs();
      })
      .catch((err) => {
        var messageErro = err.response?.data.message;
        if (messageErro == "Cpf e email já cadastrado") {
          setCpfInvalidValue("Cpf já cadastrado.");
          setEmailInvalidValue("Email já cadastrado.");
          setInputCPFWrong(true);
          setInputEmailWrong(true);
        } else if (messageErro == "Cpf já cadastrado") {
          setCpfInvalidValue("Cpf já cadastrado.");
          setInputCPFWrong(true);
        } else if (messageErro == "Email já cadastrado") {
          setEmailInvalidValue("Email já cadastrado.");
          setInputEmailWrong(true);
        }

        setReCAPTCHA("");
      })
      .finally(() => setLoading(false));
  };

  const validateAllInputs = () => {
    var allValids = true;
    var firstWrong;

    if (form.name.length < 3 || form.name.length > 60) {
      setInputNameWrong(true);
      allValids = false;
      firstWrong = inputRefs.current?.name;
    } else setInputNameWrong(false);

    if (form.CPF.replace(/\D/g, "").length < 11) {
      setInputCPFWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputRefs.current?.cpf;
    } else setInputCPFWrong(false);

    if (form.DDD.length == 0) {
      setInputDDDWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputPhoneRefs.current?.ddd;
    } else setInputDDDWrong(false);

    if (form.phone.length == 0) {
      setInputPhoneWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputPhoneRefs.current?.phone;
    } else setInputPhoneWrong(false);

    if (isEmail(form.email)) setInputEmailWrong(false);
    else {
      setInputEmailWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputRefs.current?.email;
    }

    if (form.email !== form.confirmEmail) {
      setInputConfirmEmailWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputRefs.current?.confirmEmail;
    } else setInputConfirmEmailWrong(false);

    if (
      requiredInPassword.hasNumber == false ||
      requiredInPassword.letraMaiuscula == false ||
      requiredInPassword.letraMinuscula == false ||
      requiredInPassword.minimumLength == false
    ) {
      setInputPasswordWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputRefs.current?.password;
    } else setInputPasswordWrong(false);

    firstWrong?.focus();

    return allValids;
  };

  const cleanAllInputs = () => {
    setForm({
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
    setReCAPTCHA(null);
    setRequiredInPassword({
      letraMinuscula: false,
      letraMaiuscula: false,
      hasNumber: false,
      minimumLength: false,
    });
    setCpfInvalidValue("");
    setEmailInvalidValue("");
  };

  return (
    <div className="form-buttons">
      <div className="form-buttons-back">
        <ButtonTransparent text="Voltar" fontBold handleClickEvent={() => navigate("/minha-conta")} />
      </div>
      <div className="form-buttons-continue">
        <ButtonGradient text="Continuar" disabled={!reCAPTCHA} fontBold={true} handleClickEvent={onSubmit} />
      </div>
    </div>
  );
};

export default Buttons;
