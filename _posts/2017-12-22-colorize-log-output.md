---
layout: post
title: "Colorize Your Log Output in iTerm2"
description: Add some triggers in iTerm2 to colorize your log output, and find information fast.
headline: Add some triggers in iTerm2 to colorize your log output, and find information fast.
modified: 2017-12-22 11:14:20 -0500
category: personal
tags: [iterm2]
imagefeature: 
mathjax: 
chart: 
comments: false
featured: false
---

Let's get right to it: this is what my log output looks like in iTerm 2

![01]({{ "/assets/photos/2017.12.22/01.png" | absolute_url }})

![02]({{ "/assets/photos/2017.12.22/02.png" | absolute_url }})

![03]({{ "/assets/photos/2017.12.22/03.png" | absolute_url }})

The rules to colorize that output are as follows
- Three or more '#' in a row, colorizes all of them with a pink background
- POST/PUT followed by some text get highlighted in blue
- GET followed by text gets highlighted in green
- Render times get highlighted depending on the total time
  - Short times are green (< 100ms)
  - Medium times are yellow (101-500ms)
  - Long times are red (500ms+)
- Lines with "error", "exception", etc, are highlighted in red
  - HTTP response codes of 4xx or 5xx are also highlighted in red

## How do I do that?
Triggers! Open up your iTerm2 preferences, and edit your profile(s) to add triggers that watch all output in your terminal window, and take an action if the trigger was tripped. You only have to be moderately comfortable with regular expressions to setup a trigger; you can tell from my rules below!

![04]({{ "/assets/photos/2017.12.22/04.png" | absolute_url }})

My triggers are centerd around Rails server log output, so your matches/regular expressions may differ from mine, but the concept will be the same. Look at what your server outputs for a request, and build a regular expression around that content and highlight them as desired.

![05]({{ "/assets/photos/2017.12.22/05.png" | absolute_url }})
