const getPictureDescription = (id, url, description, likes, comments) => ({
  id: id, url: `photos/${url}.jpg`, description: description, likes: likes, comments: comments
});

const getRandomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

export {getPictureDescription, getRandomInt, getRandomArrayElement};
