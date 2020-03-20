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

})();
