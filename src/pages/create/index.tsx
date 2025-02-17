import { useState } from "react";
import "./styles.scss";

import HeaderFooter from "../../components/header-footer";
import ConfirmEmail from "../../components/components-create-login/confirm-email";
import FormCreateLogin from "../../components/components-create-login/form-create-login";

export type genericObject = {
  value: string;
  hasValue: boolean;
};

export type requiredInPassword = {
  letraMinuscula: boolean;
  letraMaiuscula: boolean;
  hasNumber: boolean;
  minimumLength: boolean;
};

export type userCreated = {
  name: string;
  isCompleted: boolean;
};

const Create = () => {
  const [userCreated, setUserCreated] = useState<userCreated>({
    name: "",
    isCompleted: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const closeConfirmEmail = () => {
    setUserCreated({ name: "", isCompleted: false });
  };

  return (
    <>
      {userCreated.isCompleted && <ConfirmEmail userCreated={userCreated} closeConfirmEmail={closeConfirmEmail} />}
      <HeaderFooter>
        <main className="create-login-main-container">
          <div className="create-login-main-wrapper">
            <div className="create-login-main-header">
              <h2>Cadastre-se</h2>
              <span>Compre ingressos e combos de pipoca com conforto e comodidade.</span>
            </div>
            <div className={loading ? "controll-loading-create-login" : ""}>
              <div className="loading-create-login">
                <div className="spinner-create-login"></div>
              </div>
              <div className="controll-form-create-login">
                <FormCreateLogin loading={loading} setLoading={setLoading} setUserCreated={setUserCreated} />
              </div>
            </div>
          </div>
        </main>
      </HeaderFooter>
    </>
  );
};

export default Create;
