import {getData} from './server/server.js';
import {uploadImage} from './form/form.js';

const FETCH_SERVER_URL = 'https://30.javascript.pages.academy/kekstagram/data';

getData(FETCH_SERVER_URL);
uploadImage();
