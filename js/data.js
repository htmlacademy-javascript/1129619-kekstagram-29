import { getRandomInteger, getRandomArrayEl } from './util.js';

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

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Id = {
  START: 1,
  END: 25,
};

const Offers = {
  MIN_COUNT: 1,
  MAX_COUNT: 2,
};

const Comments = {
  MIN_QTY: 0,
  MAX_QTY: 30,
};

const Avatars = {
  MIN_VALUE: 0,
  MAX_VALUE: 6,
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {

    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getIdAutorPost = createIdGenerator();
const getIdComments = createIdGenerator();
const getUrl = () => `photos/${getRandomInteger(Id.START, Id.END)}.jpg`;


const getAvatar = () => `img/avatar-${getRandomInteger(Avatars.MIN_VALUE, Avatars.MAX_VALUE)}.svg`;

const createMessage = () => {
  const messageCount = getRandomInteger(Offers.MIN_COUNT, Offers.MAX_COUNT);
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
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: Array.from({ length: getRandomInteger(Comments.MIN_QTY, Comments.MAX_QTY) }, createComment),
});

const similarPhotoPost = Array.from({ length: Id.END }, createPhotoPost);

export {similarPhotoPost};
