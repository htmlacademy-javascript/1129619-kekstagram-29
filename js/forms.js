import { showSuccessMessage, showErrorMessage } from './message.js';
import { sendData } from './api.js';
import { onCloseForm } from './photo-filter.js';

const SubmitButtonText = {
  SUBMITTING: 'Отправка...',
  IDLE: 'ОПУБЛИКОВАТЬ',
};

const MAX_COUNT_HASHTAG = 5;
const VALUE_STEP = 25;
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const submitButton = document.querySelector('.img-upload__submit');

const regular = /^#[a-zа-яë0-9]{1,19}$/i;
const regForRepeat = /\b(\w+)\b(?=.*\b\1\b)/gi;

const prestine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
});

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? SubmitButtonText.SUBMITTING
    : SubmitButtonText.IDLE;
};

const cheskValidHashtag = () => {
  const hashtagArr = textHashtags.value.split(' ');
  let isValid;
  if (textHashtags.value === '') {
    isValid = true;
  } else {
    hashtagArr.forEach((hashtag) => {
      isValid = (regular.test(hashtag));
    });
  }
  return isValid;
};

const checkCountHashtag = () => {
  const hashtagArr = textHashtags.value.split(' ');
  return (hashtagArr.length <= MAX_COUNT_HASHTAG);
};

const checkRepeatingGashtag = () => {
  const repeatedWords = textHashtags.value.match(regForRepeat);
  return !repeatedWords;
};

const lightDescription = () => {
  if(textDescription.value.length <= 140) {
    return true;
  }
};

scaleControlSmaller.addEventListener('click', () => {
  const presentValue = Number(scaleControlValue.value.slice(0, -1));
  if (presentValue > VALUE_STEP) {
    scaleControlValue.value = (`${presentValue - VALUE_STEP}%`);
    imgUploadPreview.style.transform = `scale(${((presentValue - VALUE_STEP) / 100)})`;
  }
});

scaleControlBigger.addEventListener('click', () => {
  const presentValue = Number(scaleControlValue.value.slice(0, -1));
  if (presentValue < 100) {
    scaleControlValue.value = (`${presentValue + 25}%`);
    imgUploadPreview.style.transform = `scale(${((presentValue + VALUE_STEP) / 100)})`;
  }
});


prestine.addValidator(textHashtags, cheskValidHashtag, 'Введён невалидный хэш-тег');
prestine.addValidator(textHashtags, checkCountHashtag, 'Превышено количество хэш-тегов');
prestine.addValidator(textHashtags, checkRepeatingGashtag, 'Хэш-теги повторяются');
prestine.addValidator(textDescription, lightDescription, 'Максимальная длина комментария 140 символов');

const setOnFormSubmit = (callback) => {
  imgUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = prestine.validate();
    if (isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(imgUploadForm));
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

export { prestine };
