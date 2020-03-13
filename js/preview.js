'use strict';

(function () {

  var firstPicture = window.data.pictures[0];

  var showBigPicture = function (picture) {
    bigPicture.classList.remove('hidden');

    var createComments = function (pictureToComment) {
      var htmlComments = [];

      for (var j = 0; j < pictureToComment.comments.length; ++j) {

        var avatar = pictureToComment.comments[j].avatar;
        var name = pictureToComment.comments[j].name;
        var message = pictureToComment.comments[j].message;

        var roundElement = document.createElement('li');
        roundElement.classList.add('social__comment');
        roundElement.innerHTML = '<img class="social__picture" src="' + avatar + '" alt="' + name +
          '" width="35" height="35"><p class="social__text">' + message + '</p>';

        htmlComments.push(roundElement);
      }

      return htmlComments;
    };

    var bigComments = createComments(picture);

    bigPicture.querySelector('.big-picture__img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;

    var socialComments = bigPicture.querySelector('.social__comments');

    var bigCommentsFragment = document.createDocumentFragment();

    for (var k = 0; k < bigComments.length; ++k) {
      bigCommentsFragment.appendChild(bigComments[k]);
    }

    socialComments.appendChild(bigCommentsFragment);

    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');

    document.body.classList.add('modal-open');
  };

  showBigPicture(firstPicture);

  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });

})();
