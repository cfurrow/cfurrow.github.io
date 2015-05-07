---
layout: post
title: "Deconstructing Fitbit's active score"
description: "Wanting to know how Fitbit calculates effort, I took to the internet to investigate."
category:
tags: [fitbit, health]
---
{% include JB/setup %}

### Eh?

If you’re not familiar with FitBit, here’s the skinny: it’s a tiny device you
clip to yourself practically 24/7. It tracks things like steps taken, miles
traveled, and flights of stairs climbed. It has an associated website
dashboard at [fitbit.com](http://fitbit.com/) that helps you track other things like your current
weight, food logs, etc. It also has a concept of your daily “Active Score”.

For each metric that FitBit tracks, you can set goals. Mine are as follows:

| Description     | Goal  |  
| -----------     | ----  |  
| Steps           | 15300 |  
| Miles           | 7     |  
| Calories Burned | 3300  |  
| Floors Climbed  | 10    |  
| Active Score    | 1000  |  

I try to hit each of those goals each day. I do pretty well most of the time,
and bump the goals up as I begin to consistently exceed them on a daily basis.

Anyway, what I wanted to do was get to know this “Active Score” metric some
more. It is an all-encompassing daily snapshot of how active you were during
the day. If you were sitting down, not moving, you’d end up with an active
score of 0. Walking, climbing stairs, etc, helps boost your score, but how is
it calculated?

### How Fitbit calculates your Active Score

From their site:

> The Active Score is a rough translation of your average METs for the day
> (METs = Active Score x .001 + 1). [source](http://help.fitbit.com/customer/portal/articles/176130-how-does-the-active-score-work)

So what is MET? From Wikipedia:

> MET (or Metabolic Equivalent) is used as a means of expressing the intensity
> and energy expenditure of activities in a way comparable among persons of
> different weight. […] MET values of activities range from 0.9 (sleeping) to 18
> (running at 17.5 km/h or a 5:31 mile pace). [source](http://en.wikipedia.org/wiki/Metabolic_equivalent)

Now that I know how an MET is calculated, how can it be used? From the wiki
page above, it has a handy comparison chart of varying METs.

| Physical Activity                                               | MET      |  
| -----------------                                               | ---      |  
| **Light Intensity Activities**                                  | < 3      |  
| sleeping                                                        | 0.9      |  
| watching television                                             | 1.0      |  
| writing, desk work, typing                                      | 1.8      |  
| walking, 1.7 mph (2.7 km/h), level ground, strolling, very slow | 2.3      |  
| walking, 2.5 mph (4 km/h)                                       | 2.9      |  
| **Moderate Intensity Activities**                               | 3 to 6   |  
| bicycling, stationary, 50 watts, very light effort              | 3.0      |  
| walking 3.0 mph (4.8 km/h)                                      | 3.3      |  
| calisthenics, home exercise, light or moderate effort, general  | 3.5      |  
| walking 3.4 mph (5.5 km/h)                                      | 3.6      |  
| bicycling, < 10 mph (16 km/h), leisure, to work or for pleasure | 4.0      |  
| bicycling, stationary, 100 watts, light effort                  | 5.5      |  
| **Vigorous Intensity Activities**                               | > 6      |  
| jogging, general                                                | 7.0      |  
| Singles tennis, squash, racquet ball                            | 7.0-12.0 |  
| calisthenics (e.g. pushups, situps, pullups,jumping jacks)      | 8.0      |  
| running jogging, in place                                       | 8.0      |  
| running 5mph (12 min mile)                                      | 8.0      |  
| running 6mph (10 min mile)                                      | 10.0     |  
| running 8mph                                                    | 13.5     |  
| running at 10mph                                                | 16.0     |  

### Why?

1. I wanted to know an approximation for a few reasons:
2. I just wanted to know how they may be calculating Active Score I wanted to
create a helper-app to help you reach your activity goal for the day.

With regards to #2 above, this was my idea:

Let’s say it’s getting towards the end of the day (7-8pm) and you still
haven’t met your activity goal for the day. Let’s further say that your goal
is to have an activity score of 1,000. So what I think would be nice to know
is this:

1. How many more steps do I have to take to reach my goal of 1,000 AND/OR
2. How many more floors should I climb to reach my goal of 1,000

So the output could be:

> You are at 455 activity points for the day, to get to your goal of 1,000 you
> should try and take an additional X number of steps

Or

> You are at 455 activity points for the day, to get to your goal of 1,000 you
> should try and run at 6mph for 30 minutes or 5mph for 45 minutes.

I’m getting close to starting development on a little web app that can pull
this all together. I plan on documenting progress here.
