---
layout: post
title:  "Introduction to Linguistic Search"
date:   2020-02-03 09:30:00 -0500
author: Stephen Pentecost
tags: lingustic-search blacklab cql
summary: An introduction to Lingustic Search, powered by Blacklab
categories: Intros
---

## Introduction to Linguistic Search

Linguistic Search is powered by BlackLab, a tool for finding words or
sequences of words in EEBO-TCP texts. In BlackLab, a “word” is more than
just the letters from which it was formed: associated with a “word” are
a number of properties (its regularized spelling, the lemmatized form of
the word, its part of speech) which can be used in addition to or
instead of the original spelling.

For example, suppose we’re interested in the word which was originally
spelled “louing.” We could search for “louing,” of course. We could also
search for “loving” (its regularized spelling), “love” (its lemmatized,
or dictionary headword, form). We could even search for the regularized
form “loving” where its part of speech is “vvg” (the code for “verb,
present participle”): in this case, we’d be searching for “loving” no
matter how it was originally spelled, but only when it was used as a
verb.

Linguistic Search also makes it possible to search for sequences of
words. For example, it’s quite easy to search for sequences of words
like “most loving”. Linguistic Search also allows the user to group the
results various ways, to filter results by author, title and/or year of
publication, and to export/download search results.

[*BlackLab*](http://inl.github.io/BlackLab/) is a product of the
[*Instituut voor de Nederlandse Taal*](https://www.ivdnt.org/). We use
two Blacklab software packages: the core [*BlackLab
server*](https://github.com/INL/BlackLab), and the related
[*front-end*](https://github.com/INL/corpus-frontend), the latter
slightly modified for our purposes. Our Phase I data comes from our
[*project’s BitBucket
repo*](https://bitbucket.org/shcdemo/phase1texts/src/master/). Our
complete Phase I and II data comes from our copy of the TCP data, which
we’ve annotated with the last public release of
[*MorphAdorner*](http://morphadorner.northwestern.edu/morphadorner/).

Linguistic Search offers three ways to search: by **Word or phrase**, by
using a **Query Builder**, or by writing **CQL** queries directly. These
options are available through tabs at the top of all three search pages
(**<span style="color:red">A</span>**):

## Word or Phrase Search

![](/assets/img/intro_to_blacklab/image2.png)

**Word or Phrase Search** is the simplest of the three, and is a good
place to start. To search for a word, enter its regularized spelling,
original spelling, or lemma in the appropriate text box (**<span style="color:red">B</span>**), and
click the blue Search button (**<span style="color:red">C</span>**). It’s possible to limit (“filter”)
results by author, title or year (**<span style="color:red">D</span>**) before clicking Search. To
filter by a range of years, enter values like 1600 TO 1640.

Note the **help links** arranged across the page. These links offer
information which is also useful when using the Query Builder and
writing CQL queries. Note also the faint gray prompts (“reg,” “word,”
“lemma,” etc.) inside the input boxes. (“Word” roughly denotes the
original spelling, although we slightly normalize the original
typography, modernizing long-s, dropping superscripted letters, and
expanding certain typographic abbreviations like vowels with superscript
macron or tilde.) These gray prompts are useful in learning BlackLab’s
CQL names for the properties of words; knowing these names will prove
useful when using the Query Builder and writing CQL queries.

Results appear below the Search button

![](/assets/img/intro_to_blacklab/image3.png)

and are presented in two ways via the **Per Hit** and **Per Document**
tabs (**<span style="color:red">E</span>**). **Per Document** simply lists the titles of the documents
which contain matches, and reports the number of matches in each
document; pop-ups offer a bit more metadata. The report on the **Per Hit
tab** is richer, listing every match; it is essentially a Key Word in
Context display, in which the corresponding document titles are shown
(the default) or hidden (see the red button the right of **<span style="color:red">F</span>**). The
pageable results are organized by source document (**<span style="color:red">F</span>**), and offer
several different ways of ordering the results. It is also possible to
export the results.

The **Group hits** function (**<span style="color:red">G</span>**) can be very useful. If one goes into
the **Group hits by** dropdown widget, checks **Group by reg** (for
regularized spelling) in the **Before hit** section of the widget, and
then clicks the **Update** button, one gets results like these:

![](/assets/img/intro_to_blacklab/image1.png)

The words which occur immediately before “loving” are grouped and
counted; the green horizontal bars (**<span style="color:red">H</span>**) represent relatively how many times
each of the pairing words occur: “and loving,” “a loving,” and “most
loving” being the three most frequent pairings of \[word\] + “loving”
discoverable in the corpus.

Searching for two or more words in sequence, like “most loving,”
constitutes a phrase search that returns results just as a single word
search does. To search for a phrase, simply type it into the Regularized
spelling(s), Original spelling(s), or Lemma(s) fields.

## Query Builder

Blacklab’s second way to search is its **Query Builder**,
available via the tab near the top of the page (**<span style="color:red">I</span>**):

![](/assets/img/intro_to_blacklab/image5.png)

**Query Builder** makes it possible to write complex, multi-word
queries. For example, in Query Builder, we can search for all
combinations of “most” followed by a present participle (i.e., all
phrases like “most knowing” and “most pleasing”)

Query Builder is organized around one or more term-related boxes. A
“term-related box” is an interface widget used to specify one word in
complex, multi-word queries. For example, if we’d like to find all
combinations of “most” followed by a present participle, we’d have a
term-related box specifying that we want to find “most” (**<span style="color:red">J</span>**) followed
by a box which says we want to find all present participles (**<span style="color:red">K</span>**).

The red box with a plus inside (**<span style="color:red">L</span>**) can be used to add more
term-related boxes. Inside term-related boxes are more plus widgets
(**<span style="color:red">M</span>**), which are useful for further complicating queries.

For example, suppose I wanted to find every instance of “most” or “all”
followed by a present participle. I would use the plus widget (**<span style="color:red">M</span>**) to
create:

![](/assets/img/intro_to_blacklab/image4.png)

Just as with Word or Phrase Search, the Query Builder allows one to
“Filter” a search and variously “Group” the results.

## CQL

Whether you run Query Builder or Word or Phrase Search, the display of
results is always preceded by a line like

> Results for: "\[ reg = "most" | reg = "all" \] \[ pos = "vvg" \]" within
all documents

This exposes the syntax of the query that is passed to the underlying
search engine: 

> \[ reg = "most" \| reg = "all" \] \[ pos = "vvg" \] 

which is a
CQL (Corpus Query Language) query. Corpus Query Language is a standard
used by linguists to search digital corpora. It’s implemented on several
other platforms besides BlackLab.

The results section shows the query to make it easier for curious researchers to learn
CQL. The [*documentation for
Blacklab*](http://inl.github.io/BlackLab/corpus-query-language.html#using-cql)
offers a fuller introduction to CQL.

Those familiar with CQL can compose their queries directly via the
**CQL** tab near the top of the page (**<span style="color:red">N</span>**):

![](/assets/img/intro_to_blacklab/image6.png)

CQL queries may be entered as plain text strings inside the large Corpus
Query Language text box (**<span style="color:red">O</span>**). CQL queries can be Filtered and their
results Grouped as with searches instigated on the other tabs.
