---
layout: page
title: Carl Furrow
tagline: Pushing bits on the Internet
---
{% include JB/setup %}

### Knowledge is a framework that experience bends.

I'm just a learning-fool, looking to master the art of solving problems
through writing code, and yelling at computer screens.

### Posts

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
