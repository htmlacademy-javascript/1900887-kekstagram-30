import {isEscapeKey} from '../utils/utils.js';
import {closeForm} from './form.js';
import {disableSubmitBtn} from './form.js';

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const successMessage = successTemplate.querySelector('.success');
const errorMessage = errorTemplate.querySelector('.error');
const successButton = successTemplate.querySelector('.success__button');
const errorButton = errorTemplate.querySelector('.error__button');

const isSuccess = () => document.body.contains(successMessage);

const isError = () => document.body.contains(errorMessage);

const onErrorBtnClick = () => document.body.removeChild(errorMessage);

const onSuccessBtnClick = () => document.body.removeChild(successMessage);

const closeMessageWin = () => {
  window.removeEventListener('click', onWindowClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');

  if (isSuccess()) {
    document.body.removeChild(successMessage);
    successButton.removeEventListener('click', onSuccessBtnClick);
  } else {
    document.body.removeChild(errorMessage);
    errorButton.removeEventListener('click', onErrorBtnClick);
  }
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && (isSuccess() || isError())) {
    closeMessageWin();
  }
}

function onWindowClick(evt) {
  if ((!successMessage.contains(evt.target) || !errorMessage.contains(evt.target)) && (isSuccess() || isError())) {
    closeMessageWin();
  }
}

const onUploadSuccess = (response) => {
  if (response.ok) {
    document.body.insertAdjacentElement('beforeend', successMessage);
    document.body.classList.add('modal-open');
    successButton.addEventListener('click', onSuccessBtnClick);
    window.addEventListener('click', onWindowClick);
    document.addEventListener('keydown', onDocumentKeydown);
    closeForm();
  } else {
    document.body.insertAdjacentElement('beforeend', errorMessage);
    errorButton.addEventListener('click', onErrorBtnClick);
    window.addEventListener('click', onWindowClick);
    document.addEventListener('keydown', onDocumentKeydown);
    disableSubmitBtn(false);
  }
};

const onUploadError = () => {
  document.body.insertAdjacentElement('beforeend', errorMessage);
  errorButton.addEventListener('click', onErrorBtnClick);
  window.addEventListener('click', onWindowClick);
  document.addEventListener('keydown', onDocumentKeydown);
  disableSubmitBtn(false);
};

export {onUploadError, onUploadSuccess, isSuccess, isError};
