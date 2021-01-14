---
layout: page
title: Introductions and Documentation
permalink: /intros/
---

<h3>Introductions to the EarlyPrint Library </h3>
  
{% for category in site.categories %}

  {% if category[0] == "Intros" %}
  <ul class="post-list indentedUL">
    {%- for post in category[1] -%}
    {% if post.tags[0] == "EpLibIntros" %}
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

<h3>The Inner Workings of EarlyPrint</h3>

{% for category in site.categories %}

  {% if category[0] == "Intros" %}
  <ul class="post-list indentedUL">
    {%- for post in category[1] -%}
    {% if post.tags[0] == "InnerWorkingsIntros" %}
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
        <a class="post-link fell f4 near-black link dim" href="http://morphadorner.northwestern.edu/morphadorner/documentation/nupos/">
          The NUPOS tag set
        </a>
      </h3>
      <span class="post-meta">Complete documention for NUPOS.</span>
    </li>
  </ul>
{% endif %}
  
{% endfor %}
