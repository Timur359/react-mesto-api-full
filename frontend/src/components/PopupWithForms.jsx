import React from 'react';

function PopupWithForms({
 name,
 title,
 children,
 isOpen,
 onClose,
 onSubmit,
 nameButton,
}) {
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
    <h3 className="popup__title">{title}</h3>
    <form
     name={`${name}`}
     className={`popup__form popup__form_${name}`}
     onSubmit={onSubmit}
     noValidate
    >
     {children}
     <button type="submit" className="popup__button" aria-label="Сохранить">
      {nameButton}
     </button>
    </form>
   </div>
  </div>
 );
}

export default PopupWithForms;
