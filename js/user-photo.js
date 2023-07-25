const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserElem = document.querySelector('.img-upload__input');
const previewElem = document.querySelector('.img-upload__preview img');
const effectsPreviewElem = document.querySelectorAll('.effects__preview');

const showUserPhoto = () => {
  const file = fileChooserElem.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewElem.src = URL.createObjectURL(file);
    effectsPreviewElem.forEach((prev) => {
      prev.style.backgroundImage = `url('${previewElem.src}')`;
    });
  }
};

const onClickChoosePhoto = () => showUserPhoto();

fileChooserElem.addEventListener('change', onClickChoosePhoto);
