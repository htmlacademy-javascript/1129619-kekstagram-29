import { isEscapeKey } from './util.js';
import { listPhotoElem, photoWithData } from './picture.js';

const QTY_UPLOADED_COMMENTS = 5;
const bigPictureElem = document.querySelector('.big-picture');
const cancelBigPictureElem = bigPictureElem.querySelector('.big-picture__cancel');
const bigPictureImgElem = bigPictureElem.querySelector('.big-picture__img img');
const bigPictureLikesElem = bigPictureElem.querySelector('.likes-count');
const bigPictureCommentsElem = bigPictureElem.querySelector('.comments-count');
const bigPictureDiscriptionElem = bigPictureElem.querySelector('.social__caption');
const socialCommentCountElem = bigPictureElem.querySelector('.social__comment-count');
const commentsLoaderElem = bigPictureElem.querySelector('.comments-loader');
const commentsForPhotoElem = bigPictureElem.querySelector('.social__comments');
const tagBodyElem = document.querySelector('body');

const getCommentsPost = (commentsArr) => {
  const commentsFragment = document.createDocumentFragment();
  commentsArr.forEach((comment) => {
    const commentContainer = document.createElement('li');
    const commentContent = document.createElement('img');
    const socialText = document.createElement('p');

    commentContainer.classList.add('social__comment');

    commentContent.classList.add('social__picture');
    commentContent.src = comment.avatar;
    commentContent.alt = comment.name;
    commentContent.width = '35';
    commentContent.height = '35';

    socialText.classList.add('social__text');
    socialText.textContent = comment.message;

    commentContainer.append(commentContent);
    commentContainer.append(socialText);

    commentsFragment.append(commentContainer);

  });
  commentsForPhotoElem.append(commentsFragment);
};

const getQtyShowedComments = (commentForPhoto) => {
  const hiddenComments = commentsForPhotoElem.querySelectorAll('.hidden');
  return commentForPhoto.length - hiddenComments.length;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElem.classList.add('hidden');
    tagBodyElem.classList.remove('modal-open');
  }
};

const hideCommentsLoader = (commentsArr) => {
  if (commentsArr.children.length >= bigPictureCommentsElem.textContent) {
    commentsLoaderElem.classList.add('hidden');
  } else {
    commentsLoaderElem.classList.remove('hidden');
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
  if (evt.target.matches('.picture__img')) {

    evt.preventDefault();
    const likesForPicture = evt.target.parentNode.querySelector('.picture__likes');
    const commentsForPicture = evt.target.parentNode.querySelector('.picture__comments');
    const topicalId = photoWithData.find((el) => el.id === Number(evt.target.id));


    const getNextNumComments = counterComments();

    const onlLoadComments = () => {
      commentsForPhotoElem.innerHTML = '';
      getCommentsPost(topicalId.comments.slice(0, getNextNumComments()));
      socialCommentCountElem.innerHTML = `${commentsForPhotoElem.children.length} из ${bigPictureCommentsElem.textContent} комментариев`;

      hideCommentsLoader(commentsForPhotoElem);

    };

    commentsForPhotoElem.innerHTML = '';
    getCommentsPost(topicalId.comments.slice(0, 5));

    bigPictureElem.classList.remove('hidden');
    bigPictureImgElem.src = `photos/${(Number(evt.target.id) + 1)}.jpg`;

    tagBodyElem.classList.add('modal-open');

    bigPictureLikesElem.textContent = likesForPicture.textContent;
    bigPictureCommentsElem.textContent = commentsForPicture.textContent;
    bigPictureDiscriptionElem.textContent = evt.target.alt;

    const commentForPhoto = document.querySelectorAll('.social__comment');

    const socialCommentsLoader = document.querySelector('.comments-loader');

    socialCommentCountElem.innerHTML = `${getQtyShowedComments(commentForPhoto)} из <span class="comments-count">${bigPictureCommentsElem.textContent}</span> комментариев`;

    hideCommentsLoader(commentsForPhotoElem);

    socialCommentsLoader.addEventListener('click', onlLoadComments);

    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const closeBigPicture = () => {
  bigPictureElem.classList.add('hidden');
  tagBodyElem.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

listPhotoElem.addEventListener('click', openBigPicture);
cancelBigPictureElem.addEventListener('click', closeBigPicture);

