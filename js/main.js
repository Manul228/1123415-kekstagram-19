'use strict';

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = [
  'Артём',
  'Вася',
  'Пётр',
  'Роберт Карлович',
  'Вика',
  'Маша',
  'Сара'
];

var AVATARS_AMOUNT = 6;
var PICTURES_AMOUNT = 25;

var picturesContainer = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var getRandomElement = function (array) {
  var len = array.length;

  if (len === 0) {
    return undefined;
  }

  return array[getRandomInt(0, len)];
};

var getPictures = function (amount) {
  var pictures = [];

  var getComments = function (number) {
    var comments = [];

    for (var i = 0; i < number; ++i) {
      var avatar = 'img/avatar-' + getRandomInt(1, AVATARS_AMOUNT + 1) + '.svg';
      var message = getRandomElement(MESSAGES);
      var name = getRandomElement(NAMES);

      var comment = {
        avatar: avatar,
        message: message,
        name: name
      };

      comments.push(comment);
    }
    return comments;
  };

  for (var i = 1; i < amount + 1; ++i) {
    var url = 'photos/' + i + '.jpg';
    var description = 'Какое-то описание, в ТЗ нет указаний на этот счёт';
    var likes = getRandomInt(15, 200 + 1);

    var comments = getComments(getRandomInt(0, likes / 3));

    var picture = {
      url: url,
      description: description,
      likes: likes,
      comments: comments
    };
    pictures.push(picture);
  }
  return pictures;
};

var placePictures = function (amount) {

  var pictureTemplate = document.querySelector('#picture').content;

  var getPictureElement = function (picture) {
    var pictureElement = pictureTemplate.querySelector('.picture').cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var pictures = getPictures(amount);

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < amount; ++i) {
    fragment.appendChild(getPictureElement(pictures[i]), pictureTemplate);
  }

  picturesContainer.appendChild(fragment);

  var firstPicture = pictures[0];

  var showBigPicture = function (picture) {
    bigPicture.classList.remove('hidden');

    var createComments = function (pictureToComment) {
      var htmlComments = [];

      for (var j = 0; j < pictureToComment.comments.length; ++j) {

        var avatar = pictureToComment.comments[j].avatar;
        var name = pictureToComment.comments[j].name;
        var message = pictureToComment.comments[j].message;

        var roundElement = document.createElement('li');
        roundElement.classList.add('social__comment');
        roundElement.innerHTML = '<img class="social__picture" src="' + avatar + '" alt="' + name +
          '" width="35" height="35"><p class="social__text">' + message + '</p>';

        htmlComments.push(roundElement);
      }

      return htmlComments;
    };

    var bigComments = createComments(picture);

    bigPicture.querySelector('.big-picture__img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;

    var socialComments = bigPicture.querySelector('.social__comments');

    var bigCommentsFragment = document.createDocumentFragment();

    for (var k = 0; k < bigComments.length; ++k) {
      bigCommentsFragment.appendChild(bigComments[k]);
    }

    socialComments.appendChild(bigCommentsFragment);

    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');

    document.body.classList.add('modal-open');
  };

  showBigPicture(firstPicture);
};

placePictures(PICTURES_AMOUNT);

var uploadFile = picturesContainer.querySelector('#upload-file');
var uploadOverlay = picturesContainer.querySelector('.img-upload__overlay');
var editCloseButton = uploadOverlay.querySelector('#upload-cancel');
var imagePreview = uploadOverlay.querySelector('.img-upload__preview img');

var reduceButton = uploadOverlay.querySelector('.scale__control--smaller');
var enlargeButton = uploadOverlay.querySelector('.scale__control--bigger');
var scaleField = uploadOverlay.querySelector('.scale__control--value');

var effectButtons = uploadOverlay.querySelectorAll('.effects__radio');
var effectLevel = uploadOverlay.querySelector('.effect-level');
var effectInput = effectLevel.querySelector('.effect-level__value');
var effectlevelBar = effectLevel.querySelector('.effect-level__line');
var effectLevelButton = effectLevel.querySelector('.effect-level__pin');

var hashtagInput = uploadOverlay.querySelector('.text__hashtags');

var ESC_KEYCODE = 27;
var SCALE_STEP = 25;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var MAX_BLUR_VALUE = 3;
var BRIGHTNESS_RANGE = 2;
var MIN_BRIGHTNESS_VALUE = 1;
var MAX_HASHTAGS = 5;
var MAX_HASHTAG_LENGTH = 20;

var onEscCloseForm = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    uploadOverlay.classList.add('hidden');
  }
  uploadFile.value = '';
  document.removeEventListener('keydown', onEscCloseForm);
};

var openEditForm = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onEscCloseForm);
};

var closeEditForm = function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onEscCloseForm);
  uploadFile.value = '';
};

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
  var currentEffect = 0;

  for (i = 0; i < effectButtons.length; ++i) {
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

reduceButton.addEventListener('click', function () {
  setImageScale(false);
});

enlargeButton.addEventListener('click', function () {
  setImageScale(true);
});

for (var i = 0; i < effectButtons.length; ++i) {
  effectButtons[i].addEventListener('change', onChangeSelectFilter);
}

effectLevelButton.addEventListener('mouseup', function () {
  setEffectLevel();
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

var bigPictureCancel = document.querySelector('.big-picture__cancel');

bigPictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});
