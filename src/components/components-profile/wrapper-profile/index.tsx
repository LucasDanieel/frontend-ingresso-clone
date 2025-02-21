import { PropsWithChildren } from "react";
import "./styles.scss";

import HeaderProfile from "../header";
import LeftNavProfile from "../left-nav";

const WrapperProfile = ({ children }: PropsWithChildren) => {
  return (
    <div className="container-profile">
      <HeaderProfile />
      <main className="wrapper-profile-main">
        <LeftNavProfile />
        <div className="content-profile">{children}</div>
      </main>
    </div>
  );
};

export default WrapperProfile;
