const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomArrayEl = (element) => element[getRandomInteger(0, element.length - 1)];

export { getRandomInteger, getRandomArrayEl, isEscapeKey };
