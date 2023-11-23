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
  errorButton.removeEventListener('click', onErrorBtnClick);
  window.removeEventListener('click', onWindowClick);

  if (isSuccess()) {
    document.body.removeChild(successMessage);
  } else {
    document.body.removeChild(errorMessage);
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description') && !isSuccess() && !isError()) {
    evt.preventDefault();
    closeForm();
  }
};

function onWindowClick(evt) {
  if ((!successMessage.contains(evt.target) || !errorMessage.contains(evt.target)) && (isSuccess() || isError())) {
    closeMessageWin();
  }
}

const onUploadSuccess = (response) => {
  if (response.ok) {
    document.body.insertAdjacentElement('beforeend', successMessage);
    successButton.addEventListener('click', onSuccessBtnClick);
    window.addEventListener('click', onWindowClick);
    closeForm();
  } else {
    throw new Error();
  }
};

const onUploadError = () => {
  document.body.insertAdjacentElement('beforeend', errorMessage);
  errorButton.addEventListener('click', onErrorBtnClick);
  window.addEventListener('click', onWindowClick);
  disableSubmitBtn(false);
};

export {onUploadError, onUploadSuccess, onDocumentKeydown};
