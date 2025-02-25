import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import isEmail from "validator/lib/isEmail";
import axios from "axios";

import "./styles.scss";
import MonthDayInput from "../../form-inputs/month-day-input";
import SimpleInput from "../../form-inputs/simple-input";
import TermsOfUse from "../terms-of-use";
import ValidPassword from "../valid-password";
import RecaptchaComponent from "../../recaptcha-component";
import {
  onChangeFormName,
  onChangeGeneric,
  onFocosGeneric,
  onKeyDownGeneric,
  validInputPassword,
} from "../../../utils/input-methods";
import AddressInputs from "../../form-inputs/address-inputs";
import { FormState, inputPhoneRefs, requiredInPassword, userCreated, UserDTO } from "../../../@types/user";
import PhoneInputs from "../../form-inputs/phone-inputs";

type formCreateLoginProps = {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  setUserCreated: (value: userCreated) => void;
};

const FormCreateLogin = ({ isLoading, setLoading, setUserCreated }: formCreateLoginProps) => {
  const [form, setForm] = useState<FormState>({
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
  const [reCAPTCHA, setReCAPTCHA] = useState<string | null>(null);

  const [inputNameWrong, setInputNameWrong] = useState<boolean>(false);
  const [inputCPFWrong, setInputCPFWrong] = useState<boolean>(false);
  const [inputDDDWrong, setInputDDDWrong] = useState<boolean>(false);
  const [inputPhoneWrong, setInputPhoneWrong] = useState<boolean>(false);
  const [inputEmailWrong, setInputEmailWrong] = useState<boolean>(false);
  const [inputConfirmEmailWrong, setInputConfirmEmailWrong] = useState<boolean>(false);
  const [inputPasswordWrong, setInputPasswordWrong] = useState<boolean>(false);

  const [cpfInvalidValue, setCpfInvalidValue] = useState<string>("");
  const [emailInvalidValue, setEmailInvalidValue] = useState<string>("");
  const [passwordInvalidValue, setPasswordInvalidValue] = useState<string>("A senha é obrigatória");
  const [requiredInPassword, setRequiredInPassword] = useState<requiredInPassword>({
    letraMinuscula: false,
    letraMaiuscula: false,
    hasNumber: false,
    minimumLength: false,
  });

  const inputRefs = useRef({
    name: null as HTMLInputElement | null,
    cpf: null as HTMLInputElement | null,
    email: null as HTMLInputElement | null,
    confirmEmail: null as HTMLInputElement | null,
    password: null as HTMLInputElement | null,
  });

  const inputPhoneRefs = useRef<inputPhoneRefs>({
    ddd: null as HTMLInputElement | null,
    phone: null as HTMLInputElement | null,
  });

  // NAME
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeFormName(e, setForm, setInputNameWrong);
  };

  // CPF
  const onChangeCPF = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeGeneric(e, "___.___.___-__", 12, setForm, "CPF", inputRefs.current.cpf, setInputCPFWrong, 11);
  };

  const onKeyDownCPF = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDownGeneric(e, form.CPF, setForm, "CPF", "___.___.___-__", 12);
  };

  const onFocosCPF = () => {
    onFocosGeneric(form.CPF, setForm, "CPF", "___.___.___-__", inputRefs.current.cpf, setInputCPFWrong);
  };

  const onBlurCPF = () => {
    if (form.CPF.replace(/\D/g, "").length > 0) return;
    setForm((s) => ({ ...s, CPF: "" }));
  };

  // E-mail
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isEmail(value)) setInputEmailWrong(false);
    else setInputEmailWrong(true);

    setForm((s) => ({ ...s, email: value }));
    if (value.length > 0 && value !== form.confirmEmail) setInputConfirmEmailWrong(true);
    else setInputConfirmEmailWrong(false);
  };

  // Confirmar E-mail
  const onChangeConfirmEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === form.email) setInputConfirmEmailWrong(false);
    else setInputConfirmEmailWrong(true);

    setForm((s) => ({ ...s, confirmEmail: e.target.value }));
  };

  // Password
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0) setPasswordInvalidValue("A senha não atende aos critérios necessários.");
    else setPasswordInvalidValue("A senha é obrigatória");

    const IsValidPassword = validInputPassword(value, setRequiredInPassword);

    if (IsValidPassword) setInputPasswordWrong(false);
    else setInputPasswordWrong(true);

    setForm((s) => ({ ...s, password: value }));
  };

  // POST
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      firstWrong = inputRefs.current.name;
    } else setInputNameWrong(false);

    if (form.CPF.replace(/\D/g, "").length < 11) {
      setInputCPFWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputRefs.current.cpf;
    } else setInputCPFWrong(false);

    if (form.DDD.length == 0) {
      setInputDDDWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputPhoneRefs.current.ddd;
    } else setInputDDDWrong(false);

    if (form.phone.length == 0) {
      setInputPhoneWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputPhoneRefs.current.phone;
    } else setInputPhoneWrong(false);

    if (isEmail(form.email)) setInputEmailWrong(false);
    else {
      setInputEmailWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputRefs.current.email;
    }

    if (form.email !== form.confirmEmail) {
      setInputConfirmEmailWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputRefs.current.confirmEmail;
    } else setInputConfirmEmailWrong(false);

    if (
      requiredInPassword.hasNumber == false ||
      requiredInPassword.letraMaiuscula == false ||
      requiredInPassword.letraMinuscula == false ||
      requiredInPassword.minimumLength == false
    ) {
      setInputPasswordWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputRefs.current.password;
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
    <form onSubmit={onSubmit}>
      <div className="container-form">
        <div className="header-form">
          <p>* Campos obrigatórios</p>
        </div>
        <SimpleInput
          nameField="*Nome"
          value={form.name}
          errorMessage="O nome precisa ter entre 3 e 60 caracteres e não possuir caracteres especiais"
          inputWrong={inputNameWrong}
          handleChange={onChangeName}
          ref={(el) => (inputRefs.current.name = el)}
        />
        <SimpleInput
          nameField="*CPF"
          value={form.CPF}
          errorMessage={`${cpfInvalidValue ? cpfInvalidValue : "É obrigatório preencher o CPF."}`}
          inputWrong={inputCPFWrong}
          maxLength={14}
          handleChange={onChangeCPF}
          handleFocos={onFocosCPF}
          handleBlur={onBlurCPF}
          handleKeyDown={onKeyDownCPF}
          ref={(el) => (inputRefs.current.cpf = el)}
        />
        <PhoneInputs
          form={form}
          inputDDDWrong={inputDDDWrong}
          inputPhoneWrong={inputPhoneWrong}
          setInputDDDWrong={setInputDDDWrong}
          setInputPhoneWrong={setInputPhoneWrong}
          setForm={setForm}
          ref={inputPhoneRefs}
        />
        <SimpleInput
          nameField="*E-mail"
          value={form.email}
          errorMessage={`${
            emailInvalidValue
              ? emailInvalidValue
              : "Informe um endereço de e-mail válido. Ele será utilizado mais tarde para validar seus dados"
          }`}
          inputWrong={inputEmailWrong}
          handleChange={onChangeEmail}
          ref={(el) => (inputRefs.current.email = el)}
        />
        <SimpleInput
          nameField="*Confirmação de E-mail"
          value={form.confirmEmail ? form.confirmEmail : ""}
          errorMessage="Este campo deve ser igual ao de e-mail"
          inputWrong={inputConfirmEmailWrong}
          handleChange={onChangeConfirmEmail}
          ref={(el) => (inputRefs.current.confirmEmail = el)}
        />
        <SimpleInput
          nameField="*Senha"
          value={form.password ? form.password : ""}
          isPassword
          errorMessage={passwordInvalidValue}
          inputWrong={inputPasswordWrong}
          handleChange={onChangePassword}
          ref={(el) => (inputRefs.current.password = el)}
        />
        <ValidPassword requiredInPassword={requiredInPassword} />
        <MonthDayInput
          month={form.month}
          day={form.day}
          setForm={setForm}
        />
        <AddressInputs form={form} setForm={setForm} />
        <div className="receive-news">
          <input
            type="checkbox"
            name="news"
            checked={form.recieveNews}
            onChange={(e) => setForm((s) => ({ ...s, recieveNews: e.target.checked }))}
          />
          <span>Quero receber novidades e mensagens da Ingresso.com.</span>
        </div>
        {!isLoading && (
          <>
            <TermsOfUse />
            <RecaptchaComponent setReCAPTCHA={setReCAPTCHA} />
          </>
        )}
        <div className="form-buttons">
          <button type="button" className="back">
            Voltar
          </button>
          <button type="submit" className="continue" disabled={!reCAPTCHA}>
            Continuar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormCreateLogin;
