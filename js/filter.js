'use strict';

(function () {
  var RANDOM_PICTURES_AMOUNT = 10;

  var filterButtons = window.render.pictureFilter.querySelectorAll('.img-filters__button');

  var setFilterButtonClicked = function (clickedButtonId) {
    filterButtons.forEach(function (filterButton) {
      filterButton.id === clickedButtonId
      ? filterButton.classList.add('img-filters__button--active')
      : filterButton.classList.remove('img-filters__button--active');
    });
  };

  var renderRandomPictures = function () {
    var randomPictures = [];
    console.log(window.render.pictures);
    var pictures = window.utils.shuffleArray(window.render.pictures);

    for (var i = 0; i < RANDOM_PICTURES_AMOUNT; ++i) {
      randomPictures.push(pictures[i]);
    }

    window.render.renderPicture(randomPictures);
  };

  var getCommentsDiff = function (left, right) {
    return right.comments.length - left.comments.length;
  };

  var renderPicturesByComments = function () {
    var pics = window.render.pictures.slice().sort(getCommentsDiff);
    window.render.renderPicture(pics);
  };

  var onFilterButtonClick = window.utils.debounce (function (evt) {
    switch (evt.target.id) {
      case 'filter-popular':
        console.log(window.render.photos);
        window.render.renderPicture(window.render.photos);
        break;
      case 'filter-random':
        renderRandomPictures();
        break;
      case 'filter-discussed':
        renderPicturesByComments();
        break;
    }
  });

  filterButtons.forEach (function (filterButton) {
    filterButton.addEventListener('click', function (evt) {
      setFilterButtonClicked (evt.target.id);
      onFilterButtonClick(evt);
    });
  });

})();
