import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import MonthDayInput from "../../form-inputs/month-day-input";
import SimpleInput from "../../form-inputs/simple-input";
import TermsOfUse from "../terms-of-use";
import ValidPassword from "../valid-password";
import "./styles.scss";

import { genericObject, requiredInPassword, userCreated } from "../../../pages/create";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import InputState from "../../form-inputs/input-state";
import RecaptchaComponent from "../recaptcha-component";
import { onChangeGeneric, onFocosGeneric, onKeyDownGeneric, validInputPassword } from "../../../utils/input-methods";
import { UserDTO } from "../../../@types/user";

type formCreateLoginProps = {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  setUserCreated: (value: userCreated) => void;
};

const FormCreateLogin = ({ isLoading, setLoading, setUserCreated }: formCreateLoginProps) => {
  const [name, setName] = useState<string>("");
  const [CPF, setCPF] = useState<genericObject>({
    value: "",
    hasValue: false,
  });
  const [DDD, setDDD] = useState<genericObject>({
    value: "",
    hasValue: false,
  });
  const [phone, setPhone] = useState<genericObject>({
    value: "",
    hasValue: false,
  });
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [month, setMonth] = useState<string>("0");
  const [day, setDay] = useState<string>("0");
  const [CEP, setCEP] = useState<genericObject>({
    value: "",
    hasValue: false,
  });
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [recieveNews, setRecieveNews] = useState<boolean>(false);
  const [reCAPTCHA, setReCAPTCHA] = useState<string | null>(null);

  const [inputNameWrong, setInputNameWrong] = useState<boolean>(false);

  const [inputCPFWrong, setInputCPFWrong] = useState<boolean>(false);
  const [cpfInvalidValue, setCpfInvalidValue] = useState<string>("");

  const [inputDDDWrong, setInputDDDWrong] = useState<boolean>(false);
  const [inputPhoneWrong, setInputPhoneWrong] = useState<boolean>(false);

  const [inputEmailWrong, setInputEmailWrong] = useState<boolean>(false);
  const [emailInvalidValue, setEmailInvalidValue] = useState<string>("");

  const [inputConfirmEmailWrong, setInputConfirmEmailWrong] = useState<boolean>(false);
  const [inputPasswordWrong, setInputPasswordWrong] = useState<boolean>(false);
  const [inputCEPWrong, setInputCEPWrong] = useState<boolean>(false);

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
    ddd: null as HTMLInputElement | null,
    phone: null as HTMLInputElement | null,
    email: null as HTMLInputElement | null,
    confirmEmail: null as HTMLInputElement | null,
    password: null as HTMLInputElement | null,
    cep: null as HTMLInputElement | null,
  });

  // NAME
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3 || e.target.value.length > 60) setInputNameWrong(true);
    else setInputNameWrong(false);

    setName(e.target.value);
  };

  // CPF
  const onChangeCPF = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeGeneric(e, "___.___.___-__", 12, setCPF, setInputCPFWrong, inputRefs.current.cpf, 11);
  };

  const onKeyDownCPF = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDownGeneric(e, CPF, setCPF, "___.___.___-__", 12);
  };

  const onFocosCPF = () => {
    onFocosGeneric(CPF, setCPF, "___.___.___-__", inputRefs.current.cpf, setInputCPFWrong);
  };

  const onBlurCPF = () => {
    if (CPF.hasValue) return;
    setCPF((s) => ({ ...s, value: "" }));
  };

  // DDD
  const onChangeDDD = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeGeneric(e, "__", 2, setDDD, null, inputRefs.current.ddd, null);
  };

  const onFocosDDD = () => {
    onFocosGeneric(DDD, setDDD, "__", inputRefs.current.ddd, null);
    setInputDDDWrong(false);
  };

  const onBlurDDD = () => {
    if (DDD.hasValue) return;
    setInputDDDWrong(true);
    setDDD((s) => ({ ...s, value: "" }));
  };

  // Phone
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeGeneric(e, "_____-____", 9, setPhone, null, inputRefs.current.phone, null);
  };

  const onKeyDownPhone = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDownGeneric(e, phone, setPhone, "_____-____", 9);
  };

  const onFocosPhone = () => {
    onFocosGeneric(phone, setPhone, "_____-____", inputRefs.current.phone, null);
    setInputPhoneWrong(false);
  };

  const onBlurPhone = () => {
    if (phone.hasValue) return;
    setInputPhoneWrong(true);
    setPhone((s) => ({ ...s, value: "" }));
  };

  // E-mail
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isEmail(value)) setInputEmailWrong(false);
    else setInputEmailWrong(true);

    setEmail(value);
    if (value.length > 0 && value !== confirmEmail) setInputConfirmEmailWrong(true);
    else setInputConfirmEmailWrong(false);
  };

  // Confirmar E-mail
  const onChangeConfirmEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === email) setInputConfirmEmailWrong(false);
    else setInputConfirmEmailWrong(true);

    setConfirmEmail(e.target.value);
  };

  // Password
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0) setPasswordInvalidValue("A senha não atende aos critérios necessários.");
    else setPasswordInvalidValue("A senha é obrigatória");

    const IsValidPassword = validInputPassword(value, setRequiredInPassword);

    if (IsValidPassword) setInputPasswordWrong(false);
    else setInputPasswordWrong(true);

    setPassword(value);
  };

  // DATE
  const onChangeMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMonth(value);

    if (value == "0") setDay("0");
  };

  // CEP
  const onChangeCEP = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeGeneric(e, "_____-___", 8, setCEP, null, inputRefs.current.cep, null);
  };

  const onKeyDownCEP = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDownGeneric(e, CEP, setCEP, "_____-___", 8);
  };

  const onFocosCEP = () => {
    onFocosGeneric(CEP, setCEP, "_____-___", inputRefs.current.cep, null);
  };

  const onBlurCEP = () => {
    if (CEP.hasValue) {
      if (CEP.value.replace(/\D/g, "").length < 8) {
        resetAdrress();
        setInputCEPWrong(true);
      } else {
        axios
          .get(`https://viacep.com.br/ws/${CEP.value}/json`)
          .then((resp) => {
            if (resp.data.erro == "true") {
              resetAdrress();
              setInputCEPWrong(true);
            } else {
              setStreet(resp.data.logradouro);
              setNeighborhood(resp.data.bairro);
              setState(resp.data.uf);
              setCity(resp.data.localidade);
              setInputCEPWrong(false);
            }
          })
          .catch(() => {
            resetAdrress();
            setInputCEPWrong(true);
          });
      }
    } else {
      setInputCEPWrong(false);
      setCEP((s) => ({ ...s, value: "" }));
    }
  };

  const resetAdrress = () => {
    setStreet("");
    setNeighborhood("");
    setState("");
    setCity("");
  };

  // POST
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    var isValid = validateAllInputs();
    if (isValid == false) return;

    var date;
    if (month == "0") {
      date = undefined;
    } else {
      date = new Date(new Date().getFullYear(), Number(month) - 1, Number(day));
    }

    var num;
    if (number == "") num = undefined;
    else num = Number(number);

    const user: UserDTO = {
      name: name,
      cpf: CPF.value.replace(/\D/g, ""),
      phoneDdd: DDD.value.replace(/\D/g, ""),
      phoneNumber: phone.value.replace(/\D/g, ""),
      email: email,
      password: password,
      dateOfBirth: date,
      address: {
        cep: CEP.value.replace(/\D/g, ""),
        street: street,
        houseNumber: num,
        complement: complement,
        neighborhood: neighborhood,
        state: state,
        city: city,
      },
      receiveNotification: recieveNews,
    };

    setLoading(true);
    axios
      .post(`/user/create`, user)
      .then(() => {
        setUserCreated({ name: name, isCompleted: true });
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

    if (name.length < 3 || name.length > 60) {
      setInputNameWrong(true);
      allValids = false;
      firstWrong = inputRefs.current.name;
    } else setInputNameWrong(false);

    if (CPF.value.replace(/\D/g, "").length < 11) {
      setInputCPFWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputRefs.current.cpf;
    } else setInputCPFWrong(false);

    if (!DDD.hasValue) {
      setInputDDDWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputRefs.current.ddd;
    } else setInputDDDWrong(false);

    if (!phone.hasValue) {
      setInputPhoneWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputRefs.current.phone;
    } else setInputPhoneWrong(false);

    if (isEmail(email)) setInputEmailWrong(false);
    else {
      setInputEmailWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputRefs.current.email;
    }

    if (email !== confirmEmail) {
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
    setName("");
    setCPF({
      value: "",
      hasValue: false,
    });
    setDDD({
      value: "",
      hasValue: false,
    });
    setPhone({
      value: "",
      hasValue: false,
    });
    setEmail("");
    setConfirmEmail("");
    setPassword("");
    setMonth("0");
    setDay("0");
    setCEP({
      value: "",
      hasValue: false,
    });
    setStreet("");
    setNumber("");
    setComplement("");
    setNeighborhood("");
    setState("");
    setCity("");
    setRecieveNews(false);
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
          value={name}
          errorMessage="O nome precisa ter entre 3 e 60 caracteres e não possuir caracteres especiais"
          inputWrong={inputNameWrong}
          handleChange={onChangeName}
          ref={(el) => (inputRefs.current.name = el)}
        />
        <SimpleInput
          nameField="*CPF"
          value={CPF.value}
          errorMessage={`${cpfInvalidValue ? cpfInvalidValue : "É obrigatório preencher o CPF."}`}
          inputWrong={inputCPFWrong}
          maxLength={14}
          handleChange={onChangeCPF}
          handleFocos={onFocosCPF}
          handleBlur={onBlurCPF}
          handleKeyDown={onKeyDownCPF}
          ref={(el) => (inputRefs.current.cpf = el)}
        />
        <div className="wrapper-double-input">
          <div className="wrapper-DDD">
            <SimpleInput
              nameField="*DDD"
              value={DDD.value}
              errorMessage="É obrigatório preencher o DDD."
              inputWrong={inputDDDWrong}
              maxLength={2}
              handleChange={onChangeDDD}
              handleFocos={onFocosDDD}
              handleBlur={onBlurDDD}
              ref={(el) => (inputRefs.current.ddd = el)}
            />
          </div>
          <div className="wrapper-phone">
            <SimpleInput
              nameField="*Telefone"
              value={phone.value}
              errorMessage="É obrigatório preencher o número do telefone."
              inputWrong={inputPhoneWrong}
              maxLength={10}
              handleChange={onChangePhone}
              handleFocos={onFocosPhone}
              handleBlur={onBlurPhone}
              handleKeyDown={onKeyDownPhone}
              ref={(el) => (inputRefs.current.phone = el)}
            />
          </div>
        </div>
        <SimpleInput
          nameField="*E-mail"
          value={email}
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
          value={confirmEmail}
          errorMessage="Este campo deve ser igual ao de e-mail"
          inputWrong={inputConfirmEmailWrong}
          handleChange={onChangeConfirmEmail}
          ref={(el) => (inputRefs.current.confirmEmail = el)}
        />
        <SimpleInput
          nameField="*Senha"
          value={password}
          isPassword
          errorMessage={passwordInvalidValue}
          inputWrong={inputPasswordWrong}
          handleChange={onChangePassword}
          ref={(el) => (inputRefs.current.password = el)}
        />
        <ValidPassword requiredInPassword={requiredInPassword} />
        <MonthDayInput
          month={month}
          day={day}
          handleChangeMonth={onChangeMonth}
          handleChangeDay={(e) => setDay(e.target.value)}
        />
        <SimpleInput
          nameField="CEP"
          value={CEP.value}
          errorMessage="CEP inválido ou não encontrado"
          inputWrong={inputCEPWrong}
          isCep={true}
          handleChange={onChangeCEP}
          handleKeyDown={onKeyDownCEP}
          handleBlur={onBlurCEP}
          handleFocos={onFocosCEP}
          ref={(el) => (inputRefs.current.cep = el)}
        />
        <SimpleInput nameField="Logradouro" value={street} handleChange={(e) => setStreet(e.target.value)} />
        <div className="wrapper-double-input">
          <div className="first-input">
            <SimpleInput nameField="Número" value={number} handleChange={(e) => setNumber(e.target.value)} />
          </div>
          <div className="second-input">
            <SimpleInput
              nameField="Complemento"
              value={complement}
              handleChange={(e) => setComplement(e.target.value)}
            />
          </div>
        </div>
        <SimpleInput nameField="Bairro" value={neighborhood} handleChange={(e) => setNeighborhood(e.target.value)} />
        <div className="wrapper-double-input">
          <div className="first-input">
            <InputState state={state} handleChange={(e) => setState(e.target.value)} />
          </div>
          <div className="second-input">
            <SimpleInput nameField="Cidade" value={city} handleChange={(e) => setCity(e.target.value)} />
          </div>
        </div>
        <div className="receive-news">
          <input type="checkbox" name="news" checked={recieveNews} onChange={(e) => setRecieveNews(e.target.checked)} />
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
