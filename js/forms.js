import { isEscapeKey } from './util.js';

const buttonUploadFile = document.getElementById('upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const imgUploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const regular = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const regex = /\b(\w+)\b(?=.*\b\1\b)/gi;

const prestine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
});

buttonUploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
});

const onCloseForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onPopupEscPress = function (evt) {
  if (!(textHashtags === document.activeElement) || !(textDescription === document.activeElement)) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onCloseForm();
    }
  }
};

const cheskValidHashtag = () => {
  const hashtagArr = textHashtags.value.split(' ');
  hashtagArr.forEach((hashtag) => {
    const testOfValid = (regular.test(hashtag));
    return testOfValid;
  });
};

const checkCountHashtag = () => {
  const hashtagArr = textHashtags.value.split(' ');
  return (hashtagArr.length <= 5);
};

const checkRepeatingGashtag = () => {
  const repeatedWords = textHashtags.value.match(regex);
  return !repeatedWords;
};

prestine.addValidator(textHashtags, cheskValidHashtag, 'Введён невалидный хэш-тег');
prestine.addValidator(textHashtags, checkCountHashtag, 'Превышено количество хэш-тегов');
prestine.addValidator(textHashtags, checkRepeatingGashtag, 'Хэш-теги повторяются');


imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  prestine.validate();
});

imgUploadCancel.addEventListener('click', onCloseForm);
document.addEventListener('keydown', onPopupEscPress);
