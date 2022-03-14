import React from 'react';
import OK from '../image/Union.svg';
import Error from '../image/Union_close.svg';

function InfoTooltip({ isOpen, onClose, name, onSubmit, status, textStatus }) {
 return (
  <div className={`popup popup_${name} ${isOpen ? 'popup_open' : ''}`}>
   <a className="popup__overlay"></a>
   <div className="popup__content">
    <button
     onClick={onClose}
     type="button"
     className={`popup__close popup__close_${name}`}
     aria-label="Закрыть"
    ></button>
    <form
     name={`${name}`}
     className={`popup__form popup__form_${name}`}
     onSubmit={onSubmit}
     noValidate
    >
     <img src={status ? OK : Error} className="popup__image_status" />
     <p className="popup__text">{textStatus}</p>
    </form>
   </div>
  </div>
 );
}

export default InfoTooltip;
