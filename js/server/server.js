import {createImages} from '../posts/render.js';
import {initFilters} from '../filters/set-filter.js';

const UPLOAD_SERVER_URL = 'https://30.javascript.pages.academy/kekstagram/';
const FETCH_SERVER_URL = `${UPLOAD_SERVER_URL.slice()}data`;

const ALERT_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content;
const dataError = dataErrorTemplate.querySelector('.data-error');

const processData = (data) => {
  createImages(data);
  initFilters(data);
};

const hideErrorMessage = () => setTimeout(() => document.body.removeChild(dataError), ALERT_SHOW_TIME);

const handleError = () => {
  document.body.insertAdjacentElement('beforeend', dataError);
  hideErrorMessage();
};

const sendData = (body, resolve, reject) => fetch(
  UPLOAD_SERVER_URL,
  {
    method: 'POST',
    body: body
  })
  .then((response) => resolve(response))
  .catch(() => reject());

const getData = () => fetch(FETCH_SERVER_URL)
  .then((response) => response.json())
  .then((data) => processData(data))
  .catch(() => handleError());


export {getData, sendData};
