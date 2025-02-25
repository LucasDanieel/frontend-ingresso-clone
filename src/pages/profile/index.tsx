import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./styles.scss";

import SimpleInput from "../../components/form-inputs/simple-input";
import MonthDayInput from "../../components/form-inputs/month-day-input";
import TermsOfUse from "../../components/components-create-login/terms-of-use";
import ModalChangePassword from "../../components/components-profile/modal-change-password";
import ModalProfileUpdated from "../../components/components-profile/modal-profile-updated";
import AddressInputs from "../../components/form-inputs/address-inputs";
import PhoneInputs from "../../components/form-inputs/phone-inputs";
import { applyMask, onChangeFormName } from "../../utils/input-methods";
import { FormState, inputPhoneRefs, UserDTO } from "../../@types/user";
import SaveChanges from "../../components/components-profile/save-changes";

const Profile = () => {
  const [form, setForm] = useState<FormState>({
    id: "",
    name: "",
    CPF: "",
    maskedCPF: "",
    DDD: "",
    phone: "",
    email: "",
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

  const [inputNameWrong, setInputNameWrong] = useState<boolean>(false);
  const [inputDDDWrong, setInputDDDWrong] = useState<boolean>(false);
  const [inputPhoneWrong, setInputPhoneWrong] = useState<boolean>(false);

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputPhoneRefs = useRef<inputPhoneRefs>({
    ddd: null as HTMLInputElement | null,
    phone: null as HTMLInputElement | null,
  });

  const [openModalChangePassword, setOpenModalChangePassword] = useState<boolean>(false);
  const [profileUpdated, setProfileUpdated] = useState<boolean>(false);

  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get<UserDTO>(`/user/get-profile?token=${token}`)
        .then((resp) => {
          fillState(resp.data);
        })
        .catch(() => {
          Cookies.remove("token");
          navigate("/minha-conta");
        });
    } else {
      navigate("/minha-conta");
    }
  }, [token]);

  const fillState = (data: UserDTO) => {
    const address = data.address;
    setForm((s) => ({
      ...s,
      id: data?.id,
      name: data.name,
      CPF: data.cpf,
      maskedCPF: maskCPF(data.cpf),
      DDD: data.phoneDdd,
      phone: applyMask(data.phoneNumber, "_____-____", 9),
      email: data.email,
      month: data.dateOfBirth ? (new Date(data.dateOfBirth).getMonth() + 1).toString() : "0",
      day: data.dateOfBirth ? new Date(data.dateOfBirth).getDate().toString() : "0",
      CEP: address.cep ? applyMask(address.cep, "_____-___", 8) : "",
      street: address.street ? address.street : "",
      number: address.houseNumber ? address.houseNumber.toString() : "",
      complement: address.complement ? address.complement : "",
      neighborhood: address.neighborhood ? address.neighborhood : "",
      city: address.city ? address.city : "",
      state: address.state ? address.state : "",
      recieveNews: data.receiveNotification,
    }));
  };

  const maskCPF = (cpf: string) => {
    const cpf1 = cpf.slice(0, 2);
    const cpf2 = cpf.slice(9);

    return `${cpf1}*.***.***-${cpf2}`;
  };

  // NAME
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeFormName(e, setForm, setInputNameWrong);
  };

  return (
    <>
      {openModalChangePassword && (
        <ModalChangePassword email={form.email} setOpenModalChangePassword={setOpenModalChangePassword} />
      )}
      {profileUpdated && <ModalProfileUpdated setProfileUpdated={setProfileUpdated} />}
      <div className="container-form-profile">
        <form className="form-profile">
          <h3>Dados Pessoais</h3>
          <SimpleInput
            nameField="*Nome"
            value={form.name}
            errorMessage="O nome precisa ter entre 3 e 60 caracteres e não possuir caracteres especiais"
            inputWrong={inputNameWrong}
            handleChange={onChangeName}
            ref={inputNameRef}
          />
          <SimpleInput nameField="*CPF" value={form.maskedCPF ? form.maskedCPF : ""} disabled />
          <PhoneInputs
            form={form}
            setForm={setForm}
            inputDDDWrong={inputDDDWrong}
            inputPhoneWrong={inputPhoneWrong}
            setInputDDDWrong={setInputDDDWrong}
            setInputPhoneWrong={setInputPhoneWrong}
            ref={inputPhoneRefs}
          />
          <SimpleInput nameField="*E-mail" value={form.email} disabled />
          <SimpleInput
            nameField="Senha"
            value="********"
            disabled
            handleChangePassword={() => setOpenModalChangePassword(true)}
          />
          <MonthDayInput month={form.month} day={form.day} setForm={setForm} />
          <AddressInputs form={form} setForm={setForm} />
          <div className="profile-checkbox">
            <input
              type="checkbox"
              checked={form.recieveNews}
              onChange={(e) => setForm((s) => ({ ...s, recieveNews: e.target.checked }))}
            />
            <span>Quero receber novidades e mensagens da Ingresso.com.</span>
          </div>
          <div className="terms-of-use">
            <TermsOfUse />
          </div>
          <SaveChanges
            form={form}
            setForm={setForm}
            setInputNameWrong={setInputNameWrong}
            setInputDDDWrong={setInputDDDWrong}
            setInputPhoneWrong={setInputPhoneWrong}
            setProfileUpdated={setProfileUpdated}
            inputNameRef={inputNameRef}
            inputPhoneRefs={inputPhoneRefs}
          />
        </form>
      </div>
    </>
  );
};

export default Profile;
