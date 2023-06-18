const NAME = [
  'Артем',
  'Михаил',
  'Евгений',
  'Петр',
  'Слава',
  'Анатолий',
  'Ольга',
  'Марина',
  'Евгения',
  'Артур',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION = [
  'Мое лучшее фото',
  'Сделал фото сегодня утром',
  'Опробовал новую камеру',
  'Смотрите какая красота',
  'Оцените лайком',
  'За подписку буду выкладывать посты чаще',
];

const MIN_LIKES = 15;

const MAX_LIKES = 200;

const START_ID = 1;

const END_ID = 25;

const MIN_COUNT_OFFERS = 1;

const MAX_COUNT_OFFERS = 2;

const QTY_POSTS = 25;

const MIN_QTY_COMMENTS = 0;

const MAX_QTY_COMMENTS = 30;

const MIN_VALUE_AVATAR = 0;

const MAX_VALUE_AVATAR = 6;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayEl = (element) => element[getRandomInteger(0, element.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {

    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getIdAutorPost = createIdGenerator();
const getIdComments = createIdGenerator();
const getUrl = () => `photos/${getRandomInteger(START_ID, END_ID)}.jpg`;


const getAvatar = () => `img/avatar-${getRandomInteger(MIN_VALUE_AVATAR, MAX_VALUE_AVATAR)}.svg`;

const createMessage = () => {
  const messageCount = getRandomInteger(MIN_COUNT_OFFERS, MAX_COUNT_OFFERS);
  const message = [];

  for (let i = 1; i <= messageCount; i++) {
    message.push(getRandomArrayEl(COMMENTS));
  }

  return message.join('. ');
};

const createComment = () => ({
  id: getIdComments(),
  avatar: getAvatar(),
  message: createMessage(),
  name: getRandomArrayEl(NAME),
});

const createPhotoPost = () => ({
  id: getIdAutorPost(),
  getUrlurl: getUrl(),
  description: getRandomArrayEl(DESCRIPTION),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({ length: getRandomInteger(MIN_QTY_COMMENTS, MAX_QTY_COMMENTS) }, createComment),
});

const similarPhotoPost = Array.from({ length: QTY_POSTS }, createPhotoPost);

similarPhotoPost();
