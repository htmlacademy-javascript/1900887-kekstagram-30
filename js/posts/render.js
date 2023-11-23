import { renderBigPicture } from './render-big-picture.js';

const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');

const createImage = (pictureData) => {
  const imageElement = pictureTemplate.cloneNode(true);

  const image = imageElement.querySelector('.picture__img');

  image.src = pictureData.url;
  image.alt = pictureData.description;
  imageElement.querySelector('.picture__likes').textContent = pictureData.likes;
  imageElement.querySelector('.picture__comments').textContent = pictureData.comments.length;

  image.addEventListener('click', () => renderBigPicture(pictureData));

  picturesContainer.appendChild(imageElement);
};

const createImages = (images) => {
  images.forEach((image) => createImage(image));
};

export {createImages};
