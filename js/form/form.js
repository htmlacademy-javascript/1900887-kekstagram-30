import {isEscapeKey} from '../utils/utils.js';
import {addValidators, validateForm, resetPristine} from './validate-form.js';
import {scalePreview} from './scale-preview.js';
import {initSlider, resetSlider} from './add-effect.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormInput = document.querySelector('.img-upload__input');
const uploadFormEdit = document.querySelector('.img-upload__overlay');
const imgUploadCancelBtn = document.querySelector('.img-upload__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    evt.preventDefault();
    closeForm();
  }
};
const onUploadCancelClick = () => {
  closeForm();
};
const onFormSubmit = (evt) => {
  evt.preventDefault();
  validateForm();
};
function closeForm() {
  uploadFormEdit.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetPristine();
  resetSlider();
}
function openForm() {
  uploadFormEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadCancelBtn.addEventListener('click', onUploadCancelClick);
  uploadForm.addEventListener('submit', onFormSubmit);
}
const handleInputChange = () => {
  addValidators();
  initSlider();
  scalePreview();
  openForm();
};
const uploadImage = () => {
  uploadFormInput.addEventListener('change', handleInputChange);
};

export {uploadImage};
