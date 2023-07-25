const FILES_TYPE = ['jpg', 'jpeg', 'png'];

const fileChooserElem = document.querySelector('.img-upload__input');
const previewElem = document.querySelector('.img-upload__preview img');
const effectsPreviewElems = document.querySelectorAll('.effects__preview');

const showUserPhoto = () => {
  const file = fileChooserElem.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILES_TYPE.some((it) => fileName.endsWith(it));
  if (matches) {
    previewElem.src = URL.createObjectURL(file);
    effectsPreviewElems.forEach((prev) => {
      prev.style.backgroundImage = `url('${previewElem.src}')`;
    });
  }
};

const onClickChoosePhoto = () => showUserPhoto();

fileChooserElem.addEventListener('change', onClickChoosePhoto);
