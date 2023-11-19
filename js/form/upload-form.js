const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

import {isEscapeKey} from '../utils/utils.js';

const successTemplate = document.querySelector('#success').content;
const successMessage = successTemplate.querySelector('.success');
const errorTemplate = document.querySelector('#error').content;
const errorMessage = errorTemplate.querySelector('.error');
const errorButton = errorTemplate.querySelector('.error__button');
const successButton = successTemplate.querySelector('.success__button');

const isSuccess = () => document.body.contains(successMessage);
const isError = () => document.body.contains(errorMessage);

const onWindowClick = (evt) => {
  if ((!successMessage.contains(evt.target) || !errorMessage.contains(evt.target)) && (isSuccess() || isError())) {
    closeMessageWin();
  }
};

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt) && (isSuccess() || isError())) {
    evt.preventDefault();
    closeMessageWin();
  }
};

const onErrorBtnClick = () => {
  document.body.removeChild(errorMessage);
};

const onSuccessBtnClick = () => {
  document.body.removeChild(successMessage);
};

function closeMessageWin() {
  errorButton.removeEventListener('click', onErrorBtnClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
  window.removeEventListener('click', onWindowClick);

  if (isSuccess()) {
    document.body.removeChild(successMessage);
  } else {
    document.body.removeChild(errorMessage);
  }
}

const onUploadSuccess = (response) => {
  if (response.ok) {
    document.body.insertAdjacentElement('beforeend', successMessage);
    successButton.addEventListener('click', onSuccessBtnClick);
    document.addEventListener('keydown', onDocumentKeyDown);
    window.addEventListener('click', onWindowClick);
  }
};

const onUploadError = () => {
  document.body.insertAdjacentElement('beforeend', errorMessage);
  errorButton.addEventListener('click', onErrorBtnClick);
  document.addEventListener('keydown', onDocumentKeyDown);
  window.addEventListener('click', onWindowClick);
};
const uploadFormData = (formData) => fetch(
  SERVER_URL,
  {
    method: 'POST',
    body: formData
  })
  .then((response) => onUploadSuccess(response))
  .catch(() => onUploadError());

export {uploadFormData};
