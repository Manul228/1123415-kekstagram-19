'use strict';

(function () {

  var SCALE_STEP = 25;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var MAX_BLUR_VALUE = 3;
  var BRIGHTNESS_RANGE = 2;
  var MIN_BRIGHTNESS_VALUE = 1;

  var imagePreview = window.form.uploadOverlay.querySelector('.img-upload__preview img');

  var reduceButton = window.form.uploadOverlay.querySelector('.scale__control--smaller');
  var enlargeButton = window.form.uploadOverlay.querySelector('.scale__control--bigger');
  var scaleField = window.form.uploadOverlay.querySelector('.scale__control--value');

  var effectButtons = window.form.uploadOverlay.querySelectorAll('.effects__radio');
  var effectLevel = window.form.effectLevel;
  var effectInput = effectLevel.querySelector('.effect-level__value');
  var effectLevelBar = effectLevel.querySelector('.effect-level__line');
  var effectLevelButton = effectLevel.querySelector('.effect-level__pin');
  var effectLevelFillBar = effectLevel.querySelector('.effect-level__depth');

  var bar;
  var barLength;

  var setImageScale = function (isPositive) {
    var currentScale = Number.parseInt(scaleField.value, 10);

    if (isPositive && (currentScale + SCALE_STEP) <= MAX_SCALE) {
      scaleField.value = (currentScale + SCALE_STEP) + '%';
      imagePreview.style.transform = 'scale(' + (currentScale + SCALE_STEP) / 100 + ')';
    }

    if (!isPositive && (currentScale - SCALE_STEP) >= MIN_SCALE) {
      scaleField.value = (currentScale - SCALE_STEP) + '%';
      imagePreview.style.transform = 'scale(' + (currentScale - SCALE_STEP) / 100 + ')';
    }
  };

  var onChangeSelectFilter = function () {
    imagePreview.style.filter = '';
    var currentEffect;

    effectButtons.forEach(function (effectButton) {
      imagePreview.classList.remove('effects__preview--' + effectButton.value);
    });

    effectButtons.forEach(function (effectButton) {
      if (effectButton.checked) {
        imagePreview.classList.remove('effects__preview--' + currentEffect);
        currentEffect = effectButton.value;
        if (currentEffect !== 'none') {
          effectLevel.classList.remove('hidden');
          imagePreview.classList.add('effects__preview--' + currentEffect);
          bar = effectLevelBar.getBoundingClientRect();
          barLength = bar.right - bar.left;
          effectLevelButton.style.left = barLength + 'px';
          effectLevelFillBar.style.width = '100%';
        } else {
          effectLevel.classList.add('hidden');
        }
      }
    });
  };

  var countEffectLevel = function () {
    var pin = effectLevelButton.getBoundingClientRect();
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

  var onEffectPinMousemove = function (evt) {
    bar = effectLevelBar.getBoundingClientRect();
    barLength = bar.right - bar.left;

    var shift = evt.clientX - bar.left;

    if (shift > 0 && shift <= barLength) {
      effectLevelButton.style.left = shift + 'px';
    }

    effectLevelFillBar.style.width = countEffectLevel() + '%';

    setEffectLevel();
  };

  var onEffectPinMouseup = function (evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', onEffectPinMousemove);
    document.removeEventListener('mouseup', onEffectPinMouseup);
  };

  var onEffectPinMousedown = function (evt) {
    evt.preventDefault();

    document.addEventListener('mousemove', onEffectPinMousemove);
    document.addEventListener('mouseup', onEffectPinMouseup);
  };

  reduceButton.addEventListener('click', function () {
    setImageScale(false);
  });

  enlargeButton.addEventListener('click', function () {
    setImageScale(true);
  });

  effectButtons.forEach(function (effectButton) {
    effectButton.addEventListener('change', onChangeSelectFilter);
  });

  effectLevelButton.addEventListener('mousedown', onEffectPinMousedown);

})();
