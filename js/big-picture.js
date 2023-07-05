import { isEscapeKey } from './util.js';
import { listPhoto } from './picture.js';
import { similarPhotoPost } from './data.js';

const bigPicture = document.querySelector('.big-picture');
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureDiscription = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsForPhoto = bigPicture.querySelector('.social__comments');
const tagBody = document.querySelector('body');

const getCommentsPost = (commentsArr) => {
  const commentsFragment = document.createDocumentFragment();
  commentsArr.forEach((comment) => {
    const commentConteiner = document.createElement('li');
    const commentСontent = document.createElement('img');
    const socialText = document.createElement('p');

    commentConteiner.classList.add('social__comment');

    commentСontent.classList.add('social__picture');
    commentСontent.src = comment.avatar;
    commentСontent.alt = comment.name;
    commentСontent.width = '35';
    commentСontent.height = '35';

    socialText.classList.add('socialText');
    socialText.textContent = comment.message;

    commentConteiner.append(commentСontent);
    commentConteiner.append(socialText);

    commentsFragment.append(commentConteiner);
  });
  commentsForPhoto.append(commentsFragment);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    tagBody.classList.remove('modal-open');
  }
};

const openBigPicture = (evt) => {
  evt.preventDefault();

  if (evt.target.matches('.picture__img')) {

    const likesForPicture = evt.target.parentNode.querySelector('.picture__likes');
    const commentsForPicture = evt.target.parentNode.querySelector('.picture__comments');

    bigPicture.classList.remove('hidden');
    bigPictureImg.src = evt.target.src;

    tagBody.classList.add('modal-open');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    bigPictureLikes.textContent = likesForPicture.textContent;
    bigPictureComments.textContent = commentsForPicture.textContent;
    bigPictureDiscription.textContent = evt.target.alt;

    const topicalId = similarPhotoPost.find((el) => el.id === Number(evt.target.id));
    commentsForPhoto.innerHTML = '';
    getCommentsPost(topicalId.comments);

    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  tagBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

listPhoto.addEventListener('click', openBigPicture);

cancelBigPicture.addEventListener('click', closeBigPicture);

