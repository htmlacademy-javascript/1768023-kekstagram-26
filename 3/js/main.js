const MAX_COMMENT_LENGTH = 140;
// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const pickNumbers = (min, max) => {
  if(max > min && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  throw Error('Минимальное число должно быть положительным и/или больше минимального значения');
};

pickNumbers(3, 600);

// функция для проверки максимальной длины строки
const checkLength = (stringLength, maxStringLength) => stringLength.length <= maxStringLength;

checkLength('Я проверяю длину строки, а ты?', MAX_COMMENT_LENGTH);

//домашнее задание по созданию объектов описания к фотографиям

const AMOUNT_ID = 25;
const AMOUNT_URL = 25;
const AMOUNT_LIKES_MIN = 15;
const AMOUNT_LIKES_MAX = 200;
const AMOUNT_AVATAR = 6;

const MESSAGE_COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION_PHOTO = [
  'Люблю такое!',
  'Я моргнул, давайте снова!',
  'Моргать на фотографиях люблю очень',
  'Вся моя жизнь',
  'Отдыхаю хорошо! Ещё бы отдыхал'
];

const NAME_USER = [
  'Даша',
  'Костя',
  'Валера',
  'Саня',
  'Хохотуша',
  'Вася'
];

// функция по генерации случайного элемента из массива
const getRandomArrayElement = (elements) => elements[pickNumbers(0, elements.length - 1)];

// функция по генерации комментария к фотографии
const createPhotoComment = () => ({
  id: pickNumbers(0, AMOUNT_ID),
  avatar: `img/avatar-${pickNumbers(0, AMOUNT_AVATAR)}.svg`,
  message: getRandomArrayElement(MESSAGE_COMMENT),
  name: getRandomArrayElement(NAME_USER),
});

// функция по генерации описания к фотографии
const createPhotoDescription = () => ({
  id: pickNumbers(0, AMOUNT_ID),
  url: `photos/${  pickNumbers(0, AMOUNT_URL) }.jpg`,
  description: getRandomArrayElement(DESCRIPTION_PHOTO),
  likes: pickNumbers(AMOUNT_LIKES_MIN, AMOUNT_LIKES_MAX),
  commets: createPhotoComment(),
});

// создание массива из 25-ти объектов описания к фотографиям
const createPhotoCommentArray = Array.from({length: AMOUNT_ID + 1}, createPhotoDescription);

createPhotoDescription();
createPhotoComment();
// eslint-disable-next-line no-console
console.log(createPhotoCommentArray);
