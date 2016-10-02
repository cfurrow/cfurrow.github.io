---
layout: post
title: "Dropbox Photo Organizer"
description: "I built a little tool to help sort photos in Dropbox as they arrive."
category: photos
tags: [dropbox, photos, iphoto, osx]
---


Ever since [Everpix](http://www.cultofmac.com/253339/everpix-has-gone-what-the-hell-can-we-use-to-replace-it/) was shut down, I'd been searching for a replacement
to store, and share photos. I was using a hybrid solution of managing
photos locally in iPhoto, and then letting Everpix upload those events/photos
to the cloud. Then to share it, I'd simple go to Everpix's site, and share
the event. Simple! Sadly, that ended when they closed their virtual doors.

I was back to just using iPhoto, and was getting tired with how hard it was
to share photos now. iCloud was not the solution was hoping for. Dropbox was
nice, but it required me to copy photos out of my iPhoto library file structure
and into a Dropbox folder somewhere, then share that folder. Tedious.

I thought that maybe giving up iPhoto altogether wouldn't be a horrible idea--
it was getting slower with all my photos inside it, and its file organization
was a mystery--it made more sense for the computer, than I. I wished it was
organizing by "year/month/day".

Thinking I could script my way into using just Dropbox for a bit, I created
[photo_organizer](https://github.com/cfurrow/photo_organizer). It's a little
script that can listen for photos to be inserted into your Dropbox's "Camera Uploads"
directory, and then sort them into another photo by "year/month" (I gave up on 'day').

My workflow became something like this:

- Take a photo on the iPhone
- Let dropbox auto-upload the new photo to it's "Camera Uploads" directory
- My personal computer would notice the incoming photo being downloaded from Dropbox, then run "photo_organizer" on it.
- The photo would get moved out of "Camera Uploads", and moved into my "Dropbox/Photos/year/month" folder.

Worked great! I could then come back to the Dropbox Photos folder, and organize photos into
sub-folders for events, etc ("Dropbox/Photos/2013/12/holiday party/").

I think I'll give this a try for a bit, and see how it goes.
