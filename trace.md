---
layout: page
title: "TRACE: <small>Tools and Resources for Analysis of Content in EEBO</small>"
permalink: /trace/
---

### About TRACE

TRACE is a collaboration between the [*Linguistic Data Consortium*](https://www.ldc.upenn.edu/) (University of Pennsylvania) and the [*EarlyPrint Lab*](https://earlyprint.org/lab/) (Washington University in St. Louis; Washington & Jefferson College) to extend the annotation of the [EEBO-TCP corpus](/intros/intro-to-eebo-and-eebo-tcp.html) to include **syntactic structure, named entities, and word senses**.

With [funding from the National Science Foundation](https://www.nsf.gov/awardsearch/show-award?AWD_ID=2523498), TRACE will **annotate 1.5 billion words of historical English** with: (1) POS tags, (2) syntactic structure, (3) lemmas and word senses, and (4) coreference/entity linking to a knowledge base. Texts will be drawn from *EarlyPrint*'s collection of approximately 60,000 books spanning 1475 to 1700. 

We will also provide users with **tools for interacting with these resources**, consisting of: (1) an updated version of [Corpus Search](https://eplab.artsci.wustl.edu/blacklab-frontend/earlyprint/search/), a tool for identifying and counting lexical and syntactic terms, (2) programming tools for extracting semantic triples for use in network analysis, in keeping with our work on the [EarlyPrint + Python notebooks](/jupyterbook). These annotations will be both released by LDC and integrated into the *EarlyPrint* website.

### Recent Updates and Posts

Coming soon...

{% for category in site.categories %}
  {% if category[0] == "TRACE" %}
  <ul class="post-list indentedUL">
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

### People

Seth Kulick, co-PI, University of Pennsylvania  
Neville Ryant, co-PI, University of Pennsylvania  
Joseph Loewenstein, co-PI, Washington University in St. Louis  
Ann Bies, University of Pennsylvania  
Douglas Knox, Washington University in St. Louis  
John Ladd, Washington & Jefferson College

<a href="https://www.wustl.edu/"><img style="vertical-align: top; width: 350px; padding-left: 25px;" src="/assets/img/wustl.png"></a>