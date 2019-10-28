---
layout: post
title:  EEBO-TCP Key Words in Context
date:   2014-08-14 10:00:00 -0500
author: Anupam Basu
tags: 
summary: EEBO-TCP Key Words in Context
categories:
---

<div class='page'>
<div>

<div id="leftContent">

<table>

<tr>
<td class="formColumn1">
Corpus:
</td>    
<td class="formColumn2">  
<select id="corpus">
<option value="plaintext_reg" selected>Regularized spellings</option>
<option value="plaintext">Original spellings</option>
<option value="plaintext_lem">Lemmatized and regularized</option>
</select> 
</td>  
</tr>


<tr>
<td class="formColumn1">
Search Pattern:
</td>    
<td class="formColumn2">   
<input type="text" id="searchPattern">
</td>   
</tr>
<tr>
<td class="formColumn1">
Year range:
</td>    
<td class="formColumn2x2">
<div  id="yearSlider">
</div>
</td>  
</tr>

<tr>
<td class="formColumn1">
Author:
</td>    
<td class="formColumn2">   
<input type="text" id="authors">
</td>   
</tr>

<tr>
<td class="formColumn1">
Titles:
</td>    
<td class="formColumn2">   
<input type="text" id="titles">
</td>    
</tr>

<tr>
<td class="formColumn1">
&nbsp;
</td> 
<td class="formColumn2">  
<button type="button" onclick="javascript:runGrok();">View Words</button> 
</td>    
</tr>

</table>

</div>

<div id="rightContent">

<div class="instructions">

<p><b>Instructions</b></p>

<p>This version of Key Words in Context supports the following types of queries:</p>

<ul>
<li><b>Single-term searches</b>:  Simply type in a word</li>
<li><b>Wildcard searches</b>:  Use asterisk to represent any number of characters, or question mark to represent one character (i.e., sh*less, which will find "shirtless", "shameless", etc.</li>
<li><b>Fuzzy searches</b>: Type in a word or words, followed by a tilde and a number.  The number indicates how fuzzy, in terms of number of letters, the search results should be.  For example, tree~1 should yield results for the words tree, trees, trete, true (and more), all of which are one letter different than tree.</li>
<li><b>Regex searches</b>: Enter a regular expression, wrapped in '/' (e.g., /tree.*/).  Note that we assume that the regex starts with the first letter of the word and ends with the last letter (i.e., a regex like /tree./ is processed as if it was written /^tree.$/).</li>
<li><b>Multi-word searches</b>:  Type in the words, wrapped in quotation marks (e.g., "mighty king")</li>
<li><b>Proximity searches</b>: To find words which occur near each other, wrap the words in quotation marks, followed by a tilde and a number.  The number indicates how closely, in terms of number of words, the two words should appear.  For example. "band rabble"~4 should yield results like  "all his whole band and rabble", "the City-Rabble , These are my Band-dogs" and "a Shirtless Band Of Northern Rabble".</li>
</ul>

<p>When narrowing searches by author and/or title, it isn't necessary to enter the complete author name or title; instead, one work is often enough.</p>

<p>You can use Key Words in Context to see if work by an author is available in data.  Leave the Search Pattern blank, enter part of the author's name in the Author field (e.g. Gower), and click View Words.  The results will be a list of the works by the author contained in our corpus.</p>

</div>

</div>

<div id="clearContent"></div>

<div id="resultsInformation" class="pagingWidget"></div>

<div id="topPagingWidget" class="pagingWidget"></div>

<div id="results"></div>

<div id="bottomPagingWidget" class="pagingWidget"></div>

<div id="runningQueryMessage">Querying the server . . . </div>


<!-- COPY JS FROM THE APPLICATION -->

<script src="/assets/tools/js/jquery-1.11.0.min.js?v=1500"></script>
<script src="/assets/tools/js/jquery-ui-1.11.0.custom/jquery-ui.min.js?v=1500"></script>
<script src="/assets/tools/js/jQRangeSlider-5.7.0/jQRangeSlider-min.js?v=1500"></script>
<link rel="stylesheet" type="text/css" href="/assets/tools/js/jQRangeSlider-5.7.0/css/classic.css?v=1500">
<link rel="stylesheet" type="text/css" href="/assets/tools/css/webGrok.css?v=1500">
<script src="/assets/tools/js/webGrok.js?v=1500" charset="utf-8"></script>

</div>
<div class='small italics'>2015-02-10</div>
<div class='small italics'>Anupam Basu, Stephen Pentecost</div>
