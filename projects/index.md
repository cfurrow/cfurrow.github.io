---
layout: post
title: Projects
tagline:
group:
---
<link rel="stylesheet" href="styles.css" />

<div class='project-list'>
  <div class='small-block-grid-3'>
    {% assign sorted = site.projects | sort: 'priority' %}
    {% for project in sorted %}
      <div class='small-12 large-4 columns project'>
        <a href="{{project.demo_path}}">
          <img src="{{project.image_path | default: "images/default.png"}}" alt="{{project.name}}" />
          <h3>{{ project.name }}</h3>
          {{project.content}}
        </a>
      </div>
    {% endfor %}
  </div>
</div>
