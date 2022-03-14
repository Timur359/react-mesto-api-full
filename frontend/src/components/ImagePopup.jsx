import React from 'react';

function ImagePopup({ name, link, isOpen, onClose }) {
 return (
  <div className={`popup popup_zoom ${isOpen ? 'popup_open' : ''}`}>
   <a className="popup__overlay"></a>
   <div className="popup__figure-container">
    <figure className="popup__figure">
     <img className="popup__image" src={link} alt={name} />
     <figcaption className="popup__figcaption">{name}</figcaption>
    </figure>
    <button
     type="button"
     className="popup__close popup__close_zoom"
     aria-label="Закрыть"
     onClick={onClose}
    ></button>
   </div>
  </div>
 );
}

export default ImagePopup;
