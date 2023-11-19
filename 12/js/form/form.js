import {isEscapeKey} from '../utils/utils.js';
import {addValidators, validateForm, resetPristine} from './validate-form.js';
import {scalePreview} from './scale-preview.js';
import {initSlider, resetSlider} from './add-effect.js';
import {uploadFormData} from './upload-form.js';
// import {setEffects, resetSlider} from './add-effect.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormInput = document.querySelector('.img-upload__input');
const uploadFormEdit = document.querySelector('.img-upload__overlay');
const imgUploadCancelBtn = document.querySelector('.img-upload__cancel');

const successTemplate = document.querySelector('#success').content;
const successMessage = successTemplate.querySelector('.success');
const errorTemplate = document.querySelector('#error').content;
const errorMessage = errorTemplate.querySelector('.error');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description') && !document.body.contains(successMessage) && !document.body.contains(errorMessage)) {
    evt.preventDefault();
    closeForm();
  }
};
const onUploadCancelClick = () => {
  closeForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = validateForm();
  if (isValid) {
    const formData = new FormData(evt.target);
    uploadFormData(formData);
  }
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
  openForm();
};
const uploadImage = () => {
  initSlider();
  addValidators();
  scalePreview();
  uploadFormInput.addEventListener('change', handleInputChange);
};

export {uploadImage, closeForm};
