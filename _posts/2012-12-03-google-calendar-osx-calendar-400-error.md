---
layout: post
title: "Google Calendar + OSX Calendars \"400\" error"
description: "Fixing some bad behavior in OSX's Calendar app."
category: calendar
tags: [osx, mountain lion, calendar, fantastical, google, google calendar]
---


### Problem

I use Fantastical on Mountain Lion, which grabs data from Google Calendars.
I’ve been having an issue happening more and more lately where I add an event
via Fantastical, then add an invitee. Later, Calendar opens up with an alert:

> The server responded with "400" to operation
> CalDAVWriteEntityQueueableOperation.

A few Google searches later, I finally found a workaround.

### Solution

Source: [discussions.apple.com](https://discussions.apple.com/message/19040873#19040873)

I went to Calendar preferences and switched to my Google account and changed
all alert types to anything but “None”. Closed the window, and it seemed to
work.
