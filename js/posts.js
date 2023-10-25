import { getRandomArrayElement, getRandomInt } from './controllers.js';

const COMMENTS_COUNT_MIN = 0;
const COMMENTS_COUNT_MAX = 30;
const POSTS_COUNT = 25;
const LIKES_COUNT_MIN = 15;
const LIKES_COUNT_MAX = 200;
const AVATAR_COUNT_MIN = 0;
const AVATAR_COUNT_MAX = 6;

let commentID = 1;
let postID = 1;

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

const createComment = () => ({
  id: commentID++,
  avatar: `img/avatar-${getRandomInt(AVATAR_COUNT_MIN, AVATAR_COUNT_MAX)}.svg`,
  message: getRandomArrayElement(COMMENTS_SENTENCES),
  name: getRandomArrayElement(NAMES)
});

const createPost = () => ({
  id: postID,
  url: `photos/${postID++}.jpg`,
  description: getRandomArrayElement(DESCRIPTION_SENTENCES),
  likes: getRandomInt(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
  comments: Array.from({length: getRandomInt(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX)}, createComment)
});

const generateDescriptions = () => Array.from({length: POSTS_COUNT}, createPost);

export {generateDescriptions};
