import {addValidators, validateForm, resetPristine} from './validate-form.js';
import {resetImageScale, scalePreview} from './scale-preview.js';
import {initSlider, resetSlider} from './add-effect.js';
import {postData} from '../server/fetch.js';
import {onUploadError, onUploadSuccess, onDocumentKeydown} from './upload-form.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormInput = document.querySelector('.img-upload__input');
const uploadFormEdit = document.querySelector('.img-upload__overlay');
const imgUploadCancelBtn = document.querySelector('.img-upload__cancel');
const submitBtn = document.querySelector('.img-upload__submit');

const onUploadCancelClick = () => {
  closeForm();
};

const disableSubmitBtn = (isDisabled) => {
  submitBtn.disabled = isDisabled;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  disableSubmitBtn(true);
  const isValid = validateForm();
  if (isValid) {
    const formData = new FormData(evt.target);
    postData(formData, onUploadSuccess, onUploadError);
  }
};
function closeForm() {
  uploadFormEdit.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetPristine();
  resetSlider();
  resetImageScale();
  disableSubmitBtn(false);
}
function openForm() {
  uploadFormEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadCancelBtn.addEventListener('click', onUploadCancelClick);
  uploadForm.addEventListener('submit', onFormSubmit);
}
const handleInputChange = () => {
  openForm();
};
const uploadImage = () => {
  initSlider();
  addValidators();
  scalePreview();
  uploadFormInput.addEventListener('change', handleInputChange);
};

export {uploadImage, closeForm, disableSubmitBtn};
