import { ChangeEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import "./styles.scss";
import Cookies from "js-cookie";
import axios from "axios";
import SimpleInput from "../../components/form-inputs/simple-input";
import MonthDayInput from "../../components/form-inputs/month-day-input";
import InputState from "../../components/form-inputs/input-state";
import TermsOfUse from "../../components/components-create-login/terms-of-use";
import RecaptchaComponent from "../../components/components-create-login/recaptcha-component";
import ButtonStyle from "../../components/button-style";
import {
  applyMask,
  onChangeGeneric,
  onChangeGenericTest,
  onFocosGeneric,
  onFocosGenericTest,
  onKeyDownGeneric,
  onKeyDownGenericTest,
} from "../../utils/input-methods";
import { useNavigate } from "react-router-dom";
import { FormState, UserContextType, UserDTO } from "../../@types/user";
import { UserContext } from "../../providers/user-provider";
import ModalChangePassword from "../../components/components-profile/modal-change-password";
import ModalProfileUpdated from "../../components/components-profile/modal-profile-updated";

const Profile = () => {
  const [form, setForm] = useState<FormState>({
    id: "",
    name: "",
    CPF: "",
    maskedCPF: "",
    DDD: "",
    phone: "",
    email: "",
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
  const [password, setPassword] = useState<string>("");
  const [reCAPTCHA, setReCAPTCHA] = useState<string | null>(null);

  const [inputNameWrong, setInputNameWrong] = useState<boolean>(false);
  const [inputDDDWrong, setInputDDDWrong] = useState<boolean>(false);
  const [inputPasswordWrong, setInputPasswordWrong] = useState<boolean>(false);
  const [inputPhoneWrong, setInputPhoneWrong] = useState<boolean>(false);
  const [inputCEPWrong, setInputCEPWrong] = useState<boolean>(false);

  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("A senha é obrigatória");

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputDDDRef = useRef<HTMLInputElement>(null);
  const inputPhoneRef = useRef<HTMLInputElement>(null);
  const inputCEPRef = useRef<HTMLInputElement>(null);

  const [openModalChangePassword, setOpenModalChangePassword] = useState<boolean>(false);
  const [profileUpdated, setProfileUpdated] = useState<boolean>(false);

  const { setUser } = useContext(UserContext) as UserContextType;

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
    if (e.target.value.length < 3 || e.target.value.length > 60) setInputNameWrong(true);
    else setInputNameWrong(false);

    setForm((s) => ({ ...s, name: e.target.value }));
  };

  // DDD
  const onChangeDDD = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeGenericTest(e, "__", 2, setForm, "DDD", null, inputDDDRef.current);
  };

  const onFocosDDD = () => {
    onFocosGenericTest(form.DDD, setForm, "DDD", "__", inputDDDRef.current);
    setInputDDDWrong(false);
  };

  const onBlurDDD = () => {
    if (form.DDD.replace(/\D/g, "").length > 0) return;
    setInputDDDWrong(true);
    setForm((s) => ({ ...s, DDD: "" }));
  };

  // PHONE
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeGenericTest(e, "_____-____", 9, setForm, "phone", null, inputPhoneRef.current, null);
  };

  const onKeyDownPhone = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDownGenericTest(e, form.phone, setForm, "phone", "_____-____", 9);
  };

  const onFocosPhone = () => {
    onFocosGenericTest(form.phone, setForm, "phone", "_____-____", inputPhoneRef.current, null);
    setInputPhoneWrong(false);
  };

  const onBlurPhone = () => {
    if (form.phone.replace(/\D/g, "").length > 0) return;
    setInputPhoneWrong(true);
    setForm((s) => ({ ...s, phone: "" }));
  };

  // MONTH
  const onChangeMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setForm((s) => ({ ...s, month: value }));

    if (value == "0") setForm((s) => ({ ...s, day: "0" }));
  };

  // CEP
  const onChangeCEP = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeGenericTest(e, "_____-___", 8, setForm, "CEP", null, inputCEPRef.current, null);
  };

  const onKeyDownCEP = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDownGenericTest(e, form.CEP, setForm, "CEP", "_____-___", 8);
  };

  const onFocosCEP = () => {
    onFocosGenericTest(form.CEP, setForm, "CEP", "_____-___", inputCEPRef.current, null);
  };

  const onBlurCEP = () => {
    const cepClean = form.CEP.replace(/\D/g, "");
    if (cepClean.length > 0) {
      if (cepClean.length < 8) {
        resetAdrress();
      } else {
        axios
          .get(`https://viacep.com.br/ws/${form.CEP}/json`)
          .then((resp) => {
            const data = resp.data;
            if (data.erro == "true") {
              resetAdrress();
            } else {
              setForm((s) => ({ ...s, street: data.logradouro }));
              setForm((s) => ({ ...s, neighborhood: data.bairro }));
              setForm((s) => ({ ...s, city: data.localidade }));
              setForm((s) => ({ ...s, state: data.uf }));
              setInputCEPWrong(false);
            }
          })
          .catch(() => {
            resetAdrress();
          });
      }
    } else {
      setInputCEPWrong(false);
      setForm((s) => ({ ...s, CEP: "" }));
    }
  };

  const resetAdrress = () => {
    setForm((s) => ({ ...s, street: "" }));
    setForm((s) => ({ ...s, neighborhood: "" }));
    setForm((s) => ({ ...s, state: "" }));
    setForm((s) => ({ ...s, city: "" }));
    setInputCEPWrong(true);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) {
      setErrorMessagePassword("A senha é obrigatória");
      setInputPasswordWrong(true);
    } else setInputPasswordWrong(false);

    setPassword(value);
  };

  const onSubmit = () => {
    if (!password) return setInputPasswordWrong(true);

    const allValids = validateAllInputs();
    if (allValids == false) return;

    const date = new Date(2024, Number(form.month) - 1, Number(form.day));

    const userDTO: UserDTO = {
      id: form.id,
      name: form.name,
      cpf: form.CPF,
      phoneDdd: form.DDD.replace(/\D/g, ""),
      phoneNumber: form.phone.replace(/\D/g, ""),
      email: form.email,
      password,
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
      firstWrong = inputNameRef;
    } else setInputNameWrong(false);

    if (form.DDD.length == 0) {
      setInputDDDWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputDDDRef;
    } else setInputDDDWrong(false);

    if (form.phone.length == 0) {
      setInputPhoneWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputPhoneRef;
    } else setInputPhoneWrong(false);

    firstWrong?.current?.focus();

    return allValids;
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
          <SimpleInput nameField="*CPF" value={form.maskedCPF} disabled />
          <div className="profile-double-input">
            <div className="profile-ddd">
              <SimpleInput
                nameField="*DDD"
                value={form.DDD}
                errorMessage="É obrigatório preencher o DDD."
                inputWrong={inputDDDWrong}
                handleChange={onChangeDDD}
                handleFocos={onFocosDDD}
                handleBlur={onBlurDDD}
                ref={inputDDDRef}
              />
            </div>
            <div className="profile-phone">
              <SimpleInput
                nameField="*Telefone"
                value={form.phone}
                errorMessage="É obrigatório preencher o número do telefone."
                maxLength={10}
                inputWrong={inputPhoneWrong}
                handleChange={onChangePhone}
                handleKeyDown={onKeyDownPhone}
                handleFocos={onFocosPhone}
                handleBlur={onBlurPhone}
                ref={inputPhoneRef}
              />
            </div>
          </div>
          <SimpleInput nameField="*E-mail" value={form.email} disabled />
          <SimpleInput
            nameField="Senha"
            value="********"
            disabled
            handleChangePassword={() => setOpenModalChangePassword(true)}
          />
          <MonthDayInput
            month={form.month}
            day={form.day}
            handleChangeMonth={onChangeMonth}
            handleChangeDay={(e) => setForm((s) => ({ ...s, day: e.target.value }))}
          />
          <SimpleInput
            nameField="CEP"
            value={form.CEP}
            errorMessage="CEP inválido ou não encontrado"
            inputWrong={inputCEPWrong}
            isCep={true}
            handleChange={onChangeCEP}
            handleKeyDown={onKeyDownCEP}
            handleBlur={onBlurCEP}
            handleFocos={onFocosCEP}
            ref={inputCEPRef}
          />
          <SimpleInput
            nameField="Logradouro"
            value={form.street}
            handleChange={(e) => setForm((s) => ({ ...s, street: e.target.value }))}
          />
          <div className="profile-double-input">
            <div className="profile-number-street">
              <SimpleInput
                nameField="Número"
                value={form.number}
                handleChange={(e) => setForm((s) => ({ ...s, number: e.target.value }))}
              />
            </div>
            <div className="profile-complement">
              <SimpleInput
                nameField="Complemento"
                value={form.complement}
                handleChange={(e) => setForm((s) => ({ ...s, complement: e.target.value }))}
              />
            </div>
          </div>
          <SimpleInput
            nameField="Bairro"
            value={form.neighborhood}
            handleChange={(e) => setForm((s) => ({ ...s, neighborhood: e.target.value }))}
          />
          <div className="profile-double-input">
            <div className="profile-state">
              <InputState state={form.state} handleChange={(e) => setForm((s) => ({ ...s, state: e.target.value }))} />
            </div>
            <div className="profile-city">
              <SimpleInput
                nameField="Cidade"
                value={form.city}
                handleChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
              />
            </div>
          </div>
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
                Por questões de segurança, você precisa digitar sua senha para confirmar as alterações feitas no seu
                cadastro.
              </p>
            </div>
            <div className="wrapper-terms-recaptcha">
              <RecaptchaComponent setReCAPTCHA={setReCAPTCHA} alignCenter={false} />
            </div>
            <div className="wrapper-confirm-password">
              <div className="confirm-password">
                <SimpleInput
                  nameField="*Senha"
                  value={password}
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
        </form>
      </div>
    </>
  );
};

export default Profile;
