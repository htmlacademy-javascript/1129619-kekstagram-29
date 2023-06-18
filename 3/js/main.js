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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayEl = (element) => element[getRandomInteger(0, element.length - 1)];

function createIdFromRangeGenerator(min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const createMessage = () => {
  const messageCount = getRandomInteger(1, 2);
  const message = [];

  for (let i = 1; i <= messageCount; i++) {
    message.push(getRandomArrayEl(COMMENTS));
  }

  return message;
};

const getIdAutorPost = createIdFromRangeGenerator(1, 25);
const getIdAutorComment = createIdFromRangeGenerator(1, 25);
const getUrl = createIdFromRangeGenerator(0, 25);

const createComment = () => ({
  id: getIdAutorComment(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(),
  name: getRandomArrayEl(NAME),
});

const similarComments = Array.from({ length: getRandomInteger(0, 30) }, createComment);

const createPhotoPost = () => ({
  id: getIdAutorPost(),
  url: `photos/${getUrl()}.jpg`,
  description: getRandomArrayEl(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: similarComments,
});

const similarPhotoPost = Array.from({ length: 25 }, createPhotoPost);

similarPhotoPost();

