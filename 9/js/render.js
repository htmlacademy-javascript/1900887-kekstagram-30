import { generateDescriptions } from './posts.js';
import { renderBigPicture } from './render-big-picture.js';

const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');

const picturesDescriptions = generateDescriptions();

const createPicture = (pictureData) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const pictureImg = pictureElement.querySelector('.picture__img');

  pictureImg.src = pictureData.url;
  pictureImg.alt = pictureData.description;
  pictureElement.querySelector('.picture__likes').textContent = pictureData.likes;
  pictureElement.querySelector('.picture__comments').textContent = pictureData.comments.length;

  pictureImg.addEventListener('click', () => renderBigPicture(pictureData));

  picturesContainer.appendChild(pictureElement);
};

const createPictures = () => {
  picturesDescriptions.forEach((picture) => createPicture(picture));
};

export {createPictures};
