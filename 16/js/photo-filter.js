import { prestine } from './forms.js';
import { isEscapeKey } from './util.js';

const uploadFileElem = document.getElementById('upload-file');
const imgUploadOverlayElem = document.querySelector('.img-upload__overlay');
const bodyElem = document.querySelector('body');
const textDescriptionElem = document.querySelector('.text__description');
const textHashtagsElem = document.querySelector('.text__hashtags');
const imgUploadEffectLevelElem = document.querySelector('.img-upload__effect-level');
const imgUploadCancelElem = document.querySelector('#upload-cancel');
const effectsListElem = document.querySelector('.effects__list');
const effectLevelSliderElem = document.querySelector('.effect-level__slider');
const effectLevelValueElem = document.querySelector('.effect-level__value');
const imgUploadPreviewElem = document.querySelector('.img-upload__preview');
const uploadPreviewPhotoElem = document.querySelector('.img-upload__preview img');
const imgUploadFormElem = document.querySelector('.img-upload__form');


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
    step: 0.1,
    effect: 'grayscale',
    unit: '',
  },
  sepia: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    effect: 'sepia',
    unit: '',
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    effect: 'invert',
    unit: '%',
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    effect: 'blur',
    unit: 'px',
  },
  heat: {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1,
    effect: 'brightness',
    unit: '',
  }
};

const updateSlider = (effect) => effectLevelSliderElem.noUiSlider.updateOptions(sliderEffects[effect]);

const onCloseForm = () => {
  imgUploadOverlayElem.classList.add('hidden');
  bodyElem.classList.remove('modal-open');
  imgUploadFormElem.reset();
  prestine.reset();
  imgUploadPreviewElem.style.filter = '';
  uploadPreviewPhotoElem.style.transform = 'scale(1)';
  document.removeEventListener('keydown', onPopupEscPress);
};

const resetForm = () => {
  imgUploadOverlayElem.classList.remove('hidden');
  imgUploadEffectLevelElem.classList.add('hidden');
  bodyElem.classList.add('modal-open');
  textHashtagsElem.value = '';
  textDescriptionElem.value = '';
};

const updateEffect = (effect, unit = '') => {
  effectLevelValueElem.value = effectLevelSliderElem.noUiSlider.get();
  uploadPreviewPhotoElem.style.filter = `${effect}(${effectLevelValueElem.value}${unit})`;
};

function onPopupEscPress(evt) {
  if ((textHashtagsElem !== document.activeElement) && (textDescriptionElem !== document.activeElement)) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onCloseForm();
    }
  }
}

effectsListElem.addEventListener('change', (evt) => {
  if (evt.target.id !== 'effect-none') {
    imgUploadEffectLevelElem.classList.remove('hidden');
  } else {
    imgUploadEffectLevelElem.classList.add('hidden');
  }
});

uploadFileElem.addEventListener('change', () => {
  resetForm();
  imgUploadCancelElem.addEventListener('click', onCloseForm);
  document.addEventListener('keydown', onPopupEscPress);
});

noUiSlider.create(effectLevelSliderElem, {
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
        return value.toFixed(2);
      }
      return value.toFixed(2);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

effectsListElem.addEventListener('change', (evt) => {
  if (evt.target.id !== 'effect-none') {
    imgUploadEffectLevelElem.classList.remove('hidden');
  } else {
    imgUploadEffectLevelElem.classList.add('hidden');
    uploadPreviewPhotoElem.style.filter = '';
  }

  if (evt.target.id === 'effect-chrome') {
    updateSlider('chrome');
    effectLevelSliderElem.noUiSlider.on('update', () => updateEffect(sliderEffects.chrome.effect, sliderEffects.chrome.unit));
  }

  if (evt.target.id === 'effect-sepia') {
    updateSlider('sepia');
    effectLevelSliderElem.noUiSlider.on('update', () => updateEffect(sliderEffects.sepia.effect, sliderEffects.sepia.unit));
  }

  if (evt.target.id === 'effect-marvin') {
    updateSlider('marvin');
    effectLevelSliderElem.noUiSlider.on('update', () => updateEffect(sliderEffects.marvin.effect, sliderEffects.marvin.unit));
  }

  if (evt.target.id === 'effect-phobos') {
    updateSlider('phobos');
    effectLevelSliderElem.noUiSlider.on('update', () => updateEffect(sliderEffects.phobos.effect, sliderEffects.phobos.unit));
  }

  if (evt.target.id === 'effect-heat') {
    updateSlider('heat');
    effectLevelSliderElem.noUiSlider.on('update', () => updateEffect(sliderEffects.heat.effect, sliderEffects.heat.unit));
  }
});

export { onCloseForm, onPopupEscPress };
