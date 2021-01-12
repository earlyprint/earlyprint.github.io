---
layout: page
title: Tutorials and How-Tos
permalink: /how-to/
---

## Lab

{% for category in site.categories %}
  {% if category[0] == "How-To" %}
  <ul class="post-list">
    {%- for post in category[1] -%}
    {% if post.tags[0] == "ep-lab" %}
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

## <a class="fell near-black link dim" target="_blank" href="https://earlyprint.org/jupyterbook/intro.html"><em>EarlyPrint</em> + Python</a>

<span class="post-meta">Additional tutorials for analyzing our data using a programming language in the <a class="near-black link dim" target="_blank" href="https://earlyprint.org/jupyterbook/intro.html">*EarlyPrint* + Python</a> Jupyter book.</span>

## Library

{% for category in site.categories %}
  {% if category[0] == "How-To" %}
  <ul class="post-list">
    {%- for post in category[1] -%}
    {% if post.tags[0] == "ep-library" %}
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

