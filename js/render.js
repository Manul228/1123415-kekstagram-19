'use strict';

(function () {

  var mainContainer = document.querySelector('main');

  var pictureContainer = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var pictureFilter = mainContainer.querySelector('.img-filters');

  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var renderPicture = function (pictures) {
    window.render.pictures = pictures;

    var childern = Array.from(pictureContainer.childern);

    childern.forEach(function (child) {
      if (child.classList.contains('picture')) {
        pictureContainer.removeChild(child);
      }
    });

    var fragment = document.createDocumentFragment();

    pictures.forEach (function (picture) {
      var pictureNode = pictureTemplate.cloneNode(true);

      pictureNode.querySelector('.picture__img').src = picture.url;
      pictureNode.querySelector('.picture__likes').textContent = picture.likes;
      pictureNode.querySelector('.picture__comments').textContent = picture.comments.length;

      fragment.appendChild(pictureNode);
    });

    pictureContainer.appendChild(fragment);

    pictureFilter.classList.remove('img-filters--inactive');
  };

  var closeErrorContainer = function () {
    var ErrorContainer = mainContainer.querySelector('.error');
    var errorButtons = ErrorContainer.querySelectorAll('.error__button');
    mainContainer.removeChild(ErrorContainer);

    errorButtons.forEach (function (errorButton) {
      errorButton.removeEventListener('click', closeErrorContainer);
    });

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
    if (!(evt.target === innerErrorContainer || innerErrorContainer.contains(evt.target))) {
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
    onError: onError,
    pictureFilter: pictureFilter,
    renderPicture: renderPicture
  };

})();
