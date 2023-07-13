const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');

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
  return (hashtagArr.length <= 5);
};

const checkRepeatingGashtag = () => {
  const repeatedWords = textHashtags.value.match(regForRepeat);
  return !repeatedWords;
};

prestine.addValidator(textHashtags, cheskValidHashtag, 'Введён невалидный хэш-тег');
prestine.addValidator(textHashtags, checkCountHashtag, 'Превышено количество хэш-тегов');
prestine.addValidator(textHashtags, checkRepeatingGashtag, 'Хэш-теги повторяются');


imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  prestine.validate();
});

export { prestine };
