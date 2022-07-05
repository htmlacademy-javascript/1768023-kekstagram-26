import { pickNumbers, getRandomArrayElement, generationArray, shuffleArray } from './util.js';

const AMOUNT_ID = 25;
const AMOUNT_URL = 25;
const AMOUNT_LIKES_MIN = 15;
const AMOUNT_LIKES_MAX = 200;
const AMOUNT_AVATAR = 6;
const MIN_COUNT_COMMENT = 1;
const MAX_COUNT_COMMENT = 10;
// const MAX_COMMENT_LENGTH = 140; понадобится позже

const MESSAGES_COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS_PHOTO = [
  'Люблю такое!',
  'Я моргнул, давайте снова!',
  'Моргать на фотографиях люблю очень',
  'Вся моя жизнь',
  'Отдыхаю хорошо! Ещё бы отдыхал'
];

const NAMES_USER = [
  'Даша',
  'Костя',
  'Валера',
  'Саня',
  'Хохотуша',
  'Вася'
];

// вызов функции по генерации массива из ID
const orderRandomId = generationArray(AMOUNT_ID);

// вызов функции по перемешиванию массива без повторений
shuffleArray(orderRandomId);


// функция по генерации комментария к фотографии
// const createPhotoComment = () => ({
//   id: pickNumbers(0, AMOUNT_ID),
//   avatar: `img/avatar-${pickNumbers(0, AMOUNT_AVATAR)}.svg`,
//   message: getRandomArrayElement(MESSAGES_COMMENT),
//   name: getRandomArrayElement(NAMES_USER),
// });


// генерация массива комментария к фотографиям
const generationPhotoCommentArray = (commentsCount) => {
  const generatePhotoComments = [];
  for(let i = 0; i <= commentsCount; i++) {
    generatePhotoComments[i] = {
      id: pickNumbers(0, AMOUNT_ID),
      avatar: `img/avatar-${pickNumbers(1, AMOUNT_AVATAR)}.svg`,
      message: getRandomArrayElement(MESSAGES_COMMENT),
      name: getRandomArrayElement(NAMES_USER),
    };
  }
  return generatePhotoComments;
};

// функция по генерации описания к фотографии
const createPhotoDescription = () => {
  const photoDescription = {
    id: orderRandomId.shift(),
    url: `photos/${  pickNumbers(1, AMOUNT_URL) }.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS_PHOTO),
    likes: pickNumbers(AMOUNT_LIKES_MIN, AMOUNT_LIKES_MAX),
    comments: generationPhotoCommentArray(pickNumbers(MIN_COUNT_COMMENT, MAX_COUNT_COMMENT)).length,
  };
  return photoDescription;
};

// создание массива из 25-ти объектов описания к фотографиям
const createPhotoCommentsArray = () => Array.from({length: AMOUNT_ID + 1}, createPhotoDescription);
const photosArray = createPhotoCommentsArray();

export {generationPhotoCommentArray, createPhotoCommentsArray, createPhotoDescription, photosArray };
