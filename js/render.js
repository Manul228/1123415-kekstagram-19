'use strict';

(function () {

  var pictureContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPicture = function (pictures) {
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

  var onError = function (errorText) {
    var errorNode = errorTemplate.cloneNode(true);
    errorNode.querySelector('.error__title').textContent = errorText;
    pictureContainer.appendChild(errorNode);
  };


  window.network.loadData(renderPicture, onError);

  window.render = {
    pictureContainer: pictureContainer
  };

})();
