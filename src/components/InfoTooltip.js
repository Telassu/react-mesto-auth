import React from "react";
import Success from "../images/Success.svg";
import Failed from "../images/Failed.svg"

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"} popup_tooltip`}>
      <div className="popup__window popup__window_tooltip">
        {props.isSuccess ? (
          <>
            <img className="popup__image popup__image_tooltip" src={Success} alt="Успешная регистрация"/>
            <h2 className="popup__title popup__title_tooltip">Вы успешно зарегестрировались!</h2>
          </>
        ) : (
          <>
            <img className="popup__image popup__image_tooltip" src={Failed} alt="Регистрация не удалась"/>
            <h2 className="popup__title popup__title_tooltip">Что-то пошла не так! Попробуйте еще раз.</h2>
          </>
        )}
      </div>
      <button
        className="popup__close-button popup__close-button_tooltip"
        type="button"
        aria-label="закрыть окно"
        onClick={props.onClose}
      ></button>
    </div>
  );
}

export default InfoTooltip;
