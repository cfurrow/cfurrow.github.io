---
layout: post
title: "Wolfenstein 3D: FizzleFade"
description: Fabien Sanglard's breakdown of Wolfenstein 3D's FizzleFade, in JavaScript.
headline:
modified: 2017-09-02 17:31:53 -0400
category: javascript
tags: [javascript]
comments: true
featured: false
---

While trying to read through my recent Instapaper articles, I was excited to come across [Fabien Sanglard's breakdown of Wolfenstein 3D's FizzleFade function](http://fabiensanglard.net/fizzlefade/index.php). It also reminded me to purchase his eBook, [Game Engine Black Book: Wolfenstein 3D](https://play.google.com/store/books/details/Fabien_Sanglard_Game_Engine_Black_Book?id=Lq4yDwAAQBAJ). Anyway, you should read the article; it's short and explains the technique well.

After reading it, I wanted to recreate the C code in JavaScript, and, well, there's not much more to it than that.

```javascript
var screen = document.getElementById('screen');
var ctx = screen.getContext('2d');

function fizzle_pixel(x, y) {
  setTimeout(function() {
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.fillRect(x, y, 1, 1);
  }, 10);
}

function fizzlefade() {
  var randomValue = 1;
  var x, y;
  do {
    // Y = low 8 bits
    y = randomValue & 0x000FF;
    // X = High 9 bits
    x = (randomValue & 0x1FF00) >> 8;
    // Get the output bit.
    var leastSignificantBit = randomValue & 1;
    // Shift register
    randomValue >>= 1;
    // If the output is 0, the xor can be skipped
    if (leastSignificantBit !== 0) {
      randomValue ^= 0x00012000;
    }
    // If x,y coordinate within the screen width/height, fizzle it!
    if (x < 320 && y < 200) {
      fizzle_pixel(x, y);
    }
  } while (randomValue != 1);
}

fizzlefade();
```

See the results here:

<style>
canvas {
  background-color: #000;
  background-image: url(http://lorempixel.com/320/200);
}
#fizzle-example {
  text-align: center;  
}
</style>
<div id="fizzle-example">
<canvas id="screen" width="320" height="200"></canvas>
<br/>
<a id="rerun" href="javascript:void(0);">Re-run</a>
</div>

<script>
window.onload = function(){
  var screen = document.getElementById('screen');
  var ctx = screen.getContext('2d');
  var $rerun = document.getElementById('rerun');
  $rerun.addEventListener('click', function(){
    fizzlefade();
  })

  function fizzle_pixel(x, y) {
    setTimeout(function() {
      ctx.fillStyle = 'rgb(255,0,0)';
      ctx.fillRect(x, y, 1, 1);
    }, 10);
  }

  function fizzlefade() {
    ctx.clearRect(0,0, 320,200);
    var randomValue = 1;
    var x, y;
    do {
      // Y = low 8 bits
      y = randomValue & 0x000FF;
      // X = High 9 bits
      x = (randomValue & 0x1FF00) >> 8;
      // Get the output bit.
      var leastSignificantBit = randomValue & 1;
      // Shift register
      randomValue >>= 1;
      // If the output is 0, the xor can be skipped
      if (leastSignificantBit !== 0) {
        randomValue ^= 0x00012000;
      }
      // If x,y coordinate within the screen width/height, fizzle it!
      if (x < 320 && y < 200) {
        fizzle_pixel(x, y);
      }
    } while (randomValue != 1);
  }

  fizzlefade();
}
</script>
