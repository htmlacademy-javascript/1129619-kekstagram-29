import { onPopupEscPress } from './photo-filter.js';

const successMessageTemplate = document.querySelector('#success')
  .content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content.querySelector('.error');
const bodyElem = document.querySelector('body');

const hideMessage = () => {
  const messageElem = document.querySelector('.success') || document.querySelector('.error');
  messageElem.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onPopupEscPress);
  bodyElem.removeEventListener('click', onBodyClick);
};

function onBodyClick(evt) {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  hideMessage();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

const onClickCloseButton = () => hideMessage();

const showMessage = (messageElem, closeButtonClass) => {
  bodyElem.append(messageElem);
  document.removeEventListener('keydown', onPopupEscPress);
  document.addEventListener('keydown', onDocumentKeydown);
  bodyElem.addEventListener('click', onBodyClick);
  messageElem.querySelector(closeButtonClass).addEventListener('click', onClickCloseButton);
};

const showSuccessMessage = () => {
  showMessage(successMessageTemplate, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageTemplate, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
