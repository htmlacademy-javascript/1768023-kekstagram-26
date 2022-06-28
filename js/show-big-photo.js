import { generationPhotoCommentArray } from './create-comments.js';

const bigPhotoSection = document.querySelector('.big-picture');// модуль для отрисовки полноразмерного изображения
const bigPhotoImg = bigPhotoSection.querySelector('.big-picture__img img'); // полноразмерное изображение
const bigPhotoLikesCounter = bigPhotoSection.querySelector('.social__likes'); // счетчик лайков
const bigPhotoCommentsScore = bigPhotoSection.querySelector('.comments-count'); // счетчик комментариев
const bigPhotoCommentsCounter = bigPhotoSection.querySelector('.social__comment-count'); // блок счетчика комментариев

// шаблон комментария под полноразмерным изображением
const socialCommentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments'); // блок, куда должны помещаться комментарии
const bigPhotoDescription = bigPhotoSection.querySelector('.social__caption');// описание фотографии
const newPhotoLoader = bigPhotoSection.querySelector('.comments-loader'); // кнопка загрузки новых комментариев
const bigPhotoClose = document.querySelector('.big-picture__cancel'); // кнопка закрытия полноэкранного изображения

// код для закрытия модального окна по клику и ESC
function bigPhotoClosed () {
  bigPhotoClose.addEventListener('click', () => {
    bigPhotoSection.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if(evt.keyCode === 27) {
      bigPhotoSection.classList.add('hidden');
    }
  });
}

// функция создания комментариев к полноразмерной фотографии
const commentsBigPhoto = generationPhotoCommentArray(3); //вызвала с параметром для проверки работоспособности
const commentsBigPhotoFragment = document.createDocumentFragment();

const generateCommentsBigPhoto = () => {
  commentsBigPhoto.forEach((comment) => {
    const bigPhotoElement = socialCommentTemplate.cloneNode(true);
    bigPhotoElement.querySelector('.social__picture').src = comment.avatar;
    bigPhotoElement.querySelector('.social__picture').alt = comment.name;
    bigPhotoElement.querySelector('.social__text').textContent = comment.message;
    commentsBigPhotoFragment.append(bigPhotoElement);
  });
  commentsList.append(commentsBigPhotoFragment);
};

// генерация описания к фотографии
const generateDescriptionBigPhoto = (bigPhoto) => {
  bigPhotoImg.src = bigPhoto.url;
  bigPhotoLikesCounter.textContent = bigPhoto.likes;
  bigPhotoCommentsScore.textContent = bigPhoto.comments;
  bigPhotoDescription.textContent = bigPhoto.description;
};

// функция по открытию полноразмерного размера фотографии
function openBigPhoto () {
  bigPhotoSection.classList.remove('hidden');
  bigPhotoCommentsCounter.classList.add('hidden');
  newPhotoLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  generateCommentsBigPhoto();
}

// функция по закрытию фотографии
function closeBigPhoto () {
  bigPhotoCommentsCounter.classList.remove('hidden');
  newPhotoLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  bigPhotoClosed();
}

closeBigPhoto();
openBigPhoto();

export {bigPhotoSection, openBigPhoto, closeBigPhoto, generateCommentsBigPhoto, generateDescriptionBigPhoto};
