const SubmitButtonText = {
  SUBMITTING: 'Отправка...',
  IDLE: 'ОПУБЛИКОВАТЬ',
};

const MAX_COUNT_HASHTAG = 5;
const VALUE_STEP = 25;
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');

const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const submitButton = document.querySelector('.img-upload__submit');

const regular = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const regForRepeat = /\b(\w+)\b(?=.*\b\1\b)/gi;

const prestine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
});

const cheskValidHashtag = () => {
  const hashtagArr = textHashtags.value.split(' ');
  let isValid;
  hashtagArr.forEach((hashtag) => {
    isValid = (regular.test(hashtag));
  });
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

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? SubmitButtonText.SUBMITTING
    : SubmitButtonText.IDLE;
};

scaleControlSmaller.addEventListener('click', () => {
  const presentValue = Number(scaleControlValue.value.slice(0, -1));
  if (presentValue > VALUE_STEP) {
    scaleControlValue.value = (`${presentValue - VALUE_STEP }%`);
    imgUploadPreview.style.transform = `scale(${((presentValue - VALUE_STEP) / 100)})`;
  }
});

scaleControlBigger.addEventListener('click', () => {
  const presentValue = Number(scaleControlValue.value.slice(0, -1));
  if (presentValue < 100) {
    scaleControlValue.value = (`${presentValue + 25 }%`);
    imgUploadPreview.style.transform = `scale(${((presentValue + VALUE_STEP) / 100)})`;
  }
});


prestine.addValidator(textHashtags, cheskValidHashtag, 'Введён невалидный хэш-тег');
prestine.addValidator(textHashtags, checkCountHashtag, 'Превышено количество хэш-тегов');
prestine.addValidator(textHashtags, checkRepeatingGashtag, 'Хэш-теги повторяются');


const setOnFormSubmit = (callback) => {
  imgUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = prestine.validate();
    if(isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(imgUploadForm));
      toggleSubmitButton();
    }
  });
};


export { prestine, setOnFormSubmit };
