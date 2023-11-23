import {applyFilterDefault, applyFilterRandom, applyFilterDiscussed} from './filters.js';
import {debounce} from '../utils/utils.js';

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const imgFilters = document.querySelector('.img-filters');

let serverImages = [];
let currentImages = [];

const resetFilterButtons = () => {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
};

const setButtonState = (evt) => {
  resetFilterButtons();
  evt.target.classList.add('img-filters__button--active');
};

const onDefaultFilterClick = (evt) => {
  setButtonState(evt);
  applyFilterDefault(serverImages);
};

const onRandomFilterClick = (evt) => {
  setButtonState(evt);
  applyFilterRandom(currentImages);
};

const onDiscussedFilterClick = (evt) => {
  setButtonState(evt);
  applyFilterDiscussed(serverImages);
};

const addFilterListeners = () => {
  filterDefault.addEventListener('click', onDefaultFilterClick);
  filterRandom.addEventListener('click', onRandomFilterClick);
  filterDiscussed.addEventListener('click', onDiscussedFilterClick);
};

const showFilterButtons = () => imgFilters.classList.remove('img-filters--inactive');

const setFilters = (data) => {
  serverImages = data;
  currentImages = serverImages.slice();
  showFilterButtons();
  addFilterListeners();
};

export {setFilters};
