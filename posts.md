---
layout: page
title: Blog Posts
permalink: /posts/
---

### Martin Mueller

{% for category in site.categories %}
  {% if category[0] == "Posts" %}
  <ul class="post-list indentedUL">
    {%- for post in category[1] -%}
    {% if post.author == "Martin Mueller" %}
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
    {% endif %}
    {%- endfor -%}
  </ul>
  {% endif %}
{% endfor %}

### John R. Ladd

{% for category in site.categories %}
  {% if category[0] == "Posts" %}
  <ul class="post-list indentedUL">
    {%- for post in category[1] -%}
    {% if post.author == "John R. Ladd" %}
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
    {% endif %}
    {%- endfor -%}
    
    <li>
      <h3 class="mb0">
        <a class="post-link fell f4 near-black link dim" href="https://programminghistorian.org/en/lessons/common-similarity-measures">
          Understanding and Using Common Similarity Measures
        </a>
      </h3>
      <span class="post-meta">This lesson introduces three common measures for determining how similar texts are to one another: city block distance, Euclidean distance, and cosine distance.</span>
    </li>
    
  </ul>
  {% endif %}
{% endfor %}

### Others

{% for category in site.categories %}
  {% if category[0] == "Posts" %}
  <ul class="post-list indentedUL">
    {%- for post in category[1] -%}
    {% if post.author != "Martin Mueller" and post.author != "John R. Ladd"  %}
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
    {% endif %}
    {%- endfor -%}
  </ul>
  {% endif %}
{% endfor %}
