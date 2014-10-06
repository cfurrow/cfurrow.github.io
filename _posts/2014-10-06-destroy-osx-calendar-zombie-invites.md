---
layout: post
title: "Destroying OSX Calendar Zombie Invites"
description: ""
category: 
tags: [osx, calendar]
---
{% include JB/setup %}

A large reason why I don't use OSX's Calendar app is because every time I open it, I have 100+ calendar invites staring me in the face. I've already accepted/rejected these invites through Google Calendar, but Calendar doesn't care. I really enjoy the native interface of Calendar, but that kind of "digital zit" drives me crazy! There was no way to delete/ignore them through the app, so I looked for another solution.

I opened up my terminal, and went hunting, and that's when I came across this file:

`~/Library/Calendars/Calendar Cache`

I closed down the Calendar app, then deleted that sucker right away, and hoped for the best (`rm ~/Library/Calendars/Calendar\ Cache`). After opening the Calendar app again, it crashed right away. Ugh! I tried opening the app once more, and I was presented with a dialog that said "Updating Calendars" with a progress bar. Once it was done, Calendar was working again, and I had 0 invites pending!

Brute force, FTW.