import { getData } from './api.js';
import { showAlert, sortRandomly, debounce } from './util.js';

const MAX_RANDOM_AMOUNT = 10;
const listPhotoElem = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imgFiltersElem = document.querySelector('.img-filters');
const photoListFragment = document.createDocumentFragment();
const imgFiltersFormElem = document.querySelector('.img-filters__form');
const photoWithData = await getData();
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};
let currentFilter = Filter.DEFAULT;
let pictures = [];

const renderPosts = (data) => {
  if (data) {
    const allPicturesElems = document.querySelectorAll('.picture');
    allPicturesElems.forEach((el) => {
      el.remove();
    });
    data.forEach(({ id, url, description, likes, comments }) => {
      const photoElem = similarPictureTemplate.cloneNode(true);
      const photoImgElem = photoElem.querySelector('.picture__img');
      const photoInfoElem = photoElem.querySelector('.picture__info');
      photoImgElem.id = id;
      photoImgElem.src = url;
      photoImgElem.alt = description;
      photoInfoElem.querySelector('.picture__likes').textContent = likes;
      photoInfoElem.querySelector('.picture__comments').textContent = comments.length;
      photoListFragment.append(photoElem);
    });
    listPhotoElem.append(photoListFragment);
  }
};

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  let data;
  switch (currentFilter) {
    case Filter.RANDOM:
      data = [...pictures].sort(sortRandomly).slice(0, MAX_RANDOM_AMOUNT);
      break;
    case Filter.DISCUSSED:
      data = [...pictures].sort(sortByComments);
      break;
    default:
      data = [...pictures];
  }
  return data;
};

const setOnFilterClick = (callback) => {
  imgFiltersElem.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    imgFiltersFormElem
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback();
  });
};

const init = (loadedPictures, callback) => {
  imgFiltersElem.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(callback);
};

try {
  const debouncedRenderGallery = debounce(() => setOnFilterClick(renderPosts(getFilteredPictures())));
  init(photoWithData, debouncedRenderGallery);
  renderPosts(getFilteredPictures());
} catch (err) {
  showAlert(err.message);
}

export { listPhotoElem, photoWithData };
