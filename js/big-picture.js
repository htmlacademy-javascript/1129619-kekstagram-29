import { isEscapeKey } from './util.js';
import { listPhoto } from './picture.js';
import { similarPhotoPost } from './data.js';

const QTY_UPLOADED_COMMENTS = 5;
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

// считает количество фотографий, которые уже показаны
const getQtyShowedComments = (commentForPhoto) => {
  const hiddenComments = commentsForPhoto.querySelectorAll('.hidden');
  return commentForPhoto.length - hiddenComments.length;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    tagBody.classList.remove('modal-open');
  }
};

const hideCommentsLoader = (commentsArr) => {
  if (commentsArr.children.length >= bigPictureComments.textContent) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const counterComments = () => {
  let firstShow = 5;

  return () => {
    firstShow += QTY_UPLOADED_COMMENTS;
    return firstShow;
  };
};

const openBigPicture = (evt) => {

  // closest добавить принцип работы???
  const thumbnail = evt.target.closest('[id]');
  if(!thumbnail.id) {
    return;
  }
  // console.log(evt.target);
  console.log(!thumbnail.id);

  evt.preventDefault();

  // if (evt.target.matches('.picture__img')) {

  const likesForPicture = evt.target.parentNode.querySelector('.picture__likes');
  const commentsForPicture = evt.target.parentNode.querySelector('.picture__comments');

  bigPicture.classList.remove('hidden');
  bigPictureImg.src = evt.target.src;

  tagBody.classList.add('modal-open');

  bigPictureLikes.textContent = likesForPicture.textContent;
  bigPictureComments.textContent = commentsForPicture.textContent;
  bigPictureDiscription.textContent = evt.target.alt;

  const topicalId = similarPhotoPost.find((el) => el.id === Number(evt.target.id));
  commentsForPhoto.innerHTML = '';
  getCommentsPost(topicalId.comments.slice(0, QTY_UPLOADED_COMMENTS));

  const getNextNumComments = counterComments();

  const commentForPhoto = document.querySelectorAll('.social__comment');

  const socialCommentsLoader = document.querySelector('.comments-loader');

  socialCommentCount.innerHTML = `${getQtyShowedComments(commentForPhoto)} из ${bigPictureComments.textContent} комментариев`;

  hideCommentsLoader(commentsForPhoto);

  socialCommentsLoader.addEventListener('click', () => {
    commentsForPhoto.innerHTML = '';
    getCommentsPost(topicalId.comments.slice(0, getNextNumComments()));
    socialCommentCount.innerHTML = `${commentsForPhoto.children.length} из ${bigPictureComments.textContent} комментариев`;

    hideCommentsLoader(commentsForPhoto);

  });

  document.addEventListener('keydown', onDocumentKeydown);
  // }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  tagBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

listPhoto.addEventListener('click', openBigPicture);

cancelBigPicture.addEventListener('click', closeBigPicture);

