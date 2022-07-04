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

// здесь ругается линтер, понадобится позже
// checkLength('Я проверяю длину строки, а ты?', MAX_COMMENT_LENGTH);

// функция по генерации случайного элемента из массива
const getRandomArrayElement = (elements) => elements[pickNumbers(0, elements.length - 1)];

// функция по генерации массива
const generationArray = (count) => {
  const generatedArray = [];
  for(let i = 0; i <= count; i++) {
    generatedArray.push(i);
  }
  return generatedArray;
};

// функция по меремешиванию массива по алгоритму Фишера-Йетса
const shuffleArray = (arr) => {
  let j, temp;
  for(let i = arr.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

// проверка клика на ESC
const isEscapeKey = (evt) => evt.key === 'Escape';

export {pickNumbers, checkLength, getRandomArrayElement, generationArray, shuffleArray, isEscapeKey};
