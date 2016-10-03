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
A few weeks ago I was on [/r/phaser](https://www.reddit.com/r/phaser/comments/4svphl/is_there_actually_a_way_to_wrap_the_texture_of_a/) and /u/oddkraken was wondering how to wrap a texture over a `Phaser.Rope` object. If you're not familiar with a `Phaser.Rope` object, [check out this example](http://phaser.io/examples/v2/sprites/rope). Below is the reddit post:

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

{% include phaser.html %}
{% include canvas.html name="waves01" gist="cfurrow/b575d25c229e73bd73134d2b3adeb5fb#file-waves01-js" %}

<script type="text/javascript">
  function waves01(baseUrl) {
    var waveLength = 160;
    var state = {
      preload: function(){
        this.game.load.spritesheet('wave', baseUrl+'/images/phaser-waves/wave.png', waveLength, waveLength);
      },
      create: function(){
        this.game.stage.backgroundColor = '#fff';
        var numWaves = 3;
        var x = 0;
        var y = 0;
        this.count = 0;
        this.waves = this.game.add.group();
        this.waves.x = 0;
        this.waves.y = this.game.world.height - 50;
        for (var i = 0; i < numWaves; i++)
        {
          x = i*waveLength;
          y = 0;
          wave = this.game.add.sprite(x, y, 'wave', this.game.rnd.between(0,1));
          wave.anchor.set(0.5,0.5);
          wave.smoothed=false;
          this.waves.add(wave);
        }
      },
      update: function() {
        this.animateWaves();
      },
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
    };
    new Phaser.Game(400, 200, Phaser.AUTO, 'waves01', state);
  }
  window.addEventListener('load', function(){waves01("{{this.site.url}}")});
</script>

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

{% include canvas.html name="waves02" gist="cfurrow/b575d25c229e73bd73134d2b3adeb5fb#file-waves02-js" %}

<script type="text/javascript">
function waves02(baseUrl) {
    var waveLength = 160;
    var state = {
      preload: function(){
        this.game.load.spritesheet('wave', baseUrl+'/images/phaser-waves/wave.png', waveLength, waveLength);
        this.game.load.image('boat', baseUrl+'/images/phaser-waves/boat.png');
      },
      create: function(){
        this.game.stage.backgroundColor = '#fff';
        var numWaves = 3;
        var x = 0;
        var y = 0;
        this.count = 0;
        this.waves = this.game.add.group();
        // enabling the physics on anything added to this group from this point on.
        this.waves.enableBody = true;
        this.waves.physicsBodyType = Phaser.Physics.ARCADE;
        this.waves.x = 0;
        this.waves.y = this.game.world.height - 50;
        for (var i = 0; i < numWaves; i++)
        {
          x = i*waveLength;
          y = 0;
          wave = this.game.add.sprite(x, y, 'wave', this.game.rnd.between(0,1));
          wave.anchor.set(0.5,0.5);
          wave.smoothed=false;
          this.waves.add(wave);
          // randomize the circle size to vary the motion of anything that collides with this wave
          wave.body.setCircle(this.game.rnd.between(80,140));
          // offset the wave slightly below the top of the sprite
          wave.body.offset.set(0, 50);
          // do not allow other objects to "push" this sprite, simply collide
          wave.body.immovable = true;
        }

        this.boat = this.game.add.sprite(this.game.world.centerX, 0, 'boat');
        this.boat.smoothed=false;
        this.game.physics.arcade.enable(this.boat);
        this.boat.body.gravity.y = 250;
        this.boat.body.setCircle(32);
      },
      update: function() {
        this.game.physics.arcade.collide(this.boat, this.waves);
        this.animateWaves();
      },
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
      render: function() {
        this.game.debug.body(this.boat);
        this.waves.forEach(function(wave){
          this.game.debug.body(wave);
        }, this);
      }
    };
    new Phaser.Game(400, 200, Phaser.AUTO, 'waves02', state);
  }
  window.addEventListener('load', function(){waves02("{{this.site.url}}")});
</script>

I've highlighted the physics bodies (green) in Phaser to show the boat and waves colliding. Once we add some velocity to the boat, it will collide with each circle it meets, giving its path an irregular shape, almost as if it were riding up and down the slope of a wave. Kind of.

## Motion!
In order to make this more interesting, the boat needs to move and when the boat moves, the waves need to "shift" to the left adding new waves off the right side of the screen, and disappearing waves off the left side as they go out of view. This is how we'll create an "infinite" sea for the boat to explore. As its velocity moves it to the right, we'll constantly swap in new wave tiles so it always has something to sail on.
