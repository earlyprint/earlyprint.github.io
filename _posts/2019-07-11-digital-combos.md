---
layout: post
title:  "Digital Images for EarlyPrint Texts"
date:   2012-07-11 11:12:00
author: Martin Mueller
tags: tcp
summary: Some thinking about the relation of EEBO images to TCP and EarlyPrint texts
categories: Posts
---

### A very short history and survey of surrogate images

Beginning in 1938 and continuing for the next half century, Early Modern
books were systematically microfilmed. University Microfilms, an
offshoot of the University of Michigan, was the major agent in this
project, which was made possible by the census of books before 1642 in
Pollard and Redgrave's *Short Title Catalogue* of 1926 and its
continuation in the 1940's by Donald Wing, who completed the census for
the rest of the 17th century.

In the decades after World War II an increasing percentage of pre
17th-century books were freely available in research libraries to users
who had the patience to work with microfilm readers. Around 2000,
Proquest, the successor of University Microfilms, decided to digitize
the microfilm images and make them available over the Web to members of
institutions who could afford the non-trivial subscription cost. All of
a sudden scholars at these institutions could get at any of 130,00 books
at 2am and in their pajamas. That was a game changer for many.

Over the following decade, the quality of digital images increased
greatly, and the cost of making, storing, and distributing them dropped
sharply. As a result our expectations of what counts as a good enough
image have gone up. The microfilm images of the last century no longer
meet expectations. The time has come to start a new project that over
the course of one or two decades will produce new, public domain, and
much higher-quality images of the Early Modern print heritage. This can
be done in a distributed fashion. If needless duplication is avoided,
the costs are bearable. One could imagine a funding model in which the
process is driven by user demands and users would contribute to the cost
of making images that then become available to everybody.

The emerging imaging protocol IIIF can create an environment in which
images from many libraries are accessible to users as if they came from
a single collection. Modern browsers have quite remarkable capabilities
for image manipulation. A run-of-the mill laptop and recent run-of-the
mill digital images add up to a laboratory in which the material
evidence for most textual problems can be satisfactorily examined.

In recent years Rare Book Libraries have made quite a few image sets
available over the Internet. Some of them are only available from the
library's website. Thus you can download *The Troublesome Reign of King
John* from Yale's Beinecke Library or Mary Wroth's own copy of *Urania*
from Penn's Kislak Centre. It is not easy to estimate how many such free
treasures are available from the 200 or so libraries that have
significant holdings in Early Modern print materials.

Some libraries have put part of their collections on the Internet
Archive, which holds not quite 3,000 good quality pre-1700 imprints. The
Hathi Trust lists about 3,400 English titles from that period. Together
those two aggregators probably hold about 2,000 image sets that map to
TCP texts and could provide the image set for a "digital combo." It is a
long way from 2,000 to 53,000, but 2,000 is a good start, and every book
along the road adds value to users.

### Making digital combos and the problem of citation

How do you make a digital combo and how do you cite the resulting work?
There are lots of little devils hiding in the details of answers to
those questions. The microfilms that are the sources of EEBO images were
produced from the holdings of many libraries, but most of them come from
a small group of libraries, in particular the British Museum and the
Huntington Library. Microfilms were kept on reels, with a number
assigned to each reel and each 35 mm image on it. A reference like
16252:5 refers to item 5 in image set 16252 (no longer kept on a
physical reel). It serves as a unique identifier for an EEBO image. It
happens to be the image set from which the first TCP text was
transcribed: "The passionate morrice" with the proud file\_id A00001.
16252 and A0001 map to the STC number 23867.5 and to the ESTC number
S115782. '5' is the identifier of the double page image. Most EEBO
images have two pages on one image.

It may be that EEBO image numbers will survive the images themselves and
become arbitrary, but familiar and convenient identifiers, not unlike
the Stephanus numbers that for centuries have served as a citation
scheme for Plato. The Estiennes (Stephanus in Latin) were a French
publishing family responsible for the way in which we cite both the
Bible and Plato. In the 1550's Robert Estienne published Bibles that
made the chapter and verse citation scheme canonical. In his 1578
edition of Plato his son Henri used the common practice of dividing a
page into quintiles loosely identified by letters from 'a' to 'e'
printed in the margin. Thus 81a refers to something at the top of page
81 and 375c refers to something somewhere in the middle of that page.
From the perspective of text content this is an entirely arbitrary
system, and there are no clear boundaries between the quintiles. It is a
crude but very reliable navigation system that takes you within 50 words
of any destination if other editions of Plato add those numbers to their
texts, as most of them continue to do to this day.

The EEBO image numbers are baked into the TCP transcriptions, where
every page break is marked with a &lt;pb/&gt; element that includes a
reference to the EEBO image\_id. It also includes page references, where
they are available. But often they are not, texts may have more than one
pagination sequence, and a single pagination system may contain errors.
In practice EEBO image numbers are the only identifiers that work
reliably across the entire world of Early Modern print and will locate
any word or phrase within a two-page span. Since a TCP transcription
will record two page breaks for every image (barring the occasional
cases of single-page images), you can double the precision of a
reference by adding –a and –b flags to the first and second occurrence
of a page. The EarlyPrint texts use these flags.

A TCP text is a digital surrogate of an item whose most authoritative
description is (or ought to be) found in the English Short Title
Catalogue. ESTC numbers are much less widely used than their precursors,
the STC, Wing, or Thomason numbers deeply familiar to generations of
scholars with a philological or bibliographical bent. But a promised
forthcoming revision of the ESTC catalogue, which will have a
collaborative component for user contributors, may change this. A
generation of scholars that first encounters old books in the form of
EEBO images on the screen of a smartphone may find ESTC numbers a useful
hook to hang information on. References that combine an ESTC number with
an EEBO image ID would do quite well as universal identifiers, e.g
S115782-5-a. They would be as arbitrary but as convenient, as Stephanus
references to Plato, and as precise as the customary page references in
humanities books and journals.

### How "same" is same enough for matching text and image?

We still have some work to do on provenance data for the image sets on
this site. The majority of them come from the Thomas Pennant Barton
Collection in the Boston Public Library, which has made them available
to the Internet Archive. Several dozen image sets are digital scans of
early 20th-century photographic facsimiles in the Tudor Facsimile Texts
series. For most practical purposes, they are as good as newly made
images. A handful of plays by James Shirley and the 1647 Beaumont and
Fletcher Folio were digitized by the Northwestern Library.

The relationship of an EarlyPrint text page to its corresponding image
is not entirely straightforward. Remember that a page of transcribed TCP
text is not a documentary edition of a page image. It is a digital
surrogate that aims at representing the semantic and structural
properties of an allographic textual object. The transcription
represents some information from the page image literally (orthography),
translates some information into XML elements, and entirely ignores some
information. The purpose of a corresponding page image is to let you
check the accuracy with which the transcription represents the text as a
conceptual object. Another purpose is to give you a sense of what the
text looked like in its original milieu.

In order for an image set to be a suitable companion for an EarlyPrint
text, the words on the image set must align page by page and line by
line with the image set from which the TCP text was transcribed. These
conditions can be met in three different ways. First, the new image set
may derive from the same copy that produced the image set from which the
TCP was transcribed. For instance, the text of *Dr Faustus* was
transcribed from a copy of the 1603 edition in the Bodleian Library. Our
image set is a digital scan of the Tudor Facsimile edition, which is
based on the Bodleian copy.

In a much more common scenario, the new image comes from a different
copy of the edition that served as the basis for the TCP text. Different
copies of the 'same' edition in an Early Modern are not necessarily
identical in all respects. Things happen in a press run, and copies may
be assembled at different stages of correction. If the transcribed text
differs from the page image, it does not mean that the transcriber made
an error. On the other hand, if the transcriber worked from a poor image
and the new image from another copy is much clearer, the odds are that
the new image can help improve the transcription. But you have to be on
your guard. There may be a pedagogical advantage in using different
instances of an edition: it draws attention to the fact 'same' is a
slippery word.

The third scenario may strike some book historians as problematical. The
image set comes from a reprint that may have a slightly different
titlepage but in all other respects uses the plates or pages of the
earlier edition. There is a 1654 edition of two plays by Thomas May,
*Agrippina* and *Cleopatra*. A very casual look at that book reveals
that it has combined two quite differently printed texts, and each of
them maps line by line and page by page to the EEBO images from which
the TCP texts were transcribed. The TCP copy of *Fair Em* was
transcribed from a 1591 copy in the Bodleian. The Boston Public has an
edition dated 1631. The EEBO and Boston images are virtually identical,
but there are occasional spelling differences. The same is true of
*Solimon and Perseda*. The TCP copy was transcribed from a copy in the
British Library dated '\[1592?\]'. The copy in the Boston Public Library
squeezes "Newly corrected and amended" onto the old title page.

In such cases you gain more than you lose by associating the text with
page images from almost the same edition until a closer match becomes
available, as long as you tell users where the images come from. Some
counter examples suggest that it is not difficult to draw a line between
images that do or do not make suitable matches. Lording Barry's *Ram
Alley* was transcribed from a Bodleian copy of a 1611 edition, while the
Tudor Facsimile is based on a 1611 copy in the British Library. These
are very similar editions, but their page breaks diverge after the first
page. The same is true for *Every Man out of his Humor*, where the TCP
transcription and Boston Public Library copy both are editions from 1600
but they are clearly different, and their page breaks diverge from the
beginning.

### Aligning text and image

There is an irreducible amount of human labour involved in matching
pages to transcribed text. What with missing or duplicate pages on the
text side and missing or duplicate pages on the image, not to speak of
blank pages, you need a pair of human hands and eyes to make sure that
each image aligns with the text. For most texts that is a matter of
minutes, but if a text is very long or if the page order is disrupted on
both sides, it can take an hour or more.

In the Early Print project we have followed a strict policy of mapping
third-party images to the TCP page ids that are based on EEBO image
numbers. We have a procedure (and expect to put it on the Web soon) that
creates a manifest for each text by listing a unique identifier of the
page followed by its first and last five words and a data entry field
where a user can enter the image numbers of the set to be matched. Here
are the first lines of the manifest for *The Jew of Malta*:

> A06991-001-b The Famous TRAGEDY OF THE the Church . 1633 . 7\
>  A06991-002-b TO MY VVORTHY FRIEND , none more able to taxe\

That manifest is the input for a script that creates the matching of
text and image in the EarlyPrint text. This first step of creating a
digital combo is a very tedious piece of [data
janitoring](https://www.nytimes.com/2014/08/18/technology/for-big-data-scientists-hurdle-to-insights-is-janitor-work.html).
But once it has been done properly, it makes life much easier for
readers and editors. It is not difficult or time consuming to replace an
image set if another becomes available.