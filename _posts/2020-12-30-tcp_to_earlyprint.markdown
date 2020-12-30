---
layout: post
title:  "From TCP to EarlyPrint: the conversion process"
date:   2020-12-30 09:00:00 -0500
author: Joseph Loewenstein
tags: eebo-tcp
summary: A summary of the conversion of texts from TCP to EarlyPrint
categories: Intros
---

In the following paragraphs, TCP refers to texts created by the Text
Creation Partnership and EarlyPrint refers to versions of those texts
corrected and enriched by various post-processing routines.

**The basic transformations** wrought on TCP texts as they pass to
EarlyPrint include

1. Standardize text

    a)  long ‘s’ is replaced with the standard ‘s’.

    b)  line-breaking hyphens are removed, unless the hyphen is clearly part of a hyphenated word.

    c)  expand macron and other abbreviations (e.g., the symbol for 'abque').

2. Adjust tags for font changes

3. Refine tagging of

    a)  foreign language strings

    b)  structure,

    c)  punctuation,

    d)  lacunae

4. Tokenize

5. Identify abbreviations

6. Assign token IDs

7. “Adorn” with regularized spelling, POS, and lemma


***1\. Standardize text***

<p style="margin-left: 15px;">a) Long ‘s’ is replaced with the standard ‘s’.</p>

<p style="margin-left: 15px;">b) Line-breaking hyphens are removed, unless the hyphen is clearly part of a hyphenated word.</p>

<p style="margin-left: 15px;">c) Expand macron and other abbreviations (e.g., the symbol for 'abque'): combining macrons are replaced with ‘n’ or ‘m’ wherever this can be done without ambiguity. Other abbreviations that have their origin in manuscript culture and survived into early printing have been expanded. The most common case is the ubiquitous suffix ‘que’, which appears in the SGML sources as the character entity ‘&abque;’.</p>

***2\. Adjust tags for font changes***

*Font changes from word to word*

Some of the typographical markup of the TCP texts poses problems for
tokenization. With very few exceptions, the TCP texts recognize only two
typographical states, 'marked' and 'unmarked'.

The 'marked' state is represented by a &lt;HI&gt; tag, which says that a
word or word sequence differ from their surrounding contexts. Without
looking at a page image you cannot tell whether a word is marked by
italics, blackletter, or smallcaps or whether it is set in the default
type font against a surrounding context in some other font. The rules
for what counts as the surrounding context are not always clear.

*Font changes within words*

In 16th and 17th century texts, a single word may use different fonts.
Names in the genitive cases are the most common example: e.g.
"*Caesar*'s", tagged in the TCP texts as "&lt;HI&gt;Caesar&lt;/HI&gt;'s".
But you may also run into "Caesar&lt;HI&gt;'s&lt;/HI&gt;" or
"Caesar&lt;HI&gt;'s army …&lt;/HI&gt;". There are also many hyphenated
words where the first or second part are marked, e.g "&lt;HI&gt;London&lt;/HI&gt;-bridge" or (very occasionally) "north-&lt;HI&gt;Mounster&lt;HI&gt;."

There are also superscripts and subscripts, the latter much less common.
In the SGML transcriptions, superscripts were marked with the caret
sign, so that something like "Mʳ." would show up as "M\^r." in the SGML
version. The MorphAdorned versions were produced from translations of
the SGML into TEI P5 XML, where super- and sub-scripts would be
expressed with rend attributes, as in 'M&lt;hi
rend="sup"&gt;r&lt;/hi&gt;.'

Given 1) the ambiguity and inconsistency of typographical mark-up in the
TCP texts, 2) the relatively low significance of the typographical
detail, and 3) the desirability of having a linguistically annotated
text that would be easy to process by users with at best intermediate
computing skills, Mueller decided to store troublesome typographical
detail in attribute values, where it could be ignored or observed,
depending on the needs of a particular project. He used @orig and @rend
attributes to keep all the information from the TCP texts but use
standard representations of the word as the value of the word element.

<table style="margin-bottom:16px; border-collapse:collapse;">
<thead>
<tr>
<th style="text-align:left; font-weight:normal; border:1px solid #888888; padding:5px;">SGML</th>
<th style="text-align:left; font-weight:normal; border:1px solid #888888; padding:5px;">EarlyPrint</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left; border:1px solid #888888; padding:5px;">M\^r.</td>
<td style="text-align:left; border:1px solid #888888; padding:5px;">&lt;w orig=”Mʳ.”&gt;Mr.&lt;/w&gt;</td>
</tr>
<tr>
<td style="text-align:left; border:1px solid #888888; padding:5px;">y\^e</td>
<td style="text-align:left; border:1px solid #888888; padding:5px;">&lt;w orig=”yᵉ”&gt;the&lt;/w&gt;</td>
</tr>
<tr>
<td style="text-align:left; border:1px solid #888888; padding:5px;">&lt;HI&gt;London&lt;/HI&gt;-bridge</td>
<td style="text-align:left; border:1px solid #888888; padding:5px;">&lt;w rend=”hi-hyphen-plain&gt;London-bridge&lt;/w&gt;</td>
</tr>
<tr>
<td style="text-align:left; border:1px solid #888888; padding:5px;">&lt;HI&gt;Caesar&lt;/HI&gt;’s</td>
<td style="text-align:left; border:1px solid #888888; padding:5px;">&lt;w rend=”hi-apo-plain”&gt;Caesar’s&lt;/w&gt;</td>
</tr>
</tbody>
</table>


In addition Ii transformed into @rend="hi" all &lt;HI&gt; elements that
enclose single words. &lt;HI&gt; elements that wrap a *sequence* of
words are transformed in most cases into elements that have a structural
or semantic meaning. For instance, a very high percentage of two-word
&lt;hi&gt; elements are names. Longer strings are likely to be
quotations or passages in other languages. It is possible to use the
combination of pos tags and &lt;HI&gt; elements to assign such strings
to appropriate elements with a high degree of confidence.

We do not include superscripted letters in the content of &lt;w&gt;
elements for two reasons: first, because such inclusion would complicate
simple searching; second, because the Unicode alphabet of superscripted
characters is cobbled together from different Unicode ranges, and do not
necessarily align.

***3\. Refine tagging***

In the TCP XML words in Latin and other languages are often wrapped in
&lt;HI&gt; elements because they are often typographically
distinct—usually but not always in italics. MorphAdorner is very
accurate at identifying Latin words. If more than two thirds of the
words inside a &lt;HI&gt; element are identified as Latin, the EP text
converts the &lt;HI&gt; tag to &lt;q&gt;, &lt;seg&gt; or &lt;foreign&gt;
and adds an @xml:lang attribute. We also do this for &lt;HI&gt;
sequences where MorphAdorner tags at least two thirds of the words as
Latin.

If a TCP page begins with a block element (DIV, P, L etc) , the
&lt;PB&gt; element marking the page break becomes the first child of the
block element.  In the EP texts, the &lt;pb&gt; elements precedes the
block element, on the theory that the page break is prior to the
beginning of the paragraph.

If the last token in a &lt;HI&gt; element with less than seven tokens
consists of punctuation the punctuation is moved outside on the
assumption that in most cases the punctuation does not terminate or
articular the tokens inside the &lt;HI&gt; element but the longer string
of which the &lt;HI&gt; element is a part.

The TCP texts often record lacunae with the format “extent=”letter”. EP
texts use @extent and @unit attributes, e.g. @unit=”letter” @extent=”1”.

***4\. Tokenize***

The fundamental act of linguistic annotation is the division of a text
stream into "tokens" that represent "words" as lexical items in some
grammatical state. A modern "tokenizer" will define a token as a string
of characters that are preceded by white space or nothing and followed
by white space or a punctuation mark. That works for all but a very
small percentage of tokens, but in a large corpus a small percentage
adds up to a lot of tokens.

The TEI defines a &lt;w&gt; element as representing "a grammatical (not
necessarily orthographic) word". ) There are character strings without
spaces that clearly consist of separate lexical items (I'll, can't) and
there are character strings with spaces that clearly are single lexical
items ('some where', 'them selves'). It's a good test of the latter to
ask whether a linguistic definition of the separate sequential words
makes sense. It does not make a whole lot of sense to think of "some
where" as two words, an indefinite determiner followed by a "wh-word"
used as a noun. It's clearly an adverbial expression, whether it is
spelled as two words or one word.

MorphAdorner uses its split routines to split and reassemble single
lexical items that cross typographical word boundaries, notably
reflexive pronouns (my self, myself, them selves, themselves). We
enclose these alternative spellings within the same &lt;w&gt; element
and dispense with @part attributes.

In the first linguistically annotated TCP corpus contracted forms (I'll,
i'th' etc) were treated as single tokens with a compound description.
This had some advantages because you didn't have to decide where to
split the contracted form. It had the disadvantage that compound
description elaborated a set of roughly 150 basic linguistic tags into
500 or more compound tags.

Several years ago the TEI added a @join attribute with 'right' and
'left' values. That allows you to define separate tokens that have no
intervening space and makes for cleaner markup. We have adopted this
solution for tagging compounds. In the current EarlyPrint texts,
contracted forms are therefore treated as separate tokens, with the
exception of contractions that involve 'ne' or 'not'. These are treated
as negative pre- or suffixes: 'ever' and 'never' are respectively
categorized as 'av' or 'avx', 'do' and "don't" as 'vvb' and 'vvbx'.

For *counting* purposes, we treat both "I will" and "I'll" as bigrams.

***5\. Identify abbreviations***:

Abbreviations were largely ignored in the TCP transcriptions. In the EP
texts much work has gone into identifying them and marking the dot or
colon following them as part of the abbreviation.

***6\. Assign token IDs***

Two sets of token IDs are applied during processing, one set to
accommodate POS tagging (MorphAdornment) and one to furnish IDs for the
EarlyPrint corpus proper. We retain a separate record for each EP text
file that maps the MorphAdorner TCP ID to the EP ID.

MorphAdorner assigns to each token a *numerus currens* ID that starts at
the first word of the document, increases by 10 ( to accommodate minor
insertions) , and runs to the end of the document. The MorphAdorner IDs
are "smart" in the sense that they recognize "jump" tags and are not
confused by &lt;figure&gt; or &lt;note&gt; elements that interrupt the
running main text. Those elements get their own numbers in a proper
order.

The ID system for EarlyPrint texts is based on the image IDs of the EEBO
scans. (We use image ID numbers as part of the Token ID, so that, should
we need to adjust to ID assignments on a given page opening, we can do
so without disturbing the assignments on other openings.) Because EEBO
offers double page images in nearly all cases, the page\_id of an
EarlyPrint text consists of the image\_id with an -a or -b flag. The
lxml script that generates the ID uses each page\_id as an anchor and
counts the number of words on that page. If there are less than 1,000
words, a word counter starts at 10 and generates a four-digit number
with leading zeros that is concatenated with the page\_id, eg.
A00011-023-a-0090. If there are more than a thousand words, the word
counter will have five digits.

***7\. POS tagging***

MorphAdorner’s output includes regularized spelling, identification of
part-of-speech, and lemmatization. MorphAdorner is language-agnostic and
can work with any POS tagging system. The system used for *EarlyPrint*
was designed by Martin Mueller in the context of the WordHoard project
and is a hybrid of the CLAWS 5 tags and the tag set that Larry Benson
developed for his Glossarial Database of the *Riverside Chaucer*.

The purpose of this hybrid has been to find a tag set that would do
rough justice to texts from Chaucer to Joyce. Like other modern English
tag sets, CLAWS does not recognize the singular genitive as an ordinary
suffix, but splits off an apostrophized 's' as a distinct token. This
does not work very well for texts before 1700. Before 1600 you almost
never find an apostrophe for a singular genitive nouns. 'Fathers' will
be morphologically ambiguous. For feminine names, spellings like
'Cleopatraes' are common. The CLAWS set also has no provisions for the
second person singular. Benson's tag set has a useful "used as" feature
that allows you to analyze cases in which a word is used in a different
class from its ordinary use--e.g. 'Ifs and buts' where the conjunctions
are used "as" nouns. The use of plural adjectives as nouns
('necessaries') if a fairly common case. So are the nominal or
adjectival uses of participial forms.

The NUPOS has undergone some simplification. The original set used 'acp'
with -p, 'av', and 'cs' flags to distinguish between different uses of
words like 'since' and 'as'. We determined that it was virtually
impossible to maintain those distinctions across close to two billion
words and have therefore dropped the flags for 'acp' words, as well as
for 'crq' or 'wh' words like 'when', 'how', and 'why'. Some names have
been changed to make typing easier: 'n1-nn' is now 'nn1'.

For more on the NUPOS tag set, [see this speadsheet](https://docs.google.com/spreadsheets/d/1JnqWYgpUe_LZYSzxE0abW3mk6XShg4wD7i2WxMCJcz8/edit#gid=0).
