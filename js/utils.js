'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomElement = function (array) {
    var len = array.length;

    if (len === 0) {
      return undefined;
    }

    return array[getRandomInt(0, len)];
  };

  var shuffleArray = function (array) {
    array.forEach(function (item, index, newArray) {
      var randomIndex = getRandomElement(index, newArray.length);
      var temp = item;
      newArray[index] = newArray[randomIndex];
      newArray[randomIndex] = temp;
    });

    return array;
  };

  var debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var params = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, params);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    shuffleArray: shuffleArray,
    debounce: debounce
  };

})();
