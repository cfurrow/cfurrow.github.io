---
layout: post
title: "So, I'm using Bear.app now"
description: I finally switched away from Evernote. Is it for good?
headline:
modified: 2018-02-23 09:10:00 -0500
category: note taking
tags: [Evernote, productivity, bear, note-taking]
imagefeature:
mathjax:
chart:
comments: false
featured: true
---

I did it. I think I finally found a note-taking app that will keep me away from Evernote. I've done this in the past multiple times. I've even switched from [Evernote](http://evernote.com/) to [Bear](http://www.bear-writer.com/), and gone back to Evernote. I tried [Marxico](https://marxi.co/) for a couple years, and that is what brings me to this latest change.

* [How I Evernote]({{ site.baseurl }}{% post_url 2015-01-25-how-i-evernote %})
* [You lost me, Evernote]({{ site.baseurl }}{% post_url 2016-02-16-you-lost-me-evernote %})
* [Marxico: Evernote + Markdown]({{ site.baseurl }}{% post_url 2016-10-02-marxico-evernote-markdown %})

TL;DR I've switched to using the [Bear](http://www.bear-writer.com/) app to take all my daily dev log notes after YEARS of using Evernote, and I love it!

## It was hard
I've been using Evernote since 2008, and have amassed 15,000+ notes, screenshots, code-snippets, saved web pages, etc. I took over 1,300 notes for my last gig alone! Every day I wrote down my "stream of work", which ends up being a wealth of information about what I did each day, cool links I found that helped me solve a problem, conversations I had with co-workers, code snippets that fixed a bug, details of calls/chats I had to make, etc. The referential value of those notes is very high for me as someone who feels like their memory is not amazing. Being able to open up an app, search for a topic, and find not only the information I was looking for, but also the context of the information, is practically priceless. I get to see "why" I wrote the info down, why I did it that way on that day, etc, and it was all inside of Evernote.

That is why it has always been hard to move away from Evernote. It has everything! It was searchable! I spent years figuring out how I wanted to organize my data with tags, keywords, notebooks, etc.

## I never *loved* Evernote

When I first started using Evernote back in 2008, I'd come from using Microsoft's OneNote in college, and at my first gig post-college. I then abandon OneNote a few years later when I changed jobs, and the new place offered me a Macbook Pro, and OneNote was either not on MacOS or it was in poor shape. That is when I found Evernote. It was simple, and it didn't have intuitive key combos like OneNote did, but it got the job done. I could create notes, notebooks, tags, and search on any of those fields. No syntax highlighting, but OneNote did not have that either.

After a few years of using Evernote, I began to feel its "limitations", as I saw them. I began to hear about "Markdown", which felt like my cup of tea because you could "just write" and the formatting comes in later. There was still no way to natively support syntax highlighting within Evernote, which was at-odds with how I started to write my daily deveveloper logs. The keyboard shortcuts were not intuitive, and required moving my fingers significantly away from the typing position to perform them. I simply stopped enjoying Evernote. It could receive notes, webpages, screenshots, etc, but it was not an app I enjoyed to use. It made me constantly look for alternatives.

I tried intermediate steps, like using an [editor plugin](https://atom.io/packages/copy-as-rtf) that allowed me to copy code from my code editor, and paste into Evernote as rich text. That worked pretty well for a time, but I wanted a more integrated solution.

I then used [Ever Notedown](https://atom.io/packages/ever-notedown), which was an [Atom editor](https://atom.io/) plugin that let me write all my notes in Markdown inside of Atom, and they would be exported to Evernote when I saved them. This was a pretty good solution for a while, but it eventually did not feel as polished as a native note-taking app. It wasn't what I wanted, and again, I was not enjoying myself. I began to realize how important that was.

My next experiment was with [Marxico](https://marxi.co/), which was its own application that let me write in Markdown, and it would export to Evernote via their API. I ended up using this app for the better part of three years, and took thousands of notes inside of Marxico. I would have continued to use Marxico had it not been for an itch to try the [Bear app](http://www.bear-writer.com/) again.

I'd used it a few times, and even tried importing all my Evernote notes into Bear but it was a complete mess. The import script I was using messed the dates of the incoming notes and every single one of my 7000+ notes were "modified today". It was so gross to look at. I had a hard time trying to find notes based on something that happened a few days ago, but I had little to go on. With all my notes marked as "created" or "edited" recently, I abandoned Bear to go back to Evernote where my dates and notes still made sense to me.

But, this latest time using Bear was different. I thought to myself, "Don't try to mimic Evernote. Don't import your notes, just write."

With this new mindset, I'm loving Bear. I can take notes quickly, drop code snippets in with syntax-highlighting, tag, nest-tags, search, etc. I find I'm using Bear more than I used Evernote to do things like take notes on an article I read: grabbing quotes, images/graphs from the post, making my own comments or providing supplimentary links. It's a real delight, and I don't think I'm going to go back to Evernote, or the supplimentary apps.

## What is your routine?

If you've read my ["How I Evernote"]({{ site.baseurl }}{% post_url 2015-01-25-how-i-evernote %}) post I wrote a few years ago, you'll get a sense of how I used Evernote to write down a "developer journal" every day. I won't go too much into that, but here is my high-level overview.

### Create one note per day for work
I start off each day by creating a new note for my work. I have a [TextExpander](https://textexpander.com/) (note, you can also use [aText](http://www.trankynam.com/atext/)) shortcut that helps me fill in basic details. I create the new note in Bear, then type `bbwork` which then outputs the following markdown:

```markdown
# 2018.02.27 - Work

#work

{cursor gets placed here}
```

It creates an H1 heading with the current date, a dash and then "Work". This becomes the title of the note.

It then adds `#work` to the note, which adds a single tag. You can do as many tags as you want or need, but for this note type, I only use one.

Then it puts the cursor a few lines down from the tag, so I can continue typing right away.

### Use H1 headers to describe high-level tasks
When I change tasks, I create an H1 tag in markdown (a single `#`) followed by a short description of what I'm doing, and then the current time in parenthesis.

I use my TextExpander shortcut for this as well. I type `//1` and I get a little dialog that pops up that pre-fills the single `#` and time, so I just have to write the details.

<img src="/assets/photos/20180227/textexpander-dialog.png"/>

### I use H2 headers to add sub-headers to a high-level task
Similar to `//1`, I have `//2` which creates an H2 tag `##` allows for a short description, and drops the time stamp at the end.

### I timestamp details inside a task
When writing under a header (h1 or h2), I tend to write a lot, especially when trying to solve a problem. I do some research, drop in some code snippets, read a link or two, and comment on them, etc. This takes time. So as I'm doing that research, I tend to timestamp individual lines of notes. It looks something like this:

<img src="/assets/photos/20180227/example-note.jpg"/>

### I note major interruptions to my work flow
Similar to `//1` and `//2`, I have a third header for interruptions, `//i`. It outputs the following:

`# INTERRUPTION - description goes here (current time)`

I like to note when I have to do a major, unplanned context-switch.

### I use the quote `>` often
When copying details from an email, slack, or website, I like to mark them as quoted so I know it came from somewhere else. To quote something in Markdown, you start the line with a `>` followed by a space, then write. As long as you do not create a new line, everything you type will be quoted and styled. An example:

<img src="/assets/photos/20180227/quote-example.jpg"/>

### I add tags as my day progresses
In a single note, I may add more tags to the note as my day goes on. If I touch project X, I'll add a tag to my note to indicate that, `#project/x`, or maybe I worked on something involving Facebook, I'll add my `#facebook` tag.

If I don't use tags, I try to add enough descriptive, and varying text around the topic so that I can find it easier later. If I copied something from an article, let's say, I may rewrite part of it in my own words, or for my own understanding, so if I need to look this up later, I'll be more inclined to find the note because I'll search using terminology that I understand.

### My TextExpander macros for note taking:

- `ddate` => the current date: "2018.02.27"
- `ttime` => the current time, followed by a space: "10:49AM "
- `ptime` => the current time in parenthesis, followed by a space: "(10:49AM) "
- `dtime` => the current date and time: "2018.02.27 10:49AM "
- `//1` => create an H1 with a timestamp and room for description: "# Description goes here (10:49AM)"
- `//2` => create an H2 with a timestamp and room for description: "## Description goes here (10:49AM)"
- `//3` => create an H1 for the interruption, with a timestamp and room for description: "# INTERRUPTION - Description goes here (10:49AM)"

## That's really it
This is the system that I've found worksk for me.
