const EFFECTS = {
  'none': {style: '', unit: '', min: 0, max: 1, step: 0.1 },
  'chrome': {style: 'grayscale', unit: '', min: 0, max: 1, step: 0.1},
  'sepia': {style: 'sepia', unit: '', min: 0, max: 1, step: 0.1},
  'marvin': {style: 'invert', unit: '%', min: 0, max: 100, step: 1},
  'phobos': {style: 'blur', unit: 'px', min: 0, max: 3, step: 0.1},
  'heat': {style: 'brightness', unit: '', min: 0, max: 3, step: 0.1}
};

const DEFAULT_EFFECT = 'none';

const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');
const effectLevel = document.querySelector('.effect-level');

let currentEffect = '';

const hideSlider = () => effectLevel.classList.add('hidden');

const showSlider = () => effectLevel.classList.remove('hidden');

const onSliderUpdate = () => {
  effectLevelValue.value = Math.abs(slider.noUiSlider.get());
  imagePreview.style.filter = `${currentEffect.style}(${effectLevelValue.value}${currentEffect.unit})`;
};

const createSlider = (effect) => {
  effectLevel.classList.add('hidden');
  noUiSlider.create(slider, {start: effect.max, range: {min: effect.min, max: effect.max}, step: effect.step, connect: 'lower'});
  slider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const isDefault = (effect) => effect === DEFAULT_EFFECT;

const setEffect = (effect) => {
  effectLevel.classList.remove('hidden');
  currentEffect = EFFECTS[effect];
  slider.noUiSlider.updateOptions({
    start: currentEffect.max,
    range: {min: currentEffect.min, max: currentEffect.max},
    step: currentEffect.step,
  });
  imagePreview.style.filter = `${currentEffect.style}(${currentEffect.max}${currentEffect.unit})`;

  showSlider();
};

const resetSlider = () => {
  currentEffect = DEFAULT_EFFECT;
  slider.noUiSlider.reset();
  imagePreview.style.filter = null;
  effectLevelValue.value = '';
  hideSlider();
};

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
  if (isDefault(evt.target.value)) {
    hideSlider();
    imagePreview.style.filter = evt.target.value;
  }
};

const initSlider = () => {
  createSlider(EFFECTS[DEFAULT_EFFECT]);
  effects.addEventListener('change', onEffectChange);
};

export {initSlider, resetSlider};
