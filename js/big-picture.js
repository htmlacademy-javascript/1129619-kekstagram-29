import { isEscapeKey } from './util.js';
import { listPhoto } from './picture.js';
import { commentsFragment } from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureDiscription = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsForPhoto = bigPicture.querySelector('.social__comments');
const tagBody = document.querySelector('body');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  tagBody.classList.remove('modal-open');
};

const openBigPicture = (evt) => {
  evt.preventDefault();

  if (evt.target.matches('.picture__img')) {
    const likesForPicture = evt.target.parentNode.querySelector('.picture__likes');
    const commentsForPicture = evt.target.parentNode.querySelector('.picture__comments');

    bigPicture.classList.remove('hidden');
    bigPictureImg.children[0].src = evt.target.src;

    tagBody.classList.add('modal-open');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    bigPictureLikes.textContent = likesForPicture.textContent;
    bigPictureComments.textContent = commentsForPicture.textContent;
    bigPictureDiscription.textContent = evt.target.alt;

    // Какая то шляпа по добавлению комментариев
    commentsForPhoto.innerHTML = '';
    commentsForPhoto.append(commentsFragment.children[0]);

    document.addEventListener('keydown', (event) => {
      if (isEscapeKey(event)) {
        event.preventDefault();
        closeBigPicture();
      }
    });
  }
};

listPhoto.addEventListener('click', openBigPicture);

cancelBigPicture.addEventListener('click', closeBigPicture);

