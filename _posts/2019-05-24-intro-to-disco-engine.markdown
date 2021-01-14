---
layout: post
title:  "Introduction to the Discovery Engine"
date:   2020-09-01 10:00:00 -0500
author: Alireza Taheri Araghi et al.
tags: [ep-lab, eebo-tcp]
summary: An introduction to the Discovery Engine, which allows you to probe similarities between texts in the EEBO-TCP corpus
categories: How-To
---

Let’s say you are interested in _The Shepheardes Calender_ and you are wondering whether there are other early modern English texts similar to Spenser’s odd, but not entirely idiosyncratic work. Scholars of Spenser, of the history of pastoral, and of Elizabethan literary culture have unearthed a dozen or so sources and perhaps a couple of dozen analogues, but might that list be supplemented? Might one uncover unexpected similarities in texts scattered across a corpus of early printed books that contains more than 60,000 texts, many of them unfamiliar and under-investigated?

There are many methods used for calculating (textual) similarity and document clustering (Euclidean distance, TF-IDF, cosine, and topic modeling, to name a few). To calculate distances from a user-selected reference text the Disco Engine selects three: 1) TF-IDF, 2) topic-modelling, and 3) a new similarity metric based on the formatting tags embedded in the XML encoding of the TCP corpus. The outcome of the query comes as four lists, the latter three based on the metrics just mentioned and the first a combined metric that merges those three accorded to a fixed weighting.

## How does it work?

For the sake of consistency, we will use Spenser’s _The Shepheardes Calender_ as our reference text. If you type “Spenser” and “Calender” in the _Author_ and_ Title_ fields respectively, and click the “Find ID!” button, you will be given only one result: _The Shepheardes Calender_. You will notice that each item of the search result (here only one) begins with an ID, in this case “A12782”. This is the TCP ID specific to _The Shepheardes Calender_. To find similarities, you can enter “A12782” into the “TCP ID” field and hit the “Find Texts!” button. Alternatively, you can simply click on the ID. This will generate four lists of similar texts: the first is a list assembled based on aggregated similarity scores, the remaining three lists produced by each of the three constituent similarity metrics. (You can control the length of the lists we output by adjusting the first slider, “n results.” The number of results defaults to 50 for each search, but n can be lowered to 1 or increased to 100.) Each item in the four lists is preceded by a plus/minus sign. Clicking on that sign will expose weighting information for the aggregated similarity metrics; for the constituent similarity metrics, clicking on the +/- sign will expose a plot of the chief words on which the similarity score is based.

## TF-IDF Results

TF-IDF stands for _term frequency-inverse document frequency_. It is a statistical measure often used to determine how important a word is to a particular document within a corpus. The TF-IDF value for a word increases proportionally to the frequency of the word in the document (TF), but is lowered by the number of documents it appears in (IDF). When we search for TF-IDF _similarity_, we are seeking convergences between the TF-IDF for _all_ the words in the reference text and those in potential target texts.[^1] The first entry for a similarity search is always a trivial one: in our example, the text with the highest similarity score is _The Shepheardes Calender_ itself with the TF-IDF similarity of 1.000. The less trivial second-ranked text is Spenser’s _Colin Clouts Come Home Againe_ with a TF-IDF similarity measure of 0.423.

As mentioned above, next to each item on the Disco Engine results list is a plus/minus sign. Clicking on it will reveal more information on the words upon which the text was scored. Opening the second result on the TF-IDF list, for instance, will reveal a scatter plot. The X (horizontal) axis corresponds to the TF-IDF values of words in the _reference_ text (the text we are looking to find similars for) and the Y (vertical) axis plots the values for the text being compared (here, _Colin Clouts Come Home Againe_, with the TCP ID of A12773).

The plot displays those words that have been the basis of the similarity between the two documents. Each word is represented by a green dot. Hovering the mouse over the dot will reveal the corresponding word and its TF-IDF scores in both documents (in other words, the values on the X and Y axes).

A diagonal divides the plot area into two sections. Words sitting below the diagonal score higher in the reference text (_The Shepheardes Calender_ in our example) and words above the diagonal have a higher TF-IDF score in the document being compared (here, _Colin Clouts Come Home Againe_). Words located closer to the diagonal, have closer TF-IDF values in both texts. This means that the words further from the origin (and closer to the diagonal) have a larger share in driving the similarity score. In our example, “Colin,” the name of Spenser’s pastoral persona, has the largest TF-IDF score in both texts: 0.275 in A12782 and 0.352 in A12773.

## LDA (Mallet) Results

For its second similarity measure, the Disco Engine uses topic modelling, a statistical model used for document classification, extracting information, and analysing large textual corpora. We use Latent Dirichlet Allocation (LDA) one of the most popular topic models now in use. (The Disco Engine implements LDA by means of [MALLET](http://mallet.cs.umass.edu/), “a Java-based package for statistical natural language processing” from University of Massachusetts Amherst.) For a very useful introduction to topic modeling, see [Scott Weingart’s excellent blog-tutorial](http://www.scottbot.net/HIAL/index.html@p=19113.html).[^2]

As with the TF-IDF, each LDA result can be expanded to reveal a scatter plot that shows how different topics score in both documents. Consider the second result on the LDA list, William Browne’s _The shepheards pipe_: by mousing over the scatter plot, we will find that topics 93 and 21 distinguish themselves from the others with highest LDA similarity scores. For instance, topic 21, which includes the words _mind_,_ still, love, grace, bear, foe, heart, hart, tell, seek,_ and _begin_, scores 0.244 in the reference text and 0.231 in the text being compared, which is to say that—once we remove non-distinctive words, so-called “stop words”—the words allocated to topic 21 constitute nearly the same proportion of the total collection of words in each text, just shy of a quarter of the distinctive words in each text. The pop-up windows in the plot list the words related to each topic.

## Tag Scores

The previous two scores (TF-IDF and LDA) treat the texts being compared as “bags of words”: they ignore word order and sentence structure entirely. They also ignore the format of the printed text, as well as such structural features as line and paragraph breaks, most of which are recorded as tags in the XML files in which the TCP tags are encoded. Hypothesizing that such structural features might be richly signifying, we compare the frequency of structural tags in the reference text with those of other texts in the corpus. However, just as we don’t assess word sequence in the other similarity scores, we don’t assess tag-sequence in this one: we treat the XML document as a “bag of tags.”

By clicking on the plus/minus sign by each search result, the user can see the chart that plots the tags driving the tag similarity scores. In our example, the text A02249 (Pierre Gringore’s [_The Castle of Labor_]) is structurally closest to _The Shepheardes Calender_ with a score of 0.990. By mousing over the green dots on the scatter plot point furthest from plot origin, we can see that the “l” (“new line”) tag drives the similarity far more than the other tags in the document (“p”, “lg”, and “pb”).

We feel it is pertinent expand a bit more on our tag scores here and how to possibly (not) interpret them. While the TF-IDF and LDA scores point to similarities more intuitively clear—for instance the resemblance of two pastoral poems—the tag scores cluster a reference text with others that may be thematically different or even unrelated. We should also emphasize the caveat that because of our bag-of-tags approach, the tag similarity scores do not account for the sequential distribution of tags in texts. To illustrate this, it may be helpful to compare the distribution of each of these three scores (Images 1, 2 and 3). It is worth noting that the TF-IDF and LDA graphs define similar curves much different than the tag-scores graph. While a hypothetical TF-IDF or LDA score even as low as 0.4 would mean a rather small (more accurate?) bundle of similar texts (which translates to “the higher the score, the more similar the texts”), tag scores cluster texts in the opposite directions: they tend to skew closer to 1.0—i.e., to identical; our hypothesis is that there is much less variation between texts structurally than there is lexically and topically. Although we keep a wary eye on the tag scores, we wonder it they make us think more critically about what we mean when we talk about similarity between two texts. If two texts differ on the syntactic and lexical level, do they still manifest some kind of kinship if they are structured in similar ways?

![Distribution of TF-IDF scores](/assets/img/discograph3.png "Distribution of TF-IDF scores")

![Distribution of LDA scores](/assets/img/discograph1.png "Distribution of LDA scores")

![Distribution of tag scores](/assets/img/discograph2.png "Distribution of tag scores")


<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]:
     For more on TF-IDF, see [Matt Lavin’s Programming Historian tutorial](https://programminghistorian.org/en/lessons/analyzing-documents-with-tfidf#tf-idf-definition-and-background) on the subject, especially the section on “Definition and Background.”

[^2]:
     LDA, and topic modeling in general, are “stochastic” methods that do not produce the same results each time an identical process is run. For more mathematical detail on topic modeling and why we are not concerned about stochasticity for the purposes of the Disco Engine, see two pieces that Weingart links to: Ted Underwood’s “[Topic Modeling Made Just Simple Enough](https://tedunderwood.com/2012/04/07/topic-modeling-made-just-simple-enough/),” and David Blei’s “[Probabilistic Topic Models](http://www.cs.columbia.edu/~blei/papers/Blei2012.pdf).”
