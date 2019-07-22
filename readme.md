# README #
 
## TCP Metadata Enhancement ##
 
This is a sketch of how we propose to enhance the metadata for the TCP files. Our sketch builds on the idea that we will keep the original XML metadata of the TCP files and only add more to what is there. This would allow us to retain the authoritative metadata intact to go back to at any time. Additionally, using this system we'll be able to keep track of clean-up work that's already been done on the metadata (especially the parsing of the publication statement field that was done at the HDW summer workshop in 2017). We imagine this as a flexible metadata schema that can eventually come to encompass many of the existing metadata improvements that were made at Northwestern and WashU, and that currently live in various parts of the XML and supporting files.
 
We propose creating one separate XML metadata file per TCP file. The metadata files will be linked to the original using the TCP identifier. They would be stored in a Git repository to make version controlling and centralized access easier. One advantage of creating metadata files (minus the texts) is that when running metadata analyses, we would not have to deal with unnecessarily large amounts of text.
 
The metadata that follows will adhere to TEI standards; we describe below specific fields that we are going to enhance. TEI's expressive form can represent something useful, true, and limited; the standards also leave room for building in granularity and layering/nesting information. We can also do corrective work at some point if we want to; there's room for inputting two names for one person, for example.
 

## TITLE/AUTHOR STATEMENT: ##
 
Title will continue to reflect the title as printed. The author statement provides an opportunity for linking to an authoritative name.
 
<titleStmt>
        	<title>The amorous prince, or, the curious husband, 1671</title>
        	<author>
                    	<persName ref="#aphrabehn">Behn, Aphra</persName>
        	</author>
  	</titleStmt>

## PUBLICATION STATEMENT: ##
 
The publication information would be expanded in line with existent metadata under this model. This style of TEI markup enables stronger and weaker informational claims to coexist and develop over time. That is, we could at first simply identify personal names such as <persName>Valentine Simmes</persName> without using an identifier or otherwise making assertions about the referent of this name. It also allows flexibility for dealing with the different forms of publication statements that we encounter in early modern texts.
 
 
<sourceDesc n="inline">
            <biblFull>
               <titleStmt>
                  <title/>
               </titleStmt>
               <publicationStmt>
                  <publisher>Printed by <persNameref="#simmes_valentine">Valentine
                    	Simmes</persName>
           	      <supplied>[and <persName ref="#short_peter">Peter Short</persName>]</supplied>,
                 	for <persName ref="#wise_andrew">Andrew Wise</persName>, dwelling in <placeName
                    	ref="#loc_st_pauls_churchyard">Paules <sic>Chuch-yard</sic></placeName>
                 	[sic], at the <placeName>signe of the Angell</placeName>,</publisher>
                  <pubPlace>At <placeNameref="#loc_London">London</placeName> :</pubPlace>
                  <date when="1597">1597.</date>
               </publicationStmt>
            </biblFull>
            <listPerson>
               <person xml:id="simmes_valentine"corresp="https://www.wikidata.org/wiki/Q7911013">
                  <persName>Simmes, Valentine</persName>
     	         <birth when="1585"/>
                  <death when="1622"/>
               </person>
               <person xml:id="short_peter">
                  <persName>Short, Peter</persName>
               </person>
               <person xml:id="wise_andrew">
                  <persName>Wise, Andrew</persName>
               </person>
            </listPerson>
            <listPlace>
               <place xml:id="loc_London" type="city">
                  <placeName>London</placeName>
       	    </place>
               <place xml:id="loc_st_pauls_churchyard" type="city"
              	corresp="https://www.wikidata.org/wiki/Q173882">
                  <placeName>St Paul's Church</placeName>
               </place>
            </listPlace>
         </sourceDesc>




