---
layout: page
title: Carl Furrow
tagline: Pushing bits on the Internet
---
{% include JB/setup %}

### Knowledge is a framework that experience bends.

I'm just a learning-fool, looking to master the art of solving problems
through writing code, and yelling at computer screens. Currently pushing bits
over wires at [Lumosity](http://lumosity.com).

<ul class="posts">
  {% for post in site.posts %}
    <li class='post'>
      <h3 class='title row'>
        <span class='date col-xs-3'>{{ post.date | date_to_string }}</span>
        <a class='col-xs-9' href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
      </h3>
      <div class='row'>
        <p class='col-xs-9 col-xs-offset-3'>
          {{ post.description }}
        </p>
      </div>
    </li>
  {% endfor %}
</ul>
