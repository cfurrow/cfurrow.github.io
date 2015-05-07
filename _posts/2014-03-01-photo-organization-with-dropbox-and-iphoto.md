---
layout: post
title: "Photo Organization with Dropbox and iPhoto"
description: "My current solution to wrangling my photos."
category:
tags: [iphoto, dropbox, osx, photos]
---
{% include JB/setup %}

I've been trying out [my latest Dropbox-only solution]({% post_url 2013-12-04-dropbox-photo-organizer %}) for a while now,
and while it's been working, I still pine for the polish and nicities
of iPhoto, such as face-detection, location mapping, and custom meta-events.
I thought of ways I could have fun building those features into some
Rails-backed website, but it just didn't *feel* right when there was already
software that could do it for me (iPhoto).

Talking with my wife, [Emily](http://emilysf.com), she said she recently
began creating simplified, over-arching events in iPhoto, such as "2014 - botanical gardens".
That way, all pictures that she took over 2014 would be date-sorted, and filed in this
event. It sounded great! No need to look through separate months or days of folders. I wanted
that simplicity, but it meant modifying my current Dropbox flow.

The things that were most important to keep for me:

1. Dropbox-backed storage
2. Photo sharing through Dropbox
3. Simple/understandable folder structure by year/month, etc
4. Fast browsing/previewing

Then it hit me: [I could create multiple libraries in iPhoto](http://support.apple.com/kb/PH2505), one for each year to cut
down on the slowness I'd experienced in the past when using iPhoto and having thousands
of photos across 8+ years. Ok, that solves #4 problem. Additionally, I realized you can
setup iPhoto to use an existing folder structure when importing photos, versus the default
setting which copies imported photos into iPhoto's own internal folder setup (which I hated).

<img src="/assets/photos/2014.03.01-iphoto setting.png" />

Great! That solves 1-3!

My new photo workflow looks like this:

1. Take a photo on the iPhone
2. Let dropbox auto-sync to my Dropbox/Camera Uploads folder
3. My [photo_organizer](https://github.com/cfurrow/photo_organizer) script picks up the new file, and sorts it by year/month into a folder
4. I open iPhoto, and drag in the month-folder that has new photos in it
    1. iPhoto automatically detects if a photo has already been imported, so you can safely ignore those.
5. Use iPhoto's events to sort photos into events at-will.

As usual, I'm going to try this out for a few months, and see how it works.
