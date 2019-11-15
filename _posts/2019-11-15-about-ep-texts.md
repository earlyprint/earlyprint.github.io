---
layout: post
title:  "About the EarlyPrint Texts"
author: Martin Mueller
date:   2019-11-15 10:00:00 -0500
tags: ep-library
categories: Intros
summary: A discussion of the method by which EarlyPrint texts are derived from TCP texts
---

The texts in this project are corrected and enriched versions of [TCP](/intros/intro-to-eebo-tcp.html)
texts, and they exist in an environment that supports further correction
or enrichment. It is very important to have a clear understanding of how
the TCP texts were produced, what they claim or do not claim to
represent, and in what respects the EarlyPrint texts differ from them.

Imagine employees in countries with low labour costs whose job consists
of transcribing texts from page images. They are employed by firms that
provide services to business or other organizations that need such
transcriptions. They are paid by the keystroke. They are highly skilled,
but they are typists pure and simple. They may not even be familiar with
the language of the texts they type, which has advantages and
disadvantages.

The TCP texts were transcribed by many such invisible individuals. Once
the texts were typed, some form of SGML encoding was applied to them
(this has now been converted to XML). If you do this for a project of
55,000 texts and you want the results to be compatible or
"interoperable" there is not a great deal of particular attention that
you can give to the special features of this or that text. But for
corpus-wide inquiries, the relatively coarse but quite consistent
encoding of the TCP texts is arguably more useful than a more granular
(and more time-consuming) encoding would have been. (See [our Intro to EEBO-TCP](/intros/intro-to-eebo-tcp.html) for more information about this archive.)

The typists worked from digital scans of microfilm images of books
printed between between 300 and 450 years ago. Old books are full of
pages that are hard to read because there was too much or not enough ink
to begin with. Time does things to paper. The microfilms were produced
in the 20th century, and most of them did not have the "deskewing"
technologies that let the camera compensate for the fact that text at
the interior margins of a page is photographed at odd angles. The outer
margins create different problems. Old books often have marginal notes
in smaller print that may have faded in time. A careless operator may
take pictures where some text at the outer margins is not captured at
all. And so on.

If the digital scan presented an easily readable image to the
transcribers, the chances for accuracy were very good. Quality control
measures hold the vendors to an error limit of 1 in 20,000 keystrokes.
That is one typo per 4,000 words.

If the transcribers could not make out a letter or word they were
instructed not to guess but to record the extent of missing text in
terms of letters, word, lines, paragraphs, or pages. Thus texts include
"known unknowns" marked in XML as \<gap/\> elements, as in \'lo\<gap
unit=\"letter\" extent=\"1\" reason=\"illegible\"/\>e\'. In text
displays these gaps are often represented by a black dot (lo●e), and
"blackdot words" is a convenient shorthand for referring to the most
common form of textual corruption in the TCP texts. These circumstances
of production account for the fact that many blackdot words have
perfectly obvious corrections that were not made at the time. \'lo●e\'
has a number of possible completions, but for \'neglige●t\' or
\'Augus●yne\' the completions are as certain as death or taxes.

Once the texts were returned by the vendors they went through forms of
quality control by professional readers who had a good knowledge of
Early Modern print practices. 5% or 5,000 words were proofread, and on
the basis of that sample the text as a whole would be approved or
rejected.

It is very clear from this description that a TCP transcription is not a
scholarly, let alone a critical, edition of the text it represents. It
is also not an instance of "documentary editing", a practice that seeks
to replicate all the physical properties of a text. In fact the TCP
transcriptions deliberately ignore most of the typographical and layout
decisions of the original.

Nelson Goodman in his *Languages of Art* drew the useful distinction
between \'autographic\' and \'allographic\' objects. The David of
Michelangelo is \'autographic\' and uniquely embodied in a single
instance. There is no privileged way of writing down a Shakespeare
sonnet or a Bach fugue. Or so Goodman argued. In practice, people
differ, perhaps because of very deep temperamental habits about the ways
in which a text as an intentional object does or does not have a
privileged association with some particular embodiment.

The TCP project has been more on the allographic side of this divide,
and this project has pushed this tendency a little further wherever
there are trade-offs between fidelity to a particular physical
manifestation of the original object and the agility of its digital
surrogate. TCP texts mark page breaks but ignore line breaks. Running
titles, catchwords, paper signatures and the like are ignored. So are
type faces, but the transcribers were instructed to mark cases where a
word or phrase appears in a font that differs from the surrounding
context. If in a paragraph of Antiqua a name appeared in italics, that
change would be marked with a \<hi\> element. But a marginal note in
italics would not be marked if the default font for marginal notes was
italics. Similarly, if italics is the default font for stage directions,
the text would not be marked, but if a name in a stage direction showed
up in Antiqua it would be wrapped in \<hi\>. In practice, text inside a
\<hi\> element is more often than not text in italics. But it could be
anything.

In other words, the TCP transcriptions used typographical data to
identify and articulate the structural organization of a text but did
not record how those structural elements were expressed on the printed
page. While a TCP page is very clear about chapter headings, paragraphs,
lines of verse, stage directions, lists, tables, marginal notes,
quotations, trailers, and the like, the transcription does not let you
reconstruct most details of layout and typography. If you have the page
image, you can judge whether the structural interpretation is
appropriate. With its help you could also reconstruct a documentary
edition of a text much more quickly than by re-encoding it from scratch.

With regard to orthography, however, the transcribers were to write down
the letters they saw. Those letters include a lot of symbols beyond the
26 letters of the English alphabet. The TCP project began before Unicode
was firmly established in the digisphere. The project only used the
lower ASCII set---what you might call the Adamic alphabet of computing:
an IBM keyboard of the sixties. Whatever could not be produced with a
single keystroke on that keyboard was represented by "character
entities" or periphrastic expressions wrapped in an initial ampersand
and a terminal semicolon, as in "&auml;" for \'ä\' or "a with an
umlaut".

The TCP texts have about 1,500 of these character entities, including
printer abbreviations, characters in non-Roman alphabets, as well as
astrological and other symbols. The great majority of "types" and vast
majority of "tokens" of the character entities can now be represented by
Unicode characters that any browser knows how to handle.

Some character issues remain. If you think of a set of texts as tightly
controlled files that are mediated through a single environment and are
used mainly for the purpose of producing readable texts for readers, it
does not matter how many odd characters you have because they are all
part of the same and uni-directional processing environment. If, on the
other hand, you think of texts as files that are manipulated by many
users for a variety of purposes, character issues create problems that
get in the way of usability. This is especially true if the manipulation
is done by scholars whose programming skills are limited. But they are a
critical user group.

Long \'s\' is the major case in point. There is a Unicode representation
of it (\'ſ\', \\u017f), but for such a common letter it is a nuisance to
produce on a keyboard, and it throws off string searches unless the user
knows how to model a search for \'assignment\' in the regular expression
\'a\[sſ\]{2}ignment.\' Nor have the typeface designers found designs
that are pleasant to look at and easily distinguishable from \'f\'.

Concerns of this kind led us to abandon long \'s\'. The Bodleian edition
of their Shakespeare First Folio made a similar decision---probably for
very similar reasons. There are also character entities for various
printer\'s abbreviations that are holdovers from manuscript culture,
above all \'&abque;\' for the ubiquitous Latin suffix \'-que\'. The
decision about what to keep or toss turns on the certainty with which an
abbreviation can be resolved. We resolved the abbreviation for \'que\'
and did the same for several other abbreviations, but the common \'thē\'
(\'the\~\' in the original TCP transcriptions) is a hard case. A human
reader will hardly ever doubt whether it resolves to \'then\' or
\'them\'. But a machine cannot (yet) be trusted to get it right every
time. So we kept the combining macron.

In very early modern texts you find \'y\' with a superscripted \'e\',
\'u\' or \'t\' as abbreviations for \'the\', \'thou\', and \'that\'.
They have been expanded in the current texts. Those y\'s have nothing to
with the letter \'y\' but were an early printers\' kludge for
representing the sound that is now represented by \'th\'. Superscripts
are a real nuisance in Unicode. There are code points for some but not
all characters of the alphabet, they were added at different times, and
they don\'t play nice with each other. The current texts by default do
not display superscripts, but superscript data are kept in rendition
attributes of &w\> elements, where they can be ignored or followed.
