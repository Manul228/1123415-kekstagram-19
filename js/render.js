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

  var renderPictures = function (pictures) {
    window.render.defaultPictures =
    (typeof window.render.defaultPictures === 'undefined')
      ? pictures
      : window.render.defaultPictures;

    var children = Array.from(pictureContainer.children);

    children.forEach(function (child) {
      if (child.classList.contains('picture')) {
        pictureContainer.removeChild(child);
      }
    });

    var fragment = document.createDocumentFragment();

    pictures.forEach(function (picture) {
      var pictureNode = pictureTemplate.cloneNode(true);

      pictureNode.querySelector('.picture__img').src = picture.url;
      pictureNode.querySelector('.picture__likes').textContent = picture.likes;
      pictureNode.querySelector('.picture__comments').textContent = picture.comments.length;

      fragment.appendChild(pictureNode);

      pictureNode.addEventListener('click', function () {
        window.preview.showBigPicture(picture);
      });
    });

    pictureContainer.appendChild(fragment);

    pictureFilter.classList.remove('img-filters--inactive');
  };

  var closeErrorContainer = function () {
    var errorContainer = mainContainer.querySelector('.error');
    var errorButtons = errorContainer.querySelectorAll('.error__button');
    mainContainer.removeChild(errorContainer);

    errorButtons.forEach(function (errorButton) {
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

    errorButtons.forEach(function (errorButton) {
      errorButton.addEventListener('click', closeErrorContainer);
    });

    document.addEventListener('keydown', onEscCloseErrorContainer, true);
    document.addEventListener('click', onClickCloseErrorContainer);
  };


  window.network.loadData(renderPictures, onError);

  window.render = {
    pictureContainer: pictureContainer,
    mainContainer: mainContainer,
    onError: onError,
    pictureFilter: pictureFilter,
    renderPictures: renderPictures
  };

})();
