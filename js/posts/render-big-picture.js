import {isEscapeKey} from '../utils/utils.js';

const DEFAULT_COMMENTS_COUNT = 5;

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureComments = document.querySelector('.social__comments');
const bigPictureCaption = document.querySelector('.social__caption');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentContainer = document.querySelector('.social__comment');
const commentsLoaderBtn = document.querySelector('.social__comments-loader');
const commentsShownCount = document.querySelector('.social__comment-shown-count');
const commentsTotalCount = document.querySelector('.social__comment-total-count');

let showedComments = 5;
let comments = [];

const onCancelBtnClick = () => hideModal();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    hideModal();
  }
};

const createComment = (comment) => {
  const commentClone = commentContainer.cloneNode(true);
  const commentPicture = commentClone.querySelector('.social__picture');
  const commentText = commentClone.querySelector('.social__text');
  commentPicture.src = comment.avatar;
  commentPicture.alt = comment.name;
  commentText.textContent = comment.message;
  return commentClone;
};

const setLoaderButtonStatus = () => commentsLoaderBtn.classList.toggle('hidden', showedComments === comments.length);

const resetComments = () => {
  bigPictureComments.innerHTML = '';
  showedComments = 0;
};

const renderComments = (pictureComments) => {
  pictureComments.slice(showedComments, showedComments + DEFAULT_COMMENTS_COUNT).forEach((comment) => bigPictureComments.appendChild(createComment(comment)));
  showedComments = Math.min(showedComments + DEFAULT_COMMENTS_COUNT, pictureComments.length);
  commentsShownCount.textContent = showedComments;
  setLoaderButtonStatus();
};

const onLoadMoreCommentsBtnClick = () => renderComments(comments);

function showModal() {
  resetComments();
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoaderBtn.addEventListener('click', onLoadMoreCommentsBtnClick);
  cancelButton.addEventListener('click', onCancelBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

function hideModal(){
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  cancelButton.removeEventListener('click', onCancelBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const createBigPicture = (picture) => {
  bigPictureImage.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  commentsTotalCount.textContent = picture.comments.length;
  bigPictureCaption.textContent = picture.description;
};

const renderBigPicture = (picture) => {
  comments = picture.comments;
  createBigPicture(picture);
  showModal();
  renderComments(comments);
};

export { renderBigPicture };
