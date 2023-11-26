import {applyFilterDefault, applyFilterRandom, applyFilterDiscussed, clearPicturesContainer} from './filters.js';
import {debounce} from '../utils/utils.js';

const filterButtons = document.querySelectorAll('.img-filters__button');
const imgFilters = document.querySelector('.img-filters');

let serverImages = [];
let currentImages = [];


const resetFilterButtons = () => filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));

const setButtonState = (button) => {
  resetFilterButtons();
  button.classList.add('img-filters__button--active');
};

const applyFilter = (button) => {
  setButtonState(button);
  clearPicturesContainer();
  switch (button.id) {
    case 'filter-default':
      applyFilterDefault(serverImages);
      break;
    case 'filter-random':
      applyFilterRandom(currentImages);
      break;
    case 'filter-discussed':
      applyFilterDiscussed(serverImages);
  }
};

const onFilterButtonClick = (evt) => applyFilter(evt.target);

const setFilter = debounce((evt) => onFilterButtonClick(evt));

const addClickListener = (button) => button.addEventListener('click', setFilter);

const addFilterListeners = () => filterButtons.forEach((button) => addClickListener(button));

const showFilterButtons = () => imgFilters.classList.remove('img-filters--inactive');

const initFilters = (data) => {
  serverImages = data;
  currentImages = serverImages.slice();
  showFilterButtons();
  addFilterListeners();
};

export {initFilters};
