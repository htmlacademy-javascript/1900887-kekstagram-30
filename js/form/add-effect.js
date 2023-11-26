const EFFECTS = {
  'none': {style: '', unit: '', min: 0, max: 1, step: 0.1 },
  'chrome': {style: 'grayscale', unit: '', min: 0, max: 1, step: 0.1},
  'sepia': {style: 'sepia', unit: '',min: 0, max: 1,step: 0.1},
  'marvin': {style: 'invert', unit: '%', min: 0, max: 100, step: 1},
  'phobos': {style: 'blur', unit: 'px', min: 0, max: 3, step: 0.1},
  'heat': {style: 'brightness', unit: '', min: 0, max: 3, step: 0.1}
};

const slider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');

let currentEffect = '';

const hideSlider = () => slider.classList.add('hidden');

const showSlider = () => slider.classList.remove('hidden');

const onSliderUpdate = () => {
  effectLevel.value = slider.noUiSlider.get();
  imagePreview.style.filter = `${currentEffect.style}(${effectLevel.value}${currentEffect.unit})`;
};

const createSlider = (effect) => {
  noUiSlider.create(slider, {start: effect.max, range: {min: effect.min, max: effect.max}, step: effect.step, connect: 'lower'});
  slider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const resetSlider = () => slider.noUiSlider.reset();

const isDefault = (effect) => effect === 'none';

const setEffect = (effect) => {
  currentEffect = EFFECTS[effect];
  slider.noUiSlider.updateOptions({
    start: currentEffect.max,
    range: {min: currentEffect.min, max: currentEffect.max},
    step: currentEffect.step,
  });
  imagePreview.style.filter = `${currentEffect.style}(${currentEffect.max}${currentEffect.unit})`;

  showSlider();
};

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
  if (isDefault(evt.target.value)) {
    hideSlider();
    imagePreview.style.filter = evt.target.value;
  }
};

const initSlider = () => {
  createSlider(EFFECTS['none']);
  effects.addEventListener('change', onEffectChange);
};

export {initSlider, resetSlider};
