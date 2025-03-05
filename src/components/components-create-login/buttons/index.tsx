import { Dispatch, MouseEvent, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.scss";

import { FormState, requiredInPassword, userCreated, UserDTO } from "../../../@types/user";
import ButtonGradient from "../../buttons-styles/button-gradient";
import ButtonTransparent from "../../buttons-styles/button-transparent";

type ButtonsProps = {
  form: FormState;
  reCAPTCHA: string | null;
  setForm: Dispatch<SetStateAction<FormState>>;
  setLoading: (value: boolean) => void;
  setUserCreated: (value: userCreated) => void;
  setCpfInvalidValue: Dispatch<SetStateAction<string>>;
  setEmailInvalidValue: Dispatch<SetStateAction<string>>;
  setReCAPTCHA: Dispatch<SetStateAction<string | null>>;
  setInputCPFWrong: Dispatch<SetStateAction<boolean>>;
  setInputEmailWrong: Dispatch<SetStateAction<boolean>>;
  setRequiredInPassword: Dispatch<SetStateAction<requiredInPassword>>;
  validateAllInputs: () => boolean;
};

const Buttons = ({
  form,
  reCAPTCHA,
  setForm,
  setLoading,
  setUserCreated,
  setCpfInvalidValue,
  setEmailInvalidValue,
  setReCAPTCHA,
  setInputCPFWrong,
  setInputEmailWrong,
  setRequiredInPassword,
  validateAllInputs,
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

        setReCAPTCHA(null);
      })
      .finally(() => setLoading(false));
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
        <ButtonGradient text="Continuar" disabled={!reCAPTCHA} fontBold handleClickEvent={onSubmit} />
      </div>
    </div>
  );
};

export default Buttons;
