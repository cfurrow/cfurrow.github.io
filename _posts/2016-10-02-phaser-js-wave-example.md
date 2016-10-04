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

I posted this animation to Twitter a few weeks ago, and I thought I'd walk through the origin story of how it came to be and some improvements I could make to it if I were to further the idea.

<div class="row">
  <div class="column small-centered small-12 medium-centered medium-6">
    <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Goodnight. <a href="https://t.co/uimVkBzqdb">pic.twitter.com/uimVkBzqdb</a></p>&mdash; Carl Furrow (@carl_furrow) <a href="https://twitter.com/carl_furrow/status/772992053810606080">September 6, 2016</a></blockquote>
    <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
  </div>
</div>


***

I was on [/r/phaser](https://www.reddit.com/r/phaser/comments/4svphl/is_there_actually_a_way_to_wrap_the_texture_of_a/) and /u/oddkraken was wondering how to wrap a texture over a `Phaser.Rope` object. If you're not familiar with a `Phaser.Rope` object, [check out this example](http://phaser.io/examples/v2/sprites/rope). Below is the reddit post:

> The rope documentation says
>
>> A Rope is a Sprite that has a repeating texture. The texture will automatically wrap on the edges as it moves.
>
> As the texture moves? The rope? I've tried moving the rope around and adjusting the crop and frame of the texture, but nothing works. I'm using ropes for waves in my game (http://orangesea.oddkraken.com/), and I want to scroll the texture by while keeping the waves moving up and down, so it looks like the player is moving to the right.
>
> Is there a better way to go about this?
> Thanks.

What oddkraken is wondering is not possible with `Phaser.Rope` at this time. A Rope's texture ends up being "glued" to the rope object, and cannot be transformed left/right down the rope's geometry. Each segment of the rope is "fused" to the texture at it's x-position at creation-time, essentially. But, that does not mean we cannot accomplish something similar in Phaser, so I tried my hand at it.

## What I needed
I could have simply tried to answer oddkraken's request, but I thought it was an interesting enough problem to try and solve myself as a full-solution. The added benefit was if I could get it to work, I could simply send them the link to my fully-working code. To build this example, I would need some assets. I went to work inside of [Pyxel Edit](http://pyxeledit.com/) and built a little boat, and a spritesheet of some waves. I tend to make all my pixel assets in 32x32, then scale them up on export, or inside of Phaser (note: if you scale up in Phaser, you'll want to set `yourSprite.smoothed=false;` or else it'll look blurry.)

<img src="{{this.site.url}}/images/phaser-waves/boat.png" />

<img src="{{this.site.url}}/images/phaser-waves/wave.png" />

## Waves need to move like waves
Next, I needed to come up with a way to place these waves next to each other, and allow them to move independently in a "wave-like" fashion. Rolling and bobbing up and down.

<div class="row">
  <div class="small-12 small-centered medium-6 medium-centered column">
    <video width="100%" autoplay loop preload>
      <source src="{{this.site.url}}/images/phaser-waves/waves01.mp4" type="video/mp4">
      <source src="{{this.site.url}}/images/phaser-waves/waves01.webm" type="video/webm">
    </video>
  </div>
</div>

To move each wave up and down gradually, I use `Math.sin` in a function that gets called once per frame:

``` javascript
animateWaves: function(){
  // increments every frame. gives us a constantly
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

## Boat and waves should collide
Now that the waves are moving, we need a way to collide them with a boat. Phaser has built-in physics that can handle this by creating a "physics body" for each element that needs to interact with the physics engine. In our case, since the boat, and each wave are going to collide, that means all of those elements will need a physics body attached to it. By default, the physics body is square and is most often referred to as a "hit box". But, for our purposes, I thought I'd try to use a circle, and you'll see why in a little bit.


<div class="row">
  <div class="small-12 small-centered medium-6 medium-centered column">
    <video width="100%" autoplay loop preload>
      <source src="{{this.site.url}}/images/phaser-waves/waves02.mp4" type="video/mp4">
      <source src="{{this.site.url}}/images/phaser-waves/waves02.webm" type="video/webm">
    </video>
  </div>
</div>

I've highlighted the physics bodies (green) in Phaser to show the boat and waves colliding. Once we add some velocity to the boat, it will collide with each circle it meets, giving its path an irregular shape, almost as if it were riding up and down the slope of a wave. Kind of.

## Motion!
In order to make this more interesting, the boat needs to move and when the boat moves, the waves need to "shift" to the left adding new waves off the right side of the screen, and disappearing waves off the left side as they go out of view. This is how we'll create an "infinite" sea for the boat to explore. As its velocity moves it to the right, we'll constantly swap in new wave tiles so it always has something to sail on.

### How did I swap tiles from the left "end" to the right "end"?


### How did the boat move "endlessly"?
The boat has a velocity on its x-access that constantly propels it forward through the world. This particular game world is only 10,000 pixels wide, but again, I'm only using enough wave segments to fill the width of the screen. The camera is also fixed to the boat, so as it moves, the boat stays centered.

An alternate way to "move" the boat would be to not give it a velocity at all, and experiment with simply moving the waves to the left, and the boat would naturally collide with the wave bodies and slide over them. I'd have to make sure the boat could not slide backwards and only move forward, and I'm not sure how easily that would be done.

Additionally, I could keep the X-velocity on the boat, and then as the player got to a world X coordinate (say, 9,000 of 10,000 pixels), I could reset the player's X position back to world-position 0, since the waves are fixed to the camera, and then the boat would be free to travel for another 9,000 pixels and never see the "end" of the world at 10,000 pixels. At this rate the world wouldn't even have to be 10,000 pixels, but instead, just wide enough to fit the entire user's viewport, plus some padding to the right, and then as the user got to the edge of this world length, reset them back to 0.

## End Result

<div class="row">
  <div class="medium12 columns">
    <video width="692" height="594" autoplay loop preload src="{{this.site.url}}/images/phaser-waves/phaser-wave.mov" />
  </div>
</div>

- [Here is a live demo](https://cfurrow.github.io/phaser-wave-example/)
- Check out the repo here: https://github.com/cfurrow/phaser-wave-example/
