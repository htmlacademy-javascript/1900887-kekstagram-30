import {createImages} from '../posts/render.js';
import {initFilters} from '../filters/set-filter.js';

const ALERT_SHOW_TIME = 5000;

const METHODS = {post: 'POST'};

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

const sendData = (url, body, resolve, reject) => fetch(
  url,
  {
    method: METHODS.post,
    body: body
  })
  .then((response) => resolve(response))
  .catch(() => reject());

const getData = (url) => fetch(url)
  .then((response) => response.json())
  .then((data) => processData(data))
  .catch(() => handleError());


export {getData, sendData};
