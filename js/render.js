'use strict';

(function () {

  var pictureContainer = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var mainContainer = document.querySelector('main');

  var renderPicture = function (pictures) {
    window.render.pictures = pictures;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; ++i) {
      var picture = pictureTemplate.cloneNode(true);

      picture.querySelector('.picture__img').src = pictures[i].url;
      picture.querySelector('.picture__likes').textContent = pictures[i].likes;
      picture.querySelector('.picture__comments').textContent = pictures[i].comments.length;

      fragment.appendChild(picture);
    }

    pictureContainer.appendChild(fragment);
  };

  var closeErrorContainer = function () {
    var ErrorContainer = mainContainer.querySelector('.error');
    var errorButtons = ErrorContainer.querySelectorAll('.error__button');
    mainContainer.removeChild(ErrorContainer);

    for (var i = 0; i < errorButtons.length; ++i) {
      errorButtons[i].removeEventListener('click', closeErrorContainer);
    }
    document.removeEventListener('keydown', onEscCloseErrorContainer, true);
    document.removeEventListener('click', onClickCloseErrorContainer);
  };

  var onEscCloseErrorContainer = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      evt.stopPropagation();
      closeErrorContainer();
    }
  };

  var onClickCloseErrorContainer = function (evt) {
    var innerErrorContainer = mainContainer.querySelector('.error__inner');
    if (evt.target !== innerErrorContainer && !(innerErrorContainer.contains(evt.target))) {
      closeErrorContainer();
    }
  };

  var onError = function (errorText) {
    var ErrorContainer = errorTemplate.cloneNode(true);
    var errorButtons = ErrorContainer.querySelectorAll('.error__button');

    ErrorContainer.querySelector('.error__title').textContent = errorText;
    ErrorContainer.style = 'z-index: 100;';

    mainContainer.appendChild(ErrorContainer);

    for (var i = 0; i < errorButtons.length; ++i) {
      errorButtons[i].addEventListener('click', closeErrorContainer);
    }

    document.addEventListener('keydown', onEscCloseErrorContainer, true);
    document.addEventListener('click', onClickCloseErrorContainer);
  };


  window.network.loadData(renderPicture, onError);

  window.render = {
    pictureContainer: pictureContainer,
    mainContainer: mainContainer,
    onError: onError
  };

})();
