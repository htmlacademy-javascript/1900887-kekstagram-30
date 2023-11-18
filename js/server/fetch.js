const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram/data';

import {uploadImage} from '../form/form.js';
import {createImages} from '../posts/render.js';

const dataErrorTemplate = document.querySelector('#data-error').content;
const dataError = dataErrorTemplate.querySelector('.data-error');

const processData = (data) => {
  createImages(data);
  uploadImage();
};

const hideErrorMessage = () => {
  setTimeout(() => {
    document.body.removeChild(dataError);
  }, 5000);
};

const handleError = () => {
  document.body.insertAdjacentElement('beforeend', dataError);
  hideErrorMessage();
};

const init = () => fetch(SERVER_URL)
  .then((response) => response.json())
  .then((data) => processData(data))
  .catch(() => handleError());

export {init};
