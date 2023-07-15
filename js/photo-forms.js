const VALUE_STEP = 25;

const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgUploadPreview = document.querySelector('.img-upload__preview');

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

