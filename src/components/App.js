import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Login from "./Login";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardDeleted, setCardDeleted] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  //получение информации
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => {
        console.log("ERROR! =>", err);
      });
  }, []);

  //открытие попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleDeleteConfirm(card) {
    setIsDeletePopup(true);
    setCardDeleted(card);
  }

  //обновление информации пользователя
  function handleOnUpdateUser(data) {
    api
      .editUserInfo(data.name, data.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("ERROR! =>", err);
      });
  }

  //обновление аватара
  function handleOnUpdateAvatar(data) {
    api
      .editNewAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("ERROR! =>", err);
      });
  }

  //добавление карточки
  function handleAddPlaceSubmit(data) {
    api
      .editNewCard(data.name, data.link)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("ERROR! =>", err);
      });
  }

  //удаление карточки
  function handleDeleteClick(evt) {
    evt.preventDefault();

    api
      .deleteCard(cardDeleted._id)
      .then(() => {
        const newCards = cards.filter((element) => element !== cardDeleted);
        setCards(newCards);
        closeAllPopups();
      })

      .catch((err) => {
        console.log("ERROR! =>", err);
      });
  }

  //постановка и снятие лайков
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log("ERROR! =>", err);
      });
  }

  //закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopup(false);
  }

  function hadleLogin(e) {
    e.preventDefault();
    setLoggedIn(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Routes>
          <Route path="/signin" element={<Login onLogin={hadleLogin}/>}>
          </Route>
        </Routes>

        <Main
          cards={cards}
          onEditProfilePopupOpen={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleDeleteConfirm}
          onCardLike={handleCardLike}
        />
        <Footer />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          btnText="Да"
          onSubmit={handleDeleteClick}
          onClose={closeAllPopups}
          isOpen={isDeletePopup}
        ></PopupWithForm>

        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleOnUpdateUser}
        ></EditProfilePopup>

        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddCard={handleAddPlaceSubmit}
        ></AddPlacePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleOnUpdateAvatar}
        ></EditAvatarPopup>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
