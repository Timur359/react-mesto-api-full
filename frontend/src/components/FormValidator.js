export default class FormValidator {
 constructor(config, popupSelector) {
  this._formSelector = config.formSelector;
  this._inputSelector = config.inputSelector;
  this._submitButtonSelector = config.submitButtonSelector;
  this._inputErrorClass = config.inputErrorClass;
  this._inactiveButtonClass = config.inactiveButtonClass;
  this._errorClass = config.errorClass;
  this._formElement = document.querySelector(popupSelector);
  this._inputList = Array.from(
   this._formElement.querySelectorAll(this._inputSelector)
  );
  this._buttonElement = this._formElement.querySelector(
   this._submitButtonSelector
  );
 }

 //метод появления сообщения об ошибке
 _showInputError(inputElement, errorMessage) {
  const errorElement = this._formElement.querySelector(
   `#${inputElement.id}-error`
  );

  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
 }

 //метод скрытия сообщения об ошибке
 _hideInputError(inputElement) {
  const errorElement = this._formElement.querySelector(
   `#${inputElement.id}-error`
  );
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.textContent = '';
 }

 //метод управления сообщениями об ошибках
 _checkInputValidity(inputElement) {
  if (inputElement.validity.valid) {
   this._hideInputError(inputElement);
  } else {
   this._showInputError(inputElement, inputElement.validationMessage);
  }
 }

 //метод проверки на невалидные поля
 _hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
  });
 }

 //метод включения/выключения кнопки submit в форме
 _toggleButtonState() {
  if (this._hasInvalidInput(this._inputList)) {
   this._buttonElement.setAttribute('disabled', true);
   this._buttonElement.classList.add(this._inactiveButtonClass);
  } else {
   this._buttonElement.removeAttribute('disabled');
   this._buttonElement.classList.remove(this._inactiveButtonClass);
  }
 }

 //метод добавления слушателей для каждого поля ввода
 _setEventListeners() {
  this._toggleButtonState();

  this._inputList.forEach((inputElement) => {
   inputElement.addEventListener('input', () => {
    this._checkInputValidity(inputElement);

    this._toggleButtonState();
   });
  });
 }

 //метод сброса результатов проверки формы
 resetValidationState() {
  this._toggleButtonState();

  this._inputList.forEach((inputElement) => {
   this._hideInputError(inputElement);
  });
 }

 //метод включения валидации
 enableValidation() {
  this._setEventListeners();
 }
}
