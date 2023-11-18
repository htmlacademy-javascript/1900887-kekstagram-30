const MIN_SCALE = 25;
const SCALE_STEP = 25;
const MAX_SCALE = 100;

const scaleButtonSmaller = document.querySelector('.scale__control--smaller');
const scaleButtonBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

let currentScale = MAX_SCALE;
const onScaleSmallerBtnClick = () => {
  currentScale = Math.max(currentScale - SCALE_STEP, MIN_SCALE);
  scaleControlValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / 100})`;
};
const onScaleBiggerBtnClick = () => {
  currentScale = Math.min(currentScale + SCALE_STEP, MAX_SCALE);
  scaleControlValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / 100})`;
};

const scalePreview = () => {
  scaleButtonSmaller.addEventListener('click', onScaleSmallerBtnClick);
  scaleButtonBigger.addEventListener('click', onScaleBiggerBtnClick);
};


export {scalePreview};
