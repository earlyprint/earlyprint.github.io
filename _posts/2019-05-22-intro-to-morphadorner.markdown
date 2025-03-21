---
layout: post
title:  "Introduction to MorphAdorner"
date:   2019-05-22 09:28:16 -0500
author: Meredith Kelling and Steve Pentecost
tags: EpLibIntros morphadorner nupos
summary: A description of MorphAdorner, a natural language processing package which was developed at Northwestern University and which powers EarlyPrint
categories: Intros
---

Search and analysis of the Early Print Library depends on a software package called **MorphAdorner,** developed by Phil Burns at Northwestern University during the mid 2000s. MorphAdorner tokenizes text, regularizes the spelling of each word, lemmatizes it, assesses its syntax and assigns it a part of speech tag. MorphAdorner was developed by scholars at Northwestern to meet the more specific purposes of processing a corpus such as EEBO-TCP, for which users are more likely to be scholars in the humanities with a range of tasks that include literary analysis and undergraduate- or graduate-level pedagogy.<a href="#note1" id="note1ref"><sup style="font-size:1em;font-weight:bold;">1</sup> MorphAdorner identifies its goals apart from other natural language processing tools:

>We use the term "adornment" in preference to terms such as "annotation" or "tagging" which carry too many alternative and confusing meanings. Adornment harkens back to the medieval sense of manuscript adornment or illumination -- attaching pictures and marginal comments to texts.

### Natural Language Processing

In order to understand what MorphAdorner does, it is worth detailing the basic challenges and scope of natural language processing, by which machines are able to "read" textual data for a variety of interpretive purposes. For a computer program, text often begins as a string of characters that includes features such as whitespace and punctuation; a computer program that reads or produces textual data does not “naturally” observe the distinctions that humans make between such items as words, sentences, and paragraphs. Thus the following two lines of verse:

>I sing of May-poles, Hock-carts, Wassails, Wakes,  
>Of Bride-grooms, Brides, and of their Bridall-cakes.

are represented by a computer as one continuous string of data that includes the spaces between words, the punctuation, and the line breaks. Space and punctuation alone are not infallible markers of word or sentence boundaries; they are at best the most rudimentary sign of distinctions between words and sentences with key exceptions in both Early Modern and contemporary usages of English.

### Tokenization

The process of text tokenization is one in which a text is split into discrete "tokens" for the purposes of establishing, within a given machine reading software program, the existence of language features, such as words. The simplest approach to tokenization is to split a text string into tokens along its whitespace sequences, in order to create a series of tokens that are, for the most part, what human readers will identify as words; a simple string of text such as: "I sing of May-poles" would split the string on the whitespace to produce four new strings, or tokens: "I", "sing", "of", and "May-poles". It is because these words within a text string are now counted as discrete elements that tokenization makes a corpus more manageable for machine reading, corpus searching, and various counting and other analytical procedures that one might want to do, especially over a larger corpus. It is, for example, only through word tokenization that one is able to unambiguously search a corpus for distinct words.

### Markup

These capabilities are augmented through the use of a markup language, which allows for the encoding of long, unwieldy strings of text with annotation to build a taxonomy of a text’s given parts. Markup languages affix tags to various textual features, which in turn can facilitate different kinds of search, analysis, and displays of digitized text. XML (Extensible Markup Language) is a general-purpose markup standard, and the [Text Encoding Initiative (TEI)](https://tei-c.org/) provides guidelines for marking up humanities-oriented texts in XML. The TEI provides a vocabulary for tagging common document structures to identify title pages, chapters, paragraphs, etc. It provides optional mechanisms for linguistic annotation. The TEI encourages a common approach to marking up documents where possible, and also provides support for documented customization.

Linguistic markup in TEI-XML can apply individual tags to word- and punctuation-level structures, and these tags can themselves be annotated with attributes that associate the word with particular linguistic categories or offer alternate versions of the word. MorphAdorner’s primary function is to annotate text in this way. In particular, MorphAdorner has been designed to mark up Early Modern English texts to annotate variant spellings with regularized forms, and also to identify root forms of words that vary in expression for grammatical reasons. Some common examples of Early Modern word spellings regularized for modern readers include “loue,” which regularizes to “love” and “bee” to “be.” MorphAdorner also regularizes capitalization, such that a “The” which begins a sentence is counted the same as a “the” in lowercase type.

At this juncture, it is important to point out that the matters of how to tokenize, tag, and annotate a digital text are often heavily debated. The MorphAdorned XML represents a tokenization of the text, with each token annotated by part of speech, lemma (dictionary headword), and in some cases a regularized version of spelling.

### Sentence Boundaries

As a first step, MorphAdorner uses a number of heuristics to identify sentence boundaries in a text. In the simplest common case, a period ends a sentence and a capital letter begins a new sentence. But of course not every capital letter begins a sentence, and not every period ends one. MorphAdorner includes a curated list of early modern abbreviations along with some generic rules to try to identify unknown abbreviations. It also makes some preliminary guesses at parts of speech in order to try to ensure that each sentence has a verb, and in order to consider the possibility that a capital letter might be attributable to a proper noun rather than the beginning of a sentence.

As MorphAdorner splits the text into sentences, it also makes use of spacing, punctuation, and other patterns to identify tokens. Then it iterates over each sentence and assigns parts of speech to each word. This is an involved process that draws on prior hand-annotated training data to take into account early modern word frequencies, spelling variations, and local patterns of succession in neighboring parts of speech, among other things.

### Word Boundaries 

There are complexities and adjustments that cross layers of analysis along the way. It turns out that we often don’t want to simply interpret every space as a word divider, especially in a heterogenous corpus of early modern English. Just as we can see “have” and “haue” as two different spellings of the same word, why not also recognize “tomorrow” and “to morrow” as essentially variant spellings of the same word, rather than three unrelated words, two of them happening to be neighbors in a particular context?

Perhaps even more interestingly, what we now know as reflexive pronouns (“myself,” “themselves”) have common early modern orthographic variants (“my self”, “them selues”). It’s not just tokenization and orthography that get mixed up here; arguably one might want to be open to a historical analysis of the grammar that would allow for both two-word and one-word part of speech analysis. For now, for the sake of a plausible degree of consistency and intelligibility, the MorphAdorned XML tokenizes, regularizes, and annotates these as if they were functionally single-word reflexive pronouns. The original spelling with a space is preserved, so someone interested in the phenomenon could make use of the XML’s consistent regularization to study it.

Like spaces, apostrophes don’t have a singular interpretation when tokenizing and analyzing words. An apostrophe can appear within a word as a kind of orthographic variant marking an elided letter, perhaps as a hint at pronunciation, as in “heau’nly” or “admir’d” or “liv’st.” But an apostrophe can also mark an elision in the contraction of two words, such as “th’one” or “th’uttermost.” And in practice apostrophes can be apparently misplaced, appearing as in “thi’nclination,” or might not appear at all, as in apostrophe-less contractions of “thone” for “the one.”

Hyphens are also not unambiguous. The original TCP transcriptions did not observe all line breaks, but did record end-of-line hyphenation. MorphAdorner does try to silently remove these hyphens when they seem to have no function except at the line break, based on evidence of the frequency of corresponding unhyphenated tokens in other parts of the corpus. Plenty of hyphens should be preserved, as in “lambe-like” or “all-seeing.” Yet hyphens also appear as orthographic variants and can affect assumptions about tokenization. For example, one can find instances of “common wealth,” “common-wealth,” and “commonwealth.” The primary transcription in XML keeps faithful track of these differences, but analytic annotations offer an opportunity to relate these to each other as variant forms of, arguably, a single word.

While NUPOS has improved significantly, certain tagging challenges persist, such as the ‘zz’ unparseable tokens (which occur when the system cannot determine a word’s part of speech) and ambiguous noun-genitive forms (e.g., ‘Errours’ mistakenly tagged as a plural noun instead of a genitive noun). Ongoing efforts are being made to refine these cases. The MorphAdorned XML is subject to improvement; it’s not perfectly consistent, but it is a major step toward a consistent, curated, machine-assisted analysis of a major corpus of early modern printed English text. 

### Line Breaks, Form, and Content

The reproduction of a text and the choices that are made as to how to break up strings of data into tokens, how to tag such tokens, and how to reproduce the text for digital readers with options for spelling are also matters that center on the question of what counts as textual "content" and what counts as textual "form," a distinction that is almost always roughly made. As a result, various approaches to natural language processing exist to meet a variety of needs. Tools that use natural language processing range from the automated reading and scoring of textual work, text mining, deep learning linguistic processing, foreign language aid and translation, the retrieval and extraction of qualitative data, and the processing of recorded speech; natural language processing is central to the management of textual data on the whole.

### MorphAdorner and Its Tagset

MorphAdorner is explicitly committed to the preservation of the original text (via TEI standards) in XML, while also tagging each word in a corpus with several other useful attributes for work in corpus linguistics: standard spellings, parts of speech, and lemmata. Additionally, speech tagging as developed for MorphAdorner is far more intricate than that used by most natural language processing tools, which are often built using the Penn Treebank Part of Speech tagging system of [42 distinct grammatical parts of speech and punctuation](https://www.eecis.udel.edu/~vijay/cis889/ie/pos-set.pdf). MorphAdorner uses its own system,  "NUPOS" (Northwestern University Part of Speech tagset, developed by Martin Mueller and adapted from the CLAWS tagsets developed at Lancaster University). NUPOS  taxonomizes words into seventeen major word classes, then into thirty four word classes, and finally divides words into about 150 English parts of speech, each of which is housed in one word class. This system allows for much more granular analysis of a text's linguistic features through processes such as grouping, sorting, and counting words. The origins and principles of NUPOS are well documented in MorphAdorner's [documentation](http://morphadorner.northwestern.edu/morphadorner/documentation/nupos/), with a much larger number of parts of speech than currently used in EarlyPrint. The current NUPOS parts of speech are available at the [NUPOS Tag Set](/intros/nupos_tag_set.html).

The XML notation makes it relatively easy to distinguish between the original text and the annotations the MorphAdorner has chosen to encode. Here, Herrick’s “Bride-grooms” is thusly tagged:


```
        <w lemma="bridegroom" pos="n2" reg="Bridegrooms">Bride-grooms</w>
```


...where the `<w>` and `</w>` are XML tags that wrap the word and attendant annotations, “lemma” is the lemma form, “pos” is the part of speech (plural noun), and “reg” indicates the regularized spelling of the word, respectively. Here, a reader can see that preordained choices are being made on the matter of regularization.

### Adorned XML

MorphAdorner reads XML texts and tokenizes according to sentence and word boundaries (so, splitting on whitespace and punctuation), and produces a new XML file that adorns each word/token with five attributes: the lemma, or dictionary headword and word class; the part of speech according to the NUPOS schema; the "token spelling," or the spelling as it appears in the original digitized text; the "standard original spelling," or a version of the spelling in which typographical conventions of earlier digitization processes are normalized (this is the spelling that most often and most closely resembles the spelling on the physical page or digitized scan); and the "standard modern spelling" that regularizes the word according to modern orthographical standards. It is easy enough to imagine that the XML documents produced via MorphAdorner processing are extremely long compared to the original digitized texts. Each word, wrapped in the <w> tag, contains the five tags that provide the information outlined above, in addition to the information marked in the original XML file, such as line break and italicization: 

```
      <l xml:id="A43441-e930">
       <w lemma="i" pos="pns">I</w>
       <w lemma="sing" pos="vvb">sing</w>
       <w lemma="of" pos="acp">of</w>
       <hi>
        <w lemma="maypole" pos="n2" reg="Maypoles">May-poles</w>
        <pc>,</pc>
        <w lemma="hock-cart" pos="n2">Hock-carts</w>
        <pc>,</pc>
        <w lemma="wassail" pos="n2">Wassails</w>
        <pc>,</pc>
        <w lemma="wake" pos="n2">Wakes</w>
        <pc>,</pc>
       </hi>
      </l>
      <l>
       <w lemma="of" pos="acp">Of</w>
       <hi>
        <w lemma="bridegroom" pos="n2" reg="Bridegrooms">Bride-grooms</w>
        <pc>,</pc>
        <w lemma="bride" pos="n2">Brides</w>
       </hi>
       <pc rendition="#follows-hi">,</pc>
       <w lemma="and" pos="cc">and</w>
       <w lemma="of" pos="acp">of</w>
       <w lemma="their" pos="po">their</w>
       <w lemma="bridall-cake" pos="n2" rendition="#hi">Bridall-cakes</w>
       <pc unit="sentence">.</pc>
      </l>
```

At first glance it seems a dense script for the human eye to read, but after a moment, one can more readily identify each word's original token spelling, and then the accompanying tags—bountiful adornments that make it possible for Early Print to execute its various search operations and to return results that provide immediately useful bibliographic information and key words in context as lemmata or regularized and original spellings of words.

<a id="note1" href="#note1ref"><sup style="font-size:1em;font-weight:bold;">1</sup></a>MorphAdorner’s website includes [extensive documentation on the use of the tools as well as the history of their development](http://morphadorner.northwestern.edu/morphadorner/).
