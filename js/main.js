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

var getPictures = function (amount, likesMinimum, likesMaximum) {
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
    var likes = getRandomInt(likesMinimum, likesMaximum + 1);

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
  var picturesContainer = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture').content;

  var getPictureElement = function (picture) {
    var pictureElement = pictureTemplate.querySelector('.picture').cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var pictures = getPictures(amount, 15, 200);

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < amount; ++i) {
    fragment.appendChild(getPictureElement(pictures[i]), pictureTemplate);
  }

  picturesContainer.appendChild(fragment);
};

placePictures(PICTURES_AMOUNT);

