const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImage = bigPictureContainer.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureCommentsShown = document.querySelector('.social__comment-shown-count');
const bigPictureCommentsTotal = document.querySelector('.social__comment-total-count');
const bigPictureComments = document.querySelector('.social__comments');
const bigPictureCaption = bigPictureContainer.querySelector('.social__caption');
const cancelButton = document.querySelector('.big-picture__cancel');

const POSTS_COUNT = 30;

const renderComments = (picture) => {
  picture.comments.forEach((comment) => {
    const commentNode = bigPictureComments.querySelector('.social__comment').cloneNode(true);

    commentNode.src = comment.avatar;
    commentNode.querySelector('.social__picture').src = comment.avatar;
    commentNode.querySelector('.social__picture').alt = comment.name;
    commentNode.querySelector('.social__text').textContent = comment.message;

    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');

    bigPictureComments.appendChild(commentNode);
  });
};

const operateClasses = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const renderBigPicture = (picture) => {
  bigPictureImage.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureCommentsShown.textContent = picture.comments.length;
  bigPictureCommentsTotal.textContent = POSTS_COUNT;
  bigPictureCaption.textContent = picture.description;

  renderComments(picture);

  bigPictureContainer.classList.remove('hidden');

  document.body.classList.add('modal-open');

  cancelButton.addEventListener('click', () => {
    operateClasses();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      operateClasses();
    }
  });
};

export { renderBigPicture };
