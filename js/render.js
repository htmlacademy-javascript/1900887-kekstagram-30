import {generateDescriptions} from './posts';

var pictureTemplate = document.querySelector('#picture').content
var pictureText = pictureTemplate.children
var picturesContainer = document.querySelector('.pictures')
var picturesFragment = picturesContainer.createDocumentFragment

const picturesDescriptions = generateDescriptions();

const createPicture = (pictureData) => {
  const pictureElement = pictureTemplate.cloneNode(true)

  let pictureImg = pictureElement.querySelector('a img')
  let pictureLikes = pictureElement.querySelector('a .picture__likes')
  let pictureComments = pictureElement.querySelector('a .picture__comments')

  pictureImg.src = pictureData.url
  pictureImg.alt = pictureData.description
  pictureLikes.textContent = pictureData.likes
  pictureComments.textContent = pictureData.comments.length;

  picturesContainer.appendChild(pictureElement)
};

picturesDescriptions.forEach(picture => {
  createPicture(picture)
});
