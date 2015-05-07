---
layout: post
title: "How I Evernote"
description: "What I've learned from using Evernote over the last 7+ years."
category:
tags: [Evernote, productivity, aText, TextExpander, skitch]
hero: "/assets/hero/2015-01-25-evernote.jpg"
---
{% include JB/setup %}

Evernote is a tool I reach for every single day to:

- Keep daily dev journals
- Jot down phone call notes
- Create grocery lists
- Save articles and web pages for later offline reference
- Store recipes
- Keep a food journal
- Store screenshots (via [Skitch](http://evernote.com/skitch))

I feel like I'm constantly telling others how I use it, and how it's benefited
me, so I thought I might as well try to capture a bit of what I tell people.

# Notebooks and Tags

I separate notes into some high-level notebooks:

### Inbox
For newly created, and "unfiled" notes. If it's in the inbox, something
needs to be done with the note still. Tag it, move it to another notebook, or
add more information to it.

### Recipes
Obvious

### Work
Here is where I keep my daily dev journals that are work-related. I
create a new note for each day, title it by the date (e.g. 2015.01.22), and
timestamp my progress throughout the day, which I'll get into in the next section.

What I worked on, questions I had for myself, or to ask otehrs, how I solved
a problem, code snippets, screenshots -- whatever it takes to sufficiently
document my day, for a few reasons:

1. So I won't forget what I did each day.
2. This builds a nice reference library that I invariably reference in the future.
    1. "How did I find that special-case user?"
    2. "What was that unix command to search all the production logs over the last 5 minutes?"

### Filed
All notes that don't end up in another notebook, but are no longer
in the inbox, are put here. Usually with tags to help identify what it was. For
example I use the "call" tag for any phone call I made, and documented the
conversation here.

    # Sample call note
    Calling Comcast. Hate their automated system.
    Got to a person, Linda.
    She's nice. Needs my acct info again?
    Says I have two accounts with them?
    Closing duplicate account now.
    Back to single billing address.
    Old acct number: xxxxx
    "New" acct number: xxxxxxx

### Food
I use [Evernote's Food app](https://evernote.com/food/), and all food journaling from there, ends
up here.

# Timestamp and Other Macros

I love to timestamp my notes as I go along, especially my daily dev journals. An
example:

> [9:05 AM]
>
> Got a late start, wasn't feeling well.
> Checking emails.
> Need to check on that script I ran last night. Rob says it went fine. Let's verify counts.
>
> [10:30 AM]
>
> Counts were fine, moved on to story #1910. I think I still need to add some logic
> to fetch the assessment data now that I know what that will look like. Let's
> do that now.
>
> [11:01 AM]
>
> Just got off the phone with Matt: [2015-01-2015: Call with Matt](#) (this is a link to another Evernote note)
>
> Where was I? Oh yeah, #1910 is looking better, but was waiting on the CI to finish
> building my latest code changes.
>
> 11:10 AM Passed! Moving on.
>
> [12:30 PM]
>
> Just got back from lunch. More emails. Seems like there may be a history bug?
> 12:35 PM Only affecting one user? 65512344 is the id. Gonna drop into a rails console
>
>     > u = User.find(65512344)
>     #=> <User....snip>
>     > u.history.map(&:id)
>     #=> [9909331, 9901031, nil]
>
> What? nil? How is that even possible? Time to do some spelunking in the history code again.

"Writing all those manual timestamps is stupid and tedious." Yeah, I'd agree with
you if it weren't for apps like [TextExpander](http://smilesoftware.com/TextExpander/index.html)
or [aText](https://www.trankynam.com/atext/). What either of those apps allow me
to do is setup a series of macros that I can run by typing some keys. For instance,
whenever I type "/etime" it replaces that text, and "expands" it to be "[current time]<Press Enter>",
so it creates something like:

> [8:01 PM]

You can type as fast as you want, so if I was on a roll, I could type "/etime
Just got back from lunch, checking email", it would immediately expand it to:

> [8:04 PM]
>
> Just got back from lunch, checking email

I use that style of macro to delineate either the start of the day, or long time
passing between my last notes, or, perhaps the start of a new "topic" in my notes.
If I'm working on a single problem, but it's taking a non-trivial amount of time,
I use my "inline" time method, which takes the current time, and drops it into
Evernote, without pressing the "Enter" key at the end. So when I type: "ttime Still
checking rollbar for more instances of that error" as soon as I hit the space between
"ttime" and "Still", it changes "ttime" to "8:03 PM" so the line would look like:

> 8:03 PM Still checking rollbar for more instances of that error

So handy!

I was a long-time TextExpander user until I saw aText hit the scene a few years
ago. The price tag was far-far lower than TextExpander, and it seemed to meet my
basic needs, so I grabbed it, and haven't looked back.

I have a number of other handy macros in aText that I use all day:

> **ddate** Expands to 2015.01.22 (the current date)
>
> **dtime** Expands to 1/22/15 8:07 PM (the current date and time)
>
> **llamashiptit** Expands to ![llama](http://i.imgur.com/w2BE81V.png)
>
> **llamascii** Expands to:
>
    ,
    ~)
    (_---;
    /|~|\
    / / /|

Evernote has some built-in keyboard shortcuts to output date and time, but I've
gotten so used to just typing out these "words" that I can't see why I'd change
that up. Plus, I have more needs than just date, and time, as you can
see. I think I've got somewhere on the order of 30-40 macros setup, not all for
Evernote.

# Code snippets / Quotes

I don't have a perfect solution for this yet, but I tend to drop lots of code,
or snippets into Evernote. The best way I do this is to shift the text/code right
by using Cmd+Shift+}. It doesn't use spaces, but tabs or some other form of indentation.
It's a manual process.

- Paste code into Evernote
- Highlight the code or quote
- Cmd+Shift+}

I'd really love some kind of prettifier inside of Evernote to syntax highlight
that indented code, but, it does not exist yet, to my knowledge.

I also drop lines from log files into Evernote in this way, as it helps mark my
notes, from other content I may have grabbed from elsewhere.

# Wishlist

I've made Evernote a part of my daily routine for years now (over 6,500 notes since
2008), but there are still a few things I wish it had.

### Markdown support

Would *love* to be able to write in Markdown, and have it give me the option to
"view rendered", or "view markdown" to format notes by sections, and headings, etc,
in the fastest way possible, which is to just keep typing.

### Syntax highlighting

For code, etc. Like [GitHub's gist](https://gist.github.com/)

### Table creation

Or, a simple way to create a table. Sometimes I just need to put things in tabular form, and Evernote does not make that easy or fluid.
Microsoft's OneNote did this by letting you type some text, pressing "Tab" (I think), and it created a table cell around your first bit of text, and creates an empty cell for you to type into immediately. You can keep pressing "Tab" to add more cells to a row. If you pressed "Enter", it creates a new table row, and let's you start the process over again. If you press "Enter Enter", it exits out
of table mode.

# Let me know if you've got more tips!

Hopefully that was somewhat helpful, and you've found a new tidbit of information
to take back to your own productivity toolbelt. I'm always on the lookout for
new ways to enhance how I work, so if you've got any, drop me a tweet [@carl_furrow](http://twitter.com/carl_furrow)
