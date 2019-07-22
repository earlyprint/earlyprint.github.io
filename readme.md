{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf500
{\fonttbl\f0\fswiss\fcharset0 ArialMT;\f1\froman\fcharset0 Times-Roman;\f2\froman\fcharset0 TimesNewRomanPSMT;
\f3\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;\red24\green24\blue23;\red255\green255\blue255;\red0\green0\blue0;
\red133\green35\blue2;\red0\green0\blue132;\red240\green111\blue60;\red252\green106\blue50;\red16\green60\blue192;
}
{\*\expandedcolortbl;;\cssrgb\c12549\c12157\c11765;\cssrgb\c100000\c100000\c100000;\cssrgb\c0\c0\c0;
\cssrgb\c60000\c20000\c0;\cssrgb\c0\c0\c58824;\cssrgb\c96078\c51765\c29804;\cssrgb\c100000\c50196\c25098;\cssrgb\c6667\c33333\c80000;
}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\sl440\partightenfactor0

\f0\fs32 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 # README #
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl320\partightenfactor0
\cf4 \'a0\
\pard\pardeftab720\sl440\partightenfactor0

\f0\fs32 \cf2 \strokec2 ## TCP Metadata Enhancement ##
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl320\partightenfactor0
\cf4 \'a0\
\pard\pardeftab720\sl440\partightenfactor0

\f0\fs32 \cf2 \strokec2 This is a sketch of how we propose to enhance the metadata for the TCP files. Our sketch builds on the idea that we will keep the original XML metadata of the TCP files and only add more to what is there. This would allow us to retain the authoritative metadata intact to go back to at any time. Additionally, using this system we'll be able to keep track of clean-up work that's already been done on the metadata (especially the parsing of the publication statement field that was done at the HDW summer workshop in 2017). We imagine this as a flexible metadata schema that can eventually come to encompass many of the existing metadata improvements that were made at Northwestern and WashU, and that currently live in various parts of the XML and supporting files.
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl420\partightenfactor0

\f2\fs30\fsmilli15333 \cf2 \strokec2 \'a0
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl440\partightenfactor0

\f0\fs32 \cf2 \strokec2 We propose creating one separate XML metadata file per TCP file. The metadata files will be linked to the original using the TCP identifier. They would be stored in a Git repository to make version controlling and centralized access easier. One advantage of creating metadata files (minus the texts) is that when running metadata analyses, we would not have to deal with unnecessarily large amounts of text.
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl420\partightenfactor0

\f2\fs30\fsmilli15333 \cf2 \strokec2 \'a0
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl420\partightenfactor0

\f0\fs32 \cf2 \strokec2 The metadata that follows will adhere to TEI standards; we describe below specific fields that we are going to enhance. \cf4 \strokec4 TEI's expressive form can represent something useful, true, and limited; the standards also leave room for building in granularity and layering/nesting information. We can also do corrective work at some point if we want to; there's room for inputting two names for one person, for example.
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf4 \'a0\
\pard\pardeftab720\sl280\partightenfactor0
\cf4 \cb1 \
\pard\pardeftab720\sl440\partightenfactor0

\f3\fs32 \cf2 \cb3 \strokec2 ## TITLE/AUTHOR STATEMENT: ##
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl420\partightenfactor0

\f2\fs30\fsmilli15333 \cf2 \strokec2 \'a0
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl440\partightenfactor0

\f3\fs32 \cf2 \strokec2 Title will continue to reflect the title as printed. The author statement provides an opportunity for linking to an authoritative name.
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl420\partightenfactor0

\f2\fs30\fsmilli15333 \cf2 \strokec2 \'a0
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl440\partightenfactor0

\f3\fs32 \cf2 \strokec2 <titleStmt>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \cf2 \strokec2 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	<title>The amorous prince, or, the curious husband, 1671</title>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \cf2 \strokec2 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	<author>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \cf2 \strokec2 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	<persName ref=\cf5 \strokec5 "\cf2 \strokec2 #aphrabehn\cf5 \strokec5 "\cf2 \strokec2 >Behn, Aphra</persName>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \cf2 \strokec2 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	</author>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \cf2 \strokec2 \'a0\'a0	</titleStmt>
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl280\partightenfactor0
\cf4 \cb1 \
\pard\pardeftab720\sl440\partightenfactor0

\f3\fs32 \cf2 \cb3 \strokec2 ## PUBLICATION STATEMENT: ##
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl420\partightenfactor0

\f2\fs30\fsmilli15333 \cf2 \strokec2 \'a0
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl440\partightenfactor0

\f3\fs32 \cf4 The publication information would be expanded in line with existent metadata under this model. This style of TEI markup enables stronger and weaker informational claims to coexist and develop over time. That is, we could at first simply identify personal names such as <persName>Valentine Simmes</persName> without using an identifier or otherwise making assertions about the referent of this name. It also allows flexibility for dealing with the different forms of publication statements that we encounter in early modern texts.
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf4 \'a0\
\'a0\
\pard\pardeftab720\sl440\partightenfactor0

\f3\fs32 \cf6 \strokec6 <sourceDesc\cf7 \strokec7  n\cf8 \strokec8 =\cf5 \strokec5 "inline"\cf6 \strokec6 >
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl440\partightenfactor0

\f3\fs32 \cf4 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <biblFull>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <titleStmt>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <title/>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 </titleStmt>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <publicationStmt>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <publisher>\cf4 \strokec4 Printed by \cf6 \strokec6 <persName\cf7 \strokec7 ref\cf8 \strokec8 =\cf5 \strokec5 "#simmes_valentine"\cf6 \strokec6 >\cf4 \strokec4 Valentine
\f1\fs24 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	Simmes\cf6 \strokec6 </persName>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	\'a0 \'a0 \'a0 \cf6 \strokec6 <supplied>\cf4 \strokec4 [and \cf6 \strokec6 <persName\cf7 \strokec7  ref\cf8 \strokec8 =\cf5 \strokec5 "#short_peter"\cf6 \strokec6 >\cf4 \strokec4 Peter Short\cf6 \strokec6 </persName>\cf4 \strokec4 ]\cf6 \strokec6 </supplied>\cf4 \strokec4 ,
\f1\fs24 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	for \cf6 \strokec6 <persName\cf7 \strokec7  ref\cf8 \strokec8 =\cf5 \strokec5 "#wise_andrew"\cf6 \strokec6 >\cf4 \strokec4 Andrew Wise\cf6 \strokec6 </persName>\cf4 \strokec4 , dwelling in \cf6 \strokec6 <placeName
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl440\partightenfactor0

\f3\fs32 \cf7 \strokec7 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	ref\cf8 \strokec8 =\cf5 \strokec5 "#loc_st_pauls_churchyard"\cf6 \strokec6 >\cf4 \strokec4 Paules \cf6 \strokec6 <sic>\cf4 \strokec4 Chuch-yard\cf6 \strokec6 </sic></placeName>
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl440\partightenfactor0

\f3\fs32 \cf4 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	[sic], at the \cf6 \strokec6 <placeName>\cf4 \strokec4 signe of the Angell\cf6 \strokec6 </placeName>\cf4 \strokec4 ,\cf6 \strokec6 </publisher>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <pubPlace>\cf4 \strokec4 At \cf6 \strokec6 <placeName\cf7 \strokec7 ref\cf8 \strokec8 =\cf5 \strokec5 "#loc_London"\cf6 \strokec6 >\cf4 \strokec4 London\cf6 \strokec6 </placeName>\cf4 \strokec4  :\cf6 \strokec6 </pubPlace>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <date\cf7 \strokec7  when\cf8 \strokec8 =\cf5 \strokec5 "1597"\cf6 \strokec6 >\cf4 \strokec4 1597.\cf6 \strokec6 </date>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 </publicationStmt>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 </biblFull>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <listPerson>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <person\cf7 \strokec7  xml:id\cf8 \strokec8 =\cf5 \strokec5 "simmes_valentine"\cf7 \strokec7 corresp\cf8 \strokec8 =\cf5 \strokec5 "{\field{\*\fldinst{HYPERLINK "https://urldefense.proofpoint.com/v2/url?u=https-3A__www.wikidata.org_wiki_Q7911013&d=DwMGaQ&c=yHlS04HhBraes5BQ9ueu5zKhE7rtNXt_d012z2PA6ws&r=rG8zxOdssqSzDRz4x1GLlmLOW60xyVXydxwnJZpkxbk&m=j8JozjSG1TSnwwymiYHktWPCQuQo3B0I67JbS-0Matg&s=y-cKBR6lvjTrvyP7Q5_W2EYoRR1HT9X6JhuWWI1zTDs&e="}}{\fldrslt \cf9 \ul \ulc9 \strokec9 https://www.wikidata.org/wiki/Q7911013}}"\cf6 \strokec6 >
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <persName>\cf4 \strokec4 Simmes, Valentine\cf6 \strokec6 </persName>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0	 \'a0 \'a0 \'a0 \'a0 \cf6 \strokec6 <birth\cf7 \strokec7  when\cf8 \strokec8 =\cf5 \strokec5 "1585"\cf6 \strokec6 />
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <death\cf7 \strokec7  when\cf8 \strokec8 =\cf5 \strokec5 "1622"\cf6 \strokec6 />
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 </person>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <person\cf7 \strokec7  xml:id\cf8 \strokec8 =\cf5 \strokec5 "short_peter"\cf6 \strokec6 >
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <persName>\cf4 \strokec4 Short, Peter\cf6 \strokec6 </persName>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 </person>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <person\cf7 \strokec7  xml:id\cf8 \strokec8 =\cf5 \strokec5 "wise_andrew"\cf6 \strokec6 >
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <persName>\cf4 \strokec4 Wise, Andrew\cf6 \strokec6 </persName>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 </person>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 </listPerson>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <listPlace>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <place\cf7 \strokec7  xml:id\cf8 \strokec8 =\cf5 \strokec5 "loc_London"\cf7 \strokec7  type\cf8 \strokec8 =\cf5 \strokec5 "city"\cf6 \strokec6 >
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <placeName>\cf4 \strokec4 London\cf6 \strokec6 </placeName>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\'a0 \'a0 \cf6 \strokec6 </place>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <place\cf7 \strokec7  xml:id\cf8 \strokec8 =\cf5 \strokec5 "loc_st_pauls_churchyard"\cf7 \strokec7  type\cf8 \strokec8 =\cf5 \strokec5 "city"
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl440\partightenfactor0

\f3\fs32 \cf7 \strokec7 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	corresp\cf8 \strokec8 =\cf5 \strokec5 "{\field{\*\fldinst{HYPERLINK "https://urldefense.proofpoint.com/v2/url?u=https-3A__www.wikidata.org_wiki_Q173882&d=DwMGaQ&c=yHlS04HhBraes5BQ9ueu5zKhE7rtNXt_d012z2PA6ws&r=rG8zxOdssqSzDRz4x1GLlmLOW60xyVXydxwnJZpkxbk&m=j8JozjSG1TSnwwymiYHktWPCQuQo3B0I67JbS-0Matg&s=jGp7iZ5nEq_hdokBBqn6kz8pnzKC-bP4nx-KTgwHyVA&e="}}{\fldrslt \cf9 \ul \ulc9 \strokec9 https://www.wikidata.org/wiki/Q173882}}"\cf6 \strokec6 >
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl440\partightenfactor0

\f3\fs32 \cf4 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 <placeName>\cf4 \strokec4 St Paul's Church\cf6 \strokec6 </placeName>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 </place>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 </listPlace>
\f1\fs24 \cf4 \strokec4 \

\f3\fs32 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\cf6 \strokec6 </sourceDesc>
\f1\fs24 \cf4 \strokec4 \
\pard\pardeftab720\sl280\partightenfactor0
\cf4 \cb1 \
\
\
\
}