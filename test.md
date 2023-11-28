---
title: test page
layout: default
---

* TOC
{:toc}

# {{ page.title }}


## all flickr photos for the homepage random gallery

{% include flickrgallery-all.html %}


## events test from yml

### upcoming events

{% include events.html filter="future" %}

### past events (selection)

{% include events.html filter="past" %}

{% comment %}

## latest mastodon posts

<img src="/assets/img/singing-avatar.png" title="Driek sings" alt="small square picture of Driek singing on stage" width=100 height=100 />



{% include mastodonlinks.html %}


## Flickr profile via BigHugeLabs:

<a href="http://bighugelabs.com/dna.php?username=52122658@N00"><img src="http://bighugelabs.com/img/dna-button3.png" alt="View my photos at bighugelabs.com" border="0" style="border: 0"></a>

## Flickr badge via BigHugeLabs:

<a href="https://flickr.com/photos/52122658@N00/"><img src="https://bighugelabs.com/profilewidget/recent.explore.default/000000/ffffff/52122658@N00.jpg" border="0" alt="driek. Get yours at bighugelabs.com" title="driek. Get yours at bighugelabs.com" /></a>

{% endcomment %}