const MIN_SCALE = 25;
const SCALE_STEP = 25;
const MAX_SCALE = 100;
const DIVIDER = 100;

const scaleButtonSmaller = document.querySelector('.scale__control--smaller');
const scaleButtonBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

let currentScale = MAX_SCALE;

const changeScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / DIVIDERw})`;
};
const onScaleSmallerBtnClick = () => {
  currentScale = Math.max(currentScale - SCALE_STEP, MIN_SCALE);
  changeScale();
};
const onScaleBiggerBtnClick = () => {
  currentScale = Math.min(currentScale + SCALE_STEP, MAX_SCALE);
  changeScale();
};

const resetImageScale = () => {
  currentScale = MAX_SCALE;
  changeScale();
};

const scalePreview = () => {
  scaleButtonSmaller.addEventListener('click', onScaleSmallerBtnClick);
  scaleButtonBigger.addEventListener('click', onScaleBiggerBtnClick);
};

export {scalePreview, resetImageScale};
