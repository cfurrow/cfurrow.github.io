---
layout: post
title: "Create a \"Saturday Morning Cartoons\" Playlist in Plex"
description:
headline:
modified: 2019-02-24 13:48:38 -0500
category: personal
tags: [plex, python, cartoons]
imagefeature:
mathjax:
chart:
comments: false
featured: false
hero:
---

<figure>
  <img src="{% asset_path rawpixel-788409-unsplash.jpg %}" />
  <figcaption>
    Image by
    <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@rawpixel?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from rawpixel"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">rawpixel</span></a>
  </figcaption>
</figure>


Recently I setup an [unRaid](https://unraid.net) file server on a $50 eBay desktop, and have been moving my TV shows and movies into a [Plex](https://www.plex.tv) docker container running on said machine. It turns out that I have something like 14 days worth of cartoon shows, and I have a hard time curating a list of shows I want to watch on a Saturday morning when I'm feeling super lazy. But recently, I came across a Python script that gave an example of how to build a Plex playlist dynamically, based on all the episodes/movies that aired on a given day. So, for example, if you ran the script on 2019-02-10, it would scan your library for all movies and shows that had an original air date (or theater release date) of February 10th, of any year.

[Check out the original gist, here.](https://gist.github.com/blacktwin/397f07724abebd1223ba6ea644ea1669)

I loved the script so much, I modified it to allow for providing *any* date to it, and have it create a playlist from that given date, and not be restricted to the date in which you ran it.

```bash
$ python aired_today_playlist.py '2019-02-12'
```

[My modified gist can be found here.](https://gist.github.com/cfurrow/8bb5cb079602eafb358c9ab062ba1ebb)

This all got me thinking; "I can build custom cartoon playlists based on the next unplayed episode of each cartoon show!" So I did. When I run the script, it loops over all cartoon shows in my Plex library, and finds the first unplayed episode, and adds it to a playlist. That way, I'm always watching something I have not watched previously. Check out the code at the bottom of this post.

The result looks like this:

<img src="{% asset_path plex-playlist.png %}" alt="saturday morning cartoon playlist" />

My lazy Saturday mornings will never be the same.

## The code
Grab these files, and modify them to match your current Plex server setup.

* My server is at ip 192.168.1.5:32400
* Get your Plex token by visiting your app.plex.tv site, and start playing a video. Then, open up your browser's network monitor, and find a request being made that has X-Plex-Token in the URL. Copy the value of that parameter, and paste it in the .env file
* You may have to modify the `cartoon_playlist.py` to match your library. I created a few TV Show collections called "80s Cartoons" and "90s Cartoons". Your setup may differ.

Then run it like this: `python cartoon_playlist.py`

That will create a playlist called "Saturday Morning Cartoons" if one does not exist. If that playlist already exists, nothing will be done. To re-create the playlist, delete the existing one, and re-run the script above to build the list.

<script src="https://gist.github.com/cfurrow/13a062359bd83ac17a38f8c4fcd3bab2.js"></script>
