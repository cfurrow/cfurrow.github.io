---
layout: post
mathjax: false
featured: false
comments: false
published: false
title: Phaser.js - Wave Example
categories:
  - game development
tags: gamedev phaserjs javascript
---

I posted this animation to Twitter a few weeks ago, and I thought I'd walk through the origin story of how it came to be and the steps I took to create it.

<div class="row">
  <div class="column small-centered small-12 medium-centered medium-6">
    <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Goodnight. <a href="https://t.co/uimVkBzqdb">pic.twitter.com/uimVkBzqdb</a></p>&mdash; Carl Furrow (@carl_furrow) <a href="https://twitter.com/carl_furrow/status/772992053810606080">September 6, 2016</a></blockquote>
    <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
  </div>
</div>


***

I was on [/r/phaser](https://www.reddit.com/r/phaser/comments/4svphl/is_there_actually_a_way_to_wrap_the_texture_of_a/) and [/u/oddkraken](https://www.reddit.com/user/oddkraken) was wondering how to wrap a texture over a `Phaser.Rope` object. If you're not familiar with a `Phaser.Rope` object, [check out this example](http://phaser.io/examples/v2/sprites/rope). Below is the reddit post:

> The rope documentation says
>
>> A Rope is a Sprite that has a repeating texture. The texture will automatically wrap on the edges as it moves.
>
> As the texture moves? The rope? I've tried moving the rope around and adjusting the crop and frame of the texture, but nothing works. I'm using ropes for waves in my game (http://orangesea.oddkraken.com/), and I want to scroll the texture by while keeping the waves moving up and down, so it looks like the player is moving to the right.
>
> Is there a better way to go about this?
> Thanks.

This particular use of `Phaser.Rope` is not possible at this time. A Rope's texture ends up being "glued" to the rope object, and cannot be transformed left/right down the rope's geometry. Each segment of the rope is "fused" to the texture at it's x-position at creation-time, essentially. See the video below and note that each green square is a segment of the rope, and inside that segment, the texture is mapped to that square, and cannot be shifted left or right (or up or down).

<div class="row">
  <div class="small-12 small-centered medium-6 medium-centered column">
    <figure>
    <video width="100%" autoplay loop preload>
      <source src="{{this.site.url}}/images/phaser-waves/rope-example.mp4" type="video/mp4">
      <source src="{{this.site.url}}/images/phaser-waves/rope-example.webm" type="video/webm">
    </video>
    <figcaption>Rope example.</figcaption>
    </figure>
  </div>
</div>


But, that does not mean we cannot accomplish something similar in Phaser, so I tried my hand at it.

## What I needed
I could have simply tried to answer /u/oddkraken's request, but I thought it was an interesting enough problem to try and solve myself. The added benefit was if I could get it to work, I could simply send them the link to my fully-working code. To build this example, I would need some assets. I went to work inside of [Pyxel Edit](http://pyxeledit.com/) and built a little boat, and a spritesheet of some waves. I tend to make all my pixel assets as 32x32 images, then scale them up on export, or inside of Phaser (note: if you scale up in Phaser, you'll want to set `yourSprite.smoothed=false;` or else it'll look blurry.)

<img src="{{this.site.url}}/images/phaser-waves/boat.png" />

<img src="{{this.site.url}}/images/phaser-waves/wave.png" />

Great! Assets done and looking pretty good.

## Waves need to move like waves
Next, I needed to come up with a way to place these waves next to each other, and allow them to move independently in a "wave-like" fashion. Rolling and bobbing up and down.

<div class="row">
  <div class="small-12 small-centered medium-6 medium-centered column">
    <figure>
    <video width="100%" autoplay loop preload>
      <source src="{{this.site.url}}/images/phaser-waves/waves01.mp4" type="video/mp4">
      <source src="{{this.site.url}}/images/phaser-waves/waves01.webm" type="video/webm">
    </video>
    <figcaption>See the full code <a href="https://github.com/cfurrow/phaser-wave-example/tree/waves01">here</a></figcaption>
    </figure>
  </div>
</div>

To move each wave up and down gradually, I use Javascript's `Math.sin` function in my `update` function that gets called once per frame:

``` javascript
animateWaves: function(){
  // this.count increments every frame. gives us a constantly
  // increasing X value for our sin function
  this.count += 0.1;
  var i = 0;
  this.waves.forEach(function(currentWave){
    var x = i + this.count;
    var y = Math.sin(x) * 5;
    currentWave.y = y;
    i++;
  }, this);
},
```

Giving `Math.sin` an x-value, outputs a y-value at that x. As x increases, the y value oscillates up and down. If you were to plot these y values for every x value from 0 to 10, let's say, you'd see a wave-like pattern emerge. This is obviously perfect for what we are trying to accomplish here!

In our case, we give `Math.sin` and x-value that is composed of two things: the current wave's number, `i` and a counter (`this.count`) that increments by 0.1 every time a frame is drawn to the screen (30-60 times per second!). After getting the y-value out of `Math.sin(x)`, we multiply that value by 5 to increase the height (amplitude) of the wave. If we did not multiple, we'd have very tiny wave motions and I wanted the waves to appear to be large and rolling.

## Boat and waves should collide
Now that the waves are moving, we need a way to collide them with a boat. Phaser has built-in physics that can handle this by creating a "physics body" for each element that needs to interact with the physics engine. In our case, since the boat, and each wave are going to collide, that means all of those elements will need a physics body attached to it. By default, the physics body is square and is most often referred to as a "hit box". But, for our purposes, I thought I'd try to use a circle, and you'll see why in a little bit.

<div class="row">
  <div class="small-12 small-centered medium-6 medium-centered column">
    <figure>
    <video width="100%" autoplay loop preload>
      <source src="{{this.site.url}}/images/phaser-waves/waves02.mp4" type="video/mp4">
      <source src="{{this.site.url}}/images/phaser-waves/waves02.webm" type="video/webm">
    </video>
    <figcaption>Full code <a href="https://github.com/cfurrow/phaser-wave-example/tree/waves02">here.</a></figcaption>
    </figure>
  </div>
</div>

The code:

```javascript
for (var i = 0; i < numWaves; i++){
  x = i*waveLength;
  y = 0;
  wave = this.game.add.sprite(x, y, 'wave', this.game.rnd.between(0,1));

  wave.anchor.set(0.5,0.5);
  wave.smoothed=false;
  this.waves.add(wave);
  // randomize the circle size to vary the motion of anything
  // that collides with this wave
  wave.body.setCircle(this.game.rnd.between(80,140));
  // offset the wave slightly below the top of the sprite
  wave.body.offset.set(0, 50);
  // do not allow other objects to "push" this sprite.
  // simply collide
  wave.body.immovable = true;
}
```

I've highlighted the physics bodies (green) in Phaser to show the boat and waves colliding. Once we add some velocity to the boat, it will collide with each circle it meets, giving its path an irregular shape, almost as if it were riding up and down the slope of a wave. That's why using a circle physics body on the boat and all of the waves works better in this instance.

## Motion!
In order to make this more interesting, the boat needs to move and when the boat moves, the waves need to "shift" to the left adding new waves off the right side of the screen, and disappearing waves off the left side as they go out of view. This is how we'll create an "infinite" sea for the boat to explore. As its velocity moves it to the right, we'll constantly swap in new wave tiles so it always has something to sail on.

``` javascript
update: function() {
  this.game.physics.arcade.collide(this.boat, this.waves);
  this.boat.body.velocity.x = 90; // Constantly move boat to the right
  this.animateWaves();
},
```

<div class="row">
  <div class="small-12 small-centered medium-6 medium-centered column">
    <figure>
    <video width="100%" autoplay loop preload>
      <source src="{{this.site.url}}/images/phaser-waves/waves03.mp4" type="video/mp4">
      <source src="{{this.site.url}}/images/phaser-waves/waves03.webm" type="video/webm">
    </video>
    <figcaption>Full code <a href="https://github.com/cfurrow/phaser-wave-example/tree/waves03">here.</a></figcaption>
    </figure>
  </div>
</div>

As you can see, the boat eventually falls off the last wave, and off the screen. We need to implement the "infinite" part of this example, and continuously swap the left-most wave sprite to the right side of the screen, so the boat can never "fall off" the screen and to certain death below.

### How to I swap tiles?

On initialization of my scene, after creating each wave sprite, I set a few variables to keep track of where the first and last wave are in the group of waves. The idea is that these indexes will change as the sprite moves from right-to-left across the screen.

*Note: At first I attempted to treat the array as a stack, and "pop off" the wave sprite that was "off the screen" on the left, and then insert it back on the top of the stack, placing it on the far right of the screen. This caused redraw problems, I think, because I would get a 20-50ms stutter every time I had to pop and push. That is how I came up with this index-tracking mechanism.*

``` javascript
this.firstWaveIndex = 0;
this.lastWaveIndex = this.numWaves-1;
```

Once per frame of animation, I take a look at the first and last wave in my group of wave sprites. If the first wave has fallen off the screen (it's left-most x-position is less than the camera's x-position), move the sprite to the far right by setting its new x-position just to the right of the current last wave sprite. Then, set the `lastWaveIndex` to the `firstWaveIndex`, since it was just pushed to the far right, and increment the `firstWaveIndex` by 1 to make the now left-most wave sprite the "first" sprite. I also correct for if we increment the index and it's greater than the number of waves we're currently rendering. In that case, I set the `firstWaveIndex` to 0 to "wrap-around" the index.

``` javascript
shuffleLeftMostWave: function(){
  // Look at left-most this.waves.children only!
  // check if the current wave's right edge (in world coords)
  // is less than the camera's left edge
  var firstWave = this.waves.children[this.firstWaveIndex];
  var lastWave  = this.waves.children[this.lastWaveIndex];

  if((firstWave.world.x + firstWave.offsetX) < this.game.camera.x) {
    newX = lastWave.x + this.WAVE_LENGTH;
    firstWave.x = newX;
    this.lastWaveIndex = this.firstWaveIndex;
    if(this.firstWaveIndex+1 >= this.numWaves){
      this.firstWaveIndex = 0;
    } else {
      this.firstWaveIndex++;
    }
  }
}
```

I've numbered each wave with its index, so you can see them repeat themselves after the 5th wave. There are only six waves total, numbered 0, through 5.

<div class="row">
  <div class="small-12 small-centered medium-6 medium-centered column">
    <figure>
    <video width="100%" autoplay loop preload>
      <source src="{{this.site.url}}/images/phaser-waves/waves04.mp4" type="video/mp4">
      <source src="{{this.site.url}}/images/phaser-waves/waves04.webm" type="video/webm">
    </video>
    <figcaption>Full code <a href="https://github.com/cfurrow/phaser-wave-example/tree/waves04">here.</a></figcaption>
    </figure>
  </div>
</div>

### How did the boat move "endlessly"?
The boat has a velocity on its x-axis that constantly propels it forward through the world. This particular game world is only 10,000 pixels wide, but again, I'm only using enough wave segments to fill the width of the screen. The camera is also fixed to the boat, so as it moves, the boat stays centered.

An alternate way to "move" the boat would be to not give it a velocity at all, and experiment with simply moving the waves to the left, and the boat would naturally collide with the wave bodies and slide over them. I'd have to make sure the boat could not slide backwards and only move forward, and I'm not sure how easily that would be done.

Additionally, I could keep the X-velocity on the boat, and then as the player got to a world X coordinate (say, 9,000 of 10,000 pixels), I could reset the player's X position back to world-position 0, since the waves are fixed to the camera, and then the boat would be free to travel for another 9,000 pixels and never see the "end" of the world at 10,000 pixels. At this rate the world wouldn't even have to be 10,000 pixels, but instead, just wide enough to fit the entire user's viewport, plus some padding to the right, and then as the user got to the edge of this world length, reset them back to 0.

## End Result

<div class="row">
  <div class="small-12 small-centered medium-6 medium-centered column">
    <figure>
    <video width="100%" autoplay loop preload>
      <source src="{{this.site.url}}/images/phaser-waves/phaser-wave.mp4" type="video/mp4">
      <source src="{{this.site.url}}/images/phaser-waves/phaser-wave.webm" type="video/webm">
    </video>
    <figcaption>Full code for final scene <a href="https://github.com/cfurrow/phaser-wave-example/">here.</a></figcaption>
    </figure>
  </div>
</div>

- [Here is a live demo](https://cfurrow.github.io/phaser-wave-example/)
- Check out the repo here: https://github.com/cfurrow/phaser-wave-example/
