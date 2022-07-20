//открытие полноразмерного изображения
import { generationPhotoCommentArray, photosArray} from './create-comments.js';
import { isEscapeKey } from './util.js';

// const MAX_COMMENT_COUNT =5;

const bigPhotoSection = document.querySelector('.big-picture');// модуль для отрисовки полноразмерного изображения
const bigPhotoImg = bigPhotoSection.querySelector('.big-picture__img img'); // полноразмерное изображение
const bigPhotoLikesCounter = bigPhotoSection.querySelector('.social__likes'); // счетчик лайков
const bigPhotoCommentsScore = bigPhotoSection.querySelector('.comments-count'); // счетчик комментариев
const bigPhotoCommentsCounter = bigPhotoSection.querySelector('.social__comment-count'); // блок счетчика комментариев

// шаблон комментария под полноразмерным изображением
const socialCommentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments'); // блок, куда должны помещаться комментарии
const bigPhotoDescription = bigPhotoSection.querySelector('.social__caption');// описание фотографии
const newCommentLoader = bigPhotoSection.querySelector('.comments-loader'); // кнопка загрузки новых комментариев
const bigPhotoClose = document.querySelector('.big-picture__cancel'); // кнопка закрытия полноэкранного изображения

// код для закрытия модального окна по клику
const onPopupClickClose = () =>  {
  closeBigPhoto();
};

// закрытие по ECS
const onPopupEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault ();
    closeBigPhoto();
  }
};

// функция создания комментариев к полноразмерной фотографии
const commentsBigPhoto = generationPhotoCommentArray();
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

const showComments = (count) => {
  if(count >= commentsBigPhoto.length) {
    newCommentLoader.classList.add('hidden');
    bigPhotoCommentsCounter.textContent = `${commentsBigPhoto.length} из ${commentsBigPhoto.length} комментариев`;
  } else {
    newCommentLoader.classList.remove('hidden');
    bigPhotoCommentsCounter.textContent = `${count} из ${commentsBigPhoto.length} комментариев`;
  }
};


// функция по открытию полноразмерного размера фотографии
function openBigPhoto (dataBigPhoto) {
  bigPhotoSection.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const {url, likes, comments, description} = dataBigPhoto;
  bigPhotoImg.src = url;
  bigPhotoLikesCounter.textContent = likes;
  bigPhotoCommentsScore.textContent = comments;
  bigPhotoDescription.textContent = description;

  generateCommentsBigPhoto(photosArray[0]);
  //добавление обработчиков
  document.addEventListener('keydown', onPopupEscKeydown);
  bigPhotoClose.addEventListener('click', onPopupClickClose);
  newCommentLoader.addEventListener('click', showComments);
}


// функция по закрытию фотографии
function closeBigPhoto () {
  bigPhotoSection.classList.add('hidden');

  document.body.classList.remove('modal-open');

  //удаление обработчиков
  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPhotoClose.removeEventListener('click', onPopupClickClose);
}


openBigPhoto(photosArray[0]);

export {openBigPhoto, generateCommentsBigPhoto};
