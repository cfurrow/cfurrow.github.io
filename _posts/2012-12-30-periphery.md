---
layout: post
title: "Periphery.js: HTML5 Canvas + Maths!"
description: "Challenged myself to make something in javascript that casts shadows from a moving light source."
category: html5
tags: [canvas, html5, math]
---


<div id="demo" style="margin: 0 auto; width: 800px;">
  <canvas width="800" height="500" id="c"></canvas>
</div>
<script type="text/javascript" src="/assets/demo/periphery.min.js"></script>

[Source on github](https://github.com/cfurrow/periphery.js)

### What?

This project demos HTML5 Canvas 2D and clipping objects with other objects. In
this case, it’s clipping other scene elements with an emulation of the
player’s view-field cone. You can rotate your vision with the left/right keys,
and move in the direction you’re facing with the up key, or move in the
opposite direction with the down key.

It’s a proof of concept, and a chance to dust off the parts of my brain that
used to know things about geometry and 2D math. I still daydream of creating a
game in the browser, and starting from the ground up (e.g. reinventing the
wheel) is how I learn best. A few years ago I heard it described as: “Don’t
hire someone for a job you haven’t already done yourself.” That’s how I feel
about frameworks most of the time. I want to go through the pain of re-
learning low-level stuff, then work my way forward to something easier.

### Did you learn anything?

Yes, a lot! Mainly that I’ve disappointed my high school geometry teacher
(sorry Mr. Metzger!). Simple things like solving triangles, re-learning the
law of sines, etc. Makes a person humble, that’s for sure. It came back to me
in trickles, and I tried my hardest to figure the math out myself before
running to Google.

The next hardest part was figuring out a canvas context’s `.clip()` method and
how to combine it with `.save()` and `.restore()` for what I need. I cover that a
bit here so others can learn from my struggles.

### .clip(), .save() and .restore()

`context.clip()` is like `context.fill()` or `context.stroke()` but instead of
painting a shape or lines to the canvas, it “hides” anything that doesn’t fall
within that shape. So only intersecting elements that fall within that
clipping shape are seen.

[See an example of this on MDN.](https://developer.mozilla.org/samples/canvas-tutorial/6_2_canvas_clipping.html)

I knew I would need to use clip() to only show items that fell within the
visual range of the “player”. Things falling outside of that would not be
rendered. This could simulate a top-down representation of a person’s visual
field.

Here’s the code I ended up with:

``` javascript
function drawPeripheryVision(ctx,player){
  ctx.beginPath();

  ctx.fillStyle = "rgba(20,20,20,0.9)";
  player.periphery = [];

  ctx.moveTo(player.x,player.y);
  player.periphery.push(player.x,player.y);

  var trianglePointX = player.x + player.visionRadius*Math.cos(player.direction - deg2rad(50));
  var trianglePointY = player.y + player.visionRadius*Math.sin(player.direction - deg2rad(50));

  ctx.lineTo(trianglePointX,trianglePointY);
  player.periphery.push([trianglePointX,trianglePointY]);

  trianglePointX = player.x + player.visionRadius*Math.cos(player.direction + deg2rad(50));
  trianglePointY = player.y + player.visionRadius*Math.sin(player.direction + deg2rad(50));

  ctx.lineTo(trianglePointX,trianglePointY);
  player.periphery.push([trianglePointX,trianglePointY]);

  ctx.lineTo(player.x,player.y);
  ctx.closePath();
  ctx.fill();
  ctx.clip();
}

function drawCentralVision(ctx,player) {
  ctx.beginPath();

  ctx.fillStyle = "rgba(200,200,200,0.9)";
  ctx.moveTo(player.x,player.y);

  player.central = [];
  player.central.push([player.x,player.y]);

  var trianglePointX = player.x + player.visionRadius * Math.cos(player.direction - deg2rad(15));
  var trianglePointY = player.y + player.visionRadius * Math.sin(player.direction - deg2rad(15));

  ctx.lineTo(trianglePointX,trianglePointY);
  player.central.push([trianglePointX,trianglePointY]);

  trianglePointX = player.x + player.visionRadius * Math.cos(player.direction + deg2rad(15));
  trianglePointY = player.y + player.visionRadius * Math.sin(player.direction + deg2rad(15));
  ctx.lineTo(trianglePointX,trianglePointY);
  player.central.push([trianglePointX,trianglePointY]);

  ctx.lineTo(player.x,player.y);

  ctx.closePath();
  ctx.fill();
  ctx.clip();
}

function drawPlayer(ctx,player){
  var x = player.x;
  var y = player.y;
  var direction = player.direction;

  ctx.beginPath();
  ctx.fillStyle = "#ffffff";
  ctx.arc(x,y, radius+2, 0, Math.PI*2, false);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = "#5e9fd2";
  ctx.arc(x,y, radius, 0, Math.PI*2, false);
  ctx.fill();
  ctx.closePath();

  ctx.globalCompositeOperation = 'xor';
  drawPeripheryVision(ctx,player);

  ctx.save();
  ctx.globalCompositeOperation = 'xor';
  drawCentralVision(ctx,player);
  ctx.restore();
}

function frame(){
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

  handleMovement(player);

  ctx.save();
  drawPlayer(ctx,player);
  drawScene(player);
  ctx.restore();

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
```

You’ll see that in `drawPeripheryVision()`
and `drawCentralVision()` I create the triangular vision fields, then I fill
them with color, then use the same shape to clip the rest of the canvas
falling outside those triangles away.

`drawPlayer()` then puts it all together, creating the central player circle,
plus the vision fields. You’ll also see my use of the
`globalCompositeOperation=’xor’`, [see this link for details on that](https://developer.mozilla.org/samples/canvas-tutorial/6_1_canvas_composite.html.
Then, after
the peripheral triangle is drawn, I save the canvas state, draw the central
vision (and clip), then restore the canvas. If I don’t do this, then the
peripheral-triangle’s “xor” does not get applied, but instead, it is
overwritten. By calling .restore(), I re-instate that effect to let the
objects that fall within the peripheral clipping shape to show, but be darker
(xor’d with the color of my periphery triangle).

I do a similar technique in the `frame()` function. I save the state of the
entire canvas, then draw the player and the scene with all their clipping and
composite changes, then restore the canvas. If I did not save/restore on each
frame() call, the first clipping path of the periphery would stick, and not
move as the player rotated their vision around.

### Moving in the direction you are facing

I used `document.onkeydown` to capture all keyboard events, and I used `onkeydown`
so that if a user holds a direction I keep moving until that key comes up.

Here’s the code for my `onkeydown` and `onkeyup` handlers:

``` javascript
document.onkeydown = function(e){
  var movement=false;
  if(e.which == 38){
    player.movingForward = true;
    player.movingBack = false;
    movement=true;
  }
  if(e.which == 40){
    player.movingBack = true;
    player.movingForward = false;
    movement=true;
  }
  if(e.which == 37 ){
    player.turningLeft = true;
    player.turningRight = false;
    movement=true;
  }
  if(e.which == 39 ){
    player.turningRight = true;
    player.turningLeft = false;
    movement=true;
  }
  return !movement; // don't bubble event
}

document.onkeyup = function(e){
  if(e.which == 38){
    player.movingForward=false;
  }
  if(e.which==40){
    player.movingBack=false;
  }
  if(e.which==37){
    player.turningLeft = false;
  }
  if(e.which==39){
    player.turningRight = false;
  }
  return false; // don't bubble event
}
```

1. The movement variable was so that the app would “swallow” all keys I deemed as
part of the movement system. Up, Down, Left and Right. Those keys would not
bubble up to the browser and try to scroll the page around. This also allowed
me to be able to press `Command+R` to refresh the page, and those keys were
allowed to bubble up to the browser.
2. The `e.which` statements are not cross
browser, but they work fine for Chrome/Firefox. Additionally, you’ll see
`player.turningRight` or `player.movingDown` booleans. They stay set as long as
the key is held down, so that on each pass of the main loop, the player is
moving smoothly through each frame.
3. Like I mentioned above, returning
`!movement` returns ‘false’ when a movement key was pressed, and therefore, the
event doesn’t bubble up.

The code that moves the player is below. It is called
each time the game loops:

``` javascript
function handleMovement(player) {
  if(player.movingForward){
    player.y += player.velocity * 2.5 * Math.sin(player.direction);
    player.x += player.velocity * 2.5 * Math.cos(player.direction);
  }
  if(player.movingBack){
    player.y -= player.velocity * 2.5 * Math.sin(player.direction);
    player.x -= player.velocity * 2.5 * Math.cos(player.direction);
  }
  if(player.turningRight){
    player.direction += deg2rad(player.velocity);
  }
  if(player.turningLeft){
    player.direction -= deg2rad(player.velocity);
  }
  player.x = (player.x-player.radius) < 0 ? player.radius : player.x;
  player.x = (player.x+player.radius) > ctx.canvas.width ? ctx.canvas.width-player.radius : player.x;
  player.y = (player.y-player.radius) < 0 ? player.radius : player.y;
  player.y = (player.y+player.radius) > ctx.canvas.height ? ctx.canvas.height-player.radius : player.y;
}
```

### RequestAnimationFrame

As is customary with canvas animation, I used `requestAnimationFrame()` versus
`setTimeout()` to call my main `frame()` function each time the scene needed to be
redrawn. Nothing special there.
