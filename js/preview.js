'use strict';

(function () {
  var VISIBLE_COMMENTS = 5;

  var pictures = window.render.pictureContainer.querySelectorAll('.picture');
  var bigPictureElement = document.querySelector('.big-picture');
  var bigCloseButton = bigPictureElement.querySelector('.big-picture__cancel');
  var commentsList = document.querySelector('.social__comments');
  var commentElement = commentsList.querySelector('.social__comment');

  var showBigPicture = function (picture) {
    bigPictureElement.classList.remove('hidden');

    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < VISIBLE_COMMENTS; ++i) {
      var comment = commentElement.cloneNode(true);

      comment.querySelector('.social__picture').src = picture[i].comments.avatar;
      comment.querySelector('.social__picture').alt = picture[i].comments.name;
      comment.querySelector('.social__text').textContent = picture[i].comments.message;

      fragment.appendChild(comment);
    }

    var children = commentsList.children;

    for (i = children.length - 1; i >= 0; --i) {
      commentsList.removeChild(children[i]);
    }

    commentsList.appendChild(fragment);

    bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');
  };

  var closeBigPicture = function () {
    bigPictureElement.classList.add('hidden');
    bigCloseButton.removeEventListener('click', closeBigPicture);
    document.removeEventListener('keydown', onEscCloseBigPicture);
  };

  var onEscCloseBigPicture = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var onSmallPictureClick = function (i) {
    return function (evt) {
      evt.preventDefault();
      showBigPicture(window.data.pictures[i]);

      bigCloseButton.addEventListener('click', closeBigPicture);
      document.addEventListener('keydown', onEscCloseBigPicture);
    };
  };

  var initPreview = function () {

    pictures = window.render.pictureContainer.querySelectorAll('.picture');

    for (var i = 0; i < pictures.length; ++i) {
      pictures[i].addEventListener('click', onSmallPictureClick(i));
    }
  };

  initPreview();

})();
