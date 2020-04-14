---
layout: post
title:  "Creating and Improving the EarlyPrint Metadata"
date:   2020-04-03
author: John R. Ladd
tags: tcp metadata XML
summary: An overview of improvements to the EP Metadata
categories: Posts
---

*This is the first post in a series on the EarlyPrint metadata, a separately-maintained resource which can be found in [this Github repository](https://github.com/earlyprint/epmetadata). Future posts in this series will address ways of using metadata to ask and answer questions about early modern print.*

At *EarlyPrint*, our data consist of XML transcripts of early modern printed books. These data have proven immensely useful for [exploring and understanding the early print record and the history of language](https://earlyprint.org/lab/). But in many instances, it's difficult to make sense of these data without additional information that *describes* the data. In this case, that includes information about the books themselves: their titles, dates of publication, authors, printers, ID numbers, subject headings, and more. Change in language over time, for example, is difficult to track unless you have information about *when* a word or text was printed.

This type of data---data that describes or supplements another dataset---is called **metadata**. For *EarlyPrint*, metadata is a crucial part of our ability to make sense of the text corpus. We've taken a lot of care to manage our metadata well, so that we might describe and track our text corpus as precisely as possible.

## Creating Stand-Alone Metadata

One of many benefits of XML is the ease with which metadata can be included in a document alongside text data. All of the [EEBO-TCP](https://earlyprint.org/intros/intro-to-eebo-tcp.html) XML documents include an extensive *header* that contains relevant metadata for that document. This is true of *EarlyPrint* documents as well, since they are derivations of EEBO-TCP documents.

The XML headers are still present in *EarlyPrint* documents, but we have a number of improvements we'd like to make to our metadata (explanations of the first two are below). These improvements require experimentation and iteration. Therefore it seemed prudent to separate the metadata into stand-alone files which could be gradually altered and, eventually, perhaps reincorporated into the main XML files.

To accomplish this, we created a Github repository at <https://github.com/earlyprint/epmetadata>, and filled it with new XML files, one for each text in the *EarlyPrint* corpus. These new "sourcemeta" files include just one small slice of the *EarlyPrint* metadata headers: everything that was in the bibliographic information tag, `<biblFull>`. This means that each metadata file contains basic bibliographic metadata: a text's title, author, publication information, and date, as well as its extent (or length in pages) and any notes that a cataloger may have added. Here's an example of the stand-alone metadata file for *EarlyPrint* text A00001:

```
<?xml-model href="../schema/sourceDesc_fragment.rnc" type="application/relax-ng-compact-syntax"?>
<sourceDesc xmlns="http://www.tei-c.org/ns/1.0">
   <biblFull>
      <titleStmt>
         <title>[The passoinate [sic] morrice]</title>
         <author>A., fl. 1593.</author>
      </titleStmt>
      <extent>[68] p.   </extent>
      <publicationStmt>
         <publisher>Imprinted by R. Bourne? for Richard Jones,</publisher>
         <pubPlace>[London :</pubPlace>
         <date>1593]</date>
      </publicationStmt>
      <notesStmt>
         <note>Title from caption on leaf B1r; imprint from STC.</note>
         <note>Author's preface signed: A.</note>
         <note>Continues the text of STC 23867.5: Tell-trothes new-yeares gift beeing Robin Good-fellowes newes.</note>
         <note>Running title reads: The passionate morrice.</note>
         <note>Signatures: A²  B-I⁴.</note>
         <note>Imperfect; lacks title page.</note>
         <note>Reproduction of the original in the Peterborough Cathedral. Library.</note>
      </notesStmt>
   </biblFull>
</sourceDesc>
```

Separating these headers into stand-alone files gave us a simplified set of metadata, a base upon which we could make improvements. 

And you may already spot some of the things we set out to improve. In the `<publicationStmt>` above, the text for publication information appears as it did on the printed title page, with additions of questions marks and bracketed information from the catalogers. This information is very useful and easily readable by a human. But it could be difficult for a computer to process correctly. The date, for example, includes a stray bracket, and the publisher information doesn't label the printer and publisher as separate entities. In order to make this metadata as useful as it could be, we had to devise ways of cleaning and improving this information.

## Dates

Luckily, many of the dates in the *EarlyPrint* metadata are as straightforward as the one above. They include a four-digit year with one or more extra characters. Using [regular expressions](https://programminghistorian.org/en/lessons/understanding-regular-expressions#the-general-idea-of-regular-expressions), a programmatic way of defining text patterns, we were able to strip out everything but the four-digit year, so that "1593]" becomes "1593". (And there are more complex examples than a simple trailing bracket, such as reducing "1.5.5.0" to "1550.")

We chose not to replace the data silently. One advantage of XML is its ability to contain records about information in attributes. So instead we left the text of the date exactly as it was, while adding a `when` attribute that expresses the year as a four-digit number. (This attribute follows [TEI Guidelines](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/index.html), as do all the adjustments mentioned in this post.) The XML element for the date above now looks like this:

```
<date when="1593">1593]</date>
```

Both the original date and the "cleaned" one are easily accessible.

There are a few other particulars. Sometimes cataloguers inserted a question mark to indicate their uncertainty about a specific date. In those cases, we removed the question marks for the `when` attribute, but we added a `cert="low"` attribute to keep track of the uncertainty.

A number of date fields also include a hyphen or slash to indicate a potential date range, as in this invented example:

```
<date>1550-1560</date>
```

In these cases, we use `notBefore` and `notAfter` attributes instead of `when`. The adjusted date would look like:

```
<date notBefore="1550" notAfter="1560">1550-1560</date>
```

Just as in the previous example, we preserve the original text while adding attributes that provide machine-readable dates. As with other adjustments we've made and hope to make with the metadata, this is a starting point for further work on the dates, with a flexible XML schema designed to allow for certain kinds of uncertainty.

## Printers, Publishers, and Booksellers

We've also added markup for information about the people who made the original physical books. In our metadata, in addition to the `<date>` element, there is a `<publisher>` element that includes the imprint, or a statement about the printers, publishers, booksellers, and others who made and distributed the book.

Here's the `<publisher>` element from our example text, `A00001`:


```
<publisher>Imprinted by R. Bourne? for Richard Jones,</publisher>
```

To an informed reader, this bit of text provides a fair bit of information. In many early modern imprint statements, "printed [or imprinted] by" is usually followed by the printer's name, while "for" or "printed for" is usually followed by the publisher's name. There are other conventions as well: if the imprint includes a bookseller's name, it usually follows the words "sold by," and sometimes the location where the book was sold is listed following "at."

All of these conventions create structure in imprint statements, and we were able to take advantage of this structure and write a regular expression that determines where a name appears in the statement and what kind of name it is. We ran a Python script that includes this regular expression across all 60,000+ metadata records, and it turned the above `<publisher>` element into this:

```
<publisher>Imprinted by <persName type="printer">R. Bourne?</persName> for <persName type="publisher">Richard Jones</persName>,</publisher>
```

We use the `<persName>` tag to indicate that something is the name of a person and `<placeName>` for the name of the place. A simple `type` attribute lets us label a person's name with their role or occupation. In this way, we can retain the original imprint as printed while making particular parts of the statement (e.g. the names of all the printers) retrievable.

Just the above addition adds a lot of value to the metadata already available, but we wanted to leave the opportunity for adding more information about these people in the future. Perhaps we'd want to include a first name for "R. Bourne" or link "Richard Jones" to an external authority (so we know he is the same "Richard Jones" mentioned somewhere else). In order to leave room for the addition of more information later on, we also separate these names out into `<listPerson>` and `<listPlace>` elements. The list for `A00001` looks like this:

```
<listPerson>
  <person type="publisher">
    <persName>Richard Jones</persName>
  </person>
  <person type="printer">
    <persName>R. Bourne?</persName>
  </person>
</listPerson>
```

This list doesn't include any new information yet, but it leaves space for standardized spellings, birth and death dates, unique identifiers, and other information we may want to add.

## Putting It All Together

After parsing the dates and the imprints separately, we merged all of the changes back into the stand-alone metadata files. The metadata for `A00001` now looks like this:

```

<?xml-model href="../schema/sourceDesc_fragment.rnc" type="application/relax-ng-compact-syntax"?>
<sourceDesc xmlns="http://www.tei-c.org/ns/1.0">
  <biblFull>
    <titleStmt>
      <title>[The passoinate [sic] morrice]</title>
      <author>A., fl. 1593.</author>
    </titleStmt>
    <extent>[68] p.   </extent>
    <publicationStmt>
      <publisher>Imprinted by <persName type="printer">R. Bourne?</persName> for <persName type="publisher">Richard Jones</persName>,</publisher>
      <pubPlace>[London :</pubPlace>
      <date when="1593">1593]</date>
    </publicationStmt>
    <notesStmt>
      <note>Title from caption on leaf B1r; imprint from STC.</note>
      <note>Author's preface signed: A.</note>
      <note>Continues the text of STC 23867.5: Tell-trothes new-yeares gift beeing Robin Good-fellowes newes.</note>
      <note>Running title reads: The passionate morrice.</note>
      <note>Signatures: A&#178;  B-I&#8308;.</note>
      <note>Imperfect; lacks title page.</note>
      <note>Reproduction of the original in the Peterborough Cathedral. Library.</note>
    </notesStmt>
  </biblFull>
  <listPerson>
    <person type="publisher">
      <persName>Richard Jones</persName>
    </person>
    <person type="printer">
      <persName>R. Bourne?</persName>
    </person>
  </listPerson>
</sourceDesc>
```

Notice that all of the changes discussed above are now in the same file: the `<date>` element has a `when` attribute; the `<publisher>` element has names labeled; and the XML includes a new `<listPerson>` element. This is only a starting point, but it allows us to use the metadata in new ways and it makes possible further supplements down the road. In future posts for this series, I'll demonstrate some of what can be done with these metadata improvements.
