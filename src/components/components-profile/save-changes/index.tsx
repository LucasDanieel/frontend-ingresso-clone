import { ChangeEvent, Dispatch, RefObject, SetStateAction, useContext, useState } from "react";
import axios from "axios";
import "./styles.scss";

import ButtonStyle from "../../button-style";
import SimpleInput from "../../form-inputs/simple-input";
import RecaptchaComponent from "../../recaptcha-component";
import { FormState, inputPhoneRefs, UserContextType, UserDTO } from "../../../@types/user";
import { UserContext } from "../../../providers/user-provider";

type SaveChangesProps = {
  form: FormState;
  setForm: Dispatch<SetStateAction<FormState>>;
  setInputNameWrong: (value: boolean) => void;
  setInputDDDWrong: (value: boolean) => void;
  setInputPhoneWrong: (value: boolean) => void;
  setProfileUpdated: (value: boolean) => void;
  inputNameRef: RefObject<HTMLInputElement>;
  inputPhoneRefs: RefObject<inputPhoneRefs>;
};

const SaveChanges = ({
  form,
  setForm,
  setInputNameWrong,
  setInputDDDWrong,
  setInputPhoneWrong,
  setProfileUpdated,
  inputNameRef,
  inputPhoneRefs,
}: SaveChangesProps) => {
  const [reCAPTCHA, setReCAPTCHA] = useState<string | null>(null);

  const [inputPasswordWrong, setInputPasswordWrong] = useState<boolean>(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("A senha é obrigatória");

  const { setUser } = useContext(UserContext) as UserContextType;

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) {
      setErrorMessagePassword("A senha é obrigatória");
      setInputPasswordWrong(true);
    } else setInputPasswordWrong(false);

    setForm((s) => ({ ...s, password: value }));
  };

  const onSubmit = () => {
    if (!form.password) return setInputPasswordWrong(true);

    const allValids = validateAllInputs();
    if (allValids == false) return;

    var date;
    if (form.month == "0") {
      date = undefined;
    } else {
      date = new Date(2024, Number(form.month) - 1, Number(form.day));
    }

    const userDTO: UserDTO = {
      id: form.id,
      name: form.name,
      cpf: form.CPF,
      phoneDdd: form.DDD.replace(/\D/g, ""),
      phoneNumber: form.phone.replace(/\D/g, ""),
      email: form.email,
      password: form.password,
      dateOfBirth: date,
      address: {
        cep: form.CEP.replace(/\D/g, ""),
        street: form.street,
        houseNumber: Number(form.number),
        complement: form.complement,
        neighborhood: form.neighborhood,
        state: form.state,
        city: form.city,
      },
      receiveNotification: form.recieveNews,
      userValid: true,
    };

    axios
      .put(`/user/update-profile`, userDTO)
      .then((resp) => {
        if (resp.data) {
          setUser({ email: form.email, name: form.name });
          setProfileUpdated(true);
        }
      })
      .catch((err) => {
        if (err.response.data.message == "Senha inválida") {
          setErrorMessagePassword("Senha inválida.");
          setInputPasswordWrong(true);
        }
      });
  };

  const validateAllInputs = () => {
    var allValids = true;
    var firstWrong;

    if (form.name.length < 3 || form.name.length > 60) {
      setInputNameWrong(true);
      allValids = false;
      firstWrong = inputNameRef.current;
    } else setInputNameWrong(false);

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

    firstWrong?.focus();

    return allValids;
  };

  return (
    <div className="profile-recaptcha-confirm-password">
      <div className="wrapper-save-changes">
        <div className="warning-save-changes">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="currentColor"
            className="bi bi-check2-circle"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
          </svg>
          <span>Salvar Alterações</span>
        </div>
        <p>
          Por questões de segurança, você precisa digitar sua senha para confirmar as alterações feitas no seu cadastro.
        </p>
      </div>
      <div className="wrapper-terms-recaptcha">
        <RecaptchaComponent setReCAPTCHA={setReCAPTCHA} alignCenter={false} />
      </div>
      <div className="wrapper-confirm-password">
        <div className="confirm-password">
          <SimpleInput
            nameField="*Senha"
            value={form.password}
            isPassword
            inputWrong={inputPasswordWrong}
            errorMessage={errorMessagePassword}
            handleChange={onChangePassword}
          />
        </div>
        <div className="save-change-button">
          <ButtonStyle isButton text="Salvar" disabled={!reCAPTCHA} handleClickEvent={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SaveChanges;
