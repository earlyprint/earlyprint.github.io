---
layout: post
title:  Poetry Disco
date:   2018-12-01 10:00:00 -0500
tags: 
summary: A very experimental application of disco
categories: Lab
---

<h3>A very experimental application of disco</h3>

<div id="page_controls">
<div class="controls_1">
<div class="heading">Find the TCP ID for a text</div>     
<div>  

<input type="text" id="which_to_do_1" value="lookup_tcp_id" style="display:none">
<span class="form_label_1">Author:</span> <input type="text" id="author_1"><br/>
<span class="form_label_1">Title:</span> <input type="text" id="title_1"><br/>
<br/>
<span class="form_label_1"> </span> <button onclick="javascript:handle_button(1);">Find ID</button><br/>

</div>
</div>

<div class="controls_2">
<div class="heading"><i>Or</i>, find texts similar to a TCP id</div>        
<div> 

<input type="text" id="which_to_do_2" value="find_texts" style="display:none">
<span class="form_label_2">TCP ID:</span> <input type="text" id="eebo_tcp_id_2"> <span id="extra_spacer_1"> </span>
<br/>
<span class="form_label_2">n results:</span> <!--<span>1</span> <input type="range" min="1" max="100" value="50" class="slider" id="n_results" name="n_results"> <span>100</span>-->
    <select id="n_results">
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="35" selected>35</option>
      <option value="50">50</option>
      <option value="75">75</option>
      <option value="100">100</option>
    </select>
<br/>

<br/>
<span class="form_label_2"> </span> <button onclick="javascript:handle_button(2);">Find Texts</button>

<button class="shareable_link" onclick="javascript:onShortenLink();">Shareable Link</button>

</div>
</div>

<div class="clear_div"></div>

<br/>
<div id="results"></div>
<div id="tooltip"></div>

<link rel="stylesheet" type="text/css" href="/assets/tools/css/disco_engine.css?v=1501"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="/assets/tools/js/poetry_disco.js?v=1501"></script>
<script type="text/javascript" src="/assets/tools/js/shorten_link.js?v=1501"></script>
<link rel="stylesheet" type="text/css" href="/assets/tools/css/common_tool_styles.css?v=1501"/>
