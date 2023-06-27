import { similarPhotoPost } from './data.js';

const getRandomPicture = () => {
  const listPhoto = document.querySelector('.pictures');
  const simularPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photoListFragment = document.createDocumentFragment();

  similarPhotoPost.forEach((photo) => {
    const photoElement = simularPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.getUrlurl;
    photoElement.querySelector('.picture__img').alt = photo.description;
    photoElement.querySelector('.picture__info').querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__info').querySelector('.picture__comments').textContent = photo.comments.length;

    photoListFragment.append(photoElement);
  });


  listPhoto.append(photoListFragment);
};

export { getRandomPicture };

