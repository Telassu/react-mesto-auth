import React from "react";
import Logo from "../images/logo.svg";
import { Route, Switch, Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="header">
      <img src={Logo} alt="Логотип" className="logo" />
      <Switch>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__container">
            <p className="header__email">{props.email}</p>
            <Link to="/sign-in" className="header__link">
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Header;
