//модуль для проверки валидности хештегов и комментариев
import { formImgUpload } from './form-image.js'; //форма загрузки изображений

const MAX_HASHTAG_LENGTH = 20; //максимальное количество символов в хештеге
const MIN_HASHTAG_LENGTH = 2; //минимальное количество символов в хештеге
const MIN_HASHTAG_COUNT = 5; //максимальное количество хэштегов под фото
const MAX_COMMENT_LENGTH = 140; //максимальнок количество символов в комментарии

const hashtagInput = formImgUpload.querySelector('.text__hashtags'); //поле ввода хэштегов
const commentInput = formImgUpload.querySelector('.text__description');//поле ввода комментариев

//регулярное выражение для проверки хэштегов
const regSymbolsHashtag = /^#[A-Za-zА-Яа-яЁё0-9]{0,100}(\s#[A-Za-zА-Яа-яЁё0-9]{0,100}){0,20}$/i;

//Pristine
const pristine = new Pristine(formImgUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'error__inner',
});

// // функция для проверки максимальной длины строки
const checkLength = (commentText) => commentText.length <= MAX_COMMENT_LENGTH;

//создание массива из значения хештега
function createHashtagArray () {
  return hashtagInput.value.toLowerCase().trim().split(' ');
}

// проверка через регулярное выражение
function checkReHashtag () {
  const hashtagArray = createHashtagArray();
  return regSymbolsHashtag.test(hashtagArray);
}

//проверка на количество хештегов
function checkCounthHashtag () {
  const hashtagArray = createHashtagArray();
  return hashtagArray.length <= MIN_HASHTAG_COUNT;
}

//проверка на длину хэштега
function checkLengthHashtag () {
  const hashtagArray = createHashtagArray();
  return hashtagArray.length <= MIN_HASHTAG_LENGTH || hashtagArray.length >= MAX_HASHTAG_LENGTH;
}


pristine.addValidator (
  hashtagInput,
  checkLengthHashtag,
  `Длина хэштега не может быть меньше ${MIN_HASHTAG_LENGTH} и более ${MAX_HASHTAG_LENGTH} символов`
);


pristine.addValidator(
  hashtagInput,
  checkCounthHashtag,
  'Пожалуйста, не более 5-ти хэштегов'
);

pristine.addValidator(
  hashtagInput,
  checkReHashtag,
  'Пожалуйста, проверьте правильность написания: хэштег начинается с #,'
);

pristine.addValidator(
  commentInput,
  checkLength,
  'Комментарий не может быть более 140 символов'
);

formImgUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
