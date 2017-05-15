---
layout: post
title: "Alfred Workflow: WIP List"
description: I created an Alfred Workflow to track my WIP project links
headline: I created an Alfred Workflow to track my WIP project links
modified: 2017-05-11 14:37:33 -0400
category: personal
tags: [alfred, todo]
imagefeature: alfred-wip/check-list2-2400px.png
mathjax:
chart:
comments: true
featured: false
---

<img src="/images/alfred-wip/check-list2-2400px.png" width="30%" alt="task list"/>
<br/>
<cite>Image by [crisg](https://openclipart.org/detail/182735/check-list)</cite>

I created an [Alfred](https://www.alfredapp.com/) workflow that allows quick access to my WIP (work in progress) project link groups.

When working on projects, or features, I tend to have multiple links associated with it:

- JIRA/Trello link
- In-progress code link (github)
- Design mocks (Invision)
- Latest test build URL

I use these links when I'm taking my daily notes in [Marxico](https://marxi.co/), and want to drop context of the currently active task that I'm writing
about. I found that when I switch context, it's helpful to come back to a list of links that get me back up to speed quickly. To see more of how I take daily dev notes, see ["How I Evernote"]({{site.baseurl}}{% post_url 2015-01-25-how-i-evernote %}) for an idea of how I did it in 2015; I've altered it slightly more recently and will write about that soon.

![Marxico](/images/alfred-wip/marxico.png)

## How the Alfred Workflow Works

- Open Alfred
- Type in "wip" followed by a space, and start typing (or, simply type space again to see all items)
- Select an item, and press "Enter" on it. Your links will be copied to your clipboard
- Paste it somewhere!

<div class="row">
  <div class="small-12 small-centered columns">
    <video style="width:100%" src="https://d3vv6lp55qjaqc.cloudfront.net/items/3y2d2D032k3A100F3e0b/Screen%20Recording%202017-05-15%20at%2006.38%20PM.mov" preload="auto" autoplay="true" loop="true" />
  </div>
</div>

## How to add new items to the list

- Edit your wip.yml file, save it
- Open Alfred
- Type "wip  " (two spaces after wip)
- See your new item in the list!

<div class="row">
  <div class="small-12 small-centered columns">
    <video width="100%" src="https://d3vv6lp55qjaqc.cloudfront.net/items/2v251h051w3Z0K3U3B2p/Screen%20Recording%202017-05-15%20at%2006.53%20PM.mov" preload="auto" autoplay="true" loop="true" />
  </div>
</div>

## Where do I download?
[Right here!](https://www.dropbox.com/s/pvgnkdfbrfcrp4w/List%20WIP%20Projects.alfredworkflow?dl=1)
