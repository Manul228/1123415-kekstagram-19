'use strict';

(function () {
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var uploadFile = window.render.pictureContainer.querySelector('#upload-file');
  var uploadPictureForm = window.render.pictureContainer.querySelector('.img-upload__overlay');

  var editCloseButton = uploadPictureForm.querySelector('#upload-cancel');
  var hashtagInput = uploadPictureForm.querySelector('.text__hashtags');
  var description = uploadPictureForm.querySelector('.text__description');

  var effectLevel = uploadPictureForm.querySelector('.effect-level');
  var effectInput = effectLevel.querySelector('.effect-level__value');

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var onEscCloseForm = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      uploadPictureForm.classList.add('hidden');
    }
    uploadFile.value = '';
    document.removeEventListener('keydown', onEscCloseForm);
  };

  var openEditForm = function () {
    uploadPictureForm.classList.remove('hidden');
    document.addEventListener('keydown', onEscCloseForm);
    effectLevel.classList.add('hidden');
  };

  var closeEditForm = function () {
    uploadPictureForm.classList.add('hidden');
    document.removeEventListener('keydown', onEscCloseForm);
    uploadFile.value = '';
  };

  var searchForDuplicate = function (hashtags) {
    for (var i = 0; i < hashtags.length; ++i) {
      for (var j = i + 1; j < hashtags.length; ++j) {
        if (hashtags[i].indexOf(hashtags[j]) > -1) {
          return true;
        }
      }
    }
    return false;
  };

  var validateHashtags = function (hashtags) {

    for (var i = 0; i < hashtags.length; ++i) {
      hashtagInput.setCustomValidity('');

      if (hashtags[i][0] !== '#') {
        hashtagInput.setCustomValidity('Хэш-тег должен начинатсья с символа #');
      }

      if (hashtags[i].length === 1) {
        hashtagInput.setCustomValidity('Хэш-тег не может состоять из одного символа #');
      }

      if (hashtags[i].indexOf('#', 1) > -1) {
        hashtagInput.setCustomValidity('Хэш-теги должны быть разделены пробелом');
      }

      if (searchForDuplicate(hashtags)) {
        hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      }

      if (hashtags.length > MAX_HASHTAGS) {
        hashtagInput.setCustomValidity('Нельзя указать больше ' + MAX_HASHTAGS + ' хэш-тегов');
      }

      if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity('Максимальная длина хэш-тега: ' + MAX_HASHTAG_LENGTH + ' символов');
      }

      if (!/^[a-z0-9]+$/.test(hashtags[i].slice(1).toLowerCase())) {
        hashtagInput.setCustomValidity('Хэш-теги могут состоять только из букв и цифр');
      }
    }
  };

  var closeSuccessContainer = function () {
    var successContainer = window.render.mainContainer.querySelector('.success');
    var successButton = successContainer.querySelector('.success__button');
    window.render.mainContainer.removeChild(successContainer);

    document.removeEventListener('keydown', onEscCloseSuccessContainer);
    successButton.removeEventListener('click', closeSuccessContainer);
    document.removeEventListener('click', onClickCloseSuccessContainer);

    uploadPictureForm.reset();
  };

  var onEscCloseSuccessContainer = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeSuccessContainer();
    }
  };

  var onClickCloseSuccessContainer = function (evt) {
    var innerSuccessContainer = window.render.mainContainer.querySelector('.success__inner');
    if (evt.target !== innerSuccessContainer && !(innerSuccessContainer.contains(evt.target))) {
      closeSuccessContainer();
    }
  };

  var onSuccess = function () {
    closeEditForm();

    var successContainer = successTemplate.cloneNode(true);
    var successButton = successContainer.querySelector('.success__button');

    window.render.mainContainer.appendChild(successContainer);

    successButton.addEventListener('click', closeSuccessContainer);

    document.addEventListener('keydown', onEscCloseSuccessContainer);
    document.addEventListener('click', onClickCloseSuccessContainer);
  };

  uploadFile.addEventListener('change', function () {
    openEditForm();
  });

  editCloseButton.addEventListener('click', function () {
    closeEditForm();
  });

  hashtagInput.addEventListener('change', function () {
    var hashtags = hashtagInput.value.toLowerCase().split(' ');
    validateHashtags(hashtags);
  });

  hashtagInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscCloseForm);
  });

  hashtagInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscCloseForm);
  });

  description.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscCloseForm);
  });

  description.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscCloseForm);
  });

  uploadPictureForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.network.saveData(new FormData(uploadPictureForm), onSuccess, window.render.onError);
  });

  window.form = {
    uploadPictureForm: uploadPictureForm,
    effectLevel: effectLevel,
    effectInput: effectInput
  };

})();
