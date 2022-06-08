const MAX_COMMENT_LENGHT = 140;
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
const checkLength = function (stringLength, maxStringLength) {
  return stringLength.length <= maxStringLength;
};

checkLength('Я проверяю длину строки, а ты?', MAX_COMMENT_LENGHT);
