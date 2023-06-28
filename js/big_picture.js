import { isEscapeKey } from './util.js';
import {listPhoto} from './picture.js';

const bigPicture = document.querySelector('.big-picture');
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureDiscription = bigPicture.querySelector('.social__caption');
const tagBody = document.querySelector('body');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const openBigPicture = (evt) => {
  evt.preventDefault();
  bigPicture.classList.remove('hidden');
  bigPictureImg.children[0].src = evt.target.src;

  tagBody.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  const likesForPicture = evt.target.parentNode.querySelector('.picture__likes');
  const commentsForPicture = evt.target.parentNode.querySelector('.picture__comments');
  bigPictureLikes.textContent = likesForPicture.textContent;
  bigPictureComments.textContent = commentsForPicture.textContent;
  bigPictureDiscription.textContent = evt.target.alt;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  tagBody.classList.remove('modal-open');
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      bigPicture.classList.add('hidden');
    }
  });
};

listPhoto.addEventListener('click', openBigPicture);

cancelBigPicture.addEventListener('click', closeBigPicture);


