const buttonUploadFile = document.getElementById('upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const imgUploadCancel = document.querySelector('#upload-cancel');

new Pristine(imgUploadForm);

buttonUploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
});

const onCloseForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

imgUploadCancel.addEventListener('click', onCloseForm);
