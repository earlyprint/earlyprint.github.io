---
layout: post
title:  "Encoding and Linguistic Annotation"
date:   2020-12-01 00:00:00
author: Martin Mueller
tags: tcp
summary: A brief introduction to the linguistic annotation of EarlyPrint texts
categories: Posts
---

Written language is segmented in various ways. White space separates one
word from another. Non-alphabetical symbols identify clauses (commas)
and sentences (periods). Question or exclamation marks identify certain
kinds of sentences. White space of different kinds (indentation, blank
lines) is used to articulate paragraphs as the fundamental discursive
units. Hierarchically ordered larger units with special headings
identify sections and chapters. Familiarity with this system of ordering
devices is part of basic reading competence.

Because humans are slow but smart, they need to be reminded only once of
these points of discursive articulation. The same comma or period ends
one bit of language and starts another. In Spanish, questions and
explanation are explicitly marked both at their beginning and their end
with upended and normal versions of the punctuation mark: ¿How are you?
¡Don’t ask! You can think of the opening and closing punctuation
defining a two-dimensional container with the question or exclamation as
its content.

This is exactly what happens in text encoding, where a text is defined
as an "ordered hierarchy of content objects" (OHCO) and a system of
hierarchically ordered opening and closing boundary markers creates
containers whose content can be identified by a machine and processed in
various ways. "Element" is the technical term for such containers. By
convention the angle brackets familiar from HTML have become the
universal boundary markers. In principle, it could be anything. The
important thing to remember is that if a stretch of text is
unambiguously defined in terms of its beginning and end, you can tell a
machine to identify it and do this or that with it. While today’s search
engines still do not provide much support for "element aware" searching,
the coarse but quite consistent encoding that the TCP has implemented
across more than 50,000 texts will in the years to come be an
increasingly valuable feature of this corpus. For instance, it makes it
very easy to look for words that occur in poetry or for words that only
occur in poetry.

The EarlyPrint versions add an additional encoding layer. The entire TCP
corpus has been annoted with MorphAdorner, a program developed by Phil
Burns. In this procedure every word is wrapped in a &lt;w&gt; element
and given "attributes" that specify its part of speech, lemma or
dictionary entry form, and a standardized form of its spelling. Thus a
spelling like "louyth" would be encoded as

> &lt;w lemma="love" pos="vvz" reg="loveth"&gt;louyth &lt;/w&gt;

Human readers never get to see this ugly "explicitation" that tells them
only what they know already or would immediately gather from the reading
context. But it enables a search engine to retrieve ‘louyth’ in a search
for all forms of ‘love’. Tagging of this kind increases the size of the
file by an order of magnitude and makes its raw form almost unreadable
for humans. But it allows a machine to see through the surface forms of
words and recognize more abstract lexical or grammatical patterns.
Linguistic annotation allows you to identify patterns that are defined
syntactically rather than lexically. The opening sentence of Jane
Austen's Emma includes a famous example of the three-adjective rule:

> Emma Woodhouse, handsome, clever, and rich.

A search for that pattern in Early Modern plays retrieves lines like

> The Scottish king grows dull, frosty, and wayward.

Given the high degree of orthographic variance in the Early Modern
world, linguistic tagging that is consistent and stays below a tolerable
error rate of \~3% is a critical component in achieving "agile data
integration" in the EarlyPrint corpus.

The combination of linguistic annotation with the existing encoding
allows for clearer articulation of some textual features. There are on
the order of ten million Latin words in the TCP texts. They are
typically printed in italics and therefore wrapped in &lt;hi&gt; tags by
the transcribers. If the tokens inside &lt;hi&gt; tags consist mainly of
words that the linguistic annotation identified as Latin, you can retag
the stretch with the semantically more epressive tag &lt;foreign
xml:lang="lat"&gt;. In a similar procedure you add a language attribute
to elements where a high percentage of the words are tagged as Latin. We
have done this, and the error rate is very low. Isolating non-English
content is useful even if you are not interested in it, because it
defines the English content more clearly. Because there is so much Latin
in the TCP corpus, it is easy to extract with high accuracy. Other
languages are more problematical. Short passages of French are
particular difficult because Early Modern English and French orthography
overlap in many ways.

Linguistic annotation is also of great help in the identification of
"named entities", which include not only single names but also word
strings the components of which are not names (United Provinces).The
Weimar edition of the works of Luther runs to 60 volumes plus a dozen
index volumes for people, places, things, and citations. Linguistic
annotation, combined with the existing encoding, will make it possible
to create corpus-wide indexes at a fraction of the time it took to
create the index volumes to the Luther edition. These digital indexes
will not be as delicately crafted, but they will cover a lot more
ground, and there will be few purposes for which they do not offer
significant help.
