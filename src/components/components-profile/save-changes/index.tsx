import { ChangeEvent, Dispatch, RefObject, SetStateAction, useContext, useState } from "react";
import axios from "axios";
import "./styles.scss";

import SimpleInput from "../../components-form/simple-input";
import RecaptchaComponent from "../../components-form/recaptcha-component";
import { FormState, inputPhoneRefs, UserContextType, UserDTO } from "../../../@types/user";
import { UserContext } from "../../../providers/user-provider";
import ButtonGradient from "../../buttons-styles/button-gradient";
import { IconCheckCircle } from "../../../icons";

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
          <IconCheckCircle />
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
          <ButtonGradient text="Salvar" disabled={!reCAPTCHA} fontBold handleClickEvent={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SaveChanges;
