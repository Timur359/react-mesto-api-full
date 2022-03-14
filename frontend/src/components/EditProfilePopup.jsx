import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForms from './PopupWithForms';

function EditProfilePopup({ onClose, isOpen, handleSubmitUser }) {
 const [name, setName] = React.useState('');
 const [description, setDescription] = React.useState('');

 const currentUser = React.useContext(CurrentUserContext);

 React.useEffect(
  () => {
   setName(currentUser.name);
   setDescription(currentUser.about);
  },
  [isOpen],
  [currentUser]
 );

 function handleSubmit(e) {
  e.preventDefault();
  handleSubmitUser({
   name,
   about: description,
  });
 }

 return (
  <PopupWithForms
   onClose={onClose}
   name={'edit'}
   title={'Редактировать профиль'}
   isOpen={isOpen}
   onSubmit={handleSubmit}
   nameButton={'Редактировать'}
  >
   <input
    name="name"
    id="userName"
    type="text"
    className="popup__input popup__input_data_name"
    placeholder="Имя"
    minLength="2"
    maxLength="40"
    onChange={(e) => {
     setName(e.target.value);
    }}
    value={name || ''}
    required
   />
   <span className="popup__input-error" id="userName-error"></span>
   <input
    name="about"
    id="userAbout"
    type="text"
    className="popup__input popup__input_data_about"
    placeholder="О себе"
    minLength="2"
    maxLength="200"
    onChange={(e) => {
     setDescription(e.target.value);
    }}
    value={description || ''}
    required
   />
   <span className="popup__input-error" id="userAbout-error"></span>
  </PopupWithForms>
 );
}

export default EditProfilePopup;
