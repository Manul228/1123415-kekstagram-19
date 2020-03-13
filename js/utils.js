'use strict';

(function () {

  var ESC_KEYCODE = 27;

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

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement
  };

})();
