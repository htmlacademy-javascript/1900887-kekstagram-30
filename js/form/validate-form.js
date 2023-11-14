const HASHTAG_REGEX = /^#[a-zа-я0-9]{1,19}$/;
const HASHTAG_COUNT = 5;
const COMMENT_LENGTH = 140;

const NOT_VALID_HASHTAG = 'Хештег должен начинаться с решётки, состоять из букв и чисел, не должен превышать длину 20 символов.';
const DUPLICATED_HASHTAG = 'Хештеги повторяются.';
const INVALID_HASHTAG_COUNT = 'Превышено количество хештегов.';
const INVALID_COMMENT_LENGTH = 'Длина комментария не может быть больше 140 символов.';

const uploadForm = document.querySelector('.img-upload__form');
const textHashTags = document.querySelector('.text__hashtags');
const textComments = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});
const createHashTags = (hashtagsString) => hashtagsString.trim().toLowerCase().split(' ').filter((hashtag) => hashtag);
const isValidHashTags = (hashtagsString) => createHashTags(hashtagsString).every((hashtag) => HASHTAG_REGEX.test(hashtag));
const isUniqueHashTags = (hashtagsString) => {
  const hashtags = createHashTags(hashtagsString);
  return hashtags.length === new Set(hashtags).size;
};
const isValidCount = (hashtagsString) => createHashTags(hashtagsString).length <= HASHTAG_COUNT;
const isCorrectLength = (commentString) => commentString.length <= COMMENT_LENGTH;
const addValidators = () => {
  pristine.addValidator(
    textHashTags,
    isValidHashTags,
    NOT_VALID_HASHTAG,
    1,
    true
  );
  pristine.addValidator(
    textHashTags,
    isUniqueHashTags,
    DUPLICATED_HASHTAG,
    1,
    true
  );
  pristine.addValidator(
    textHashTags,
    isValidCount,
    INVALID_HASHTAG_COUNT,
    1,
    true
  );
  pristine.addValidator(
    textComments,
    isCorrectLength,
    INVALID_COMMENT_LENGTH,
    1,
    true
  );
};
const validateForm = () => pristine.validate();
const resetPristine = () => pristine.reset();

export {addValidators, validateForm, resetPristine};
