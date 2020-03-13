'use strict';

(function () {
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var uploadFile = window.render.pictureContainer.querySelector('#upload-file');
  var uploadFileForm = window.render.pictureContainer.querySelector('.img-upload__overlay');

  var editCloseButton = uploadFileForm.querySelector('#upload-cancel');
  var hashtagInput = uploadFileForm.querySelector('.text__hashtags');
  var commentTextArea = uploadFileForm.querySelector('.text__description');

  var onEscCloseForm = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      uploadFileForm.classList.add('hidden');
    }
    uploadFile.value = '';
    document.removeEventListener('keydown', onEscCloseForm);
  };

  var openEditForm = function () {
    uploadFileForm.classList.remove('hidden');
    document.addEventListener('keydown', onEscCloseForm);
  };

  var closeEditForm = function () {
    uploadFileForm.classList.add('hidden');
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
        hashtagInput.setCustomValidity('Максимальное число тегов: ' + MAX_HASHTAGS);
      }

      if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity('Максимальная длина хэш-тэга: ' + MAX_HASHTAG_LENGTH + ' символов');
      }
    }
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

  commentTextArea.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscCloseForm);
  });

  commentTextArea.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscCloseForm);
  });

  window.form = {
    uploadFileForm: uploadFileForm
  };

})();
