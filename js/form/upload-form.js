import {isEscapeKey} from '../utils/utils.js';
import {closeForm} from './form.js';
import {disableSubmitBtn} from './form.js';

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const successMessage = successTemplate.querySelector('.success');
const errorMessage = errorTemplate.querySelector('.error');
const successButton = successTemplate.querySelector('.success__button');
const errorButton = errorTemplate.querySelector('.error__button');
const successInner = successMessage.querySelector('.success__inner');
const errorInner = errorMessage.querySelector('.error__inner');

const isSuccess = () => document.body.contains(successMessage);

const isError = () => document.body.contains(errorMessage);

const onErrorBtnClick = () => document.body.removeChild(errorMessage);

const onSuccessBtnClick = () => document.body.removeChild(successMessage);

const closeMessageWin = () => {
  document.removeEventListener('click', onDocumentClick);
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

function onDocumentClick(evt) {
  if ((isError() && !errorInner.contains(evt.target)) || (isSuccess() && !successInner.contains(evt.target))) {
    closeMessageWin();
  }
}

const onUploadError = () => {
  document.body.insertAdjacentElement('beforeend', errorMessage);
  errorButton.addEventListener('click', onErrorBtnClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
  disableSubmitBtn(false);
};

const onUploadSuccess = (response) => {
  if (response.ok) {
    closeForm();
    document.body.insertAdjacentElement('beforeend', successMessage);
    successButton.addEventListener('click', onSuccessBtnClick);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
    disableSubmitBtn(false);
  } else {
    throw new Error();
  }
};


export {onUploadError, onUploadSuccess, isSuccess, isError};
