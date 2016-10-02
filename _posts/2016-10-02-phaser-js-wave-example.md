---
layout: post
published: false
mathjax: false
featured: false
comments: false
title: Phaser.js - Wave Example
categories:
  - game development
tags: gamedev phaserjs javascript
---
A few weeks ago I was on [r/phaser](https://www.reddit.com/r/phaser/comments/4svphl/is_there_actually_a_way_to_wrap_the_texture_of_a/) and someone was wondering how to wrap a texture over a `Phaser.Rope` object. 

> The rope documentation says
> > A Rope is a Sprite that has a repeating texture. The texture will automatically wrap on the edges as it moves.
> As the texture moves? The rope? I've tried moving the rope around and adjusting the crop and frame of the texture, but nothing works.
> I'm using ropes for waves in my game (http://orangesea.oddkraken.com/), and I want to scroll the texture by while keeping the waves moving up and down, so it looks like the player is moving to the right.
> Is there a better way to go about this?
> Thanks.


There is not, but I was curious how one might do something similar.

