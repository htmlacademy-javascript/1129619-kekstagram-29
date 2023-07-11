import { isEscapeKey } from './util.js';

const buttonUploadFile = document.getElementById('upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const imgUploadCancel = document.querySelector('#upload-cancel');
const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

buttonUploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  imgUploadEffectLevel.classList.add('hidden');
  body.classList.add('modal-open');
  textHashtags.value = '';
  textDescription.value = '';
});

const onCloseForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onPopupEscPress = function (evt) {
  if ((!textHashtags === document.activeElement) || (!textDescription === document.activeElement)) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onCloseForm();
    }
  }
};

imgUploadCancel.addEventListener('click', onCloseForm);
document.addEventListener('keydown', onPopupEscPress);

effectsList.addEventListener('click', (evt) => {
  if (evt.target.id !== 'effect-none') {
    imgUploadEffectLevel.classList.remove('hidden');
  } else {
    imgUploadEffectLevel.classList.add('hidden');
  }
});

buttonUploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  imgUploadEffectLevel.classList.add('hidden');
  body.classList.add('modal-open');
  textHashtags.value = '';
  textDescription.value = '';
});

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// effectLevelSlider.noUiSlider.on('update', () => {
//   effectLevelValue.value = effectLevelSlider.noUiSlider.get();
//   // imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
// });

effectsList.addEventListener('click', (evt) => {
  if (evt.target.id !== 'effect-none') {
    imgUploadEffectLevel.classList.remove('hidden');
  } else {
    imgUploadEffectLevel.classList.add('hidden');
    imgUploadPreview.style.filter = '';
  }

  if (evt.target.id === 'effect-chrome') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelValue.value = effectLevelSlider.noUiSlider.get();
      imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
    });
  }

  if (evt.target.id === 'effect-sepia') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelValue.value = effectLevelSlider.noUiSlider.get();
      imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
    });
  }

  if (evt.target.id === 'effect-marvin') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelValue.value = effectLevelSlider.noUiSlider.get();
      imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
    });
  }

  if (evt.target.id === 'effect-phobos') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelValue.value = effectLevelSlider.noUiSlider.get();
      imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
    });
  }

  if (evt.target.id === 'effect-heat') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelValue.value = effectLevelSlider.noUiSlider.get();
      imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
    });
  }
});
