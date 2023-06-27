import { similarPhotoPost } from './data.js';

const getRandomPicture = () => {
  const listPhoto = document.querySelector('.pictures');
  const simularPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photoListFragment = document.createDocumentFragment();

  similarPhotoPost.forEach(({ getUrl, description, likes, comments }) => {
    const photoElement = simularPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = getUrl;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__info').querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__info').querySelector('.picture__comments').textContent = comments.length;

    photoListFragment.append(photoElement);
  });


  listPhoto.append(photoListFragment);
};

export { getRandomPicture };

