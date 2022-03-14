import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onPopupConfirm,
  handleCardClick,
  handleCardLike,
  handleCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div>
      <div className="main">
        <div className="profile">
          <div className="profile__pic">
            <img
              src={`${currentUser.avatar}`}
              alt="Аватар пользователя"
              className="profile__avatar"
            />
            <button
              className="profile__change-button"
              type="button"
              aria-label="Изменение аватара"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                aria-label="Изменить информацию о себе"
                onClick={onEditProfile}
              ></button>
            </div>
            <h2 className="profile__about">{currentUser.about}</h2>
          </div>
          <button
            type="button"
            className="profile__add-button"
            aria-label="Добавить место"
            onClick={onAddPlace}
          ></button>
        </div>

        <section className="elements">
          {cards.map((card, i) => (
            <Card
              key={card._id}
              card={card}
              name={card.name}
              like={card.likes.length}
              link={card.link}
              confirmDelete={onPopupConfirm}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default Main;
