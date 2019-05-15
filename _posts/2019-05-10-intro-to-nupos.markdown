---
layout: post
title:  "Introduction to NUPOS"
date:   2019-05-10 09:27:16 -0500
author: Alireza Taheri Araghi et al.
categories: eebo-tcp nupos morphadorner
summary: A summary of the Northwestern University Part of Speech (NUPOS) tagset used in the MorphAdorner software.
---
NUPOS (Northwestern University Part of Speech tagset) is Martin Mueller’s part-of-speech tagset "designed to accommodate the major morphosyntactic features of written English from Chaucer to the present day" ([see Mueller 2009](http://panini.northwestern.edu/mmueller/nupos.pdf)). While NUPOS can, in theory, be used with any trainable tagger, so far, it has been used only with MorphAdorner, a Natural Language Processing (NLP) suite developed by Phillip Burns. The program locates word boundaries in its source texts (encoded in XML) and "adorns" each word with five morphological tags: three spelling tags, the NUPOS part of speech (POS) tag, and the lemma headword. In this section we will briefly introduce each one of these attributes.


## Spelling

As the most basic encoding of a word, spelling may, at first, seem to be a simple entity. But when we speak of the spelling in texts from periods before spelling became regularized, it can be helpful to distinguish several different qualifiers for the term "spelling."

1) **Token spelling**: This is the spelling of the word "as it appears in the original digital source for the text" with "any typographical conventions that might be used in the source as markup for various purposes." For example an original text might contain the token `common|lie` where the vertical bar `|` has been used to mark up a soft hyphen at the end of the line.

The token spelling tries to remain faithful to the original digital source and for that reason it may contain non-uniform characters variously used when the texts were set, typographically, or marked up, digitally.

2) **Standard original spelling**: In this version, the typographical and markup conventions are normalized. In most context, this spelling is what one might think of when the general term "the spelling of the word" is used. Standard original spelling is usually the same as the token spelling. The standard original spelling for the previous example would be:


```
common|lie --> commonlie
```


3) **Standard modern spelling**: Without modernizing the morphological form, this spelling is the standard modern orthographic form of the original spelling. For example, a spelling like "lovyth" is regularized to "loveth", but "loveth" is not regularized to "loves". The spelling, "loveth" itself is recognized as a standard archaic form. The standard modern spelling of the example above is as follows:


```
common|lie --> commonlie --> commonly
```



## Word Classes

Each word part in NUPOS has a "word class" and a "major word class". There are 34 word classes and 17 major word classes. Each word class has a very short string (1-3 letters) as name --for example “np” for proper noun-- and belongs to only one major word class --in this case the class “noun.”


## Parts of Speech

The fine-grained NUPOS tagset has 241 English parts of speech in its current version (not counting punctuation). Each POS belongs to one and only one word class, so parts of speech represent subdivisions of word classes.


## Lexical Units and Word Parts (a digression)

Before addressing other tagging attributes of words, such as word class, part of speech, and lemma, we need to turn our attention to one specific complexity of texts—contractions.

Contractions are treated as single lexical words and are given their three different spellings as explained above. But in terms of other attributes, they are separated into their constituent parts and tagged accordingly. This means that in NUPOS, a lexical unit might have two parts (or conceivably even more). For example, a contraction like "who’s" is considered a bigram and tagged thus:


<table>
  <tr>
   <td><strong>word part</strong>
   </td>
   <td><strong>major word class</strong>
   </td>
   <td><strong>word class</strong>
   </td>
   <td><strong>part of speech</strong>
   </td>
   <td><strong>lemma</strong>
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>wh-word
   </td>
   <td>crq
   </td>
   <td>q-crq
   </td>
   <td>who (crq)
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>verb
   </td>
   <td>va
   </td>
   <td>vbz
   </td>
   <td>be (va)
   </td>
  </tr>
</table>



## Lemmata

A lemma is defined as a dictionary "headword" plus its word class. For example, the verb "love" in Shakespeare has the headword "love" and the word class "v". (He uses this lemma 1,135 times in a variety of contexts. As many as 153 instances of those usages are in the third person, singular, present, of which 150 instances are spelled "loves" and three "loveth.")

The noun "love", has a separate lemma. In general, for headwords like "love", their word class is listed alongside the lemma. Thus for a word like "love" the two listed lemmata are "love (n)" and "love (v)".


## NUPOS POS tag list for English

A list of all the non-punctuation parts of speech defined by NUPOS can be found here:

[http://morphadorner.northwestern.edu/morphadorner/documentation/nupos/](http://morphadorner.northwestern.edu/morphadorner/documentation/nupos/)



*   "NUPOS." [http://morphadorner.northwestern.edu/morphadorner/documentation/nupos/](http://morphadorner.northwestern.edu/morphadorner/documentation/nupos/). Accessed September 26, 2018.
