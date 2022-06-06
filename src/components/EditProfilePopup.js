import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(" ");
  const [description, setDescription] = useState(" ");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      formName="profile"
      btnText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onClickClose={props.onClickClose}
    >
      <input
        type="text"
        name="name"
        id="name"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChangeName}
        value={name || " "}
      />
      <span className="popup__input-error name-input-error"></span>

      <input
        type="text"
        name="description"
        id="description"
        className="popup__input popup__input_type_description"
        placeholder="Профессиональная деятельность"
        minLength="2"
        maxLength="200"
        required
        onChange={handleChangeDescription}
        value={description || " "}
      />
      <span className="popup__input-error description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
