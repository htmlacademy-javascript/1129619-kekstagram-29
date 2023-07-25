import { showSuccessMessage, showErrorMessage } from './message.js';
import { sendData } from './api.js';
import { onCloseForm } from './photo-filter.js';

const MAX_COUNT_HASHTAG = 5;
const VALUE_STEP = 25;
const MAXIMUM_COMMENT_LENGTH = 140;

const SubmitButtonText = {
  SUBMITTING: 'Отправка...',
  IDLE: 'ОПУБЛИКОВАТЬ',
};

const imgUploadFormElem = document.querySelector('.img-upload__form');
const textHashtagsElem = document.querySelector('.text__hashtags');
const textDescriptionElem = document.querySelector('.text__description');
const scaleControlValueElem = document.querySelector('.scale__control--value');
const scaleControlSmallerElem = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElem = document.querySelector('.scale__control--bigger');
const imgUploadPreviewElem = document.querySelector('.img-upload__preview img');
const submitButtonElem = document.querySelector('.img-upload__submit');

const regValid = /^#[a-zа-яë0-9]{1,19}$/i;
const regForRepeat = /\b(\w+)\b(?=.*\b\1\b)/gi;

const pristine = new Pristine(imgUploadFormElem, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
});

const toggleSubmitButton = (isDisabled) => {
  submitButtonElem.disabled = isDisabled;
  submitButtonElem.textContent = isDisabled
    ? SubmitButtonText.SUBMITTING
    : SubmitButtonText.IDLE;
};

const checkValidHashtag = () => {
  const hashtagArr = textHashtagsElem.value.trim().split(' ');
  let isValid;
  if (textHashtagsElem.value === '') {
    isValid = true;
  } else {
    hashtagArr.forEach((hashtag) => {
      isValid = (regValid.test(hashtag));
    });
  }
  return isValid;
};

const checkCountHashtag = () => {
  let hashtagArr = textHashtagsElem.value.trim().split(' ');
  hashtagArr = hashtagArr.filter((el) => (el !== null && el !== '' || el === 0));
  return (hashtagArr.length <= MAX_COUNT_HASHTAG);
};

const checkRepeatingHashtag = () => {
  const repeatedWords = textHashtagsElem.value.match(regForRepeat);
  return !repeatedWords;
};

const checkLightDescription = () => {
  if (textDescriptionElem.value.length <= MAXIMUM_COMMENT_LENGTH) {
    return true;
  }
};

const onMinValueToggle = () => {
  const presentValue = Number(scaleControlValueElem.value.slice(0, -1));
  if (presentValue > VALUE_STEP) {
    scaleControlValueElem.value = (`${presentValue - VALUE_STEP}%`);
    imgUploadPreviewElem.style.transform = `scale(${((presentValue - VALUE_STEP) / 100)})`;
  }
};

const onMaxValueToggle = () => {
  const presentValue = Number(scaleControlValueElem.value.slice(0, -1));
  if (presentValue < 100) {
    scaleControlValueElem.value = (`${presentValue + 25}%`);
    imgUploadPreviewElem.style.transform = `scale(${((presentValue + VALUE_STEP) / 100)})`;
  }
};

const setOnFormSubmit = (callback) => {
  imgUploadFormElem.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(imgUploadFormElem));
      toggleSubmitButton();
    }
  });
};

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    onCloseForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

pristine.addValidator(textHashtagsElem, checkValidHashtag, 'Введён невалидный хэш-тег');
pristine.addValidator(textHashtagsElem, checkCountHashtag, 'Превышено количество хэш-тегов');
pristine.addValidator(textHashtagsElem, checkRepeatingHashtag, 'Хэш-теги повторяются');
pristine.addValidator(textDescriptionElem, checkLightDescription, 'Максимальная длина комментария 140 символов');


scaleControlSmallerElem.addEventListener('click', onMinValueToggle);
scaleControlBiggerElem.addEventListener('click', onMaxValueToggle);

export { pristine };
