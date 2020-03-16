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

  var onClickCloseErrorBlock = function (evt) {
    var innerErrorBlock = mainContainer.querySelector('.error__inner');
    if (evt.target !== innerErrorBlock && !(innerErrorBlock.contains(evt.target))) {
      closeErrorBlock();
    }
  };

  var onError = function (errorText) {
    var errorBlock = errorTemplate.cloneNode(true);
    var errorButtons = errorBlock.querySelectorAll('.error__button');

    errorBlock.querySelector('.error__title').textContent = errorText;
    errorBlock.style = 'z-index: 100;';

    mainContainer.appendChild(errorBlock);

    for (var i = 0; i < errorButtons.length; i++) {
      errorButtons[i].addEventListener('click', closeErrorBlock);
    }

    document.addEventListener('keydown', onEscCloseErrorBlock, true);
    document.addEventListener('click', onClickCloseErrorBlock);
  };


  window.network.loadData(renderPicture, onError);

  window.render = {
    pictureContainer: pictureContainer,
    mainContainer: mainContainer,
    onError: onError
  };

})();
