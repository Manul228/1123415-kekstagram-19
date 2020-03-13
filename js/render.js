'use strict';

(function () {

  var PICTURES_AMOUNT = 25;

  var pictureContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPhoto = function () {
    var fragment = document.createDocumentFragment();

    var photos = window.data.getPictures(PICTURES_AMOUNT);

    for (var i = 0; i < window.data.photos.length; ++i) {
      var picture = pictureTemplate.cloneNode(true);

      picture.querySelector('.picture__img').src = photos[i].url;
      picture.querySelector('.picture__likes').textContent = photos[i].likes;
      picture.querySelector('.picture__comments').textContent = photos[i].comments.length;

      fragment.appendChild(picture);
    }

    pictureBlock.appendChild(fragment);
  };

  renderPhoto();

  window.render = {
    pictureContainer: pictureContainer
  };

})();
