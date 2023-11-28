import {createImages} from '../posts/render.js';
import {shuffleArray} from '../utils/utils.js';

const MAX_RANDOM_COUNT = 10;

const sortDiscussed = (images) => images.slice().sort((current, next) => next.comments.length - current.comments.length);

const clearPicturesContainer = () => document.querySelectorAll('.picture').forEach((element) => element.remove());

const applyFilterDefault = (images) => createImages(images);

const applyFilterRandom = (images) => createImages(shuffleArray(images).slice(0, MAX_RANDOM_COUNT));

const applyFilterDiscussed = (images) => createImages(sortDiscussed(images));

export {applyFilterRandom, applyFilterDefault, applyFilterDiscussed, clearPicturesContainer};
