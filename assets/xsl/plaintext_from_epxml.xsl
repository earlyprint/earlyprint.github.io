<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:ep="http://earlyprint.org/ns/1.0" exclude-result-prefixes="xs" version="3.0">

    <xsl:output method="text" encoding="utf-8" omit-xml-declaration="yes" indent="no"/>


    <xsl:param name="sourcedirectory" required="true"/>
    <xsl:param name="outputdirectory">.</xsl:param>
    <xsl:param name="spelling">w</xsl:param>

    <!-- options for spelling are:
            w: text node
            orig: @orig or text node
            reg: @reg or text node
            lemma: @lemma or @reg or text node
    -->


    <xsl:template match="/">
        <xsl:for-each select="collection(concat($sourcedirectory, '?select=*.xml;recurse=yes'))">
            <xsl:variable name="tcpid"
                select="replace(tokenize(document-uri(.), '/')[last()], '.xml', '')"/>
            <xsl:message select="$tcpid"/>
            <xsl:result-document href="{$outputdirectory}/{concat($tcpid, '.txt')}">
                <xsl:apply-templates select="./tei:TEI" mode="doc"/>
            </xsl:result-document>
        </xsl:for-each>

    </xsl:template>

    <xsl:template match="*" mode="doc">
        <xsl:apply-templates select="*" mode="doc"/>
    </xsl:template>

    <xsl:template
        match="tei:p | tei:l | tei:lg | tei:div | tei:lb | tei:head | tei:list | tei:item | tei:closer | tei:trailer | tei:opener | tei:note"
        mode="doc">
        <xsl:text>&#x0a;</xsl:text>
        <xsl:apply-templates select="*" mode="doc"/>
        <xsl:text> </xsl:text>
    </xsl:template>


    <xsl:template match="tei:teiHeader" mode="doc"/>

    <xsl:function name="ep:get-content">
        <xsl:param name="w"/>
        <xsl:choose>
            <xsl:when test="$spelling = 'orig'">
                <xsl:choose>
                    <xsl:when test="$w/@orig">
                        <xsl:value-of select="$w/@orig"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="$w"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:when test="$spelling = 'w'">
                <xsl:value-of select="$w"/>
            </xsl:when>
            <xsl:when test="$spelling = 'reg'">
                <xsl:choose>
                    <xsl:when test="$w/@reg">
                        <xsl:value-of select="$w/@reg"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="$w"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:when test="$spelling = 'lemma'">
                <xsl:choose>
                    <xsl:when test="$w/@lemma">
                        <xsl:value-of select="$w/@lemma"/>
                    </xsl:when>
                    <xsl:when test="$w/@reg">
                        <xsl:value-of select="$w/@reg"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="$w"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
        </xsl:choose>


    </xsl:function>


    <xsl:template match="tei:w" mode="doc">
        <xsl:variable name="content">
            <xsl:value-of select="ep:get-content(.)"/>
        </xsl:variable>
        <xsl:value-of select="replace($content, '•', '●')"/>
        <xsl:if
            test="
                (not(@join) or (@join ne 'right')) and
                (not(following::*[1][name() = 'pc' and not(@join)])) and
                (not(following::*[1][@join = 'left']))">
            <xsl:text> </xsl:text>
        </xsl:if>
    </xsl:template>


    <xsl:template match="tei:pc" mode="doc">
        <xsl:value-of select="replace(text(), '•', '●')"/>
        <xsl:if
            test="
                (not(@join) or (@join ne 'right')) and
                (not(following::*[1][name() = 'pc' and not(@join)])) and
                (not(following::*[1][@join = 'left']))">
            <xsl:text> </xsl:text>
        </xsl:if>
    </xsl:template>

    <!-- ignore refs because in plain text they just reduplicate note markers -->

    <xsl:template match="tei:ref" mode="doc"/>

    <xsl:template
        match="
            tei:div[@type = 'supplied_by_editor' or
            @type = 'textual_notes' or
            @type = 'machine-generated_castlist']"/>

    <xsl:template match="tei:figDesc" mode="doc">
        <xsl:text> </xsl:text>
        <xsl:value-of select="."/>
        <xsl:text> </xsl:text>
    </xsl:template>

</xsl:stylesheet>
