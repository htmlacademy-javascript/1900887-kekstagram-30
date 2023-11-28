import {applyFilterDefault, applyFilterRandom, applyFilterDiscussed, clearPicturesContainer} from './filters.js';
import {debounce} from '../utils/utils.js';

const filterButtons = document.querySelectorAll('.img-filters__button');
const imgFilters = document.querySelector('.img-filters');

let serverImages = [];
let currentImages = [];

const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';

const setButtonState = (button) => {
  if (!button.classList.contains('.img-filters__button--active')) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
  }
};

const getFilter = (filter) => {
  switch (filter) {
    default:
      applyFilterDefault(serverImages);
      break;
    case FILTER_RANDOM:
      applyFilterRandom(currentImages);
      break;
    case FILTER_DISCUSSED:
      applyFilterDiscussed(serverImages);
  }
};


const applyFilter = (button) => {
  clearPicturesContainer();
  getFilter(button.id);
};

const setFilter = debounce((target) => applyFilter(target));

const onFilterButtonClick = (evt) => {
  setButtonState(evt.target);
  setFilter(evt.target);
};

const addClickListener = (button) => button.addEventListener('click', onFilterButtonClick);

const addFilterListeners = () => filterButtons.forEach((button) => addClickListener(button));

const showFilterButtons = () => imgFilters.classList.remove('img-filters--inactive');

const initFilters = (data) => {
  serverImages = data;
  currentImages = serverImages.slice();
  showFilterButtons();
  addFilterListeners();
};

export {initFilters};
