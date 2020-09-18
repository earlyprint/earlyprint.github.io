---
layout: page
title:  Phrase Search
date:   2014-01-17 10:00:00 -0500
tags:
summary: Search for variants of a phrase
categories: Lab
---

<small>This simple interface allows you to search for a phrase by translating your text into the corpus query language syntax used by *EarlyPrint*'s [Linguistic Search](http://ada.artsci.wustl.edu:8080/corpus-frontend-1.2/all/search/). Typing a phrase will create two unique search queries: one that looks for phrases of similar **content** and another that looks for phrases of similar **form**. For more detailed exploration of these patterns, use this interface as a starting point for a closer look from within [Linguistic Search](http://ada.artsci.wustl.edu:8080/corpus-frontend-1.2/all/search/).</small>

<form class="bg-light-blue h4 mw7 center pa4 br2-ns ba b--black-10">
      <input class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" type="text" placeholder="Type any phrase, e.g. 'for whom the bell tolls'" id="searchBox" />
      <button class="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" type="submit" id="submitSearch">Search</button>
</form>

<div class="w-50-ns fl pr4">
  <h2>Results by Content</h2>
  <div id="contentResults"></div>
</div>

<div class="w-50-ns fl">
  <h2>Results by Form</h2>
  <div id="formResults"></div>
</div>

<script type="module">
  import {html, render} from 'https://unpkg.com/lit-html?module';

  const form = document.forms[0]; //Full form for phrase search
  const searchInput = document.getElementById("searchBox") //Input box for phrase
  const resultsTemplate = (pattern, hits, docInfos) =>
    html`<p>Results based on this query:</p>
    <p class="ma3 pa3 br2 ba b--black-30">${pattern}</p>
    <a class="fr f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-blue" href="http://ada.artsci.wustl.edu:8080/corpus-frontend-1.2/all/search/hits?number=20&first=0&patt=${encodeURIComponent(pattern)}" target="_blank">Go to full results</a>
    <h4 class="fl w-100">First 20 results:</h4>
    <ul class="list f6 center">
      ${hits.map(h => html`
        <li class="fl lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30 gray">
        <div class="b fl w-80 black">${h.match.reg.join(" ")}</div>
        <div class="fl w-20 tr">${docInfos[h.docPid].year}</div>
        <div class="fl w-100"><strong>${docInfos[h.docPid].author}</strong> | ${docInfos[h.docPid].display_title.substring(0,100)}...</div>
        </li>`)}
    </ul>
    `;
  const errorTemplate = () =>
  html`<p>No results! Try a different phrase.</p>
  <p>Sometimes an alternate spelling may work. If you're having trouble, use the more detailed <a href="http://ada.artsci.wustl.edu:8080/corpus-frontend-1.2/all/search/" target="_blank">Linguistic Search</a> interface.</p>`;
  const singleWordTemplate = () =>
  html`<p>Your search has too few words!</p>
  <p> You've either entered just one word, or else your phrase doesn't contain enough distinct nouns or verbs to be searchable. If you'd like to search for a single word or a more specific phrase, use the detailed <a href="http://ada.artsci.wustl.edu:8080/corpus-frontend-1.2/all/search/" target="_blank">Linguistic Search</a> interface.</p>`;
  const formResults = document.getElementById('formResults');
  const contentResults = document.getElementById('contentResults');

  const searchByForm = (string) => {
    if (string.split(" ").length <= 1) {
      render(singleWordTemplate(), formResults);
    } else {
    let pattern = string.split(" ").map(word => `[reg="${word}"]`).join("");

    let request = new Request(`https://ada.artsci.wustl.edu/proxy_blacklab/all/hits?number=20&patt=${pattern}&outputformat=json`);
    fetch(request)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
      }
    })
    .then(response => {
      if (response.hits.length === 0) {
        render(errorTemplate(), formResults);
      } else {
        let match = response.hits[0].match;
        let new_pattern = match.pos.map(p => {if (p === "xx") { return "[]"} else { return `[pos="${p}"]`}}).join("");
        let request = new Request(`https://ada.artsci.wustl.edu/proxy_blacklab/all/hits?number=20&patt=${new_pattern}&outputformat=json`);
        fetch(request)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Something went wrong on api server!');
          }
        })
        .then(response => {
          if (response.hits.length > 0) {
          render(resultsTemplate(new_pattern, response.hits, response.docInfos), formResults);
          } else { render(errorTemplate(), formResults) }
        }).catch(error => {
          console.error(error);
        });
      }

    }).catch(error => {
      console.error(error);
    });
  }
  }

  const searchByContent = (string) => {
    let pattern = string.split(" ").map(word => `[reg="${word}"]`).join("");

    let request = new Request(`https://ada.artsci.wustl.edu/proxy_blacklab/all/hits?number=20&patt=${pattern}&outputformat=json`);
    fetch(request)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
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
        let patt_1 = imp_words.map((l,idx,arr) => `${alphabet[idx]}:[lemma="${arr.join("|")}"]`).join("[]{0,3} ");
        let combos = Array.from(alphabet).slice(0,imp_words.length).map((a,i,arr) => arr.slice(i+1).map(b => [a, b])).flat(1)
        let patt_2 = combos.map(c => `${c[0]}.lemma != ${c[1]}.lemma`).join(" & ");
        let new_pattern = `${patt_1} :: ${patt_2}`
        let request = new Request(`https://ada.artsci.wustl.edu/proxy_blacklab/all/hits?number=20&patt=${encodeURIComponent(new_pattern)}&outputformat=json`);
        fetch(request)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Something went wrong on api server!');
          }
        })
        .then(response => {
          if (response.hits.length > 0) {
          render(resultsTemplate(new_pattern, response.hits, response.docInfos), contentResults);
          } else { render(errorTemplate(), contentResults)}
        }).catch(error => {
          console.error(error);
        });
      }
      }

    }).catch(error => {
      console.error(error);
    });
  }


  form.onsubmit = function(event) {
    // stop our form submission from refreshing the page
    event.preventDefault();

    let data = searchInput.value; // Get value of text area (usually from a CSV)
    let no_punct = data.replace(/[\.,:";\[\]\(\)\?\!]/g, "")
    searchByForm(no_punct);
    searchByContent(no_punct);
  };
</script>
