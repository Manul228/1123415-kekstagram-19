'use strict';

(function () {

  var URLs = {
    URL_LOAD: 'https://js.dump.academy/kekstagram/data',
    URL_SAVE: 'https://js.dump.academy/kekstagram'
  };

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var generateRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var loadData = function (onLoad, onError) {
    var xhr = generateRequest(onLoad, onError);

    xhr.open('GET', URLs.URL_LOAD);
    xhr.send();

  };

  var saveData = function (data, onLoad, onError) {
    var xhr = generateRequest(onLoad, onError);

    xhr.open('POST', URLs.URL_SAVE);
    xhr.send(data);
  };

  window.network = {
    loadData: loadData,
    saveData: saveData
  };

})();
