var nupos_tags = ["a-acp -- acp word as adverb", 
    "a.* -- all adverbs",
    "av -- adverb", 
    "av-an -- noun-adverb as adverb", 
    "av-c -- comparative adverb", 
    "avc-jn -- comparative adj/noun as adverb", 
    "av-d -- determiner/adverb as adverb", 
    "av-dc -- comparative determiner/adverb as adverb", 
    "av-ds -- superlative determiner as adverb", 
    "av-dx -- negative determiner as adverb", 
    "av-j -- adjective as adverb", 
    "av-jc -- comparative adjective as adverb", 
    "av-jn -- adj/noun as adverb", 
    "av-js -- superlative adjective as adverb", 
    "av-n1 -- noun as adverb", 
    "av-s -- superlative adverb", 
    "avs-jn -- superlative adj/noun as adverb", 
    "av-vvg -- present participle as adverb", 
    "av-vvn -- past participle as adverb", 
    "av-x -- negative adverb", 
    "c.* -- all conjunctions",
    "c-acp -- acp word as conjunction", 
    "cc -- coordinating conjunction", 
    "cc-acp -- acp word as coordinating conjunction", 
    "c-crq -- wh-word as conjunction", 
    "ccx -- negative conjunction", 
    "crd -- numeral", 
    "cs -- subordinating conjunction", 
    "cst -- 'that' as conjunction", 
    "d.* -- all determiners",
    "d -- determiner", 
    "dc -- comparative determiner", 
    "dg -- determiner in possessive use", 
    "ds -- superlative determiner", 
    "dt -- article", 
    "dx -- negative determiner as adverb", 
    "fw-fr -- French word", 
    "fw-ge -- German word", 
    "fw-gr -- Greek word", 
    "fw-it -- Italian word", 
    "fw-la -- Latin word", 
    "fw-mi -- word in unspecified other language", 
    "j.* -- all adjectives",
    "j -- adjective", 
    "j-av -- adverb as adjective", 
    "jc -- comparative adjective", 
    "jc-jn -- comparative adj/noun", 
    "jc-vvg -- present participles as comparative adjective", 
    "jc-vvn -- past participle as comparative adjective", 
    "j-jn -- adjective-noun", 
    "jp -- proper adjective", 
    "js -- superlative adjective", 
    "js-jn -- superlative adj/noun", 
    "js-vvg -- present participle as superlative adjective", 
    "js-vvn -- past participle as superlative adjective", 
    "j-vvg -- present participle as adjective", 
    "j-vvn -- past participle as adjective",  
    "n.* -- all nouns",
    "n1 -- singular, noun", 
    "n1-an -- noun-adverb as singular noun", 
    "n1-j -- adjective as singular noun", 
    "n2 -- plural noun", 
    "n2-acp -- acp word as plural noun", 
    "n2-an -- noun-adverb as plural noun", 
    "n2-av -- adverb as plural noun", 
    "n2-dx -- determiner/adverb negative as plural noun", 
    "n2-j -- adjective as plural noun", 
    "n2-jn -- adj/noun as plural noun", 
    "n2-vdg -- present participle as plural noun, 'do'", 
    "n2-vhg -- present participle as plural noun, 'have'", 
    "n2-vvg -- present participle as plural noun", 
    "n2-vvn -- past participle as plural noun", 
    "ng1 -- singular possessive, noun", 
    "ng1-an -- noun-adverb in singular possessive use", 
    "ng1-j -- adjective as possessive noun", 
    "ng1-jn -- adj/noun as possessive noun", 
    "ng1-vvn -- past participle as possessive noun", 
    "ng2 -- plural possessive, noun", 
    "ng2-jn -- adj/noun as plural possessive noun", 
    "n-jn -- adj/noun as noun", 
    "njp -- proper adjective as noun", 
    "njp2 -- proper adjective as plural noun", 
    "njpg1 -- proper adjective as possessive noun", 
    "njpg2 -- proper adjective as plural possessive noun", 
    "np1 -- singular, proper noun", 
    "np2 -- plural, proper noun", 
    "npg1 -- singular possessive, proper noun", 
    "npg2 -- plural possessive, proper noun", 
    "np-n1 -- singular noun as proper noun", 
    "np-n2 -- plural noun as proper noun", 
    "np-ng1 -- singular possessive noun as proper noun", 
    "n-vdg -- present participle as noun, 'do'", 
    "n-vhg -- present participle as noun, 'have'", 
    "n-vvg -- present participle as noun", 
    "n-vvn -- past participle as noun", 
    "ord -- ordinal number", 
    "p-acp -- acp word as preposition", 
    "pc-acp -- acp word as particle", 
    "pi.*|^pn.*|^po.* -- all pronouns",
    "pi -- singular, indefinite pronoun", 
    "pi2 -- plural, indefinite pronoun", 
    "pi2x -- plural, indefinite pronoun", 
    "pig -- singular possessive, indefinite pronoun", 
    "pigx -- possessive case, indefinite pronoun", 
    "pix -- indefinite pronoun", 
    "pn22 -- 2nd person, personal pronoun", 
    "pn31 -- 3rd singular, personal pronoun", 
    "png11 -- 1st singular possessive, personal pronoun", 
    "png12 -- 1st plural possessive, personal pronoun", 
    "png21 -- 2nd singular possessive, personal pronoun", 
    "png22 -- 2nd person, possessive, personal pronoun", 
    "png31 -- 3rd singular possessive, personal pronoun", 
    "png32 -- 3rd plural possessive, personal pronoun", 
    "pno11 -- 1st singular objective, personal pronoun", 
    "pno12 -- 1st plural objective, personal pronoun", 
    "pno21 -- 2nd singular objective, personal pronoun", 
    "pno31 -- 3rd singular objective, personal pronoun", 
    "pno32 -- 3rd plural objective, personal pronoun", 
    "pns11 -- 1st singular subjective, personal pronoun", 
    "pns12 -- 1st plural subjective, personal pronoun", 
    "pns21 -- 2nd singular subjective, personal pronoun", 
    "pns31 -- 3rd singular subjective, personal pronoun", 
    "pns32 -- 3rd plural objective, personal pronoun", 
    "po11 -- 1st singular, possessive pronoun", 
    "po12 -- 1st plural, possessive pronoun", 
    "po21 -- 2nd singular, possessive pronoun", 
    "po22 -- 2nd person possessive pronoun", 
    "po31 -- 3rd singular, possessive pronoun", 
    "po32 -- 3rd plural, possessive pronoun", 
    "pp.* -- all prepositions",
    "pp -- preposition", 
    "pp-f -- preposition 'of'", 
    "px11 -- 1st singular reflexive pronoun", 
    "px12 -- 1st plural reflexive pronoun", 
    "px21 -- 2nd singular reflexive pronoun", 
    "px22 -- 2nd plural reflexive pronoun", 
    "px31 -- 3rd singular reflexive pronoun", 
    "px32 -- 3rd plural reflexive pronoun", 
    "pxg21 -- 2nd singular possessive, reflexive pronoun", 
    "q-crq -- interrogative use, wh-word", 
    "r-crq -- relative use, wh-word", 
    "sy -- alphabetical or other symbol", 
    "uh.* -- all interjections",
    "uh -- interjection", 
    "uh-av -- adverb as interjection", 
    "uh-crq -- wh-word as interjection", 
    "uh-dx -- negative interjection", 
    "uh-j -- adjective as interjection", 
    "uh-jn -- adjective/noun as interjection", 
    "uh-n -- noun as interjection", 
    "uh-v -- verb as interjection", 
    "v.* -- all verbs",
    "vb2 -- 2nd singular present of 'be'", 
    "vb2-imp -- 2nd plural present imperative, 'be'", 
    "vb2x -- 2nd singular present, 'be'", 
    "vbb -- present tense, 'be'", 
    "vbbx -- present tense negative, 'be'", 
    "vbd -- past tense, 'be'", 
    "vbd2 -- 2nd singular past of 'be'", 
    "vbd2x -- 2nd singular past, 'be'", 
    "vbdp -- plural past tense, 'be'", 
    "vbdx -- past tense negative, 'be'", 
    "vbg -- present participle, 'be'", 
    "vbi -- infinitive, 'be'", 
    "vbm -- 1st singular, 'be'", 
    "vbmx -- 1st singular negative, 'be'", 
    "vbn -- past participle, 'be'", 
    "vbp -- plural present, 'be'", 
    "vbz -- 3rd singular present, 'be'", 
    "vbzx -- 3rd singular present negative, 'be'", 
    "vd2 -- 2nd singular present of 'do'", 
    "vd2-imp -- 2nd plural present imperative, 'do'", 
    "vd2x -- 2nd singular present negative, 'do'", 
    "vdb -- present tense, 'do'", 
    "vdbx -- present tense negative, 'do'", 
    "vdd -- past tense, 'do'", 
    "vdd2 -- 2nd singular past of 'do'", 
    "vdd2x -- 2nd singular past negative, verb", 
    "vddp -- plural past tense, 'do'", 
    "vddx -- past tense negative, 'do'", 
    "vdg -- present participle, 'do'", 
    "vdi -- infinitive, 'do'", 
    "vdn -- past participle, 'do'", 
    "vdp -- plural present, 'do'", 
    "vdz -- 3rd singular present, 'do'", 
    "vdzx -- 3rd singular present negative, 'do'", 
    "vh2 -- 2nd singular present of 'have'", 
    "vh2-imp -- 2nd plural present imperative, 'have'", 
    "vh2x -- 2nd singular present negative, 'have'", 
    "vhb -- present tense, 'have'", 
    "vhbx -- present tense negative, 'have'", 
    "vhd -- past tense, 'have'", 
    "vhd2 -- 2nd singular past of 'have'", 
    "vhdp -- plural past tense, 'have'", 
    "vhdx -- past tense negative, 'have'", 
    "vhg -- present participle, 'have'", 
    "vhi -- infinitive, 'have'", 
    "vhn -- past participle, 'have'", 
    "vhp -- plural present, 'have'", 
    "vhz -- 3rd singular present, 'have'", 
    "vhzx -- 3rd singular present negative, 'have'", 
    "vm2 -- 2nd singular present of modal verb", 
    "vm2x -- 2nd singular present negative, modal verg", 
    "vmb -- present tense, modal verb", 
    "vmb1 -- 1st singular present, modal verb", 
    "vmbx -- present tense negative, modal verb", 
    "vmd -- past tense, modal verb", 
    "vmd2 -- 2nd singular past of modal verb", 
    "vmd2x -- 2nd singular present, modal verb", 
    "vmdp -- plural past tense, modal verb", 
    "vmdx -- past negative, modal verb", 
    "vmi -- infinitive, modal verb", 
    "vmn -- past participle, modal verb", 
    "vmp -- plural present tense, modal verg", 
    "vv2 -- 2nd singular present of verb", 
    "vv2-imp -- 2nd present imperative, verb", 
    "vv2x -- 2nd singular present negative, verb", 
    "vvb -- present tense, verg", 
    "vvbx -- present tense negative, verb", 
    "vvd -- past tense, verb", 
    "vvd2 -- 2nd singular past of verb", 
    "vvd2x -- 2nd singular past negative, verb", 
    "vvdp -- past plural, verb", 
    "vvdx -- past tense negative, verb", 
    "vvg -- present participle, verb", 
    "vvi -- infinitive, verb", 
    "vvn -- past participle, verb", 
    "vvp -- plural present, verb", 
    "vvz -- 3rd singular preseent, verb", 
    "vvzx -- 3rd singular present negative, verb", 
    "xx -- negative", 
    "zz -- unknown or unparsable token "];
