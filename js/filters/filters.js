import {createImages} from '../posts/render.js';
import {getRandomArrayElement} from '../utils/utils.js';

const MIN_RANDOM_COUNT = 0;
const MAX_RANDOM_COUNT = 10;

const sortDiscussed = (images) => images.slice().sort((current, next) => current.comments.length < next.comments.length);

const clearPicturesContainer = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((element) => element.remove());
};

const applyFilterDefault = (images) => {
  clearPicturesContainer();
  createImages(images);
};

const applyFilterRandom = (images) => {
  const randomImageSet = new Set(Array.from({length: images.length}, () => getRandomArrayElement(images)));
  const filteredImages = Array.from(randomImageSet.values()).slice(MIN_RANDOM_COUNT, MAX_RANDOM_COUNT);
  clearPicturesContainer();
  createImages(filteredImages);
};

const applyFilterDiscussed = (images) => {
  clearPicturesContainer();
  createImages(sortDiscussed(images));
};

export {applyFilterRandom, applyFilterDefault, applyFilterDiscussed};
