import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""} popup_${
        props.name
      }`} 
      onClick={props.onClickClose}
    >
      <div className="popup__window">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className={`popup__save-button popup__save-button_${props.name}`}
            type="submit"
            aria-label="сохранить"
          >
            {props.btnText}
          </button>
        </form>
        <button
          className={`popup__close-button popup__close-button_${props.name}`}
          type="button"
          aria-label="закрыть окно"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
