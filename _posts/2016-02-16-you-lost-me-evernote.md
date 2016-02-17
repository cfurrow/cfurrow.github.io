---
layout: post
title: "You lost me, Evernote"
description: "How Evernote lost an 8-year paying customer."
category:
tags: [evernote, quiver]
hero: "/assets/photos/2016.02.16/quiver-icon.png"
---
{% include JB/setup %}

I did not see this coming. [I'm an Evernote fiend](/2015/01/25/how-i-evernote/), a superuser, an evangelizer. Or, I was until a few weeks ago when I came across [Quiver](http://happenapps.com/#quiver). Quiver is a Mac note-taking app that includes two features I've been waiting for Evernote to integrate for years:

- The ability to drop in syntax-highlighted code natively
- Markdown support

Yeah, that simple. And Quiver handles the basics of Evernote like a champ:

- Notebooks
- Tags
- Cloud-sync (through a service of your choice! Dropbox, iCloud Drive, Google Drive, etc)
- Notebook sharing
- Full-text search

#### Code blocks

This feature alone was one I've been waiting for in Evernote for years and years. I'd worked out ways to make Evernote work for my purposes (indent code one level, use the [copy-as-rtf Atom plugin](/2015/01/29/copy-code-from-atom-to-evernote/), etc). Quiver tackles this natively by dividing up your note into what it calls "cells". Your note could have one cell, or hundreds of cells, it's up to you and what you need. Each cell has a format:

- rich text
- code
- LaTex
- markdown
- diagram

This is how you can write some text in one cell, create a new code cell then drop in some code, create a new text cell and continue writing text.

<a href="/assets/photos/2016.02.16/quiver-example.png" target="_blank">
<img src="/assets/photos/2016.02.16/quiver-example.png" width="100%" alt="Example of a text cell and a code cell" />
</a>

Each code cell can represent a different language, and display the syntax highlighting specific to that language. This feature is awesome as someone who finds necessity in writing daily dev diaries just for myself.

#### Markdown

Just like code cells, Quiver supports markdown cells. When you preview your note (by putting it in preview mode, from edit mode) you'll see your markdown rendered into HTML. Here's an example of the Quiver window split in two. The left side is the "edit" view, and the right side is the "preview" view. You can choose which mode you are in, between "edit", "preview" or a split with both "edit" and "preview" displayed at the same time.

<a href="/assets/photos/2016.02.16/quiver-example-2.png" target="_blank">
<img src="/assets/photos/2016.02.16/quiver-example-2.png" width="100%" alt="Example of a markdown cell" />
</a>

### What does Quiver lack?

There are a number of Evernote features that Quiver does not have, but of the features I actually care about, Quiver does not include:

- OCR, or Optical Character Recognition, when importing images/PDFs (an Evernote premium feature).
  - It cannot "read into" images or PDFs and pull out searchable text.
- A [webclipper-like extension](https://evernote.com/webclipper/) for browsers

They are not a deal-breaker, but they would be quite handy to seamlessly replace my Evernote workflow. In the meantime I'm getting used to annotating my attachments a bit more with keywords so I can easily find the attachments later on. And as far as web clipping goes, you can get pretty far by copying and pasting an entire page's content into Quiver, but you will most-likely have to do some cleanup around removing unwanted elements, and dealing with missing CSS info inside your note. You can also copy and paste just the text of a website into Quiver, and do your own formatting after the fact. Takes a bit longer, but the note looks a lot nicer when you can control everything yourself.

### What else does Quiver offer?

#### Diagrams!

You can create flow and sequence diagrams right inside your note! I didn't realize how much I wanted this feature until I had it in front of me.

<a href="/assets/photos/2016.02.16/quiver-example-3.png" target="_blank">
<img src="/assets/photos/2016.02.16/quiver-example-3.png" width="100%" alt="Example of a diagram cell" />
</a>

Within the first day or so of using Quiver, I'd created a half-dozen diagrams for myself, and one to help clarify the flow of a new feature we were writing. It got everyone involved on the same page by translating the text of the story to a visual representation of the flow. It was found to be very helpful, and I made a few Quiver converts along the way.

#### Notes stored as JSON!

All of your notes are stored as JSON, not some proprietary or otherwise cumbersome format. It's just JSON data.

<a href="/assets/photos/2016.02.16/quiver-example-4.png" target="_blank">
<img src="/assets/photos/2016.02.16/quiver-example-4.png" width="100%" alt="Example of a JSON data" />
</a>


#### Importing from Evernote!

As of version 3 of Quiver, you can now import your exported Evernote notes (\*.enex) into Quiver, and it keeps your original dates, tags, and attachments. So nice!

### Goodbye, Evernote

As-is, Quiver accomplishes so much of what I loved about Evernote, and does more. If Quiver's dev stopped supporting/upgrading Quiver right now, I'd be satisfied with the current feature set. But, I do not believe they are done improving the application yet, and I look forward to discovering more ways to love this app.
