import React, { useState } from "react";
import * as auth from "../utils/Auth";

function Login(props) {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    auth
      .login(email, password)
      .then((data) => {
        if (data.jwt) {
          setEmail(email);
          setPassword(password);
          props.handleLogin();
          props.history.push("/");
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
      });
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" name="login" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          className="login__input login__input_type_email"
          placeholder="E-mail"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChangeEmail}
          value={email || ""}
        />
        <span className="login__input-error email-input-error"></span>
        <input
          type="text"
          name="password"
          id="password"
          className="login__input login__input_type_password"
          placeholder="Пароль"
          minLength="5"
          maxLength="20"
          required
          onChange={handleChangePassword}
          value={password || ""}
        />
        <span className="login__input-error password-input-error"></span>
        <button className="login__save-button" type="submit" aria-label="вход">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
