---
layout: post
title:  "Language distributions from EEBO to EarlyPrint"
date:   2025-02-10 00:00:00 -0500
author: Douglas Knox
tags: 
summary: A comparison of the language distributions of EEBO, the Text Creation Partnership's transcriptions, and EarlyPrint.
categories: Posts
---

## Language distributions from EEBO to EarlyPrint

EarlyPrint is a representation of early modern *English-language*
texts. EarlyPrint is essentially a subset of the texts transcribed by
the Text Creation Partnership, and it leaves out almost all TCP texts
in languages other than English. The [TCP itself was a curated
selection]({% post_url 2021-12-13-intro-to-eebo-and-eebo-tcp %}) from
the works with images in EEBO, which has its origins in a microfilming
project that drew from long years of bibliographic work that began
with the Pollard and Redgrave and Wing bibliographies, among others,
culminating in what is now the [English Short Title
Catalog](https://datb.cerl.org/estc/). The original scope of the
bibliographies sought to capture works printed in England in any
language as well as works printed in English anywhere in the world
during a particular time span.

At each stage of curation from ESTC to EEBO to TCP to EarlyPrint,
there has been a steady exclusion of works that are primarily not in
English. This is convenient for building a corpus to model the English
language and for applying computational tools to provide linguistic
annotation. Many English-language EarlyPrint works still of course
contain occasional passages both long and short that are in other
languages. MorphAdorner part-of-speech tags do not attempt to
characterize parts of speech in other languages, but do identify words
as "foreign" and attempt to identify the language, such as "fla" for
Latin, "ffr" for French, etc.

One might want to be cautious about understanding EarlyPrint as
representative of early modern English print culture generally,
especially insofar as linguistic diversity was a part of that
culture. The table below shows the distribution of language
attributions from EEBO metadata across EEBO, TCP, and
EarlyPrint. ("Newari" is undoubtedly a data error, perhaps from a
stage of data entry where an attribute value 'new' had some other
meaning.)

This data does not illuminate other relevant questions one might
consider, including whether works available to be catalogued had
differential survival rates by language, genre, and audience, as well
as the nature of the international book trade and the circulation
within England of non-English-language works imported from elsewhere.


| Publication Language           | in EEBO | in TCP |  in  EP | % in TCP | % in EP |
|--------------------------------+---------:+--------:+---------:+----------:+---------:|
| English                        | 135,132 | 59,340 |  58,809 |     43.9 |    43.5 |
| Latin                          |   9,069 |    514 |      10 |      5.7 |     0.1 |
| Romance (Other)                |     795 |     11 |       0 |      1.4 |       0 |
| French                         |     679 |    102 |       5 |       15 |     0.7 |
| Welsh                          |     205 |    150 |       0 |     73.2 |       0 |
| Ancient Greek                  |     147 |      2 |       0 |      1.4 |       0 |
| Dutch                          |     140 |     13 |       0 |      9.3 |       0 |
| Greek                          |     112 |      0 |       0 |        0 |       0 |
| Italian                        |      95 |     17 |       0 |     17.9 |       0 |
| Scots                          |      88 |     39 |       1 |     44.3 |     1.1 |
| French, Middle (ca. 1400-1600) |      80 |     15 |       0 |     18.8 |       0 |
| Undetermined                   |      78 |      2 |       0 |      2.6 |       0 |
| Multiple languages             |      73 |      6 |       0 |      8.2 |       0 |
| German                         |      63 |      3 |       0 |      4.8 |       0 |
| Spanish                        |      32 |      6 |       0 |     18.8 |       0 |
| Not applicable                 |      31 |      5 |       2 |     16.1 |     6.5 |
| Irish                          |      19 |      1 |       0 |      5.3 |       0 |
| Algonquin                      |      12 |      0 |       0 |        0 |       0 |
| Hebrew                         |      12 |      1 |       0 |      8.3 |       0 |
| North American Indian (other)  |       9 |      1 |       0 |     11.1 |       0 |
| [blank]                        |       8 |      3 |       3 |     37.5 |    37.5 |
| Gaelic (Scots)                 |       8 |      5 |       0 |     62.5 |       0 |
| Portuguese                     |       7 |      1 |       0 |     14.3 |       0 |
| Arabic                         |       6 |      0 |       0 |        0 |       0 |
| Newari                         |       5 |      1 |       1 |       20 |      20 |
| English, Old (ca. 450-1100)    |       5 |      0 |       0 |        0 |       0 |
| French, Old (ca. 842-1400)     |       4 |      1 |       0 |       25 |       0 |
| Malay                          |       1 |      0 |       0 |        0 |       0 |
| Hungarian                      |       1 |      0 |       0 |        0 |       0 |
| Syriac                         |       1 |      0 |       0 |        0 |       0 |
| Russian                        |       1 |      0 |       0 |        0 |       0 |
| Turkish                        |       1 |      0 |       0 |        0 |       0 |
| Coptic                         |       1 |      0 |       0 |        0 |       0 |
| Persian                        |       1 |      0 |       0 |        0 |       0 |
| Lithuanian                     |       1 |      0 |       0 |        0 |       0 |



