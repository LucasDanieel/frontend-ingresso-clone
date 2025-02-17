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
import { genericObject } from "../create";
import { applyMask, onChangeGeneric, onFocosGeneric, onKeyDownGeneric } from "../../utils/input-methods";
import { useNavigate } from "react-router-dom";
import { UserContextType, UserDTO } from "../../@types/user";
import { UserContext } from "../../context/user-context";
import ModalChangePassword from "../../components/components-profile/modal-change-password";
("../../components/components-profile/modal-change-password");

const url_backend: string = import.meta.env.VITE_URL_BACKEND;

const Profile = () => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [CPF, setCPF] = useState<string>("");
  const [maskedCPF, setMaskedCPF] = useState<string>("");
  const [DDD, setDDD] = useState<genericObject>({
    value: "",
    hasValue: false,
  });
  const [phone, setPhone] = useState<genericObject>({
    value: "",
    hasValue: false,
  });
  const [email, setEmail] = useState<string>("");
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
  const [updatedProfile, setUpdatedProfile] = useState<boolean>(false);

  const { setUser } = useContext(UserContext) as UserContextType;

  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get<UserDTO>(`${url_backend}/user/get-profile?token=${token}`)
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
    if (data.id) setId(data.id);
    setName(data.name);
    setMaskedCPF(maskCPF(data.cpf));
    setCPF(data.cpf);
    setDDD(() => ({ value: data.phoneDdd, hasValue: true }));
    setPhone(() => ({ value: applyMask(data.phoneNumber, "_____-____", 9), hasValue: true }));
    setEmail(data.email);
    if (data.dateOfBirth) {
      const dateTime = new Date(data.dateOfBirth);
      setMonth((dateTime.getMonth() + 1).toString());
      setDay(dateTime.getDate().toString());
    }
    setCEP((s) => {
      if (data.address.cep) {
        return { value: applyMask(data.address.cep, "_____-___", 8), hasValue: true };
      }
      return { ...s };
    });
    setStreet((s) => {
      if (data.address.street) {
        return data.address.street;
      }
      return s;
    });
    setNumber((s) => {
      if (data.address.houseNumber) {
        return data.address.houseNumber.toString();
      }
      return s;
    });
    setComplement((s) => {
      if (data.address.complement) {
        return data.address.complement;
      }
      return s;
    });
    setNeighborhood((s) => {
      if (data.address.neighborhood) {
        return data.address.neighborhood;
      }
      return s;
    });
    setState((s) => {
      if (data.address.state) {
        return data.address.state;
      }
      return s;
    });
    setCity((s) => {
      if (data.address.city) {
        return data.address.city;
      }
      return s;
    });
    setRecieveNews(data.receiveNotification);
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

    setName(e.target.value);
  };

  // DDD
  const onChangeDDD = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeGeneric(e, "__", 2, setDDD, null, inputDDDRef, null);
  };

  const onFocosDDD = () => {
    onFocosGeneric(DDD, setDDD, "__", inputDDDRef, null);
    setInputDDDWrong(false);
  };

  const onBlurDDD = () => {
    if (DDD.hasValue) return;
    setInputDDDWrong(true);
    setDDD((s) => ({ ...s, value: "" }));
  };

  // PHONE
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeGeneric(e, "_____-____", 9, setPhone, null, inputPhoneRef, null);
  };

  const onKeyDownPhone = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDownGeneric(e, phone, setPhone, "_____-____", 9);
  };

  const onFocosPhone = () => {
    onFocosGeneric(phone, setPhone, "_____-____", inputPhoneRef, null);
  };

  const onBlurPhone = () => {
    if (phone.hasValue) return;
    setInputPhoneWrong(true);
    setPhone((s) => ({ ...s, value: "" }));
  };

  // MONTH
  const onChangeMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMonth(value);

    if (value == "0") setDay("0");
  };

  // CEP
  const onChangeCEP = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeGeneric(e, "_____-___", 8, setCEP, null, inputCEPRef, null);
  };

  const onKeyDownCEP = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDownGeneric(e, CEP, setCEP, "_____-___", 8);
  };

  const onFocosCEP = () => {
    onFocosGeneric(CEP, setCEP, "_____-___", inputCEPRef, null);
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

    const date = new Date(2024, Number(month) - 1, Number(day));

    const userDTO: UserDTO = {
      id,
      name,
      cpf: CPF,
      phoneDdd: DDD.value.replace(/\D/g, ""),
      phoneNumber: phone.value.replace(/\D/g, ""),
      email,
      password,
      dateOfBirth: date,
      address: {
        cep: CEP.value.replace(/\D/g, ""),
        street,
        houseNumber: Number(number),
        complement,
        neighborhood,
        state,
        city,
      },
      receiveNotification: recieveNews,
      userValid: true,
    };

    axios
      .put(`${url_backend}/user/update-profile`, userDTO)
      .then((resp) => {
        if (resp.data) {
          setUser({ email: email, name: name });
          setUpdatedProfile(true);
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

    if (name.length < 3 || name.length > 60) {
      setInputNameWrong(true);
      allValids = false;
      firstWrong = inputNameRef;
    } else setInputNameWrong(false);

    if (!DDD.hasValue) {
      setInputDDDWrong(true);
      allValids = false;
      if (firstWrong == undefined) firstWrong = inputDDDRef;
    } else setInputDDDWrong(false);

    if (!phone.hasValue) {
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
        <ModalChangePassword email={email} setOpenModalChangePassword={setOpenModalChangePassword} />
      )}
      {updatedProfile && (
        <div className="wrapper-updated-account">
          <div className="updated-account">
            <div className="close-updated-account">
              <svg
                onClick={() => setUpdatedProfile(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </div>
            <div className="header-updated-account">
              <img src="\assets\img\icon-ingresso-144x144.png" alt="Icone do ingresso.com" />
              <h3>Conta Atualizada!</h3>
            </div>
            <div className="text-updated-account">
              <span>Os dados da sua conta foram alterados e a conta já está atualizada.</span>
            </div>
            <div className="button-updated-account">
              <ButtonStyle text="OK" isButton handleClickEvent={() => setUpdatedProfile(false)} />
            </div>
            <a href="/">Ir para a página inicial</a>
          </div>
        </div>
      )}
      <div className="container-form-profile">
        <form className="form-profile">
          <h3>Dados Pessoais</h3>
          <SimpleInput
            nameField="*Nome"
            value={name}
            errorMessage="O nome precisa ter entre 3 e 60 caracteres e não possuir caracteres especiais"
            inputWrong={inputNameWrong}
            handleChange={onChangeName}
            ref={inputNameRef}
          />
          <SimpleInput nameField="*CPF" value={maskedCPF} disabled />
          <div className="profile-double-input">
            <div className="profile-ddd">
              <SimpleInput
                nameField="*DDD"
                value={DDD.value}
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
                value={phone.value}
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
          <SimpleInput nameField="*E-mail" value={email} disabled />
          <SimpleInput
            nameField="Senha"
            value="********"
            disabled
            handleChangePassword={() => setOpenModalChangePassword(true)}
          />
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
            ref={inputCEPRef}
          />
          <SimpleInput nameField="Logradouro" value={street} handleChange={(e) => setStreet(e.target.value)} />
          <div className="profile-double-input">
            <div className="profile-number-street">
              <SimpleInput nameField="Número" value={number} handleChange={(e) => setNumber(e.target.value)} />
            </div>
            <div className="profile-complement">
              <SimpleInput
                nameField="Complemento"
                value={complement}
                handleChange={(e) => setComplement(e.target.value)}
              />
            </div>
          </div>
          <SimpleInput nameField="Bairro" value={neighborhood} handleChange={(e) => setNeighborhood(e.target.value)} />
          <div className="profile-double-input">
            <div className="profile-state">
              <InputState state={state} handleChange={(e) => setState(e.target.value)} />
            </div>
            <div className="profile-city">
              <SimpleInput nameField="Cidade" value={city} handleChange={(e) => setCity(e.target.value)} />
            </div>
          </div>
          <div className="profile-checkbox">
            <input type="checkbox" checked={recieveNews} onChange={(e) => setRecieveNews(e.target.checked)} />
            <span>Quero receber novidades e mensagens da Ingresso.com.</span>
          </div>
          <div className="terms-of-use">
            <TermsOfUse />
          </div>
          <div className="profile-recaptcha-confirm-password">
            <div className="wrapper-save-changes">
              <div className="warning-save-changes">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path
                    d="M8.617 12.504H8.59a.986.986 0 0 1-.707-.332L5.309 9.297A.988.988 0 1 1 6.785 7.98l1.875 2.098 6.192-6.195A.988.988 0 1 1 16.25 5.28l-6.934 6.934a.994.994 0 0 1-.699.289Zm0 0"
                    style={{ stroke: "none" }}
                    fillOpacity={1}
                    fill="rgb(255, 255, 255)"
                    fillRule="nonzero"
                  ></path>
                  <path
                    d="M8.988 17.883c-4.902 0-8.89-3.992-8.89-8.895 0-4.902 3.988-8.89 8.89-8.89 1.63 0 3.219.445 4.606 1.285a.988.988 0 1 1-1.028 1.687 6.892 6.892 0 0 0-3.578-.996 6.922 6.922 0 0 0-6.914 6.914c0 3.817 3.102 6.918 6.914 6.918a6.923 6.923 0 0 0 6.864-7.797.986.986 0 1 1 1.957-.25c.046.375.074.754.074 1.13 0 4.902-3.992 8.894-8.895 8.894Zm0 0"
                    style={{ stroke: "none" }}
                    fillOpacity={1}
                    fill="rgb(255, 255, 255)"
                    fillRule="nonzero"
                  ></path>
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
