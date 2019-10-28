---
layout: post
title:  EEBO-TCP N-gram Browser
date:   2014-01-17 10:00:00 -0500
author: Anupam Basu
tags: 
summary: EEBO-TCP N-gram Browser
categories:
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

<p class="instructions">For more about regular expressions, please see our post on <a href="howtoeebospellingbrowser.html">Using the N-gram Browser</a>.  For a full list of the nupos part-of-speech codes, please see  the section titled "Parts of Speech Table" in <a href="https://apps.lis.illinois.edu/wiki/display/MONK/Morphology+and+NUPOS">Morphology and NUPOS</a>, an article written by John Norstad.</p>

<hr/>
<br/>
</div>

<div id="entryArea">

<span class="controlLabel">ngramSize:</span>
<input type="radio" name="gramSize" value="1"><span class="radioLabel">unigrams</span>
<input type="radio" name="gramSize" value="2"><span class="radioLabel">bigrams</span>
<input type="radio" name="gramSize" value="3"><span class="radioLabel">trigrams</span>
<br/>

<span class="controlLabel">spellings:</span>
<input type="radio" name="spellings" value="spe"><span class="radioLabel">original</span>
<input type="radio" name="spellings" value="reg"><span class="radioLabel">regularized</span>
<input type="radio" name="spellings" value="lem"><span class="radioLabel">lemmas</span>
<br/>

<br/>
<br/>

<div id="entry1">
<span class="controlLabelGram">gram 1:</span>
<span class="controlLabel">search term:</span>
<input type="text" class="spellingInput" id="spelling1">
<span class="controlLabelPos">pos:</span>
<span id="posContainer1"><input type="text" id="pos1" class="pos"/></span>
</div>

<div id="entry2">
<span class="controlLabelGram">gram 2:</span>
<span class="controlLabel">search term:</span>
<input type="text" class="spellingInput" id="spelling2">
<span class="controlLabelPos">pos:</span>
<span id="posContainer2"><input type="text" id="pos2" class="pos"/></span>
</div>

<div id="entry3">
<span class="controlLabelGram">gram 3:</span>
<span class="controlLabel">search term:</span>
<input type="text" class="spellingInput" id="spelling3">
<span class="controlLabelPos">pos:</span>
<span id="posContainer3"><input type="text" id="pos3" class="pos"/></span>
</div>

<div id="buttonDiv">

<input type="checkbox" name="smoothing" value="smoothing" id="smoothing" onchange="javascript:handleSmoothingChange();"><span class="instructions">Graph smoothing&nbsp;&nbsp;&nbsp;</span>

<span style="display:inline-block; width: 50px;">&nbsp;</span>

<span class="instructions">Rolling Average:&nbsp;</span>

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
a to see all adverbs pos<br/>
c to see all conjunctions pos<br/>
d to see determiner pos<br/>
j to see all adjectives pos<br/>
n to see all nouns pos<br/>
pi, pn, to see po for all pronouns pos<br/>
pp to see all prepositions pos<br/>
uh to see all interjections pos<br/>
v to see all verbs pos<br/>
<br/><br/>
The full set of part of speech tags is:
<br/><br/>
a-acp -- acp word as adverb<br/>
av -- adverb<br/>
av-an -- noun-adverb as adverb<br/>
av-c -- comparative adverb<br/>
avc-jn -- comparative adj/noun as adverb<br/>
av-d -- determiner/adverb as adverb<br/>
av-dc -- comparative determiner/adverb as adverb<br/>
av-ds -- superlative determiner as adverb<br/>
av-dx -- negative determiner as adverb<br/>
av-j -- adjective as adverb<br/>
av-jc -- comparative adjective as adverb<br/>
av-jn -- adj/noun as adverb<br/>
av-js -- superlative adjective as adverb<br/>
av-n1 -- noun as adverb<br/>
av-s -- superlative adverb<br/>
avs-jn -- superlative adj/noun as adverb<br/>
av-vvg -- present participle as adverb<br/>
av-vvn -- past participle as adverb<br/>
av-x -- negative adverb<br/>
c.* -- all conjunctions,<br/>
c-acp -- acp word as conjunction<br/>
cc -- coordinating conjunction<br/>
cc-acp -- acp word as coordinating conjunction<br/>
c-crq -- wh-word as conjunction<br/>
ccx -- negative conjunction<br/>
crd -- numeral<br/>
cs -- subordinating conjunction<br/>
cst -- 'that' as conjunction<br/>
d.* -- all determiners,<br/>
d -- determiner<br/>
dc -- comparative determiner<br/>
dg -- determiner in possessive use<br/>
ds -- superlative determiner<br/>
dt -- article<br/>
dx -- negative determiner as adverb<br/>
fw-fr -- French word<br/>
fw-ge -- German word<br/>
fw-gr -- Greek word<br/>
fw-it -- Italian word<br/>
fw-la -- Latin word<br/>
fw-mi -- word in unspecified other language<br/>
j.* -- all adjectives,<br/>
j -- adjective<br/>
j-av -- adverb as adjective<br/>
jc -- comparative adjective<br/>
jc-jn -- comparative adj/noun<br/>
jc-vvg -- present participles as comparative adjective<br/>
jc-vvn -- past participle as comparative adjective<br/>
j-jn -- adjective-noun<br/>
jp -- proper adjective<br/>
js -- superlative adjective<br/>
js-jn -- superlative adj/noun<br/>
js-vvg -- present participle as superlative adjective<br/>
js-vvn -- past participle as superlative adjective<br/>
j-vvg -- present participle as adjective<br/>
j-vvn -- past participle as adjective,  <br/>
n.* -- all nouns,<br/>
n1 -- singular, noun<br/>
n1-an -- noun-adverb as singular noun<br/>
n1-j -- adjective as singular noun<br/>
n2 -- plural noun<br/>
n2-acp -- acp word as plural noun<br/>
n2-an -- noun-adverb as plural noun<br/>
n2-av -- adverb as plural noun<br/>
n2-dx -- determiner/adverb negative as plural noun<br/>
n2-j -- adjective as plural noun<br/>
n2-jn -- adj/noun as plural noun<br/>
n2-vdg -- present participle as plural noun, 'do'<br/>
n2-vhg -- present participle as plural noun, 'have'<br/>
n2-vvg -- present participle as plural noun<br/>
n2-vvn -- past participle as plural noun<br/>
ng1 -- singular possessive, noun<br/>
ng1-an -- noun-adverb in singular possessive use<br/>
ng1-j -- adjective as possessive noun<br/>
ng1-jn -- adj/noun as possessive noun<br/>
ng1-vvn -- past participle as possessive noun<br/>
ng2 -- plural possessive, noun<br/>
ng2-jn -- adj/noun as plural possessive noun<br/>
n-jn -- adj/noun as noun<br/>
njp -- proper adjective as noun<br/>
njp2 -- proper adjective as plural noun<br/>
njpg1 -- proper adjective as possessive noun<br/>
njpg2 -- proper adjective as plural possessive noun<br/>
np1 -- singular, proper noun<br/>
np2 -- plural, proper noun<br/>
npg1 -- singular possessive, proper noun<br/>
npg2 -- plural possessive, proper noun<br/>
np-n1 -- singular noun as proper noun<br/>
np-n2 -- plural noun as proper noun<br/>
np-ng1 -- singular possessive noun as proper noun<br/>
n-vdg -- present participle as noun, 'do'<br/>
n-vhg -- present participle as noun, 'have'<br/>
n-vvg -- present participle as noun<br/>
n-vvn -- past participle as noun<br/>
ord -- ordinal number<br/>
p-acp -- acp word as preposition<br/>
pc-acp -- acp word as particle<br/>
pi.*|^pn.*|^po.* -- all pronouns,<br/>
pi -- singular, indefinite pronoun<br/>
pi2 -- plural, indefinite pronoun<br/>
pi2x -- plural, indefinite pronoun<br/>
pig -- singular possessive, indefinite pronoun<br/>
pigx -- possessive case, indefinite pronoun<br/>
pix -- indefinite pronoun<br/>
pn22 -- 2nd person, personal pronoun<br/>
pn31 -- 3rd singular, personal pronoun<br/>
png11 -- 1st singular possessive, personal pronoun<br/>
png12 -- 1st plural possessive, personal pronoun<br/>
png21 -- 2nd singular possessive, personal pronoun<br/>
png22 -- 2nd person, possessive, personal pronoun<br/>
png31 -- 3rd singular possessive, personal pronoun<br/>
png32 -- 3rd plural possessive, personal pronoun<br/>
pno11 -- 1st singular objective, personal pronoun<br/>
pno12 -- 1st plural objective, personal pronoun<br/>
pno21 -- 2nd singular objective, personal pronoun<br/>
pno31 -- 3rd singular objective, personal pronoun<br/>
pno32 -- 3rd plural objective, personal pronoun<br/>
pns11 -- 1st singular subjective, personal pronoun<br/>
pns12 -- 1st plural subjective, personal pronoun<br/>
pns21 -- 2nd singular subjective, personal pronoun<br/>
pns31 -- 3rd singular subjective, personal pronoun<br/>
pns32 -- 3rd plural objective, personal pronoun<br/>
po11 -- 1st singular, possessive pronoun<br/>
po12 -- 1st plural, possessive pronoun<br/>
po21 -- 2nd singular, possessive pronoun<br/>
po22 -- 2nd person possessive pronoun<br/>
po31 -- 3rd singular, possessive pronoun<br/>
po32 -- 3rd plural, possessive pronoun<br/>
pp.* -- all prepositions,<br/>
pp -- preposition<br/>
pp-f -- preposition 'of'<br/>
px11 -- 1st singular reflexive pronoun<br/>
px12 -- 1st plural reflexive pronoun<br/>
px21 -- 2nd singular reflexive pronoun<br/>
px22 -- 2nd plural reflexive pronoun<br/>
px31 -- 3rd singular reflexive pronoun<br/>
px32 -- 3rd plural reflexive pronoun<br/>
pxg21 -- 2nd singular possessive, reflexive pronoun<br/>
q-crq -- interrogative use, wh-word<br/>
r-crq -- relative use, wh-word<br/>
sy -- alphabetical or other symbol<br/>
uh.* -- all interjections,<br/>
uh -- interjection<br/>
uh-av -- adverb as interjection<br/>
uh-crq -- wh-word as interjection<br/>
uh-dx -- negative interjection<br/>
uh-j -- adjective as interjection<br/>
uh-jn -- adjective/noun as interjection<br/>
uh-n -- noun as interjection<br/>
uh-v -- verb as interjection<br/>
v.* -- all verbs,<br/>
vb2 -- 2nd singular present of 'be'<br/>
vb2-imp -- 2nd plural present imperative, 'be'<br/>
vb2x -- 2nd singular present, 'be'<br/>
vbb -- present tense, 'be'<br/>
vbbx -- present tense negative, 'be'<br/>
vbd -- past tense, 'be'<br/>
vbd2 -- 2nd singular past of 'be'<br/>
vbd2x -- 2nd singular past, 'be'<br/>
vbdp -- plural past tense, 'be'<br/>
vbdx -- past tense negative, 'be'<br/>
vbg -- present participle, 'be'<br/>
vbi -- infinitive, 'be'<br/>
vbm -- 1st singular, 'be'<br/>
vbmx -- 1st singular negative, 'be'<br/>
vbn -- past participle, 'be'<br/>
vbp -- plural present, 'be'<br/>
vbz -- 3rd singular present, 'be'<br/>
vbzx -- 3rd singular present negative, 'be'<br/>
vd2 -- 2nd singular present of 'do'<br/>
vd2-imp -- 2nd plural present imperative, 'do'<br/>
vd2x -- 2nd singular present negative, 'do'<br/>
vdb -- present tense, 'do'<br/>
vdbx -- present tense negative, 'do'<br/>
vdd -- past tense, 'do'<br/>
vdd2 -- 2nd singular past of 'do'<br/>
vdd2x -- 2nd singular past negative, verb<br/>
vddp -- plural past tense, 'do'<br/>
vddx -- past tense negative, 'do'<br/>
vdg -- present participle, 'do'<br/>
vdi -- infinitive, 'do'<br/>
vdn -- past participle, 'do'<br/>
vdp -- plural present, 'do'<br/>
vdz -- 3rd singular present, 'do'<br/>
vdzx -- 3rd singular present negative, 'do'<br/>
vh2 -- 2nd singular present of 'have'<br/>
vh2-imp -- 2nd plural present imperative, 'have'<br/>
vh2x -- 2nd singular present negative, 'have'<br/>
vhb -- present tense, 'have'<br/>
vhbx -- present tense negative, 'have'<br/>
vhd -- past tense, 'have'<br/>
vhd2 -- 2nd singular past of 'have'<br/>
vhdp -- plural past tense, 'have'<br/>
vhdx -- past tense negative, 'have'<br/>
vhg -- present participle, 'have'<br/>
vhi -- infinitive, 'have'<br/>
vhn -- past participle, 'have'<br/>
vhp -- plural present, 'have'<br/>
vhz -- 3rd singular present, 'have'<br/>
vhzx -- 3rd singular present negative, 'have'<br/>
vm2 -- 2nd singular present of modal verb<br/>
vm2x -- 2nd singular present negative, modal verg<br/>
vmb -- present tense, modal verb<br/>
vmb1 -- 1st singular present, modal verb<br/>
vmbx -- present tense negative, modal verb<br/>
vmd -- past tense, modal verb<br/>
vmd2 -- 2nd singular past of modal verb<br/>
vmd2x -- 2nd singular present, modal verb<br/>
vmdp -- plural past tense, modal verb<br/>
vmdx -- past negative, modal verb<br/>
vmi -- infinitive, modal verb<br/>
vmn -- past participle, modal verb<br/>
vmp -- plural present tense, modal verg<br/>
vv2 -- 2nd singular present of verb<br/>
vv2-imp -- 2nd present imperative, verb<br/>
vv2x -- 2nd singular present negative, verb<br/>
vvb -- present tense, verg<br/>
vvbx -- present tense negative, verb<br/>
vvd -- past tense, verb<br/>
vvd2 -- 2nd singular past of verb<br/>
vvd2x -- 2nd singular past negative, verb<br/>
vvdp -- past plural, verb<br/>
vvdx -- past tense negative, verb<br/>
vvg -- present participle, verb<br/>
vvi -- infinitive, verb<br/>
vvn -- past participle, verb<br/>
vvp -- plural present, verb<br/>
vvz -- 3rd singular preseent, verb<br/>
vvzx -- 3rd singular present negative, verb<br/>
xx -- negative<br/>
zz -- unknown or unparsable token<br/>
<br/>
</div>
<br/>
<div id="credits">EEBO-TCP data preparation by Anupam Basu, made possible by <a href="http://morphadorner.northwestern.edu/">Morphadorner</a>, developed by <a href="http://www.linkedin.com/in/philiprobertburns">Philip R. "Pib" Burns</a> of Northwestern University.  Interactive visualization by Stephen Pentecost.</div>
    
<div id="mouseoverPopup"></div>
 

<!-- END HTML FROM THE APPLICATION -->
    
</div> 

<!-- COPY JS FROM THE APPLICATION -->


<link rel="stylesheet" type="text/css" href="/assets/tools/css/eeboSpellingBrowser.css?v=1500">
<script src="/assets/tools/js/jquery-1.11.0.min.js?v=1500"></script>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css?v=1500" />
<script type="text/javascript" src="/assets/tools/jquery-ui-1.11.1.custom/jquery-ui.min.js?v=1500"></script>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script type="text/javascript" src="/assets/tools/js/tinycolor.js?v=1500"></script>
<script type="text/javascript" src="/assets/tools/js/nupos.js?v=1500"></script>
<script type="text/javascript" src="/assets/tools/js/eeboSpellingBrowser.js?v=1500"></script>




 
