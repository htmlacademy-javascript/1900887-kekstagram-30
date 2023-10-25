import {generateDescriptions} from './posts';

const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');

const picturesDescriptions = generateDescriptions();

const createPicture = (pictureData) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const pictureImg = pictureElement.querySelector('a img');
  const pictureLikes = pictureElement.querySelector('a .picture__likes');
  const pictureComments = pictureElement.querySelector('a .picture__comments');

  // pictureElement.querySelector('a img').src = pictureData.url

  pictureImg.src = pictureData.url;
  pictureImg.alt = pictureData.description;
  pictureLikes.textContent = pictureData.likes;
  pictureComments.textContent = pictureData.comments.length;

  picturesContainer.appendChild(pictureElement);
};

picturesDescriptions.forEach((picture) => {
  createPicture(picture);
});
