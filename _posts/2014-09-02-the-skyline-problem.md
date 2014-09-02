---
layout: post
title: "The skyline problem"
description: ""
category:
tags: [javascript, canvas]
---

I read the problem statement from [Brian Gordon's blog](https://briangordon.github.io/2014/08/the-skyline-problem.html),
and thought I'd give it a shot without reading any further.

> You are given a set of n rectangles in no particular order.
> They have varying widths and heights, but their bottom edges are
> collinear, so that they look like buildings on a skyline.
> For each rectangle, you’re given the x position of the left edge,
> the x position of the right edge, and the height. Your task is to draw an
> outline around the set of rectangles so that you can see what the skyline
> would look like when silhouetted at night.

Example:

<img src="/assets/photos/skyline/The_skyline_problem.png" />


## Progress

I've started out with this data and will work from there:

    var data = [
    {x1: 0,   x2: 200, height: 400},
    {x1: 300, x2: 400, height: 200},
    {x1: 350, x2: 450, height: 300},
    {x1: 450, x2: 600, height: 500},
    {x1: 500, x2: 650, height: 200},
    {x1: 700, x2: 900, height: 400},
    ];


My current output:

<img src="/assets/photos/skyline/skyline_trial1.png" />

[Code is in my skyline.js repo.](https://github.com/cfurrow/skyline.js)
