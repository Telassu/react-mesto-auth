import React, { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" name="login" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          className="auth__input auth__input_type_email"
          placeholder="E-mail"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChangeEmail}
          value={email || ""}
        />
        <span className="auth__input-error email-input-error"></span>
        <input
          type="password"
          name="password"
          id="password"
          className="auth__input auth__input_type_password"
          placeholder="Пароль"
          minLength="5"
          maxLength="20"
          required
          onChange={handleChangePassword}
          value={password || ""}
        />
        <span className="auth__input-error password-input-error"></span>
        <button className="auth__save-button" type="submit" aria-label="вход">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
