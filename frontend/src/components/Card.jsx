import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ConfirmPopup from "./ConfirmPopup";

function Card({
  link,
  name,
  like,
  onCardClick,
  onCardLike,
  card,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  function handleClick() {
    onCardClick({ name, link });
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleDeleteClick(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  const [isConfirmPopup, setIsConfirmPopup] = React.useState(false);
  const onPopupConfirm = () => {
    setIsConfirmPopup(!isConfirmPopup);
  };

  function closeAllPopups() {
    setIsConfirmPopup(false);
  }

  return (
    <div>
      <div id="template">
        <div className="element">
          <img
            className="element__image"
            src={link}
            alt={name}
            onClick={handleClick}
          />
          <div className="element__card-container">
            <h2 className="element__text">{name}</h2>
            <div className="element__like-group">
              <button
                type="button"
                onClick={handleCardLike}
                className={`element__button_like  ${
                  isLiked ? `element__button_like_active` : ""
                }`}
                aria-label="Лайк"
              ></button>
              <p className="element__sum-like">{like}</p>
            </div>
            {isOwn ? (
              <button
                type="button"
                className="element__button_delete"
                aria-label="Удалить"
                onClick={onPopupConfirm}
              ></button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <ConfirmPopup
        isOpenConfirm={isConfirmPopup}
        onClose={closeAllPopups}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  );
}

export default Card;
