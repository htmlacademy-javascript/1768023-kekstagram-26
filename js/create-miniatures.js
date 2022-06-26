import {createPhotoCommentsArray} from './create-comments.js';

// находим блок, куда будут генерироваться DOM-объекты
const pictureList = document.querySelector('.pictures');
// находим шаблон
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createMiniatures = createPhotoCommentsArray();
const createMiniaturesFragment = document.createDocumentFragment();

createMiniatures.forEach((miniatures) => {
  const miniatureElement = pictureTemplate.cloneNode(true);
  miniatureElement.querySelector('.picture__img').src = miniatures.url;
  miniatureElement.querySelector('.picture__comments').textContent = miniatures.comments;
  miniatureElement.querySelector('.picture__likes').textContent = miniatures.likes;
  pictureList.append(miniatureElement);
});

pictureList.append(createMiniaturesFragment);
