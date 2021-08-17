---
layout: post
title:  "Filtered Search: Early English Poetry"
date:   2020-08-17 09:28:16 -0500
author: Joseph Loewenstein
tags: ep-lab
summary: How to use Corpus Seach to find words in poetry
categories: How-To
---

**Filtered Search: Early English Poetry**

Moderately experienced users of corpora are accustomed to filtered
search: e.g. looking for particular words or phrases, but only in texts
printed between 1630 and 1637; looking for “petition” and its cognates
in the printed writings of Lady Mary Wroth. Many of the most assiduous
users of the Early Print Lab have wanted to narrow their searches to
discrete discursive forms. Searching only recipes or biblical commentary
isn’t easy, but we have figured out **a way to search just the poetry**.

Those who encoded the TCP assigned a discrete tag to virtually all lines
of poetry, including those portions of English printed drama that are
set in verse, both rhymed and unrhymed. In the summer of 2021, Sebastian
Mazza, Steve Pentecost, and Doug Knox surveyed the corpus and found that
this filter worked reliably, capturing the verse and without also
ensnaring prose.

If you go to the CQL (i.e. Corpus Query Language) tab in the “Corpus
Search” tool on the Lab, you can enter search queries that take
advantage of the &lt;l/&gt; tagging in the TCP. For example, **to find
instances of the odd form “wordly” in lines of verse distributed across
the TCP one can enter**

    "wordly" within <l/>

in the search box. (The results returned suggest that “wordly” is a not
uncommon typographical error for “worldly”.) Alternatively one can
**search for the lines of verse that contain this odd form by entering**

    <l/> containing "wordly"

(Since our interface gives search results in context there’s not a huge
difference between searching for the word and searching for the line
that contains the word, but we wanted to expose the difference in
syntax.)

***Lo . . . maske,***

Because of the way our search engine indexes the TCP corpus, we can search for words or word forms at beginning and end positions of elements formally encoded in the TCP XML. In the conventions of our CQL, &lt;l&gt; indicates the start of a line, &lt;/l&gt; indicates a line-end and &lt;l/&gt; indicates the line-element itself. The syntax for **searching for “Lo” (and not “Loe”) appearing at the beginning of a line of verse and followed by a pronoun** is

    <l> "Lo" [pos='^pn.*']

**To find “mask” (or “maske” or “masque”) at the end of a line**, the
syntax is

    [reg="mask"] </l>

Searching for words at line-endings of verse could be a useful
jumping-off point for an inquiry into rhyme and, especially, for the
investigation of eye-rhyme.

<p style="font-weight:bold; font-style:italics; padding-left:3em;">Be bold!</p>

Our BlackLab index offers discrete tags for many textual units:
sentences (“&lt;s/&gt;”), paragraphs (“&lt;p/&gt;”), words or passages
set off by font changes (“&lt;hi/&gt;”), words in foreign languages
(“&lt;foreign/&gt;”), stanzas (“&lt;lg/&gt;”), front matter
(“&lt;front/&gt;”). For more ideas on how to investigate the corpus by
leveraging its tagging, consult [*“Matching XML
elements,”*](http://inl.github.io/BlackLab/corpus-query-language.html#matching-xml-elements)
part of the documentation provided by the developers of BlackLab, the
engine that underpins corpus query in the EarlyPrint Lab. These tags,
and others, can enable the ingenious researcher to make some revealing
forays into the interaction of diction and structure across the corpus.

***Be not too bold!***

Yet those who performed the encoding could be somewhat inconsistent in
the handling of these tags – more inconsistent than they were in marking
lines of verse. And inconsistency is not the only impediment to search
by textual unit. Tags were not instituted for some formal units. Mongrel
forms abound across the corpus – coherent passages of dramatic verse
interrupted by prose asides, quotations expanded by commentary,
anagrammatic poems, etc. – and tagging is often challenged and
confounded by such structures. And, as always, the corpus is racked by
selection bias: texts are missing and duplicates are underrepresented.

*Caveat exquaesitor*: be bold; be not too bold.
