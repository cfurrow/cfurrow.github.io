---
layout: post
title: "macOS Sierra: Killing my CPU"
description: "After the upgrade, I had 200% CPU usage for over a week."
category:
tags: [macos, sierra, osx, high-cpu]
hero: '/assets/photos/2016.09.29-sierra/hero.png'
---
{% include JB/setup %}

[*TL;DR*](#the-fix)

After upgrading to macOS Sierra last week, my 2012 Macbook Air was running at 200%+ CPU practically all day, every day.
Top offenders were:

- mds
- mds_stores
- mdworker
- photolibraryd
- photoanalysisd
- CalNCService
- CalendarAgent
- soagent
- accountsd
- kernel_task

Each one of those, or groups of them, would take up 100-170% of my CPU power for themselves for hours on end. I'd even
leave my computer running overnight (thanks to [Caffeine](http://lightheadsw.com/caffeine/)) and I'd come back, 8 hours
later to the laptop fans still running high, and CPU pegged at 200%.

I believe there was *some* explanation for part of this high usage: I used iCloud Photos for a number of years, but almost a year
ago, I stopped auto-syncing photos to it, and tried to use Google Photos exclusively for storage, photo analysis, and
sharing. I was pretty happy with its feature set, and wished the Photos.app could do what Google Photos seemed to do in
stride. Then macOS Sierra was announced, and the new Photos.app features seemed to address my concerns, and I began to
dread the upcoming migration *back* to Photos.app from Google Photos. What made that easier was [setting up Google Drive to show
me my photos](https://support.google.com/photos/answer/6156103?co=GENIE.Platform%3DDesktop&hl=en&oco=0), and then download
the missing months of photos directly from there, and importing into Photos.app. That is why, I presume, phtolibraryd
and photoanalysisd were crunching hard through all 40,000+ photos in my library. I assume they were uploading new photos,
analyzing the contents of old photos/videos as far back as 2007, finding faces, trees, dogs, etc. But the other apps? WTF?

# The "fix" (so far)
<a name="the-fix"></a>

## Photos
As far as photolibraryd and photoanalysisd, I think I had to wait those out for the most part. They still run at over 100%
every now and then, but it's not constant. It's making progress, from what I can surmise from the "People" album. Each
time I click on it, the numbers of scanned vs unscanned change. I believe I'm going to have to wait this one out and
leave my laptop idling overnight so Photos can continue scanning faces, etc from photos and videos

<image src="/assets/photos/2016.09.29-sierra/photos-face-scanning.svg" width="100%" />

## Calendar/Contacts
I had a hunch that somehow my iCloud + Google contacts/calendars was bugged after the macOS upgrade. I did some searching
and I took the advice people gave from past OSX upgrades that also saw high cpu usage from contacts/calendar processes:

- Create a new account on your Mac
- Log out of your main Mac user
- Log into the newly created account
- Watch "Activity Monitor" for similar behavior (e.g. high cpu usage)

Nothing happened. All processes were using relatively low CPU usage for over 20 minutes (<1%). That confirmed to me that
the problems were definitely user-account specific, and not a problem with macOS or my hardware. I logged out, and back
into my main account. From there, I did the following:

- Opened up System Preferences -> Internet Accounts
- Deleted all Google accounts I had listed (selected the account, and then pressed the minus button at the bottom of the list)
- Unchecked "Mail", "Contacts", "Calendars", "Reminders", "Notes" from my iCloud account
- Reboot
- Go back to System Preferences -> Internet Accounts
- Re-enable iCloud "Mail", "Contacts", "Calendars", "Reminders", "Notes"
- Watch Activity Monitor for ~10minutes for high CPU usage (none came outside of photoanalysisd)
- Re-add my Google accounts, one at a time, watching Activity Monitor between each add.

It seemed my high CPU usage was over, for the most part. Like I said, the Photos-related services spike usage every
now and then, but my fan has quieted down all day today.
