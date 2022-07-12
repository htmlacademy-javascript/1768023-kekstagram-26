//модуль, отвечающий за работу формы
import { isEscapeKey } from './util.js';

const formImgUpload = document.querySelector('.img-upload__form'); //форма загрузки изображения
const inputImgUpload = formImgUpload.querySelector('#upload-file'); //поле загрузки изображения
const formImgOverlay = formImgUpload.querySelector('.img-upload__overlay'); //форма редактирования изображения
const formImgClose = formImgUpload.querySelector('#upload-cancel'); //кнопка закрытия формы редактирования изображения

//закрытие окна по клику
const onImageUploadClose = () => {
  imageUploadClose();
};

// закрытие по ECS
const onPopupEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault ();
    imageUploadClose();
  }
};

// ругается eslint
// eslint-disable-next-line no-unused-vars
function imageUploadOpen (imageUser) {
  inputImgUpload.addEventListener('click', (evt) => {
    evt.preventDefault();
    formImgOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });

  //добавление обработчиков
  document.addEventListener('keydown', onPopupEscKeydown);
  formImgClose.addEventListener('click', onImageUploadClose);
}

function imageUploadClose() {
  formImgOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.forms['formImgUpload'].reset(); //очистка всех полей формы, подсмотрено в интернете

  //удаление обработчиков
  document.removeEventListener('keydown', onPopupEscKeydown);
  formImgClose.removeEventListener('click', onImageUploadClose);
}

imageUploadOpen();

export {formImgUpload};
