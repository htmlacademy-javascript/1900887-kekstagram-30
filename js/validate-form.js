const uploadForm = document.querySelector('.img-upload__form');
const uploadFormInput = document.querySelector('.img-upload__input');
const uploadFormEdit = document.querySelector('.img-upload__overlay');
const imgUploadCancelBtn = document.querySelector('.img-upload__cancel');
const textHashTags = document.querySelector('.text__hashtags');
const textComments = document.querySelector('.text__description');
const hashTagRegEx = /^#[a-zа-я0-9]{1,19}$/i;
const HASHTAG_COUNT = 5;

let allHashtags = [];
let errorMessage = '';
let commentString = '';

let pristine = {};
const isValidHashTag = (hashtag) => hashTagRegEx.test(hashtag);
const checkDuplicates = (data) => {
  const uniqueHashtags = new Set(data);
  return !data.length === uniqueHashtags.size;
};
const isValidHashTags = () => {
  const validHashtags = allHashtags.map((hashtag) => isValidHashTag(hashtag));
  return !validHashtags.includes(false);
};
const checkHashTagsCount = (data) => data.length > HASHTAG_COUNT;
const validateHashTags = (hashtags) => {
  if (!hashtags) {
    return true;
  }
  allHashtags = Array.from(hashtags.trim().split(' '));

  if (isValidHashTags) {
    errorMessage = 'введён невалидный хэш-тег';
    return false;
  }
  if (checkHashTagsCount(allHashtags)) {
    errorMessage = 'превышено количество хэш-тегов';
    return false;
  }
  if (checkDuplicates(allHashtags)) {
    errorMessage = 'хэш-теги повторяются';
    return false;
  }
  return true;
};
const checkCommentLength = (comment) => {
  if (comment.length > 140) {
    commentString = 'длина комментария больше 140 символов';
    return false;
  }
  return true;
};
const validateComment = (comment) => checkCommentLength(comment);
const getHashTagErrorMessage = () => errorMessage;
const getCommentErrorMessage = () => commentString;
const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};
const onUploadCancelClick = () => {
  hideModal();
};
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    hideModal();
  }
};
const removeEscapeListener = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};
const addEscapeListener = () => {
  document.addEventListener('keydown', onDocumentKeydown);
};
function hideModal() {
  uploadFormEdit.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  pristine.reset();
  uploadForm.reset();
}

const createPristineObj = () => {
  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error'
  }, false);
};
const createPristineValidators = () => {
  pristine.addValidator(textHashTags, validateHashTags, getHashTagErrorMessage);
  pristine.addValidator(textComments, validateComment, getCommentErrorMessage);
};

function openModal() {
  uploadFormEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadCancelBtn.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);

  createPristineObj();
  createPristineValidators();

  textHashTags.addEventListener('focusin', removeEscapeListener);
  textHashTags.addEventListener('focusout', addEscapeListener);

  textComments.addEventListener('focusin', removeEscapeListener);
  textComments.addEventListener('focusout', addEscapeListener);

  uploadForm.addEventListener('submit', onFormSubmit);
}
const onUploadInputChange = () => {
  openModal();
};

const uploadImage = () => {
  uploadFormInput.addEventListener('change', onUploadInputChange);
};

export {uploadImage};
