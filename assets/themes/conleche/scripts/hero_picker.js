$(function(){
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  var $hero = $('#hero');
  var imageCount = 5;
  var path = "/assets/hero/";

  var heroPath = "url(" + path + getRandomArbitrary(1, imageCount+1).toString() + ".jpg)";

  $hero.css('background-image', heroPath);


});
