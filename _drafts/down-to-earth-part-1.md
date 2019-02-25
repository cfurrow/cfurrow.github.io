---
layout: post
title: "\"Down to Earth\" - Part 1"
description:
headline:
modified: 2019-02-25 13:34:38 -0500
category: game development
tags: [gamedev, javascript, pixelart]
imagefeature:
mathjax:
chart:
comments: false
featured: false
hero:
---

In mid-2018 I set out to make a simple game in concept and simple technically. While it *was* simple, it still has taken me a long while to actually complete it, as I love to tinker. Below is an attempt to capture the timeline of what I've built so far, and what is to come.

< show game here >

## Concept
While sitting in my office, and staring out my window into the nature in my backyard, my mind wandered into game development, as it does from time to time. I wanted to make *something* and hopefully come up with an idea that was not only simple for me to build, but also enjoyable to build and play. As I watched the weeds in my yard sway with the wind, the idea, or, part of the idea, popped in my head, “What if I built a game based around a plant?”

I grabbed my notebook and began jotting down some word-associations:

> plant, weed, grow, flower, rabbit, squirrel, ...

When I looked back over the list of words, the one that stood out the most was “grow”. As soon as I focused in on that, the idea came to me:

> I will build a game based on a plant growing. The player will have to help the plant grow as high as they can. The player will control the root as it grows down into the ground, and have to avoid obstacles along the way.

## Art
I love pixel art for a few reasons. First, I am incredibly nostalgic for my younger days where I’d play 8-bit and 16-bit games basically every day. Second, because it’s something I feel mildly competent in drawing. The first idea I had was that the entirety of the game’s viewable space would be 64x64. It may stretch in other directions, but the player would only see a screen of 64 by 64 pixels at most. This meant all art generated would be 64x64 pixels, or smaller, to fit within the game’s view space. That also meant I’d have to technically draw less, because of that restriction. Things could not be hyper-detailed due to only having so many pixels to work with.

I began to sketch out a few things that I knew I’d need:
* a stem sprite that was 2 pixels wide, 1 pixel tall
* a “root” sprite that was 2 pixels wide, but 2 pixels tall at its max height
* a “dirt” texture for the background
* a few 8x8 pixel rocks that would be obstacles underground

<figure>
  <img width="70%" src="{% asset_path seed-and-dirt.png %}" alt="some early art that i ended up using in the game" />
  <figcaption>My dirt and seed sprites</figcaption>
</figure>

## Game Mechanics

I wanted the game to be about navigating the plant's root down through the earth, avoiding obstacles along the way. I also wanted the ground to go on infinitely, allowing the player to rack up high scores as they went deeper and deeper. To add a challenge, I wanted to add multiple types of obstacles that were randomly placed in the path of the root: rocks, bones, moles, etc. I started with rocks, as they were the easiest for me to draw and experiment with.

< show a screenshot of rocks ? >

The player would only have two buttons to worry about: left and right. The way you could control the plant's root was by moving it slowly to the right, or slowly to the left. That's it! If you ran into an obstacle, that was a game over.

## Code Example: Obstacle Randomness
I wanted the ground to have randomness, but with some defined behavior. It was here that I took an example from Spelunky, where a single level was broken up into "chunks" and each chunk (or screen) had to have at least one exist or entrance to it. Within a chunk, there was randomness added to the layout of dirt/enemies.

I devised a system similar to this. I created a bitmap image with tiles in it, of 8x8 pixels each, and if there was a black pixel, put a rock, if there was no color for a given pixel, that was empty.

<figure>
  <img src="{% asset_path chunks.png %}" />
  <figcaption>An example of my "chunk.png" file.</figcaption>
</figure>

The code responsible for picking a "chunk" tile from the tiles above, and adding the objects to the game world is below:

```javascript
CHUNK_COUNT = 5;

_buildChunks(startY, endY) {
  let chunkCount = Math.floor((endY-startY) / this._chunkHeight);
  if(chunkCount < 1) {
    chunkCount = 1;
  }
  this._log(`Building chunks from ${startY} to ${endY}. Creating ${chunkCount} chunks.`)
  let chunkIndex = 0;
  let chunks = [];
  this.currentChunk = null;
  let minY = startY;
  let maxY = 0;
  let currentY = startY;
  let pX, pY;
  this.rnd = Phaser.Math.RND;
  // Each chunk "tile" is an 8x8 grid
  let gridWidth  = 8;
  let gridHeight = 8;
  let color = null;
  let chunkLayout;

  for(; chunkIndex < chunkCount; chunkIndex++) {
    currentY = minY + (chunkIndex * this._chunkHeight);
    this.currentChunk = [];
    // Pick a chunkLayout from the chunk file
    let chunkLayout = this.rnd.between(0, CHUNK_COUNT);
    for(let i = 0; i < gridWidth; i++) {
      for(let j = 0; j < gridHeight; j++) {
        color = this.scene.textures.getPixel(i, j, 'chunks', chunkLayout);
        if(color.alpha == 255) {
          pX = i * gridWidth;
          pY = currentY + (j * gridHeight);
          this.placeObject(color, pX, pY);
        }
      }
    }
    chunks.push(this.currentChunk);
  }
}

placeObject(color, x, y) {
  if(color.red == 0 && color.blue == 0 && color.green ==0){
    this.placeRock(x,y);
  } else if(color.red == 255 && color.blue == 0 &&  color.green == 0) {
    this.placeWater(x,y);
  }
}

placeRock(x,y) {
  let frame = this.rnd.pick([0,1,1,1,1,0,0,1,0,0]);
  let rock = new Rock({x: x, y: y, frame: frame, scene: this.scene});
  this.currentChunk.push(rock);
  this._rocks.push(rock);
}

placeWater(x,y) {
  let water = new Water({x: x, y: y, scene: this.scene});
  this._water.push(water);
}
```

Pretty simple. You'll notice that `_buildChunks` is capable of building multiple chunks at once, if necessary. I will cover that later when I go over how I build a never-ending underground.


## Endless Growth
As the player's root moves down every frame, we need to make sure there is "dirt" and obstacles waiting for them.
