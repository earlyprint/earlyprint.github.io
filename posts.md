---
layout: page
title: Blog Posts
permalink: /posts/
---

{% for category in site.categories %}
  {% if category[0] == "Posts" %}
  <ul class="post-list">
    {%- for post in category[1] -%}
    <li>
      <h3 class="mb0">
        <a class="post-link fell f4 near-black link dim" href="{{ post.url | relative_url }}">
          {{ post.title | escape }}
        </a>
      </h3>
      <span class="post-meta">{{ post.author }}</span>
      <div class="post-meta">{{ post.summary }}</div>
      {%- if site.show_excerpts -%}
        {{ post.excerpt }}
      {%- endif -%}
    </li>
    {%- endfor -%}
  </ul>
  {% endif %}
{% endfor %}
