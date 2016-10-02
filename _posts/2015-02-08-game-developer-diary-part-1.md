---
layout: post
title: "Game Developer Diary - Part 1: Tools"
description: "Wanting to play with Pixi.js again, I realized I needed some tools to simplify my workflow."
category: game development
tags: [game_development, phaserjs, ruby, javascript]
hero: "/assets/hero/2015.02.08-phaser.png"
---


# Phaser.js

I've decided to pick away at building a game again, but first I needed to decide
on the framework. I've been a fan of the [Pixi.js](http://www.pixijs.com/) renderer
for a long time, and had been hoping to use it somehow. With that, I'd been
following the progress of the [Phaser.js](http://phaser.io/) game framework,
that uses Pixi.js as the renderer, so it became a no-brainer to use.

Phaser comes with some awesome docs that you can download locally if you clone
their repo. I also grabbed [a "getting started" tutorial](http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game)
that sets you up with the basics to create a simple platform game. It introduces
you to the basics of loading assets, creating animation sets, simple physics,
player-input handling, and collision detection.

It's a great tutorial to get you started towards your first game, and it's ripe for modification. I
started by trying to add additional frames of animation to the player character
so that he moved in some way while in his "idle" state. Adding additional frames
to the sprite sheet was more difficult than I wanted it to be--I had to align
things just right, give each frame of animation it's own 32x48 pixels of space.
I felt like I just wasn't "getting" something. Then I decided I needed a tool.

# First tool: PSD to Sprite Creator

I realized quickly that I'd want to be able to create my animations in
Photoshop in a way that Phaser.js could natively use. Phaser can load a sprite
sheet of frames, set side-by-side, equidistant from each other. Like this:

![example](/assets/demo/gamedev-diary-1/assets/dude-combined.png)

My Photoshop skills are not awesome, so creating a gridded sprite sheet like that
seemed like more work than I was willing to bite off right now. What I *really*
wanted to do was to create a 32x48 pixel canvas in photoshop, and create each
frame of animation as a layer, one on top of the other. Then export those layers
into a single file, like the one seen above.

I did a tiny bit of Googling before realizing I'd like to try my hand at creating
that tool myself. And the [psd_to_sprite](https://github.com/cfurrow/psd_to_sprite)
gem was created.

I could now automate creating these sprites via a Rake task:

``` ruby
task :make_sprites do
  ["assets/dude.psd"].each do |path|
    p "Processing #{path}..."
    PsdToSprite::SpriteMaker.new(path).process
    p "Done!"
  end
end
```

My first tool is now complete. And I can continue making assets, and dropping them
into some Phaser.js examples.

Now the standing animation is the little dude moving up and down:

![example](/assets/photos/2015.02.08-dude-combined.gif)

# Play!

<iframe src="/assets/demo/gamedev-diary-1" width="700px" height="600px" frameborder="0"></iframe>
