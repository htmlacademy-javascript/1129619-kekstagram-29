import { pristine } from './forms.js';
import { isEscapeKey } from './util.js';

const FilterValue = {
  MIN: 0,
  START_SEPIA_CHROME: 1,
  START_PHOBOS_HEAT: 3,
  MAX: 100,
  MAX_DECIMA: 1,
  MAX_PHOBOS_HEAT: 3,
};

const FilterStepVariation = {
  NORMAL: 1,
  DECIMAL: 0.1,
};

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
const uploadPreviewPhotoElem = document.querySelector('.img-upload__preview img');
const imgUploadFormElem = document.querySelector('.img-upload__form');

const sliderEffects = {
  none: {
    range: {
      min: FilterValue.MIN,
      max: FilterValue.MAX,
    },
    start: FilterValue.MAX,
    step: FilterStepVariation.NORMAL,
    connect: 'lower',
  },
  chrome: {
    range: {
      min: FilterValue.MIN,
      max: FilterValue.MAX_DECIMA,
    },
    start: FilterValue.START_SEPIA_CHROME,
    step: FilterStepVariation.DECIMAL,
    effect: 'grayscale',
    unit: '',
  },
  sepia: {
    range: {
      min: FilterValue.MIN,
      max: FilterValue.MAX_DECIMA,
    },
    start: FilterValue.START_SEPIA_CHROME,
    step: FilterStepVariation.DECIMAL,
    effect: 'sepia',
    unit: '',
  },
  marvin: {
    range: {
      min: FilterValue.MIN,
      max: FilterValue.MAX,
    },
    start: FilterValue.MAX,
    step: FilterStepVariation.NORMAL,
    effect: 'invert',
    unit: '%',
  },
  phobos: {
    range: {
      min: FilterValue.MIN,
      max: FilterValue.MAX_PHOBOS_HEAT,
    },
    start: FilterValue.START_PHOBOS_HEAT,
    step: FilterStepVariation.DECIMAL,
    effect: 'blur',
    unit: 'px',
  },
  heat: {
    range: {
      min: FilterValue.START_SEPIA_CHROME,
      max: FilterValue.MAX_PHOBOS_HEAT
    },
    start: FilterValue.START_PHOBOS_HEAT,
    step: FilterStepVariation.DECIMAL,
    effect: 'brightness',
    unit: '',
  }
};

const updateSlider = (effect) => effectLevelSliderElem.noUiSlider.updateOptions(sliderEffects[effect]);

const onCloseForm = () => {
  imgUploadOverlayElem.classList.add('hidden');
  bodyElem.classList.remove('modal-open');
  imgUploadFormElem.reset();
  pristine.reset();
  uploadPreviewPhotoElem.style = '';
  uploadPreviewPhotoElem.style.filter = '';
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
    min: FilterValue.MIN,
    max: FilterValue.MAX,
  },
  start: FilterValue.MAX,
  step: FilterStepVariation.NORMAL,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(2);
      }
      return value.toFixed(2);
    },
    from: (value) => parseFloat(value),
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
