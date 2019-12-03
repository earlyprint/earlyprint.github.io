---
layout: post
title:  "How To Correct Gaps"
date:   2019-10-14 10:00:00 -0500
tags: ep-library
categories: How-To
summary: A detailed look at correcting gaps on the Library site
---

### General observations

A paint job divides into prep, paint, and clean-up. Prep and clean-up
may take more time than the painting. Comparable stages of textual
correction are "find it, fix it, log it". For the many simple
corrections that make up the bulk of textual work, the fixing may be the
work of seconds. The finding and logging take up a lot more time. The
logging in particular is tedious and error-prone work. The goal of the
Annotation Module is to reduce the time cost of 'finding' and relieve
you almost entirely of the task of logging. You must be logged in in
order to use the Annotation Module. You do so by clicking on the login
button at the top right of the menu bar, which is also the place to
register if you have not yet done so. Once you have logged in, the
system knows you by your email address, and it will keep a record of the
who, what, when, and where (in the text) of your transactions.

**What (not) to correct.** From printers' prefaces you learn that quite
often they did not do what they meant to do. In wistful or whimsical
terms they ask for the reader's help. If the goal is to restore the text
the printer meant to print, it does not matter whether the error was the
printer's or the transcriber's. Both need correction. But you need to be
careful and not impose your own sense of proper spellings on the past.
Early modern orthography is notoriously variable and also has rules of
its own. The spelling 'vniuersitie' is a regular spelling in the 16h
century. They wrote 'v' where we now write 'u' and 'u' where we write
'v'. 'Iniurie' and 'periure' are standard spellings. 'J' instead of 'I'
would not be a standard spelling, but neither would it be wrong. It
takes a little while to develop a sense of possible and impossible
spellings in Early Modern texts. That said, attributing 'aſſliction' to
a printer's subversive purpose is probably an exercise of misplaced
ingenuity, and 'fore afraid' can be confidently emended to 'sore
afraid'. Both exemplify the endemic confusion of long 's' and 'f'.

**Error hunting and curation en passant.** There are two correction
scenarios, error hunting and curation en passant. To begin with the
latter, you are reading a text in the EarlyPrint environment and come
across an incorrectly or incompletely transcribed word. Your 'find' cost
is zero. If you decide to fix the error, all you need to do is activate
the Annotation Panel (if it isn’t already open), select the word you
want to fix, and enter your suggestion for the correct reading. You need
to save your suggestion, but as soon as you do that the machine records
the details of your emendation as a separate digital object that targets
the address of the word you are correcting. While the emendation
subsequently shows up in the text as pending or approved, the source
text is not changed until a later stage when approved emendations are
integrated into the source text in a separate procedure.

In the second scenario you go error hunting. You choose a text for the
purpose of fixing all known defects. The different types of known defect
have different markers. If you enter them as search strings, the return
is a list of hits for you to work through. The 'find' cost is close to
zero. If the text is not very long, paging through it and looking for
non-alphabetical symbols may be more convenient.

**Sometimes you don't need an image.** A surprising number of textual
defects can be resolved without reference to a page image. The
correction for ‘sev●rity’ is clearly 'severity', but ‘se●erity’ could be
'seuerity' or 'severity'. If there is an image, it usually takes very
little time to identify the place of a defective word, but if your image
is a double column folio page, it may take a little longer.

### Types of editorial intervention

The **Options** button in the toolbar lets you toggle between two
states: **Enable Annotations** and **Disable Annotations**. Operating
with Annotations enabled is the default setting. The **Annotations**
button to the right of the **Options** button lets you toggle between
opening and closing an Annotation Panel. You can also open an Annotation
Panel by clicking on any word in the text, and close it by clicking one
the close button in the upper right corner of the Annotation Panel. If
you click on a word in the text while annotations are enabled, the
Annotation panel will open with information about that word. You see
something like the following:

![](/assets/img/editview1.png)

The top line gives you the unique address of the word. While you may
ignore it, there is some virtue in recognizing it as a human-readable
identifier that concatenates three data points in a descending
hierarchy: the EEBO-TCP identifier of the text (A00967), the EEBO-TCP
page number (001-b) from which the text was transcribed, and a word
counter that increments by 10. The EEBO-TCP page number nearly always
refers one side of a double-page image, with ‘-a’ and ’-b’ referring to
the left and right side. The word counter increments by 10 to allow for
correction of errors that involve insertions. The word\_id 0330
identifies word 33, something close to the top of the page.

Clicking on any of the four terms in the second row opens a data entry
template for a different operation. **Change**, **split** and **join**
enable different editing operations. **Comment** opens a free-form text
field. The four terms don’t make it quite clear that there is a first
choice between either an editing operation or a free-form comment. If
you don’t choose comment, you will choose among 'edit', 'split' and
'join'.

**Comment.** A comment may be about anything and is not restricted to
editorial activity. It is public by default, but it is visible only to
yourself if you check the "this is a private comment" box. If you
identify a reading as defective but don’t have a solution, it is very
useful to say so. At least you have drawn attention to what is known in
philological jargon as a 'crux', a term derived from the traditional
practice of putting the sign of a cross next to a defective or disputed
reading.

**Change.** If you think you have the solution it will involve one of
three actions, which again turn on a binary choice. The actions stays
within the boundaries of a word or it doesn’t. 'Change' is the term for
any editorial act that does not involve changes in word boundaries.
Emending ‘sev●rity’ to 'severity' is an example of such an emendation.

**Word attributes.** The EarlyPrint text stores information about the
lemma, regularized spelling and part-of-speech of a word in the form of
"attributes". These are displayed in the Annotation Panel, and they are
likely to need adjustment once a spelling has changed. Here is an
example of where the correction of a spelling requires changes in the
lemma and standard spelling:

![](/assets/img/anno_instructions1.png).

The Annotation Panel consists of a sequence of "key:value" pairs, where
the key appears in bold face on the left (**Text**, **Standard**, etc)
and you enter values on the line with greyed-out text above it
(Correction, Regularise, etc.) Notice the words
**MORPHOLOGY(OPTIONAL)**. This is another toggle switch that will
collapse or expand the space for changing a lemma or part of speech. A
lemma is the uninflected or dictionary entry form of a word: 'loved',
'loving', 'loves' share the lemma 'love'. 'Lemma' is an ancient Greek
word, and its plural is 'lemmata'. If you know the proper spelling and
standard spelling of a word, you probably know the lemma as well and
should enter it. Leave the part of speech alone unless you really know
what you are doing.

The standard spelling of a word is not necessarily its modern form. Do
not regularise 'loveth' to 'loves', but regularize 'louyth' to 'loveth',
the standardized form of the archaic third person singular. Do not
expand contracted forms. The second person singular of 'speak' may show
up as 'speakst', "speak'st", or 'speakest'. These are spelling variants
that may express prosodic or rhythmic distinctions. Leave them alone.

**More about standard forms.** The standard spellings have been
generated by a program based on lists. There are quite a few errors. A
modern reader will have little trouble spotting those errors. Correcting
them in one place is very helpful, because more often than not that
correction can lead to the automatic correction of the error in its
other occurrences.

**The special case of 'I'.** The different uses of the spelling 'I' are
very difficult for a machine to disambiguate. A sentence terminal use of
the first person singular (It is I.) may be interpreted by the machine
as a Roman numeral. 'I' is also a very common spelling of the
exclamation 'Ay', and the machine has a lot of trouble with that too.
User corrections may help refine the patterns to which the machine
responds. This is a particularly striking example of a general point: A
hundred corrections by fifty users are likely to point to 500 or even
1000 corrections that can be applied in a completely or semi-automatic
fashion.

### Join, split, and delete operations

Join and split operations involve changes in the word boundaries of the
underlying text. They are more complex than they look on the surface.
Nothing could be simpler in a world of old-fashioned typewriters. If you
recognize that 'thyspels' is two words, adding a space will restore "thy
spels". And removing a space will restore sense to "neeren esse" and
restore 'neerenesse'. But for the complex structure under the hood of
EarlyPrint both operations involve changes in the number of digital
objects. Changing ‘neeren esse’ to 'neereness' involves changing the
content of the first element from 'neeren' to 'nerenesse' and deleting
the second element. The machine has to do even more work when you change
'thyspels' to ‘thy spels’. It must change 'thyspels' to "thy spels" and
create a new element that has its unique ID and explicit place in the
hierarchy of digital objects.

The 'join' and 'split' data entry panels try to make it as intuitive as
possible to execute these changes. You need not understand all the
technical detail, but it helps to understand the logic and sequence of
events in these editorial acts. The human editor also has to work a
little harder and decide on new standard forms and lemmata.

In the join operation, you select two and occasionally three words. You
then click on **join** and enter the new spelling, which may not always
be a combination of the two existing spellings. For instance, in "I was
a raid" the missing 'f' may have been too faint for the transcriber to
see. That is a fairly common scenario.

In a split operation you enter split spellings as the value for
**Text**, e.g. 'thy spels'.The machine interprets this as the
instruction to change the current token to 'thy' and insert the new
token 'spels'. Then you need to fill in the Lemma and Standard values
for the first and the second word.

Two cases of split operations deserve special comment. A black dot at
the end of a word is quite often a punctuation mark that the transcriber
mistook for a letter. In linguistically annotated texts, punctuation
marks are treated as distinct tokens rather than suffixes of words. The
exception is the dot that identifies a character string as an
abbreviation. If 'end●' needs to be emended to 'end.' at the end of a
sentence, you should split it into 'end' and '.'. On the other hand, if
you run into 'Mat● 26' and the correct reading is 'Mat. 26', 'Mat.' will
be an abbreviation for 'Matthew', and the emendation is a change rather
than a split.

The second case involves a missing word in the transcription. If the
text reads "WHen this eternall substance my soule" and the page image
shows the missing 'of', you need to insert rather than split something.
But you can treat treat the case as if it were a matter of splitting
'substanceof'. So you enter "substance of" as value of **Text** and add
the **Lemma** and **Standard** values for 'substance' and 'of'.

**Delete**. The bottom of the Annotation Panel there is a red **DELETE
WORD** button. Delete operations will be quite rare. The most common
case involves punctuation marks. The transcribers had a special symbols
for saying "there is a punctuation mark here, but I don't know which".
In our texts that symbol appears as a little black square. About one in
ten of these black dots represents nothing at all.

### Other edit operations

The great majority of defective readings can be managed by modeling them
as 'change', 'join' or 'split' operations. The Annotation Module is not
equipped to handle textual gaps or lacunae that run to three or more
words, whole lines, or paragraphs. For a passage on the scale of a
tweet, it will be helpful if you enter a transcription in the comment
and let the editors do the rest. For longer lacunae, describe its nature
in a comment, e.g. "a page is missing here."

There will be cases where the transcription says that a word is missing,
but the image reveals that it is a longer chunk. If you select the
missing word symbol (⟨◇⟩ ) and add the comment "five words are missing
here" the message received by the editors is more complex and says "User
X reports that at position Y the text reports one missing word, but five
words are missing." That is helpful information. If you feel confident
with transcribing the five words that is even more helpful.

### Who decides to accept your emendations?

At the moment the editors of the project have approval power, and the
editors may extend that privilege to others. If you are an active
contributor and most of your emendations are accepted, it is in our
interest to give you approval privileges to share the burden. The
[translation of the *Suda*](http://www.stoa.org/sol), a 10th Greek
encyclopaedia, has been a very successful collaborative project based on
trust and a quite flexible management of user privileges. We would like
follow their model and attract a broadly-based group of users who can
help with the business of correction and review.

Occasionally textual problems are "philologically exquisite", as Michael
Witmore put it in conversation. We may never know for sure whether
Othello referred to an 'Indian' or a 'Iudean' in his final speech. Was
it Anna’s or Aeneas’s tears that flowed when his mind remained unmoved?
But much of the time textual defects are not very interesting in
themselves, have simple solutions, and the judgement of right or wrong
approaches the certainty of death and taxes. This is especially true of
the incorrect or incomplete transcriptions that bedevil part of the TCP
corpus. They usually are not hard to fix, but there are a lot of them.
