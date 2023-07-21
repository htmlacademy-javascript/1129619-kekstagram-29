import { prestine } from './forms.js';
import { isEscapeKey } from './util.js';

const uploadFileElem = document.getElementById('upload-file');
const imgUploadOverlayElem = document.querySelector('.img-upload__overlay');
const bodyElem = document.querySelector('body');
const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const imgUploadCancel = document.querySelector('#upload-cancel');
const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const uploadPreviewPhoto = document.querySelector('.img-upload__preview img');
const imgUploadForm = document.querySelector('.img-upload__form');


const sliderEffects = {
  none: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  },
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  sepia: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },
  heat: {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  }
};

const updateSlider = (effect) => effectLevelSlider.noUiSlider.updateOptions(sliderEffects[effect]);

const onCloseForm = () => {
  imgUploadOverlayElem.classList.add('hidden');
  bodyElem.classList.remove('modal-open');
  imgUploadForm.reset();
  prestine.reset();
  imgUploadPreview.style.filter = '';
  uploadPreviewPhoto.style.transform = 'scale(1)';
  document.removeEventListener('keydown', onPopupEscPress);
};

const resetForm = () => {
  imgUploadOverlayElem.classList.remove('hidden');
  imgUploadEffectLevel.classList.add('hidden');
  bodyElem.classList.add('modal-open');
  textHashtags.value = '';
  textDescription.value = '';
};

function onPopupEscPress(evt) {
  if ((textHashtags !== document.activeElement) && (textDescription !== document.activeElement)) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onCloseForm();
    }
  }
}

effectsList.addEventListener('change', (evt) => {
  if (evt.target.id !== 'effect-none') {
    imgUploadEffectLevel.classList.remove('hidden');
  } else {
    imgUploadEffectLevel.classList.add('hidden');
  }
});

uploadFileElem.addEventListener('change', () => {
  resetForm();
  imgUploadCancel.addEventListener('click', onCloseForm);
  document.addEventListener('keydown', onPopupEscPress);
});

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
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

effectsList.addEventListener('change', (evt) => {
  if (evt.target.id !== 'effect-none') {
    imgUploadEffectLevel.classList.remove('hidden');
  } else {
    imgUploadEffectLevel.classList.add('hidden');
    imgUploadPreview.style.filter = '';
  }

  if (evt.target.id === 'effect-chrome') {
    updateSlider('chrome');
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelValue.value = effectLevelSlider.noUiSlider.get();
      imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
    });
  }

  if (evt.target.id === 'effect-sepia') {
    updateSlider('sepia');
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelValue.value = effectLevelSlider.noUiSlider.get();
      imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
    });
  }

  if (evt.target.id === 'effect-marvin') {
    updateSlider('marvin');
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelValue.value = effectLevelSlider.noUiSlider.get();
      imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
    });
  }

  if (evt.target.id === 'effect-phobos') {
    updateSlider('phobos');
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelValue.value = effectLevelSlider.noUiSlider.get();
      imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
    });
  }

  if (evt.target.id === 'effect-heat') {
    updateSlider('heat');
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelValue.value = effectLevelSlider.noUiSlider.get();
      imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
    });
  }
});

export { onCloseForm };
