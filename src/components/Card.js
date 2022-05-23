import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardDeleteButtonClassName = `'element__delete' ${
    isOwn ? "element__delete" : "element__delete_hidden"
  }`;

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like element__like_active" : " "
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <li className="element">
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="удалить"
        onClick={handleDeleteClick}
      ></button>
      <div className="element__text">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
