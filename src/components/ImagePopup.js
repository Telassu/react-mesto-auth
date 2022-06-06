import React from "react";

function ImagePopup({ card, isOpen, onClose, onClickClose }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"} imageView`} onClick={onClickClose}>
      <figure className="imageView__figure">
        <img className="imageView__image" src={card.link} alt={card.name} />
        <figcaption className="imageView__caption">{card.name}</figcaption>
        <button
          className="popup__close-button popup__close-button_imageView"
          type="button"
          aria-label="закрыть изображение"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  );
}

export default ImagePopup;
