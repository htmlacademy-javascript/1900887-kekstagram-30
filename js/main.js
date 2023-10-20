const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;
const AVATAR_NUMBER_MIN = 0;
const AVATAR_NUMBER_MAX = 6;
const POSTS_COUNT = 25;


const COMMENTS_SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION_SENTENCES = ['Cool!','Amazing!','Wow!','I can\'t believe my eyes','Show me more!','How awful!'];

const NAMES = [
  'Артём','Иван','Илья','Семён','Дмитрий','Василий','Максим','Эмиль','Никита','Артемий','Данил',
  'Даниил','Борис', 'Женя', 'Анна', 'Александра', 'Юля', 'Полина', 'Алёна', 'Кристина',
];


const getPictureDescription = (id, url, description, likes, comments) => ({
  id: id, url: `photos/${url}.jpg`, description: description, likes: likes, comments: comments
});

const getRandomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length-1)]

let commentID = 0;
const getComments = () => {
  const commentsCount = getRandomInt(COMMENTS_MIN, COMMENTS_MAX);


  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    commentID += 1;
    const avatar = `img/avatar-${getRandomInt(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX)}.svg`;
    const message = getRandomArrayElement(COMMENTS_SENTENCES);
    const name = getRandomArrayElement(NAMES);

    comments.push({id: commentID, avatar: avatar, message: message, name: name});
  }

  return comments;
};

const generateDescriptions = () => {
  const picturesDescriptions = [];

  for (let i = 1; i <= POSTS_COUNT; i++) {
    const description = getRandomArrayElement(DESCRIPTION_SENTENCES);
    const likes = getRandomInt(LIKES_MIN, LIKES_MAX);
    const comments = getComments();
    picturesDescriptions.push(getPictureDescription(i, i, description, likes, comments));
  }

  return picturesDescriptions;
};


console.log(generateDescriptions())
