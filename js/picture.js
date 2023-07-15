// import { similarPhotoPost } from './data.js';


const listPhoto = document.querySelector('.pictures');
const simularPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoListFragment = document.createDocumentFragment();

const getPosts = (data) => {
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

fetch ('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    getPosts(data);
  });

  // console.log(listPhoto)

export { listPhoto };
