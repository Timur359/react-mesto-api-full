import React from 'react';
import PopupWithForms from './PopupWithForms';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
 const avatarSrc = React.useRef({});
 function handleSubmit(e) {
  e.preventDefault();
  onUpdateAvatar(avatarSrc.current.value);
 }

 return (
  <PopupWithForms
   isOpen={isOpen}
   onClose={onClose}
   name={'avatar'}
   title={'Обновить аватар'}
   onSubmit={handleSubmit}
   nameButton={'Обновить'}
  >
   <input
    id="change-avatar-input"
    type="url"
    placeholder="Ссылка на картинку"
    className="popup__input popup__input_change-avatar_link"
    name="avatar"
    ref={avatarSrc}
    required
   />
   <span id="change-avatar-input-error" className="popup__input-error"></span>
  </PopupWithForms>
 );
}

export default EditAvatarPopup;
