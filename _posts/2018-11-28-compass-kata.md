---
layout: post
title: "Game Dev Kata: Compass"
description:
headline:
modified: 2018-11-28 16:48:38 -0500
category: personal
tags: [phaser, gamedev, javascript]
imagefeature:
mathjax:
chart:
comments: true
featured: false
---

I wanted to create a "compass" like that in Spelunky:

<img src="/assets/photos/201811/CECE5CDC-A561-40A7-A9AE-AFDD6C7B50B9.png" alt="Spelunky Compass" />

The red arrow always points to the exit of the level. It stays on a "track" or "path", though, in a circle around the player. So its position is restricted to that circle. When the exit to the level is in view, the arrow leaves its track, and sits above the exit door.

I've been wanting to do this for some time. 3D games use this "circle track" technique to show where damage is coming from. It's a 3D coordinate (the direction from where the damage came from) converted to a 2D plane (the screen).

I set out make a simplified 2D version of it, like Spelunky.

The end result is quite simple. I took a platform game example from Phaser's example files, and modifie it for this example:

<img src="/assets/photos/201811/A8607D75-92C9-4914-9E52-171EBC159193.png" alt="My Compass" />


The bomb serves as the compass arrow, and it rotates around the player at a constant radius of 50px, and is always pointing towards the closet star.

An animation of it in action:

<img src="/assets/photos/201811/2018-11-28_16-22-12.gif" alt="Compass in action" />

Works really well!

Sample code. This runs on every `update()` call, e.g. every frame.

<p data-height="609" data-theme-id="0" data-slug-hash="vQVbOY" data-default-tab="js" data-user="cfurrow" data-pen-title="Compass Update Method" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/cfurrow/pen/vQVbOY/">Compass Update Method</a> by Carl Furrow (<a href="https://codepen.io/cfurrow">@cfurrow</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Check out the code over here: [gamedev-kata-compass](https://github.com/cfurrow/gamedev-kata-compass)
