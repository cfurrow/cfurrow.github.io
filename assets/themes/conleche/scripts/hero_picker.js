$(function(){
  var $hero = $('#hero');
  var imageCount = 5;
  var path = "/assets/hero/";

  var heroPath = "url(" + path + Math.floor((Math.random() * (imageCount + 1))).toString() + ".jpg)";

  $hero.css('background-image', heroPath);

});
