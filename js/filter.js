'use strict';

(function () {
  var RANDOM_PICTURES_AMOUNT = 10;

  var filterButtons = window.render.pictureFilter.querySelectorAll('.img-filters__button');

  var setFilterButtonClicked = function (clickedButtonId) {
    filterButtons.forEach(function (filterButton) {
      var isThisButton = filterButton.id === clickedButtonId;

      if (isThisButton) {
        filterButton.classList.add('img-filters__button--active');
      } else {
        filterButton.classList.remove('img-filters__button--active');
      }
    });
  };

  var renderRandomPictures = function () {
    var randomPictures = [];
    var pictures = window.utils.shuffleArray(window.render.defaultPictures.slice());

    for (var i = 0; i < RANDOM_PICTURES_AMOUNT; ++i) {
      randomPictures.push(pictures[i]);
    }

    window.render.renderPictures(randomPictures);
  };

  var getCommentsDiff = function (left, right) {
    return right.comments.length - left.comments.length;
  };

  var rankPicturesByComments = function () {
    var pics = window.render.defaultPictures.slice().sort(getCommentsDiff);
    window.render.renderPictures(pics);
  };

  var onFilterButtonClick = window.utils.debounce(function (evt) {
    switch (evt.target.id) {
      case 'filter-default':
        window.render.renderPictures(window.render.defaultPictures);
        break;
      case 'filter-random':
        renderRandomPictures();
        break;
      case 'filter-discussed':
        rankPicturesByComments();
        break;
    }
  });

  filterButtons.forEach(function (filterButton) {
    filterButton.addEventListener('click', function (evt) {
      setFilterButtonClicked(evt.target.id);
      onFilterButtonClick(evt);
    });
  });

})();
