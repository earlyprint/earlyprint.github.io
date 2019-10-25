---
layout: post
title:  "Introduction to the N-gram Browser"
date:   2014-10-20 10:00:00 -0500
author: Anupam Basu
tags: ep-lab
summary: An introduction to the N-gram Browser
categories: Intros
---

## Why N-grams?

N-grams are contiguous sequences of tokens extracted from text where ‘N’
denotes the number of tokens. In the most common instance, tokens are
words (although for some applications such as automated spelling
corrections, individual letters can also serve as tokens) and thus
n-grams denote short sequences of words extracted from sentences.
Unigrams (or 1-grams) are the most basic n-grams and represent single
words but bi-grams, tri-grams and higher order n-grams can consist of
sequences of two, three or more words. As an example, if our sentence is
“The quality of mercy is not strained” we can extract the following
n-grams from it (after a bit of pre-processing to turn words into
lowercase):

    1-grams: ['the', 'quality', 'of', 'mercy', 'is', 'not', 
                'strained']
    2-grams: ['the quality', 'quality of', 'of mercy', 
                'mercy is', 'is not', 'not strained']
    3-grams: ['the quality of', 'quality of mercy', 
                'of mercy is', 'mercy is not', 'is not strained']

When extracted from a large corpus of texts, n-gram frequencies can be
invaluable for constructing probabilistic models of language and are
widely used in computational natural language processing and corpus
linguistics. As such, a large scale n-gram database is the basic
building block for the computational analysis of EEBO-TCP’s vast
archive. Even at the simple level of relative frequencies plotted over
time, n-grams can help us explore a wide range of research questions
ranging from the dissipation of literary influence, the evolution of
style and genre, to the gradual standardization of orthography within
quantitative frameworks and at scales not possible before. We hope that
these n-gram databases will help us answer and, more importantly, frame
new perspectives and questions drawing on a vast body of early English
print.
