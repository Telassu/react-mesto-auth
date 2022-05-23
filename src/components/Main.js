import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="content">
      <section className="profile">
        <div
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          className="profile__avatar-container"
        >
          <button
            className="profile__avatar-button"
            onClick={props.onEditAvatar}
            type="button"
            aria-label="изменить аватар"
          ></button>
        </div>
        <div className="profile-info">
          <h1 className="profile-info__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="изменить профиль"
            onClick={props.onEditProfilePopupOpen}
          ></button>
          <p className="profile-info__description">{currentUser.about}</p>
        </div>
        <button
          name="add-button"
          className="profile__add-button"
          type="button"
          aria-label="добавить место"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike}
            ></Card>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Main;
