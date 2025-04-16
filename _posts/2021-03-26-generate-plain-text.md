---
layout: post
title: "Generate plain text from EarlyPrint XML with XSLT"
author: Douglas Knox
tags: [ep-lab]
summary: The EarlyPrint project offers an XSLT script to extract plain text from EarlyPrint XML. 
categories: How-To
---

The EarlyPrint project offers an <a href="/assets/xsl/plaintext_from_epxml.xsl" download>XSLT script</a> to extract plain text from EarlyPrint XML. One can use Python to work with XML files, but at the scale of all the EarlyPrint files it can be slow to process everything. XSLT is a programming language in which the programs are XML files that transform other XML files. You won't need to learn XSLT to run the script, although if you know or want to learn some XSLT you could adapt it for your own purposes.

To run the script, you will need to be somewhat comfortable navigating the [command line](https://programminghistorian.org/en/lessons/intro-to-bash) in the terminal or console, and will need to get a [Java Runtime Environment](https://openjdk.java.net/install/) if you don't have Java already on your system. You will also need a local copy of the [EarlyPrint XML](https://bitbucket.org/eads004/eebotcp/) repository. And, of course, you'll need to download a copy of the [XSLT script](/assets/xsl/plaintext_from_epxml.xsl).

We recommend using the Java-based [Saxon](https://www.saxonica.com/download/java.xml) engine to run XSLT. You can download a recent version of the Saxon-HE edition for free.

To run the XSLT script, you will need to give it a command-line parameter, `sourcedirectory`, with the path to the `text` folder of your local copy of the EarlyPrint repository. You can also give it an optional `outputdirectory` path. The default is the current directory whereever you are when you run the script. Another optional parameter, `spelling`, determines what kind of plain text the script extracts. The default is `spelling=w`, which extracts the text node from each `<w>` element, which is generally the original spelling with a few modernizations. Other options are `reg`, which extracts a regularized spelling, `lemma`, which extracts dictionary headwords, and `orig`, which is mostly the same as `w`, except that it undoes any EarlyPrint modernizations of `w` content and uses the `@orig` attribute where available. This would be closest to the editorial policy of the original TCP XML files.

If the source files are at `/data/corpora/eebotcp/texts/`, for example, and the XSLT file `plaintext_from_epxml.xsl` and the Saxon file `saxon-he-10.3.jar` are in the current directory, and we want to create regularized plaintext in a subdirectory called `plaintext_reg`, we can run this:

`java -Xmx8G -cp saxon-he-10.3.jar net.sf.saxon.Transform -xsl:plaintext_from_epxml.xsl -s:plaintext_from_epxml.xsl sourcedirectory=/data/corpora/eebotcp/texts outputdirectory=plaintext_reg spelling=reg`

The `-Xmx8G` parameter allows Java to use up to 8 GB of memory. If you have more memory and get an out-of-memory error on a large file, you can set it higher. It may be convenient to adjust input and output paths, put the Saxon JAR file elsewhere, and hide all the details in a short shell script that suits your own environment and purposes.


