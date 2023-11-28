import {createImages} from '../posts/render.js';
import {initFilters} from '../filters/set-filter.js';

const ALERT_SHOW_TIME = 5000;

const METHODS = {post: 'POST'};

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');

const processData = (data) => {
  createImages(data);
  initFilters(data);
};

const hideErrorMessage = () => setTimeout(() => document.body.removeChild(dataError), ALERT_SHOW_TIME);

const handleError = () => {
  document.body.insertAdjacentElement('beforeend', dataError);
  hideErrorMessage();
};

const sendData = (url, body, resolve, reject, method = METHODS.post) => fetch(
  url,
  {
    method,
    body
  })
  .then((response) => resolve(response))
  .catch(() => reject());

const getData = (url) => fetch(url)
  .then((response) => response.json())
  .then((data) => processData(data))
  .catch(() => handleError());


export {getData, sendData};
