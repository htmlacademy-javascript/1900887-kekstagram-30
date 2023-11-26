const isEscapeKey = (evt) => evt.key === 'Escape';

const shuffleArray = (elements) => elements.sort(() => Math.random() - 0.5);

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, debounce, shuffleArray};
