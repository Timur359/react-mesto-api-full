import React from "react";
import PopupWithForms from "./PopupWithForms";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForms
      name={"add"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      nameButton={"Добавить"}
    >
      <input
        name="name"
        id="nameImage"
        type="text"
        className="popup__input popup__input_place_name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name || ""}
        required
      />
      <span className="popup__input-error" id="nameImage-error"></span>
      <input
        name="link"
        id="urlImage"
        type="url"
        className="popup__input popup__input_place_url"
        placeholder="Ссылка на картинку"
        onChange={(e) => {
          setLink(e.target.value);
        }}
        value={link || ""}
        required
      />
      <span className="popup__input-error" id="urlImage-error"></span>
    </PopupWithForms>
  );
}

export default AddPlacePopup;
