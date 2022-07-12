//отрисовка миниатюр
import {createPhotoCommentsArray } from './create-comments.js';

// находим блок, куда будут генерироваться DOM-объекты
const pictureList = document.querySelector('.pictures');
// находим шаблон
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const miniaturesPhoto = createPhotoCommentsArray();
const miniaturesFragment = document.createDocumentFragment();

miniaturesPhoto.forEach((dataMiniatures) => {
  const {url, likes, comments} = dataMiniatures;

  const miniatureElement = pictureTemplate.cloneNode(true);
  miniatureElement.querySelector('.picture__img').src = url;
  miniatureElement.querySelector('.picture__comments').textContent = comments;
  miniatureElement.querySelector('.picture__likes').textContent = likes;
  miniaturesFragment.append(miniatureElement);
});
pictureList.append(miniaturesFragment);

export {miniaturesPhoto};
