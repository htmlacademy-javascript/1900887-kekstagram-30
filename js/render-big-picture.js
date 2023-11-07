const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureComments = document.querySelector('.social__comments');
const bigPictureCaption = document.querySelector('.social__caption');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentContainer = document.querySelector('.social__comment');
const commentText = document.querySelector('.social__text');
const commentsLoaderBtn = document.querySelector('.social__comments-loader');
const commentsCount = document.querySelector('.social__comment-count');
const commentsShownCount = document.querySelector('.social__comment-shown-count');

const DEFAULT_COMMENTS_COUNT = 5;
let showedComments = 0;
let comments = [];
const onCancelClick = () => {
  hideModal();
};
const onEscapePress = (evt) => {
  if (evt.key === 'Escape') {
    hideModal();
  }
};
const createComment = (comment) => {
  const commentClone = commentContainer.cloneNode(true);
  const commentPicture = commentClone.querySelector('.social__picture');

  commentPicture.src = comment.avatar;
  commentPicture.alt = comment.name;
  commentText.textContent = comment.message;

  return commentClone;
};
const renderComments = (pictureComments) => {
  pictureComments.slice(showedComments, showedComments + DEFAULT_COMMENTS_COUNT).forEach((comment) => bigPictureComments.appendChild(createComment(comment)));
  showedComments = Math.min(showedComments + DEFAULT_COMMENTS_COUNT, pictureComments.length);
  commentsShownCount.textContent = showedComments;

  if (showedComments === comments.length) {
    commentsLoaderBtn.classList.add('hidden');
  }
};
const onLoadMoreCommentsBtnClick = () => {
  renderComments(comments);

  if (showedComments >= comments.length) {
    commentsLoaderBtn.classList.add('hidden');
  }
};
function hideModal(){
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  cancelButton.removeEventListener('click', onCancelClick);
  document.removeEventListener('keydown', onEscapePress);
}
function showModal() {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoaderBtn.addEventListener('click', onLoadMoreCommentsBtnClick);
  cancelButton.addEventListener('click', onCancelClick);
  document.addEventListener('keydown', onEscapePress);
}
const createBigPicture = (picture) => {
  bigPictureImage.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  commentsCount.children[1].textContent = picture.comments.length;
  bigPictureCaption.textContent = picture.description;
};
const renderBigPicture = (picture) => {
  comments = picture.comments;
  bigPictureComments.innerHTML = '';
  createBigPicture(picture);
  renderComments(comments);
  showModal();
};

export { renderBigPicture };
