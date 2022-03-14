import React from 'react';
import PopupWithForms from './PopupWithForms';

function ConfirmPopup({ isOpenConfirm, onClose, handleDeleteClick }) {
 return (
  <PopupWithForms
   name={'confirm'}
   title={'Вы уверены ?'}
   isOpen={isOpenConfirm}
   onClose={onClose}
   onSubmit={handleDeleteClick}
   nameButton={'Да'}
  />
 );
}

export default ConfirmPopup;
