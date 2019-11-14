---
layout: post
title:  "Using the N-gram Browser"
date:   2014-10-20 10:00:00 -0500
author: Anupam Basu
tags: ep-lab
summary: A basic tutorial for the EEBO N-gram Browser
categories: How-To
---

## Using the N-gram Browser

#### Basic Usage

The main browser screen presents users with a very simple combination of
menu choices. To use the n-gram browser, select the appropriate database
from the drop-down menu depending on whether you want to explore the raw
EEBO-TCP corpus or one of the versions with algorithmically standardized
spelling and part-of-speech (POS) tagging. Enter a word or phrase in the
text-entry field and click search to generate a line-graph of relative
frequencies over time. You can enter multiple words or phrases separated
by commas to generate plots that allow you to compare trends. For
example, entering “love, loue” in the search box for the unmodified
corpus will generate separate lines for both variations that allow you
to compare how their relative usages varied over the years. Similarly, a
query involving different terms – say a search for “god, king” in the
standardized spelling unigram corpus – would produce two lines that
allow one to compare trends. A check box allows you to view a smoothed
graph which tends to absorb minor local fluctuations or a step-plot that
shows exact values for every year. The degree of smoothing depends on
the number of years over which the rolling average is calculated and can
be controlled from a drop-down menu.

The interface also allows you to share particular n-gram-plots by
emailing them to others, or by tweeting them. You can also share these
plots or come back to them later simply by copying or bookmarking the
URL of the graph. We would like to collect any especially interesting
patterns that you might come across, so please submit any interesting
searches for archiving on the site as well.

#### Advanced Usage: Harnessing the Power of Regular Expressions

The basic search options cover most search cases where one is interested
in unique words or phrases. However, let’s say we are more interested in
the emergence of a concept than the actual history of orthographic
variation. The two separate trend lines for “love” and “loue” are not
very useful in this instance. What we need is a single line that will
capture both spelling variations as part of one search. We can of course
switch to one of the standardized spelling versions of the EEBO-TCP
corpus in the hope that any occurrences of “loue” will have been
standardized to “love” in it. In the case of this rather simple variant,
this is probably a fair assumption to make, but the process of
standardizing early modern spelling to its modern equivalent is a
fraught and difficult one and an active area of research in natural
language processing. Early modern spelling is, computationally speaking,
a moving and very difficult target. The quirks of early modern
orthography arise out of a multitude of factors. If there is a
fundamental impetus towards standardization on the one hand, the
processes of standardization are influenced by a variety of factors,
from debates on linguistic and cultural borrowing, to socio-economic
conditions of the early book trade and the material constraints of
typesetting and printing. Thus, while the accuracy of algorithmic
standardization is increasing as we refine and reconfigure our
techniques (and we will continue to update our standardized database as
we build new versions), there will be many instances where automated
spelling correction fails to meet our needs.

In other instances we might be interested in all variations of a word –
“loved” as well as “beloved” – or clusters of words that we might take
to represent related concepts – both “noble” and “aristocrat” (perhaps
even “aristocratic”). In fact, beyond the surface level of poking at the
database to reveal obvious trends, I suspect that most searches
emanating from or leading to interesting research questions will take
such complicated forms.

While it is impossible to pre-empt all such possible searches, regular
expressions allow us to build arbitrarily complex queries for the n-gram
browser. Regular expressions are a powerful technique for constructing
complex searches within text data. While there are several subtly
different ‘flavors’ implemented across different operating systems,
command-line programs, and programming languages, regular expressions
essentially constitute of a set of simple rules that can be combined
together to build complex search patterns.

#### Using Regular Expressions in the N-gram Browser <sup><a href="#ftn1" id="body_ftn1">1</a>

The N-gram browser allows you to directly enter regular expression
searches in the search box. To indicate that your search consists of a
regular expression, you should begin and end it with the “/” character.
The N-gram browser will show you the words that matched your search, so
you can refine your regular expression as needed.

Let’s say we want to capture both “love” and “loue” as part of the same
query in the original spelling browser – we can write it as a simple
regular expression `/lo[uv]e/`. If we want to make sure that we capture
possible variants of “king” in our search, we might use the regular
expression `/k[iy]nge?/`, which captures not only “king”, but also
“kyng,” “kynge,” and “kinge” as part of the same graph.

Regular expressions, while essentially constituted of simple rules, are
a vast subject beyond the scope of this short introduction to the n-gram
browser. But they are well worth learning for any humanities scholar
working with digitized and searchable texts. There are several great
learning resources on regular expressions both on the web and in print
form, but here are a few examples elucidating the basic rules
involved: <sup><a href="#ftn2" id="body_ftn2">2</a></sup>


<table>
<tr>
<td>
[abc]
</td>
<td>
A single character of: a, b, or c
</td>
</tr>
<tr>
<td>
[\^abc]
</td>
<td>
Any single character except: a, b, or c
</td>
</tr>
<tr>
<td>
[a-z]
</td>
<td>
Any single character in the range a-z
</td>
</tr>
<tr>
<td>
[a-zA-Z]
</td>
<td>
Any single character in the range a-z or A-Z
</td>
</tr>
<tr>
<td>
^
</td>
<td>
Start of line
</td>
</tr>
<tr>
<td>
$
</td>
<td>
End of line
</td>
</tr>
<tr>
<td>
\A
</td>
<td>
Start of string
</td>
</tr>
<tr>
<td>
\z
</td>
<td>
End of string
</td>
</tr>
<tr>
<td>
.
</td>
<td>
Any single character
</td>
</tr>
<tr>
<td>
\s
</td>
<td>
Any whitespace character
</td>
</tr>
<tr>
<td>
\S
</td>
<td>
Any non-whitespace character
</td>
</tr>
<tr>
<td>
\d
</td>
<td>
Any digit
</td>
</tr>
<tr>
<td>
\D
</td>
<td>
Any non-digit
</td>
</tr>
<tr>
<td>
\w
</td>
<td>
Any word character (letter, number, underscore)
</td>
</tr>
<tr>
<td>
\W
</td>
<td>
Any non-word character
</td>
</tr>
<tr>
<td>
\b
</td>
<td>
Any word boundary
</td>
</tr>
<tr>
<td>
(...)
</td>
<td>
Capture everything enclosed
</td>
</tr>
<tr>
<td>
(a|b)
</td>
<td>
a or b
</td>
</tr>
<tr>
<td>
a?
</td>
<td>
Zero or one of a
</td>
</tr>
<tr>
<td>
a\*
</td>
<td>
Zero or more of a
</td>
</tr>
<tr>
<td>
a+
</td>
<td>
One or more of a
</td>
</tr>
<tr>
<td>
a{3}
</td>
<td>
Exactly 3 of a
</td>
</tr>
<tr>
<td>
a{3,}
</td>
<td>
3 or more of a
</td>
</tr>
<tr>
<td>
a{3,6}
</td>
<td>
Between 3 and 6 of a
</td>
</tr>
</table>

#### Searching Parts of Speech with Regular Expressions

The standardized spelling databases allow searching for parts of speech
using regular expressions. The basic format for searching for a word
combined with a part-of-speech is “word\_pos” so that we might search
for “army\_n1” etc. We use the NU-POS tagset developed by Martin Mueller
and used by Morphadorner to tag the corpus. Thus a word like “man” would
be tagged “n1” as a singular noun while men would be tagged “n2” (plural
noun). If we wanted either word used as nouns (as opposed to, for
example, “man the post”), we could use the following regular expression:
“/m[ae]n\_n.+/”. This specifies that the second character of the match
could either be “a” or “e” and the part of speech should begin with “n”
and have exactly one character after that.

Using the POS search facility effectively can lead to really powerful
queries and insights but it does take a bit of getting used to. One
should not only be comfortable with regular expressions but with the
NUPOS tag set as well.<sup><a href="#ftn3" id="body_ftn3">3</a></sup>

<sup><a href="#body_ftn1" id="ftn1">1</a></sup> For a detailed overview of regular expressions, see
Jeffrey E. F Friedl, *Mastering Regular Expressions* (Sebastopol, CA: O’Reilly, 2006).

<sup><a href="#body_ftn2" id="ftn2">2</a></sup> Examples taken from [http://www.rubular.com/](http://www.rubular.com/)

<sup><a href="#body_ftn3" id="ftn3">3</a></sup> For a detailed introduction to the NUPOS tagset,
please see [http://wordhoard.northwestern.edu/userman/nupos.pdf](http://wordhoard.northwestern.edu/userman/nupos.pdf)
