const commentsSentences = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const descriptionSentences = ['Cool!','Amazing!','Wow!','I can\'t believe my eyes','Show me more!','How awful!'];

const names = [
  'Артём','Иван','Илья','Семён','Дмитрий','Василий','Максим','Эмиль','Никита','Артемий','Данил',
  'Даниил','Борис', 'Женя', 'Анна', 'Александра', 'Юля', 'Полина', 'Алёна', 'Кристина',
];

const getPictureDescription = (id, url, description, likes, comments) => ({
  id: id, url: `photos/${url}.jpg`, description: description, likes: likes, comments: comments
});

const getRandomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));

const getComments = () => {
  const commentsCount = getRandomInt(0, 30);

  const comments = [];

  let commentID = 0;

  for (let i = 0; i < commentsCount; i++) {
    commentID += 1;
    const avatar = `img/avatar-${getRandomInt(0, 6)}.svg`;
    const message = commentsSentences[getRandomInt(0, commentsSentences.length - 1)];
    const name = names[getRandomInt(0, names.length - 1)];

    comments.push({id: commentID, avatar: avatar, message: message, name: name});
  }

  return comments;
};

const generateDescriptions = () => {
  const picturesDescriptions = [];

  for (let i = 1; i <= 25; i++) {
    const description = descriptionSentences[getRandomInt(0, descriptionSentences.length - 1)];
    const likes = getRandomInt(15, 200);
    const comments = getComments();
    picturesDescriptions.push(getPictureDescription(i, i, description, likes, comments));
  }

  return picturesDescriptions;
};

generateDescriptions();
