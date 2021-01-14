---
layout: page
title: Tutorials and How-Tos
permalink: /how-to/
---

### Lab

{% for category in site.categories %}
  {% if category[0] == "How-To" %}
  <ul class="post-list indentedUL">
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
    
    <li>
      <h3 class="mb0">
        <a class="post-link fell f4 near-black link dim" href="https://earlyprint.org//jupyterbook/ep_xml.html">
          How to Work Directly with EarlyPrint XML
        </a>
      </h3>
      <span class="post-meta">Parse EarlyPrint XML Texts in Python</span>
    </li>
    
    <li>
      <h3 class="mb0">
        <a class="post-link fell f4 near-black link dim" href="https://earlyprint.org//jupyterbook/tf_idf.html">
          Exploring Vocabulary Using Tf-Idf
        </a>
      </h3>
      <span class="post-meta">Examine the vocabulary in EarlyPrint texts using Tf-Idf: Term Frequency–Inverse Document Frequency.</span>
    </li>
    
    <li>
      <h3 class="mb0">
        <a class="post-link fell f4 near-black link dim" href="https://earlyprint.org//jupyterbook/metadata.html">
          Working with Metadata
        </a>
      </h3>
      <span class="post-meta">Use Python to download and parse EarlyPrint metadata.</span>
    </li>
    
  </ul>
  {% endif %}
{% endfor %}

### Library

{% for category in site.categories %}
  {% if category[0] == "How-To" %}
  <ul class="post-list indentedUL">
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

