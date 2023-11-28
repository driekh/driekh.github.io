---
title: Blog
layout: default
---

<h1>Latest Posts</h1>

<ul>
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}
        {% if post.lang != '' %}
        	({{post.lang}}) 
        {% endif %}
        </a></h2>
      
      <p class="postdate">
				{{ post.date | date: "%Y/%m/%d" }}
				{% if post.updatedate %}
					(updated: {{ post.updatedate | date: "%Y/%m/%d" }})
				{% endif %}
			</p>
      
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>

<!--
<h1>Tags</h1>

{% for tag in site.tags %}
  <h3>{{ tag[0] }}</h3>
  <ul>
    {% for post in tag[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
-->