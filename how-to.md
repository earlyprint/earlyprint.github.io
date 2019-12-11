---
layout: page
title: Tutorials and How-Tos
permalink: /how-to/
---

## Jupyter Notebooks

This section showcases a series of tutorials in [Jupyter Notebooks](https://programminghistorian.org/en/lessons/jupyter-notebooks)—interactive Python code with explanatory text. The approaches and methods described in these notebooks may be too specific to become one of our [main tools](/lab), but we hope these brief, interactive code snippets will point researchers toward productive ways of using *EarlyPrint* texts. In a nutshell, these notebooks will allow you to modify and run Python routines without needing to write the code yourself.

{% for category in site.categories %}
  {% if category[0] == "Notebooks" %}
  <ul class="post-list">
    {%- for post in category[1] -%}
    <li>
      <h3 class="mb0">
        <a class="post-link fell f4 near-black link dim" href="{{ post.url | relative_url }}" target="_blank">
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

[n.b. *Those who already have some familiarity with Python but who haven't yet encountered Jupyter Notebooks might consult [this Programming Historian tutorial](https://programminghistorian.org/en/lessons/jupyter-notebooks), which explains the purpose and helpfulness of the notebook form.*]

## Other Tutorials

### Library

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

### Lab

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
