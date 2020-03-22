'use strict';

(function () {
  var VISIBLE_COMMENTS = 5;

  var bigPictureElement = document.querySelector('.big-picture');
  var bigCloseButton = bigPictureElement.querySelector('.big-picture__cancel');
  var commentsList = document.querySelector('.social__comments');
  var commentElement = commentsList.querySelector('.social__comment');
  var commentLoadButton = bigPictureElement.querySelector('.comments-loader');
  var commentCounter = bigPictureElement.querySelector('.social__comment-count');

  var currentComments;

  var showComments = function (comments) {
    var privateCounter = 0;

    var setCommentCounter = function () {
      if (privateCounter < comments.length) {
        var counterString = commentCounter.innerHTML;
        counterString = privateCounter + counterString.slice(counterString.indexOf(' '));
        commentCounter.innerHTML = counterString;
      } else {
        commentCounter.classList.add('visually-hidden');
        commentLoadButton.classList.add('visually-hidden');
      }
    };

    var renderComments = function () {
      var fragment = document.createDocumentFragment();

      if (privateCounter <= comments.length) {
        comments.slice(privateCounter, privateCounter + VISIBLE_COMMENTS)
          .forEach(function (comment) {
            var commentNode = commentElement.cloneNode(true);

            commentNode.querySelector('.social__picture').src = comment.avatar;
            commentNode.querySelector('.social__picture').alt = comment.name;
            commentNode.querySelector('.social__text').textContent = comment.message;

            fragment.appendChild(commentNode);
          });

        privateCounter += VISIBLE_COMMENTS;
        setCommentCounter();
      }

      commentsList.appendChild(fragment);
    };

    return {
      renderComments: renderComments
    };
  };

  var onCommentButtonClick = function () {
    currentComments.renderComments();
  };

  var showBigPicture = function (picture) {
    bigPictureElement.classList.remove('hidden');

    currentComments = showComments(picture.comments);

    var children = Array.from(commentsList.children);

    children.forEach(function (child) {
      commentsList.removeChild(child);
    });

    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;

    currentComments.renderComments();

    commentLoadButton.addEventListener('click', onCommentButtonClick);

    bigCloseButton.addEventListener('click', onBigCloseButtonClick);
    document.addEventListener('keydown', onBigPictureKeydown);

    bigPictureElement.setAttribute('tabindex', '0');
    bigPictureElement.focus();

    document.body.classList.add('modal-open');
  };

  var closeBigPicture = function () {
    commentCounter.classList.remove('visually-hidden');
    commentLoadButton.classList.remove('visually-hidden');
    bigPictureElement.classList.add('hidden');

    bigCloseButton.removeEventListener('click', onBigCloseButtonClick);
    document.removeEventListener('keydown', onBigPictureKeydown);
    commentLoadButton.removeEventListener('click', onCommentButtonClick);

    document.body.classList.remove('modal-open');
  };

  var onBigCloseButtonClick = function () {
    closeBigPicture();
  };

  var onBigPictureKeydown = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  window.preview = {
    showBigPicture: showBigPicture
  };

})();
