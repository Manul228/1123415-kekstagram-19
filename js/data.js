'use strict';

(function () {

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

  var getComments = function (number) {
    var comments = [];

    for (var i = 0; i < number; ++i) {
      var avatar = 'img/avatar-' + window.utils.getRandomInt(1, AVATARS_AMOUNT + 1) + '.svg';
      var message = window.utils.getRandomElement(MESSAGES);
      var name = window.utils.getRandomElement(NAMES);

      var comment = {
        avatar: avatar,
        message: message,
        name: name
      };

      comments.push(comment);
    }
    return comments;
  };

  var getPictures = function (amount) {
    var pictures = [];

    for (var i = 1; i < amount + 1; ++i) {
      var url = 'photos/' + i + '.jpg';
      var description = 'Какое-то описание, в ТЗ нет указаний на этот счёт';
      var likes = window.utils.getRandomInt(15, 200 + 1);

      var comments = getComments(window.utils.getRandomInt(0, likes / 3));

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

  var pictures = getPictures(PICTURES_AMOUNT);

  window.data = {
    pictures: pictures
  };

})();
