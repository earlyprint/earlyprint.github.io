---
layout: page
title:  TEST
date:   2014-01-17 10:00:00 -0500
tags:
summary: TESTr
categories: Lab
---

<div id="eeboFrame" width="100%">

<!-- COPY HTML FROM THE APPLICATION -->

<div class="hideShow"><a id="instructionToggle" href="javascript:showHideInstructions();">show instructions</a></div>

<div id="eeboInstructions">

<p class="instructions">Select an ngram size and spelling type, enter search terms and pos (parts of speech, optional), select (or not) the graph smoothing and rolling average options, and click Draw Graph.</p>

<p class="instructions">A search term can be:</p>

<ul class="instructions">
<li>A whole word (love) or words separated by commas (love,loue), or</li>
<li>A regular expression (/lo[uv]e/) or expressions separated by commas (/lo[uv]e/,/abo[uv]e/).  Note that "/" delimiters are required for regular expressions.  Note that we assume that regular expressions start at the beginning of a word and finish at the end of a word; so, for example, /lo[uv]e/ will match "love" and "loue".  To find strings inside larger words, use the ".*" modifiers. for example, /.*love.*/ will match "beloved", "loved" and "glove".</li>
</ul>

<p class="instructions">A pos (part of speech) can be:</p>

<ul class="instructions">
<li>A value selected from the autocomplete helper on the input field, or</li>
<li>A fully formed pos value (n1) or values separated by commas (n1,n2), or</li>
<li>A regular expression (/n.*/) or expressions separated by commas (/n.*/,/v.*/), or</li>
</ul>

<p class="instructions">Please note that we do put a limit on the complexity of queries.  If you exceed those limits, we return what we can, and provide a message to that effect.</p>

<p class="instructions">For more about regular expressions, please see our post on <a href="/how-to/howto_ngram_browser.html">Using the N-gram Browser</a>. For more on part-of-speech tags, please see the <a href="http://morphadorner.northwestern.edu/morphadorner/documentation/nupos/">NUPOS documentation</a>.</p>

<hr/>
<br/>
</div>

<div id="entryArea">

<span class="controlLabel">ngramSize:</span>
<input type="radio" name="gramSize" value="1" id="radio_1_1"><span class="radioLabel">unigrams</span>
<input type="radio" name="gramSize" value="2" id="radio_1_2"><span class="radioLabel">bigrams</span>
<input type="radio" name="gramSize" value="3" id="radio_1_3"><span class="radioLabel">trigrams</span>

<button class="shareable_link" onclick="javascript:onShortenLink();">Shareable Link</button>
<br/>

<span class="controlLabel">spellings:</span>
<input type="radio" name="spellings" value="spe" id="radio_2_1"><span class="radioLabel">original</span>
<input type="radio" name="spellings" value="reg" id="radio_2_2"><span class="radioLabel">regularized</span>
<input type="radio" name="spellings" value="lem" id="radio_2_3"><span class="radioLabel">lemmas</span>
<br/>

<br/>
<br/>

<div id="entry1">
<span class="controlLabelGram">gram 1:</span>
<span class="controlLabel_1">search term:</span>
<input type="text" class="spellingInput" id="spelling1">
<span class="controlLabelPos">pos:</span>
<span id="posContainer1"><input type="text" id="pos1" class="pos"/></span>
</div>

<div id="entry2">
<span class="controlLabelGram">gram 2:</span>
<span class="controlLabel_1">search term:</span>
<input type="text" class="spellingInput" id="spelling2">
<span class="controlLabelPos">pos:</span>
<span id="posContainer2"><input type="text" id="pos2" class="pos"/></span>
</div>

<div id="entry3">
<span class="controlLabelGram">gram 3:</span>
<span class="controlLabel_1">search term:</span>
<input type="text" class="spellingInput" id="spelling3">
<span class="controlLabelPos">pos:</span>
<span id="posContainer3"><input type="text" id="pos3" class="pos"/></span>
</div>

<div id="buttonDiv">

<input type="checkbox" name="smoothing" value="smoothing" id="smoothing" onchange="javascript:handleSmoothingChange();"><span class="instructions" id="graph_smoothing_label">Graph smoothing&nbsp;&nbsp;&nbsp;</span>

<span style="display:inline-block; width: 25px;">&nbsp;</span>

<span class="instructions" id="rolling_average_label">Rolling Average:&nbsp;</span>

<select id="rollingAverage" onchange="javascript:handleRollingAverageChange(false);">
<option value="none">None</option>
<option value="5_year">5 year</option>
<option value="10_year">10 year</option>
<option value="15_year">15 year</option>
<option value="20_year">20 year</option>
</select>

<span style="display:inline-block; width: 20px;">&nbsp;</span>

<input type="button" id="queryButton" value="Draw Graph" onclick="javascript:handleGoButton();">
</div>
<br/>
<p id="errorMessages"></p>
</div>
<div id="resultsArea">
</div>

<div id="slider-container">
<div id="slider_range"></div>
<div id="slider-message">Use the slider to narrow the date range</div>
</div>

<br/>
<div id="clickToSubmitContainer">
</div>
<div id="savedQueriesContainer">
<div>
</div>
<div id="progressMessage">
Generating the graph.  Thank you for waiting.
</div>
<div id="nuposPopup">
<span class="nuposPopupBold">Help for nupos part-of-speech tags:</span>
<br/><br/>
If you type one or two letters into a pos input field, you'll see a subset of the pos tags available for use in queries.  And, of course, you may leave the pos input field(s) blank, and the browser will disregard part-of-speech when graphing search terms.  Try typing:
<br/><br/>
a to see all adverb pos<br/>
c to see all conjunction pos<br/>
d to see determiner pos<br/>
j to see all adjective pos<br/>
n to see all noun pos<br/>
p to see all pronoun pos<br/>
acp to see all preposition pos<br/>
uh to see all interjection pos<br/>
v to see all verb pos<br/>
<br/><br/>
The full set of part of speech tags is:
<br/><br/>
ab -- an abbreviations<br/>
acp -- prepositions some of which are also used as adverbs or conjunctions<br/>
av.* -- all adverbs<br/>
av -- adverb<br/>
av-d -- determiners as adverb<br/>
av-j -- adjective as adverb<br/>
av-n -- noun as adverb<br/>
av-ord -- ordinal as adverb<br/>
av-vg -- present participle as adverb<br/>
av-vn -- past participle as adverb<br/>
avc -- comparative adverb<br/>
avc-d -- comparative determiner as adverb<br/>
avc-j -- comparative adjective as adverb<br/>
avs -- superlative adverb<br/>
avs-d -- superlative determiner as adverb<br/>
avs-j -- superlative adjective as adverb<br/>
avx -- negative adverb<br/>
avx-d -- negative determiner as adverb<br/>
cc.* -- all conjunctions<br/>
cc -- coordinating conjunction<br/>
ccx -- negative conjunction<br/>
crd -- cardinal number<br/>
crd-m -- a monetary amount<br/>
crq -- wh- words as interrogative or relative pronouns<br/>
cs -- conjunction<br/>
d.* -- all determiners<br/>
d -- determiner<br/>
dc -- comparative determiner<br/>
ds -- superlative determiner<br/>
dx -- negative determiner<br/>
emptycell -- a temporary token to mark empty cell eleents<br/>
fan -- Anglo-Saxon word<br/>
fdu -- Dutch word<br/>
fes -- Spanish word<br/>
ffr -- French wprd<br/>
fge -- German word<br/>
fgr -- Greek word<br/>
fhe -- Hebrew word<br/>
fin -- American Indian word<br/>
fit -- italian word<br/>
fla -- Latin word<br/>
fmi -- dialect word or word in<br/>
fsc -- Scottish word<br/>
fwe -- Welsh word<br/>
fxx -- word in a non-Roman script, mainly Greek or Hebrew<br/>
j.* -- all adjectives<br/>
j -- adjective<br/>
j-av -- adjective from adverb<br/>
j-mi -- adjective<br/>
j-vg -- present participle as adjective<br/>
j-vmd -- adjective from past modal verb<br/>
j-vn -- past participle as adjective<br/>
jc -- comparative adjective<br/>
jc-vg -- comparative adjective from present participle<br/>
jc-vn -- comparative adjective from past participle<br/>
jnn -- proper adjective<br/>
js -- superlative adjective<br/>
js-vg -- superlative adjective from present participle<br/>
js-vn -- <br/>
n.* -- all nouns<br/>
n1 -- singular noun<br/>
n1-j -- adjective used as noun<br/>
n1-mi -- miscellaneous word class used as noun<br/>
n1-vg -- noun from present participle (gerund)<br/>
n1-vm -- noun from modal verb present<br/>
n1-vmd -- noun from modal verb past<br/>
n1-vn -- noun from past participle (gerund)<br/>
n2  -- plural noun<br/>
n2-crq -- crq word used as noun<br/>
n2-j -- adjective used as plural noun<br/>
n2-mi -- miscellaneous wordclass used as plural noun<br/>
n2-ord -- ordinal used as plural noun<br/>
n2-uh -- exclamation used as plural noun<br/>
n2-vg -- plural noun from present participle<br/>
n2-vn -- <br/>
ng1 -- single noun, genitive<br/>
ng1-j -- <br/>
ng1-mi -- miscellaneous wordclass used as genitive noun<br/>
ng1-ord -- ordinal used as genitive noun<br/>
ng1-vg -- genitive noun from present participle<br/>
ng1-vn -- genitive noun from past participle<br/>
ng2 -- genitive plural noun<br/>
ng2-j -- adjective used as plural noun genitive<br/>
ng2-vn -- past participle as genitive plural<br/>
nn1 -- proper noun<br/>
nn2 -- a plural name<br/>
nng1 -- proper noun, genitive<br/>
nng2 -- genitive plural proper noun<br/>
nnp -- A particle that is part of a name<br/>
ord -- ordinal number<br/>
^pi.*|^pn.*|^po.* -- all pronouns<br/>
pi -- indefinite pronoun<br/>
pi-d -- determiner as indefinite pronoun<br/>
pi2 -- determiner as indefinite plural pronoun<br/>
pi2-d -- determiner as plural indefinite pronoun<br/>
pi2x -- negative indefinite pronoun plural<br/>
pig -- indefinite pronoun, genitive<br/>
pig-d -- determiner as indefinite pronoun, genitive<br/>
pig2-d -- determiner as indefinite pronoun, genitive plural<br/>
pigx -- negative indefinity pronoun, genitive<br/>
pigx-d -- determiner as negative indefinite pronoun, genitive<br/>
pix -- negative indefinite pronoun<br/>
pix-d -- negative determiner as indefinit pronoun<br/>
pn -- personal pronoun<br/>
png -- personal pronoun, genitive<br/>
pno -- personal pronoun, objective<br/>
pns -- personal pronoun, subjective<br/>
po -- possessive pronoun<br/>
pr -- a reflexive pronoun<br/>
prg -- genitive of reflexive pronoun<br/>
prt -- a particle<br/>
sy -- a symbol<br/>
uh.* -- all exclamations<br/>
uh -- exclamation<br/>
uh-av -- exclamation from adverb<br/>
uh-crq -- exclamation from crq word<br/>
uh-j -- <br/>
uh-mi -- exclamation from miscellaneous wordclass<br/>
uh-n -- noun as exclamation<br/>
uh-v -- verb used as exclamation<br/>
uhx -- negative exclamation<br/>
v.* -- all verbs<br/>
vm2 -- modal verb, 2nd person singular<br/>
vmb -- modal verb, present<br/>
vmbp -- plural present of modal verb<br/>
vmbx -- negative modal verb<br/>
vmd -- modal verb, past<br/>
vmd2 -- modal verb, past, 2nd person singular<br/>
vmd2x -- <br/>
vmdp -- <br/>
vmdx -- modal verb, past, negative<br/>
vv2 -- verb, present, 2nd person singular<br/>
vvb -- verb, present<br/>
vvbx -- verb,  present, negative<br/>
vvd -- verb, past<br/>
vvd2 -- verb, past, 2nd person singular<br/>
vvdp -- verb, past, plural<br/>
vvdx -- verb, past, negative<br/>
vvg -- verb, present participle<br/>
vvi -- <br/>
vvm -- first person singular of 'be'<br/>
vvmx -- <br/>
vvn -- verb, past participle<br/>
vvnx -- <br/>
vvp -- verb, present, plural<br/>
vvz -- verb, 3rd person singular<br/>
vvzx -- <br/>
wd -- this tag is introduced in manual review to identify tokens that the automatic parser got wrong<br/>
xx -- negative<br/>
z0 -- <br/>
zz -- this tag is introduced in manual review to identify tokens that the automatic parser got wrong<br/>
<br/>
</div>
<br/>
<div id="credits">EEBO-TCP data preparation by Anupam Basu, made possible by <a href="http://morphadorner.northwestern.edu/">Morphadorner</a>, developed by <a href="http://www.linkedin.com/in/philiprobertburns">Philip R. "Pib" Burns</a> of Northwestern University.  Interactive visualization by Stephen Pentecost.</div>

<div id="mouseoverPopup"></div>


<!-- END HTML FROM THE APPLICATION -->

</div>

<!-- COPY JS FROM THE APPLICATION -->


<link rel="stylesheet" type="text/css" href="/assets/tools/css/eeboSpellingBrowser.css?v=1501">
<script src="/assets/tools/js/jquery-1.11.0.min.js?v=1501"></script>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css?v=1501" />
<script type="text/javascript" src="/assets/tools/jquery-ui-1.11.1.custom/jquery-ui.min.js?v=1501"></script>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script type="text/javascript" src="/assets/tools/js/tinycolor.js?v=1501"></script>
<script type="text/javascript" src="/assets/tools/js/eebotcp_nupos.js?v=1501"></script>
<script type="text/javascript" src="/assets/tools/js/test_eeboSpellingBrowser.js?v=1501"></script>
<script type="text/javascript" src="/assets/tools/js/shorten_link.js?v=1501"></script>
<link rel="stylesheet" type="text/css" href="/assets/tools/css/common_tool_styles.css?v=1501"/>
