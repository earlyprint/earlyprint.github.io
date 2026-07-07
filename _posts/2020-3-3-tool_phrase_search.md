---
layout: page
title:  Phrase Search
date:   2014-01-17 10:00:00 -0500
tags:
summary: Search for variants of a phrase
categories: Lab
---

<style>
  .post { padding-top: 0.5rem; }
  .post-header { margin-bottom: 0.5rem; }
  .post-title { font-size: 1.6rem; letter-spacing: 0; margin-bottom: 0.2rem; }

  #phrase-container {
    font-family: 'Open Sans', sans-serif;
  }

  #intro {
    font-size: 0.88rem;
    color: #555;
    line-height: 1.65;
    margin-bottom: 1.25rem;
  }

  #intro a { color: #2a7ae2; }

  #controls-panel {
    background: #f7f8f9;
    border: 1px solid #e3e5e8;
    border-radius: 4px;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
  }

  #search-row {
    display: flex;
    gap: 0.6rem;
    align-items: flex-end;
  }

  #text-input-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .ctrl-label {
    font-size: 0.78rem;
    color: #555;
    letter-spacing: 0.02em;
  }

  #searchBox {
    width: 100%;
    font-size: 0.97rem;
    padding: 5px 9px;
    border: 1px solid #c8cdd3;
    border-radius: 3px;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }

  #searchBox:focus {
    outline: none;
    border-color: #2a7ae2;
    box-shadow: 0 0 0 2px rgba(42, 122, 226, 0.18);
  }

  #submitSearch {
    padding: 6px 18px;
    background: #2a7ae2;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-family: 'Open Sans', sans-serif;
    font-size: 0.88rem;
    white-space: nowrap;
    transition: background 0.15s;
  }

  #submitSearch:hover { background: #1a5cb0; }

  #phrase-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.84rem;
    color: #888;
    min-height: 1.6em;
    margin-bottom: 0.25rem;
  }

  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid #dde1e7;
    border-top-color: #2a7ae2;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .result-section {
    border-top: 1px solid #e3e5e8;
    padding: 1.5rem 0 0.5rem;
  }

  .section-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #2a7ae2;
    margin-bottom: 0.6rem;
  }

  .desc {
    font-size: 0.88rem;
    color: #444;
    line-height: 1.65;
    margin: 0 0 0.9rem;
  }

  .cql-row {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .cql-label {
    font-size: 0.78rem;
    color: #888;
    white-space: nowrap;
  }

  .cql-code {
    font-size: 0.77rem;
    background: #f2f2f2;
    padding: 2px 6px;
    border-radius: 3px;
    color: #333;
    word-break: break-all;
  }

  .link-btns {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.1rem;
  }

  .link-btn {
    display: inline-block;
    padding: 5px 14px;
    border-radius: 3px;
    font-size: 0.82rem;
    font-family: 'Open Sans', sans-serif;
    text-decoration: none;
    transition: background 0.15s;
  }

  .btn-corpus { background: #2a7ae2; color: #fff; }
  .btn-corpus:hover { background: #1a5cb0; color: #fff; }
  .btn-ngram { background: #3a9e6e; color: #fff; }
  .btn-ngram:hover { background: #2d7d57; color: #fff; }

  .hits-label {
    font-size: 0.78rem;
    color: #888;
    margin-bottom: 0.4rem;
  }

  .hits-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.84rem;
    margin-bottom: 0.75rem;
  }

  .hits-table th {
    text-align: left;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #888;
    font-weight: 600;
    padding: 0 1rem 0.5rem 0;
    border-bottom: 1px solid #e3e5e8;
  }

  .hits-table td {
    padding: 0.55rem 1rem 0.55rem 0;
    vertical-align: top;
    border-bottom: 1px solid #eaecef;
  }

  .hits-table tr:last-child td { border-bottom: none; }

  .col-year { color: #555; font-weight: 600; white-space: nowrap; width: 4rem; }
  .col-phrase { font-weight: 600; color: #222; }
  .col-source { color: #777; }

  .notice {
    font-size: 0.88rem;
    color: #666;
    line-height: 1.6;
    padding: 0.65rem 1rem;
    background: #f7f8f9;
    border-radius: 3px;
    border-left: 3px solid #dde1e7;
  }

  .notice a { color: #2a7ae2; }

  @media (max-width: 600px) {
    #search-row { flex-direction: column; align-items: stretch; }
    #submitSearch { width: 100%; }
  }
</style>

<div id="phrase-container">

  <p id="intro">Type a phrase below to search for it three different ways in the <em>EarlyPrint</em> corpus. Each approach generates a <a href="https://blacklab.ivdnt.org/guide/query-language/token-based.html" target="_blank">CQL query</a> you can explore further in <a href="https://eplab.artsci.wustl.edu/blacklab-frontend/earlyprint/search/" target="_blank">Corpus Search</a> or the <a href="/ngram/">Ngram Browser</a>.</p>

  <div id="controls-panel">
    <form id="mainSearch">
      <div id="search-row">
        <div id="text-input-wrapper">
          <span class="ctrl-label">Enter a phrase</span>
          <input type="text" id="searchBox" placeholder="e.g. for whom the bell tolls" />
        </div>
        <button type="submit" id="submitSearch">Search</button>
      </div>
    </form>
  </div>

  <div id="phrase-status"></div>

  <div class="result-section">
    <div class="section-label">1 &middot; Exact</div>
    <div id="exactQuery"></div>
    <div id="exactResults"></div>
  </div>

  <div class="result-section">
    <div class="section-label">2 &middot; Content</div>
    <div id="contentQuery"></div>
    <div id="contentResults"></div>
  </div>

  <div class="result-section">
    <div class="section-label">3 &middot; Form</div>
    <div id="formQuery"></div>
    <div id="formResults"></div>
  </div>

</div>

<script>
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  const mainForm = document.getElementById("mainSearch");
  const searchInput = document.getElementById("searchBox");
  const statusEl = document.getElementById("phrase-status");
  const exactResults = document.getElementById('exactResults');
  const contentResults = document.getElementById('contentResults');
  const formResults = document.getElementById('formResults');
  const exactQueryDisplay = document.getElementById('exactQuery');
  const contentQueryDisplay = document.getElementById('contentQuery');
  const formQueryDisplay = document.getElementById('formQuery');

  const setLoading = (on) => {
    statusEl.innerHTML = on ? '<div class="spinner"></div><span>Searching&hellip;</span>' : '';
  };

  const queryTemplate = (type, pattern, description) => {
    const corpusUrl = `https://eplab.artsci.wustl.edu/blacklab-frontend/earlyprint/search/hits?number=20&first=0&patt=${encodeURIComponent(pattern)}`;
    const ngramUrl = `/ngram?q=${encodeURIComponent(pattern)}`;
    return `
      <p class="desc">${description}</p>
      <div class="cql-row">
        <span class="cql-label">CQL:</span>
        <code class="cql-code">${esc(pattern)}</code>
      </div>
      <div class="link-btns">
        <a class="link-btn btn-corpus" href="${corpusUrl}" target="_blank">All results in Corpus Search &rarr;</a>
        <a class="link-btn btn-ngram" href="${ngramUrl}" target="_blank">View in Ngram Browser &rarr;</a>
      </div>
    `;
  };

  const resultsTemplate = (hits, docInfos) => `
    <p class="hits-label">3 sample results:</p>
    <table class="hits-table">
      <thead><tr><th>Year</th><th>Phrase</th><th>Source</th></tr></thead>
      <tbody>
        ${hits.map(h => `
          <tr>
            <td class="col-year">${esc(docInfos[h.docPid].display_year)}</td>
            <td class="col-phrase">${esc(h.match.reg.join(" "))}</td>
            <td class="col-source">${esc(docInfos[h.docPid].author)} &mdash; ${esc(docInfos[h.docPid].display_title[0].substring(0, 60))}&hellip;</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  const errorTemplate = () => `
    <p class="notice">No results found. Try a different phrase or an alternate spelling. For more options, use <a href="https://eplab.artsci.wustl.edu/blacklab-frontend/earlyprint/search/" target="_blank">Corpus Search</a> directly.</p>
  `;

  const singleWordTemplate = () => `
    <p class="notice">Your phrase needs at least two distinct content words (nouns or verbs) to generate this search. For single-word or more specific searches, use <a href="https://eplab.artsci.wustl.edu/blacklab-frontend/earlyprint/search/" target="_blank">Corpus Search</a> directly.</p>
  `;

  const returnSearchResult = (pattern, container) => {
    fetch(`https://eplab.artsci.wustl.edu/blacklab-server-1.7.3/eebotcp/hits?number=3&patt=${encodeURIComponent(pattern)}&outputformat=json`)
      .then(r => { if (r.ok) return r.json(); throw new Error(); })
      .then(data => {
        container.innerHTML = data.hits.length > 0
          ? resultsTemplate(data.hits, data.docInfos)
          : errorTemplate();
      })
      .catch(() => { container.innerHTML = errorTemplate(); });
  };

  mainForm.onsubmit = function(event) {
    event.preventDefault();

    exactQueryDisplay.innerHTML = '';
    exactResults.innerHTML = '';
    contentQueryDisplay.innerHTML = '';
    contentResults.innerHTML = '';
    formQueryDisplay.innerHTML = '';
    formResults.innerHTML = '';
    setLoading(true);

    const data = searchInput.value;
    const no_punct = data.replace(/[\.,:";\[\]\(\)\?\!]/g, "");

    if (no_punct.split(" ").length <= 1) {
      setLoading(false);
      exactQueryDisplay.innerHTML = singleWordTemplate();
      contentQueryDisplay.innerHTML = singleWordTemplate();
      formQueryDisplay.innerHTML = singleWordTemplate();
      return;
    }

    const literalPattern = no_punct.split(" ").map(word => `[reg="${word}"]`).join("");

    fetch(`https://eplab.artsci.wustl.edu/blacklab-server-1.7.3/eebotcp/hits?number=20&patt=${encodeURIComponent(literalPattern)}&outputformat=json`)
      .then(r => { if (r.ok) return r.json(); throw new Error(); })
      .then(response => {
        setLoading(false);
        if (!response.hits || response.hits.length === 0) {
          exactQueryDisplay.innerHTML = errorTemplate();
          contentQueryDisplay.innerHTML = errorTemplate();
          formQueryDisplay.innerHTML = errorTemplate();
          return;
        }
        const match = response.hits[0].match;

        const exactDesc = "There are several ways to search for a phrase in the EP corpus. The first and most straightforward is to look for the exact literal phrase: the same words in the same order. Here we run that search, using regularized tokens to handle any spelling variations.";
        exactQueryDisplay.innerHTML = queryTemplate("Exact", literalPattern, exactDesc);
        exactResults.innerHTML = resultsTemplate(response.hits.slice(0, 3), response.docInfos);

        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const imp_words = match.lemma.filter((l, idx) => match.pos[idx].startsWith("n") || match.pos[idx].startsWith("v"));
        if (imp_words.length <= 1) {
          contentQueryDisplay.innerHTML = singleWordTemplate();
        } else {
          const patt_1 = imp_words.map((l, idx, arr) => `${alphabet[idx]}:[lemma="${arr.join("|")}"]`).join("[]{0,5} ");
          const combos = Array.from(alphabet).slice(0, imp_words.length).map((a, i, arr) => arr.slice(i+1).map(b => [a, b])).flat(1);
          const patt_2 = combos.map(c => `${c[0]}.lemma != ${c[1]}.lemma`).join(" & ");
          const contentQuery = `${patt_1} :: ${patt_2}`;
          const contentDesc = "We may also be interested in phrases that contain the same content words, but in different forms and different word order. Here we run a proximity search on the lemmas of the main content words in the phrase. This is a good way of seeing what other expressions of the same ideas there are in the corpus.";
          contentQueryDisplay.innerHTML = queryTemplate("Content", contentQuery, contentDesc);
          returnSearchResult(contentQuery, contentResults);
        }

        const formQuery = match.pos.map(p => p === "xx" ? "[]" : `[pos="${p}"]`).join("");
        const formDesc = "Finally, we can search for other phrases that use the same sequence of parts of speech, but with different words. This is a way of searching for phrases of the same form. If the EP corpus had full sentence parsing, there would be more formal ways of approaching this using computational linguistics methods, and we're working on making that kind of searching available. For now, this is a decent heuristic, but it won't capture every variant of the phrase by form.";
        formQueryDisplay.innerHTML = queryTemplate("Form", formQuery, formDesc);
        returnSearchResult(formQuery, formResults);
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
        exactQueryDisplay.innerHTML = errorTemplate();
        contentQueryDisplay.innerHTML = errorTemplate();
        formQueryDisplay.innerHTML = errorTemplate();
      });
  };
</script>
