const Effects = {
  default: 'none',
  chrome: 'chrome',
  sepia: 'sepia',
  marvin: 'marvin',
  phobos: 'phobos',
  heat: 'heat'
};

const filterEffect = {
  [Effects.chrome]: {
    style: 'grayscale',
    unit: ''
  },
  [Effects.sepia]: {
    style: 'sepia',
    unit: ''
  },
  [Effects.marvin]: {
    style: 'invert',
    unit: '%'
  },
  [Effects.phobos]: {
    style: 'blur',
    unit: 'px'
  },
  [Effects.heat]: {
    style:'brightness',
    unit: ''
  }
};

const sliderOptions = {
  [Effects.default]: {
    min:0,
    max: 100,
    step: 1
  },
  [Effects.chrome]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effects.sepia]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effects.marvin]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effects.phobos]: {
    min: 0,
    max: 3,
    step: 0.1
  },
  [Effects.heat]: {
    min: 0,
    max: 3,
    step: 0.1
  }
};

const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');

let currentEffect = Effects.default;
const idDefault = () => currentEffect === Effects.default;
const setImageStyle = () => {
  if (idDefault()) {
    imagePreview.style.filter = null;
    return;
  }
  const { value } = effectLevel;
  const { style, unit } = filterEffect[currentEffect];
  imagePreview.style.filter = `${style}(${value}${unit})`;
};
const hideSlider = () => sliderContainer.classList.add('hidden');
const showSlider = () => sliderContainer.classList.remove('hidden');
const onSliderUpdate = () => {
  effectLevel.value = slider.noUiSlider.get();
  setImageStyle();
};
const createSlider = ({min, max, step}) => {
  noUiSlider.create(slider, {
    range: {min, max},
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value)
    }
  });
  slider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({min, max, step}) => {
  slider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max
  });
};

const setSlider = () => {
  if (idDefault()) {
    hideSlider();
  } else {
    updateSlider(sliderOptions[currentEffect]);
    showSlider();
  }
};
const setEffect = (effect) => {
  currentEffect = effect;
  setSlider();
  setImageStyle();
};
const resetSlider = () => setEffect(Effects.default);
const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};
const initSlider = () => {
  createSlider(sliderOptions[currentEffect]);
  effects.addEventListener('change', onEffectsChange);
};

export {initSlider, resetSlider};

// const slider = document.querySelector('.effect-level__slider');
// const sliderContainer = document.querySelector('.img-upload__effect-level');
// const effectOriginal = document.querySelector('.effects__preview--none');
// const effectChrome = document.querySelector('.effects__preview--chrome');
// const effectSepia = document.querySelector('.effects__preview--sepia');
// const effectMarvin = document.querySelector('.effects__preview--marvin');
// const effectPhobos = document.querySelector('.effects__preview--phobos');
// const effectHeat = document.querySelector('.effects__preview--heat');
// const imagePreview = document.querySelector('.img-upload__preview img');
//
// const resetSlider = () => {
//   imagePreview.style.filter = '';
//   slider.noUiSlider.destroy();
// };
// const createSlider = () => noUiSlider.create(slider, {range: {min: 0,max: 100}, connect: 'lower', start: 10});
// const hideSlider = () => sliderContainer.classList.add('hidden');
// const showSlider = () => sliderContainer.classList.remove('hidden');
// const onOriginalEffectClick = () => {
//   resetSlider();
//   hideSlider();
// };
//
// const setSlider = (effect, unit) => {
//   slider.noUiSlider.on('update', () => {
//     imagePreview.style.filter = `${effect}(${slider.noUiSlider.get()}${unit})`;
//   });
//   showSlider();
// };
// const onChromeEffectClick = () => {
//   slider.noUiSlider.updateOptions({range: {min: 0,max: 1}, start: 1, step: 0.1});
//   setSlider('grayscale', '');
// };
// const onSepiaEffectClick = () => {
//   slider.noUiSlider.updateOptions({range: {min: 0,max: 1}, start: 1, step: 0.1});
//   setSlider('sepia', '');
// };
// const onMarvinEffectClick = () => {
//   slider.noUiSlider.updateOptions({range: {min: 0,max: 100}, start: 100, step: 1});
//   setSlider('invert', '%');
// };
// const onPhobosEffectClick = () => {
//   slider.noUiSlider.updateOptions({range: {min: 0,max: 3}, start: 3, step: 0.1});
//   setSlider('blur', 'px');
// };
// const onHeatEffectClick = () => {
//   slider.noUiSlider.updateOptions({range: {min: 0,max: 3}, start: 3, step: 0.1});
//   setSlider('brightness', '');
// };
//
// const addEffectListeners = () => {
//   effectOriginal.addEventListener('click', onOriginalEffectClick);
//   effectChrome.addEventListener('click', onChromeEffectClick);
//   effectSepia.addEventListener('click', onSepiaEffectClick);
//   effectMarvin.addEventListener('click', onMarvinEffectClick);
//   effectHeat.addEventListener('click', onHeatEffectClick);
//   effectPhobos.addEventListener('click', onPhobosEffectClick);
// };
// const setEffects = () => {
//   createSlider();
//   hideSlider();
//   addEffectListeners();
// };
//
// export {setEffects, resetSlider};
