---
layout: default
title:  Phrase Search
date:   2014-01-17 10:00:00 -0500
tags:
summary: Search for variants of a phrase
categories: Lab
---

<div class="background bg-white min-vh-75">
<h1 class="pl3">Phrase Search</h1>
<small class="db w-80 center">This simple interface allows you to search for a phrase by translating your text into the corpus query language syntax used by <em>EarlyPrint</em>'s <a href="https://eplab.artsci.wustl.edu/blacklab-frontend/earlyprint/search/">Corpus Search</a>. Typing a phrase will create two unique search queries: one that looks for phrases of similar <strong>content</strong> and another that looks for phrases of similar <strong>form</strong>. For more detailed exploration of these patterns, use this interface as a starting point for a closer look from within <a href="https://eplab.artsci.wustl.edu/blacklab-frontend/earlyprint/search/">Corpus Search</a>.</small>

<div class="cf h-auto bg-light-blue mw7 center pa4 br2-ns ba b--black-10">
  <div class="fl w-100 tc mb1">Search for a phrase...</div>
  <form id="mainSearch">
   <input class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" type="text" placeholder="Type any phrase, e.g. 'for whom the bell tolls'" id="searchBox" />
   <button class="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" type="submit" id="submitSearch">Search</button>
  </form>
  <div class="fl w-100 tc mt4">...or adjust <a href="http://inl.github.io/BlackLab/corpus-query-language.html#using-cql" target="_blank">CQL</a> queries</div>
  <form class="w-50-ns fl pa2" id="contentQuery">
   <textarea class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 br2-ns br--left-ns" type="text" placeholder="When you search for a phrase above, a content-based query will autopopulate here" id="contentBox"></textarea>
   <button class="f6 f5-l center db button-reset pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer br2-ns" type="submit" id="submitContent">Query by Content</button>
  </form>
  <form class="w-50-ns fl pa2" id="formQuery">
   <textarea class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 br2-ns br--left-ns" type="text" placeholder="When you search for a phrase above, a form-based query will autopopulate here" id="formBox"></textarea>
   <button class="f6 f5-l center db button-reset pv3 mt3 tc bn bg-animate bg-black-70 hover-bg-black white pointer br2-ns" type="submit" id="submitForm">Query by Form</button>
  </form>
</div>

<div class="w-50-ns fl pr4 pl3">
  <div id="contentResults"></div>
</div>

<div class="w-50-ns fl pr4">
  <div id="formResults"></div>
</div>
</div>

<style>
.background {
  width: 95vw;
  position: absolute;
  left: 2.5%;
  }
</style>

<script type="module">
  import {html, render} from 'https://unpkg.com/lit-html@1.2.0/lit-html.js?module';

  const mainForm = document.getElementById("mainSearch"); //Full form for phrase search
  const contentForm = document.getElementById("contentQuery");
  const formForm = document.getElementById("formQuery");
  const searchInput = document.getElementById("searchBox") //Input box for phrase
  const resultsTemplate = (type, pattern, hits, docInfos) =>
    html`<h2 class="fl">Results by ${type}</h2>
    <a class="fr f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-blue" href="https://eplab.artsci.wustl.edu/blacklab-frontend/earlyprint/search/hits?number=20&first=0&patt=${encodeURIComponent(pattern)}" target="_blank">Go to full results</a>
    <h4 class="fl w-100">First 20 results:</h4>
    <ul class="list f6 center">
      ${hits.map(h => html`
        <li class="fl w-100 lh-copy pv1 ba bl-0 bt-0 br-0 b--dotted b--black-30 gray">
        <div class="b fl w-80 black">${h.match.reg.join(" ")}</div>
        <div class="fl w-20 tr">${docInfos[h.docPid].display_year}</div>
        <div class="fl w-100"><strong>${docInfos[h.docPid].author}</strong> | ${docInfos[h.docPid].display_title[0].substring(0,50)}...</div>
        </li>`)}
    </ul>
    `;
  const errorTemplate = () =>
  html`<p>No results! Try a different phrase.</p>
  <p>Sometimes an alternate spelling may work. If you're having trouble, use the more detailed <a href="https://eplab.artsci.wustl.edu/blacklab-frontend/earlyprint/search/" target="_blank">Corpus Search</a> interface.</p>`;
  const singleWordTemplate = () =>
  html`<p>Your search has too few words!</p>
  <p> You've either entered just one word, or else your phrase doesn't contain enough distinct nouns or verbs to be searchable. If you'd like to search for a single word or a more specific phrase, use the detailed <a href="https://eplab.artsci.wustl.edu/blacklab-frontend/earlyprint/search/" target="_blank">Corpus Search</a> interface.</p>`;
  const formResults = document.getElementById('formResults');
  const contentResults = document.getElementById('contentResults');

  const getFormQuery = (string) => {
    if (string.split(" ").length <= 1) {
      render(singleWordTemplate(), formResults);
    } else {
    let pattern = string.split(" ").map(word => `[reg="${word}"]`).join("");
    let request = new Request(`https://eplab.artsci.wustl.edu/blacklab-server-1.7.3/eebotcp/hits?number=20&patt=${encodeURIComponent(pattern)}&outputformat=json`);
    return fetch(request)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
        render(errorTemplate(), formResults);
      }
    })
    .then(response => {
      if (response.hits.length === 0) {
        render(errorTemplate(), formResults);
      } else {
        let match = response.hits[0].match;
        let new_pattern = match.pos.map(p => {if (p === "xx") { return "[]"} else { return `[pos="${p}"]`}}).join("");
	document.getElementById("formBox").value = new_pattern;
	return new_pattern;
      }

    }).catch(error => {
      console.error(error);
      render(errorTemplate(), formResults);
    });
  }
  }

  const getContentQuery = (string) => {
    let pattern = string.split(" ").map(word => `[reg="${word}"]`).join("");
    let request = new Request(`https://eplab.artsci.wustl.edu/blacklab-server-1.7.3/eebotcp/hits?number=20&patt=${encodeURIComponent(pattern)}&outputformat=json`);
    return fetch(request)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
        render(errorTemplate(), contentResults);
      }
    })
    .then(response => {
      if (response.hits.length === 0) {
        render(errorTemplate(), contentResults);
      } else {
        let match = response.hits[0].match;
        let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let imp_words = match.lemma.filter((l,idx) => match.pos[idx].startsWith("n") || match.pos[idx].startsWith("v") )
        if (imp_words.length <= 1) {
          render(singleWordTemplate(), contentResults);
        } else {
        let patt_1 = imp_words.map((l,idx,arr) => `${alphabet[idx]}:[lemma="${arr.join("|")}"]`).join("[]{0,5} ");
        let combos = Array.from(alphabet).slice(0,imp_words.length).map((a,i,arr) => arr.slice(i+1).map(b => [a, b])).flat(1)
        let patt_2 = combos.map(c => `${c[0]}.lemma != ${c[1]}.lemma`).join(" & ");
        let new_pattern = `${patt_1} :: ${patt_2}`
	document.getElementById("contentBox").value = new_pattern;
	return new_pattern;
      }
      }

    }).catch(error => {
      console.error(error);
      render(errorTemplate(), contentResults);
    });
  }

  const returnSearchResult = (type,pattern,container) => {
	let request = new Request(`https://eplab.artsci.wustl.edu/blacklab-server-1.7.3/eebotcp/hits?number=20&patt=${encodeURIComponent(pattern)}&outputformat=json`);
        fetch(request)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Something went wrong on api server!');
	    render(errorTemplate(), container);
          }
        })
        .then(response => {
          if (response.hits.length > 0) {
          render(resultsTemplate(type, pattern, response.hits, response.docInfos), container);
          } else { render(errorTemplate(), container) }
        }).catch(error => {
          console.error(error);
	  render(errorTemplate(), container);
        });
  }

  mainForm.onsubmit = function(event) {
    // stop our form submission from refreshing the page
    event.preventDefault();

    let data = searchInput.value; // Get value of text area (usually from a CSV)
    let no_punct = data.replace(/[\.,:";\[\]\(\)\?\!]/g, "")
    getFormQuery(no_punct).then(formQuery => {
      returnSearchResult("Form",formQuery,formResults);
    });
    getContentQuery(no_punct).then(contentQuery => {
      returnSearchResult("Content",contentQuery,contentResults);
    });
  };

  contentForm.onsubmit = function(event) {
    // stop our form submission from refreshing the page
    event.preventDefault();

    let contentQuery = document.getElementById("contentBox").value; // Get value of text area
    returnSearchResult("Content",contentQuery,contentResults);
  };

  formForm.onsubmit = function(event) {
    // stop our form submission from refreshing the page
    event.preventDefault();

    let formQuery = document.getElementById("formBox").value; // Get value of text area
    returnSearchResult("Form",formQuery,formResults);
  };
</script>
