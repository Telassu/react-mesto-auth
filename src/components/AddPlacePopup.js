import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState(" ");
  const [link, setLink] = useState(" ");

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddCard({
      name,
      link,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="element"
      title="Новое место"
      btnText={props.isLoading ? "Сохранение..." : "Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onClickClose={props.onClickClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="place"
        name="place"
        className="popup__input popup__input_type_place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        onChange={handleChangeName}
        value={name}
        required
      />

      <span className="popup__input-error place-input-error"></span>

      <input
        type="url"
        id="link"
        name="link"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        onChange={handleChangeLink}
        value={link}
        required
      />

      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
