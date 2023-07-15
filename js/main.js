import './big-picture.js';
import { setOnFormSubmit } from './forms.js';
import './user-photo.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { sendData } from './api.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    // hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
