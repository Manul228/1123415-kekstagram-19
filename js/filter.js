'use strict';

(function () {

  var SCALE_STEP = 25;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var MAX_BLUR_VALUE = 3;
  var BRIGHTNESS_RANGE = 2;
  var MIN_BRIGHTNESS_VALUE = 1;

  var imagePreview = window.form.uploadFileForm.querySelector('.img-upload__preview img');

  var reduceButton = window.form.uploadFileForm.querySelector('.scale__control--smaller');
  var enlargeButton = window.form.uploadFileForm.querySelector('.scale__control--bigger');
  var scaleField = window.form.uploadFileForm.querySelector('.scale__control--value');

  var effectButtons = window.form.uploadFileForm.querySelectorAll('.effects__radio');
  var effectLevel = window.form.uploadFileForm.querySelector('.effect-level');
  var effectInput = effectLevel.querySelector('.effect-level__value');
  var effectlevelBar = effectLevel.querySelector('.effect-level__line');
  var effectLevelButton = effectLevel.querySelector('.effect-level__pin');

  var setImageScale = function (positiveFlag) {
    var currentScale = Number.parseInt(scaleField.value, 10);

    if (positiveFlag && (currentScale + SCALE_STEP) <= MAX_SCALE) {
      scaleField.value = (currentScale + SCALE_STEP) + '%';
      imagePreview.style.transform = 'scale(' + (currentScale + SCALE_STEP) / 100 + ')';
    }

    if (!positiveFlag && (currentScale - SCALE_STEP) >= MIN_SCALE) {
      scaleField.value = (currentScale - SCALE_STEP) + '%';
      imagePreview.style.transform = 'scale(' + (currentScale - SCALE_STEP) / 100 + ')';
    }
  };

  var onChangeSelectFilter = function () {
    imagePreview.style.filter = '';
    var currentEffect;

    for (i = 0; i < effectButtons.length; i++) {
      if (effectButtons[i].checked) {
        imagePreview.classList.remove('effects__preview--' + currentEffect);
        currentEffect = effectButtons[i].value;
        if (currentEffect !== 'none') {
          effectLevel.classList.remove('hidden');
          imagePreview.classList.add('effects__preview--' + currentEffect);
        } else {
          effectLevel.classList.add('hidden');
        }
      }
    }
  };

  var countEffectLevel = function () {
    var bar = effectlevelBar.getBoundingClientRect();
    var pin = effectLevelButton.getBoundingClientRect();
    var barLength = bar.right - bar.left;
    var pinOffset = pin.left - bar.left;

    return Math.round((pinOffset / barLength + 0.02) * 100);
  };

  var setEffectLevel = function () {
    effectInput.value = countEffectLevel();

    var effect = window.getComputedStyle(imagePreview).filter.split('(', 1);

    switch (effect[0]) {
      case 'grayscale':
        effect += '(' + effectInput.value + '%)';
        imagePreview.style.filter = effect;
        break;
      case 'sepia':
        effect += '(' + effectInput.value + '%)';
        imagePreview.style.filter = effect;
        break;
      case 'invert':
        effect += '(' + effectInput.value + '%)';
        imagePreview.style.filter = effect;
        break;
      case 'blur':
        effect += '(' + (effectInput.value / 100 * MAX_BLUR_VALUE) + 'px)';
        imagePreview.style.filter = effect;
        break;
      case 'brightness':
        effect += '(' + (effectInput.value / 100 * BRIGHTNESS_RANGE + MIN_BRIGHTNESS_VALUE) + ')';
        imagePreview.style.filter = effect;
        break;
    }
  };

  reduceButton.addEventListener('click', function () {
    var positiveFlag = false;
    setImageScale(positiveFlag);
  });

  enlargeButton.addEventListener('click', function () {
    var positiveFlag = true;
    setImageScale(positiveFlag);
  });

  for (var i = 0; i < effectButtons.length; i++) {
    effectButtons[i].addEventListener('change', onChangeSelectFilter);
  }

  effectLevelButton.addEventListener('mouseup', function () {
    setEffectLevel();
  });
})();
