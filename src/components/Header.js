import React from "react";
import Logo from "../images/logo.svg";

function Header() {
  return (
    <div className="header">
      <img src={Logo} alt="Логотип" className="logo" />
    </div>
  );
}

export default Header;
