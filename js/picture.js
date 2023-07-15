import { getData } from './api.js';
import { showAlert } from './util.js';

const listPhoto = document.querySelector('.pictures');
const simularPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoListFragment = document.createDocumentFragment();

const renderPosts = (data) => {
  data.forEach(({ id, url, description, likes, comments }) => {
    const photoElement = simularPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').id = id;
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__info').querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__info').querySelector('.picture__comments').textContent = comments.length;

    photoListFragment.append(photoElement);
  });
  listPhoto.append(photoListFragment);
};

try {
  const date = await getData();
  renderPosts(date);
} catch (err) {
  showAlert(err.message);
}


export { listPhoto };
