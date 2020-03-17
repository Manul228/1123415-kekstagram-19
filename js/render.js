'use strict';

(function () {

  var pictureContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPhoto = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.pictures.length; ++i) {
      var picture = pictureTemplate.cloneNode(true);

      picture.querySelector('.picture__img').src = window.data.pictures[i].url;
      picture.querySelector('.picture__likes').textContent = window.data.pictures[i].likes;
      picture.querySelector('.picture__comments').textContent = window.data.pictures[i].comments.length;

      fragment.appendChild(picture);
    }

    pictureContainer.appendChild(fragment);
  };

  renderPhoto();

  window.render = {
    pictureContainer: pictureContainer
  };

})();
