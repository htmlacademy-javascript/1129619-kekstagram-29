import { showAlert } from './util.js';

const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте еще раз.',
};

// const load = (route, errorText, method = Method.GET, body = null) =>
//   fetch(`${BASE_URL}${route}`, { method, body })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error();
//       }
//       return response.json();
//     })
//     .catch(() => {
//       showAlert(errorText);
//       throw new Error(showAlert(errorText));
//     });

const load = async (route, errorMessage, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {method, body});
    if (! response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch {
    throw new Error(errorMessage);
  }
};

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
