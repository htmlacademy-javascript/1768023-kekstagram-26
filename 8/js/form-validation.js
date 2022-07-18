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
  errorTextClass: 'img-upload__field-wrapper--invalid',
});

// // функция для проверки максимальной длины строки
const checkLength = (commentText) => commentText.length <= MAX_COMMENT_LENGTH;

//проверка через регулярное выражение
const checkReHashtag = (valueHashtag) => regSymbolsHashtag.test(valueHashtag);

//проверка на количество хештегов
const checkCounthHashtag = (valueHashtag) => {
  const hashtagArray = valueHashtag.toLowerCase().trim().split(' ');
  return hashtagArray.length <= MIN_HASHTAG_COUNT;
};

// проверка на длину одного хэштега
const checkLengthHashtag = (valueHashtag) => {
  const hashtagArray = valueHashtag.toLowerCase().trim().split(' ');
  for(let i = 0; i < hashtagArray.length; i++) {
    if(hashtagArray[i].length < MIN_HASHTAG_LENGTH || hashtagArray[i].length >= MAX_HASHTAG_LENGTH) {
      return false;
    }
    return true;
  }
};

//проверка на повторение хештега
const checkDublicateHashtag = (valueHashtag) => {
  const hashtagArray = valueHashtag.toLowerCase().trim().split(' ');
  return hashtagArray.length === (new Set(hashtagArray).size);
};

pristine.addValidator(
  hashtagInput,
  checkReHashtag,
  'Пожалуйста, проверьте правильность написания: хэштег начинается с #, не может содержать символы после #, и не может иметь пробелы',
);

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
  checkDublicateHashtag,
  'Хэштег не может повторяться'
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
