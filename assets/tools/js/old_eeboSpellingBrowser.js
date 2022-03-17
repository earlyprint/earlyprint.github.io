
var EEBO_NGRAMS_SAVE_DATA = '';
var EEBO_NGRAMS_SAVE_COUNTS = '';
var EEBO_LINE_WORD_XREF = '';
var EEBO_GROK_KEYS = '';
var EEBO_SAVE_TIME_VALUE = '';
var EEBO_SAVE_SMOOTHING = '';
var EEBO_SAVE_ROLLING_AVERAGE = '';
var EEBO_FROM_YEAR = '';
var EEBO_TO_YEAR = '';
var EEBO_SAVE_REQUEST_FROM_CLIENT = '';

var EEBO_SAVE_LINE_WIDTH = '';

//var EEBO_URL_PREFIX = '/eebospellingbrowserv3/';
var EEBO_URL_PREFIX = 'https://earlyprint.wustl.edu/proxy_ngrams.php?url=https://earlyprint.wustl.edu/eebospellingbrowserv3_old/';

var EEBO_PREV_STYLE = '';
var EEBO_MOUSEOVER_LINE = false;

var EEBO_DEBUG = '';

var GLOBAL_URL_PARAMS = '';

var SAVE_WIDTH = '';
var SAVE_HEIGHT = '';
var SAVE_GRAPH_WIDTH = 960;
var SAVE_GRAPH_HEIGHT = 500;

function handle_document_load() {

    SAVE_WIDTH = window.innerWidth;
    SAVE_HEIGHT = window.innerHeight;

    console.log('SAVE_WIDTH', SAVE_WIDTH);

    if (SAVE_WIDTH < 415) {
        $('.wrapper').css({'width': '375px'});
        $('#slider-container').css({'width': '200px'});

        $('#radio_1_2').css({'margin-left': '103px'});
        $('#radio_1_3').css({'margin-left': '103px'});
        $('#radio_2_2').css({'margin-left': '103px'});
        $('#radio_2_3').css({'margin-left': '103px'});

        $('.controlLabelGram').css({'display': 'block'});

        $('.controlLabel_1').css({'width': '105px'});
        $('.controlLabelPos').css({'width': '105px'});

        $('#graph_smoothing_label').css({'margin-right': '103px'});

        $('#queryButton').css({'margin-left': '0px', 'margin-top': '10px'});

        SAVE_GRAPH_WIDTH = 350;
        SAVE_GRAPH_HEIGHT = 185;
    }
    else {

        $('#radio_1_2').css({'margin-left': '0px'});
        $('#radio_1_3').css({'margin-left': '0px'});
        $('#radio_2_2').css({'margin-left': '0px'});
        $('#radio_2_3').css({'margin-left': '0px'});

        $('.controlLabelGram').css({'display': 'inline-block'});

        $('.controlLabel_1').css({'width': '120px'});
        $('.controlLabelPos').css({'width': '50px'});

        $('#graph_smoothing_label').css({'margin-right': '20px'});

        $('#queryButton').css({'margin-left': '20px', 'margin-top': '0px'});

        if (SAVE_WIDTH < 815) {
            $('.wrapper').css({'width': '665px'});
            $('#slider-container').css({'width': '470px'});
            SAVE_GRAPH_WIDTH = 615;
            SAVE_GRAPH_HEIGHT = 320;
        }
        else {
            if (SAVE_WIDTH < 1160) {
                $('.wrapper').css({'width': '950px'});
                $('#slider-container').css({'width': '715px'});
                SAVE_GRAPH_WIDTH = 850;
                SAVE_GRAPH_HEIGHT = 445;
            }
            else {
                $('.wrapper').css({'width': '1160px'});
                $('#slider-container').css({'width': '825px'});
                SAVE_GRAPH_WIDTH = 960;
                SAVE_GRAPH_HEIGHT = 500;
            }
        }
    }

    if (GLOBAL_URL_PARAMS == '') {
        GLOBAL_URL_PARAMS = new URLSearchParams(window.location.search);
    }

    if (GLOBAL_URL_PARAMS.has('requestFromClient') == false) {
        
        window.location.assign('/lab/old_ngram_browser.html?requestFromClient={"1":{"spe":"love,loue","reg":"","lem":"","pos":"","originalPos":""},"2":{"spe":"","reg":"","lem":"","pos":"","originalPos":""},"3":{"spe":"","reg":"","lem":"","pos":"","originalPos":""},"databaseType":"unigrams","smoothing":"True","rollingAverage":"20_year", "instructionToggle": "show"}');
    }
    
            
    $('#errorMessages').html('');
    
    $("#slider_range").slider({
        range: true,
        min: 1473,
        max: 1700,
        values: [1473, 1700],
        slide: function( event, ui ) {
            EEBO_FROM_YEAR = ui.values[0];
            EEBO_TO_YEAR = ui.values[1];
            actuallyDrawTheGraph(true);
        }
    }); 
    
    $('#pos1').autocomplete({
        source: function(req, responseFn) {
            var re = $.ui.autocomplete.escapeRegex(req.term);
            var matcher = new RegExp( "^" + re, "i" );
            var a = $.grep( nupos_tags, function(item,index){
                return matcher.test(item);
            });
            responseFn( a );
        }
    });  
    
    $('#pos2').autocomplete({
        source: function(req, responseFn) {
            var re = $.ui.autocomplete.escapeRegex(req.term);
            var matcher = new RegExp( "^" + re, "i" );
            var a = $.grep( nupos_tags, function(item,index){
                return matcher.test(item);
            });
            responseFn( a );
        }
    }); 
    
    $('#pos3').autocomplete({
        source: function(req, responseFn) {
            var re = $.ui.autocomplete.escapeRegex(req.term);
            var matcher = new RegExp( "^" + re, "i" );
            var a = $.grep( nupos_tags, function(item,index){
                return matcher.test(item);
            });
            responseFn( a );
        }
    });
    
    $('.pos').focus(
        function() {
            $('#nuposPopup').css('display', 'block');
        }
    );
    
    $('.pos').focusout(
        function() {
            $('#nuposPopup').css('display', 'none');
        }
    );

    $('input[type=radio][name=gramSize]').change(
        function() {
            
            $('#entry1').css('display', 'none');
            $('#entry2').css('display', 'none');
            $('#entry3').css('display', 'none');
            $('#buttonDiv').css('display', 'none');
            
            if ($(this).val() == '1') {
                $('#entry1').css('display', 'block');
                $('#buttonDiv').css('display', 'block');
            }
            
            if ($(this).val() == '2') {
                $('#entry1').css('display', 'block');
                $('#entry2').css('display', 'block');
                $('#buttonDiv').css('display', 'block');
            }
            
            if ($(this).val() == '3') {
                $('#entry1').css('display', 'block');
                $('#entry2').css('display', 'block');
                $('#entry3').css('display', 'block');
                $('#buttonDiv').css('display', 'block');
            }
        }   
    );
    
    $('input:radio[name=gramSize]').each(
        function () { 
            $(this).prop('checked', false); 
        }
    );
    
    $('input:radio[name=spellings]').each(
        function () { 
            $(this).prop('checked', false); 
        }
    );
    
    if (GLOBAL_URL_PARAMS.has('requestFromClient') == true) {

        var cleanedRequest = decodeURIComponent(GLOBAL_URL_PARAMS.get('requestFromClient')).replace(/:""",/g, ':"\\"",');

        var requestFromClient = JSON.parse(cleanedRequest);

        requestFromClient['1']['spe'] = decodeURIComponent(requestFromClient['1']['spe']);
        requestFromClient['1']['reg'] = decodeURIComponent(requestFromClient['1']['reg']);
        requestFromClient['1']['lem'] = decodeURIComponent(requestFromClient['1']['lem']);

        requestFromClient['2']['spe'] = decodeURIComponent(requestFromClient['2']['spe']);
        requestFromClient['2']['reg'] = decodeURIComponent(requestFromClient['2']['reg']);
        requestFromClient['2']['lem'] = decodeURIComponent(requestFromClient['2']['lem']);

        requestFromClient['3']['spe'] = decodeURIComponent(requestFromClient['3']['spe']);
        requestFromClient['3']['reg'] = decodeURIComponent(requestFromClient['3']['reg']);
        requestFromClient['3']['lem'] = decodeURIComponent(requestFromClient['3']['lem']);
        
        EEBO_SAVE_REQUEST_FROM_CLIENT = requestFromClient;
        
        if (requestFromClient['instructionToggle'] == 'hide') {
            $('#eeboInstructions').css('display', 'none');
            $('#instructionToggle').html('show instructions');
        }
            
        $('#pos1').val(requestFromClient['1']['originalPos']);
        $('#pos2').val(requestFromClient['2']['originalPos']);
        $('#pos3').val(requestFromClient['3']['originalPos']);
    
        $('input:radio[name=gramSize]').each(
            function () { 
                
                if (requestFromClient['databaseType'] == 'unigrams' && $(this).val() == '1') {
                    $(this).prop('checked', true);     
                } 
                
                if (requestFromClient['databaseType'] == 'bigrams' && $(this).val() == '2') {
                    $(this).prop('checked', true);     
                } 
                
                if (requestFromClient['databaseType'] == 'trigrams' && $(this).val() == '3') {
                    $(this).prop('checked', true);     
                }
            }
        );

        if (requestFromClient['1']['spe'] > '' || requestFromClient['2']['spe'] > '' || requestFromClient['3']['spe'] > '') {
            $('input:radio[name=spellings][value=spe]').prop('checked', true);
        }
        else {
            if (requestFromClient['1']['reg'] > '' || requestFromClient['2']['reg'] > '' || requestFromClient['3']['reg'] > '') {
                $('input:radio[name=spellings][value=reg]').prop('checked', true);
            }
            else {
                if (requestFromClient['1']['lem'] > '' || requestFromClient['2']['lem'] > '' || requestFromClient['3']['lem'] > '') {
                    $('input:radio[name=spellings][value=lem]').prop('checked', true);
                }
                else {
                    $('input:radio[name=spellings][value=spe]').prop('checked', true);
                }
            }
        }

        if (requestFromClient['1']['spe'] > '') {
            $('#spelling1').val(requestFromClient['1']['spe']);
        }
        if (requestFromClient['1']['reg'] > '') {
            $('#spelling1').val(requestFromClient['1']['reg']);
        }
        if (requestFromClient['1']['lem'] > '') {
            $('#spelling1').val(requestFromClient['1']['lem']);
        }
        
        if (requestFromClient['2']['spe'] > '') {
            $('#spelling2').val(requestFromClient['2']['spe']);
        }
        if (requestFromClient['2']['reg'] > '') {
            $('#spelling2').val(requestFromClient['2']['reg']);
        }
        if (requestFromClient['2']['lem'] > '') {
            $('#spelling2').val(requestFromClient['2']['lem']);
        }
        
        if (requestFromClient['3']['spe'] > '') {
            $('#spelling3').val(requestFromClient['3']['spe']);
        }
        if (requestFromClient['3']['reg'] > '') {
            $('#spelling3').val(requestFromClient['3']['reg']);
        }
        if (requestFromClient['3']['lem'] > '') {
            $('#spelling3').val(requestFromClient['3']['lem']);
        }
        
        if (requestFromClient['smoothing'] == 'False') {
            $('#smoothing').prop('checked', false);  
        }
        else {
            $('#smoothing').prop('checked', true);  
        }
        
        $("#rollingAverage > option[value=" + requestFromClient['rollingAverage'] + "]").prop("selected",true);
                
        if (requestFromClient['databaseType'] == 'unigrams') {
            $('#entry1').css('display', 'block');
            $('#buttonDiv').css('display', 'block');
        }
        
        if (requestFromClient['databaseType'] == 'bigrams') {
            $('#entry1').css('display', 'block');
            $('#entry2').css('display', 'block');
            $('#buttonDiv').css('display', 'block');
        }
        
        if (requestFromClient['databaseType'] == 'trigrams') {
            $('#entry1').css('display', 'block');
            $('#entry2').css('display', 'block');
            $('#entry3').css('display', 'block');
            $('#buttonDiv').css('display', 'block');
        }
        
        //
        //  ACTUALLY DRAW THE GRAPH
        //
        
        $("body").css("background-color", "#DDDDDD");
        $("#progressMessage").css("display", "block");
        $("#progressMessage").css("top", $("#resultsArea").position().top + "px");
        $("#progressMessage").css("left", ($("#resultsArea").position().left + 50) + "px");
        
        EEBO_FROM_YEAR = 1473;
        EEBO_TO_YEAR = 1700;
        
        getDataFromServer(requestFromClient);
        
        if (EEBO_NGRAMS_SAVE_DATA.length > 0) {

            if (requestFromClient['rollingAverage'] == 'none') {
                actuallyDrawTheGraph(false);
            }
            else {
                handleRollingAverageChange(true);
            }
        }
        
        $("#progressMessage").css("display", "none");
        $("body").css("background-color", "white");
    
        $('#slider_range').css('display', 'block');
        $('#slider-container').css('display', 'block');
    }
    else {
        $('#slider_range').css('display', 'block');
        $('#slider-container').css('display', 'block');
    }
}

/*  --------------------------------------------------------------------
    DOCUMENT LOAD.
    -------------------------------------------------------------------- */

$(document).ready(

    function() {

        handle_document_load();

        //window.addEventListener("orientationchange", function() {
        //    console.log('orientationchange');
        //    handle_document_load();
        //}, false);

        window.addEventListener("resize", function() {
            console.log('resize');
            handle_document_load();
        }, false);
    }
);

/*  --------------------------------------------------------------------
    BUILD A REQUEST OBJECT, THEN CALL THIS PAGE WITH IT.  WE CALL THE
    PAGE BECAUSE WE WANT EVERY GRAPH WE GENERATE TO HAVE A STABLE URL.
    -------------------------------------------------------------------- */

function handlePosSelection(selection) {

    results = '';
        
    parts = selection.split(',');
    
    for (var a = 0; a < parts.length; a++) {

        if (results > '') {
            results = results + ','
        }
        
        var scrubbedPos = $.trim(parts[a].split(' -- ')[0]);

        if (scrubbedPos.indexOf('/') == -1) {
            if (scrubbedPos.indexOf('*') > 0 || scrubbedPos.indexOf('.') > 0) {
                scrubbedPos = '/^' + scrubbedPos + '/';
            }
        }
        
        results = results + scrubbedPos;
    }
    
    return results;
}

function editSearchTerm(s) {

    errorMessage = '';

    return errorMessage
}

function handleGoButton() {

    $('#errorMessages').html('');
    
    var requestObject = {'instructionToggle': '', 'databaseType': '', '1': {'spe': '', 'reg': '', 'lem': '', 'pos': '', 'originalPos': ''}, '2': {'spe': '', 'reg': '', 'lem': '', 'pos': '', 'originalPos': ''}, '3': {'spe': '', 'reg': '', 'lem': '', 'pos': '', 'originalPos': ''}, 'smoothing': '', 'rollingAverage': ''};
    
    var gramSize = ''
    
    if ($('#eeboInstructions').css('display') == 'none') {
        requestObject['instructionToggle'] = 'hide';
    }
    else {
        requestObject['instructionToggle'] = 'show';
    }
    
    $('input[type=radio][name=gramSize]').each(
        function() {
            if ($(this).is(':checked')) {
                gramSize = $(this).val();
            } 
        }
    );
    
    var spelling = '';
    
    $('input[type=radio][name=spellings]').each(
        function() {
            if ($(this).is(':checked')) {
                spelling = $(this).val();
            } 
        }
    );
    
    if (spelling == '') {
        $('#errorMessages').html('Please select a spelling before drawing graph.');
        return;  
    }

    if (gramSize == '1') {
        
        requestObject['databaseType'] = 'unigrams';
        
        requestObject['1'][spelling] = $('#spelling1').val(); 
        requestObject['1']['pos'] = handlePosSelection($('#pos1').val());
        requestObject['1']['originalPos'] = $('#pos1').val();

        //if (requestObject['1'][spelling].trim() == '' && requestObject['1']['pos'].trim() == '') {
        //    $('#errorMessages').html('Please enter a query term, a pos, or both for gram 1.');
        //    return;  
        //}

        if (requestObject['1'][spelling].trim() == '') {
            $('#errorMessages').html('Please enter a search term for gram 1.');
            return;  
        }

        if (editSearchTerm(requestObject['1'][spelling]) > '') {
            $('#errorMessages').html(editSearchTerm(requestObject['1'][spelling]));
            return;  
        }

        if (requestObject['1'][spelling] == '~' || requestObject['1'][spelling] == '/' || requestObject['1'][spelling] == '\\' || requestObject['1'][spelling] == '%') {
            $('#errorMessages').html('The ngram browser does not support searches for "~", "/", "\\", or "&".');
            return;  
        }
    }
    
    if (gramSize == '2') {
        
        requestObject['databaseType'] = 'bigrams';
        
        requestObject['1'][spelling] = $('#spelling1').val(); 
        requestObject['1']['pos'] = handlePosSelection($('#pos1').val());
        requestObject['1']['originalPos'] = $('#pos1').val();
        requestObject['2'][spelling] =$('#spelling2').val(); 
        requestObject['2']['pos'] = handlePosSelection($('#pos2').val());
        requestObject['2']['originalPos'] = $('#pos2').val();

        //if (requestObject['1'][spelling].trim() == '' && requestObject['1']['pos'].trim() == '') {
        //    $('#errorMessages').html('Please enter a query term, a pos, or both for gram 1.');
        //    return;  
        //}

        if (requestObject['1'][spelling].trim() == '') {
            $('#errorMessages').html('Please enter a search term for gram 1.');
            return;  
        }

        //if (requestObject['2'][spelling].trim() == '' && requestObject['2']['pos'].trim() == '') {
        //    $('#errorMessages').html('Please enter a query term, a pos, or both for gram 2.');
        //    return;  
        //}

        if (requestObject['2'][spelling].trim() == '') {
            $('#errorMessages').html('Please enter a search term for gram 2.');
            return;  
        }

        if (editSearchTerm(requestObject['1'][spelling]) > '') {
            $('#errorMessages').html(editSearchTerm(requestObject['1'][spelling]));
            return;  
        }

        if (editSearchTerm(requestObject['2'][spelling]) > '') {
            $('#errorMessages').html(editSearchTerm(requestObject['2'][spelling]));
            return;  
        }

        if (requestObject['1'][spelling] == '~' || requestObject['1'][spelling] == '/' || requestObject['1'][spelling] == '\\' || requestObject['1'][spelling] == '%') {
            $('#errorMessages').html('The ngram browser does not support searches for "~", "/", "\\", or "&".');
            return;  
        }
        if (requestObject['2'][spelling] == '~' || requestObject['2'][spelling] == '/' || requestObject['2'][spelling] == '\\' || requestObject['2'][spelling] == '%') {
            $('#errorMessages').html('The ngram browser does not support searches for "~", "/", "\\", or "&".');
            return;  
        }
    }
    
    if (gramSize == '3') {
        
        requestObject['databaseType'] = 'trigrams';
        
        requestObject['1'][spelling] = $('#spelling1').val(); 
        requestObject['1']['pos'] = handlePosSelection($('#pos1').val());
        requestObject['1']['originalPos'] = $('#pos1').val();
        requestObject['2'][spelling] =$ ('#spelling2').val(); 
        requestObject['2']['pos'] = handlePosSelection($('#pos2').val());
        requestObject['2']['originalPos'] = $('#pos2').val();
        requestObject['3'][spelling] = $('#spelling3').val();  
        requestObject['3']['pos'] = handlePosSelection($('#pos3').val());
        requestObject['3']['originalPos'] = $('#pos3').val();

        //if (requestObject['1'][spelling].trim() == '' && requestObject['1']['pos'].trim() == '') {
        //    $('#errorMessages').html('Please enter a query term, a pos, or both for gram 1.');
        //    return;  
        //}

        if (requestObject['1'][spelling].trim() == '') {
            $('#errorMessages').html('Please enter a search term for gram 1.');
            return;  
        }

        //if (requestObject['2'][spelling].trim() == '' && requestObject['2']['pos'].trim() == '') {
        //    $('#errorMessages').html('Please enter a query term, a pos, or both for gram 2.');
        //    return;  
        //}

        if (requestObject['2'][spelling].trim() == '') {
            $('#errorMessages').html('Please enter a search term for gram 2.');
            return;  
        }

        //if (requestObject['3'][spelling].trim() == '' && requestObject['3']['pos'].trim() == '') {
        //    $('#errorMessages').html('Please enter a query term, a pos, or both for gram 3.');
        //    return;  
        //}

        if (requestObject['3'][spelling].trim() == '') {
            $('#errorMessages').html('Please enter a search term for gram 3.');
            return;  
        }

        if (editSearchTerm(requestObject['1'][spelling]) > '') {
            $('#errorMessages').html(editSearchTerm(requestObject['1'][spelling]));
            return;  
        }

        if (editSearchTerm(requestObject['2'][spelling]) > '') {
            $('#errorMessages').html(editSearchTerm(requestObject['2'][spelling]));
            return;  
        }

        if (editSearchTerm(requestObject['3'][spelling]) > '') {
            $('#errorMessages').html(editSearchTerm(requestObject['2'][spelling]));
            return;  
        }

        if (requestObject['1'][spelling] == '~' || requestObject['1'][spelling] == '/' || requestObject['1'][spelling] == '\\' || requestObject['1'][spelling] == '%') {
            $('#errorMessages').html('The ngram browser does not support searches for "~", "/", "\\", or "&".');
            return;  
        }
        if (requestObject['2'][spelling] == '~' || requestObject['2'][spelling] == '/' || requestObject['2'][spelling] == '\\' || requestObject['2'][spelling] == '%') {
            $('#errorMessages').html('The ngram browser does not support searches for "~", "/", "\\", or "&".');
            return;  
        }
        if (requestObject['3'][spelling] == '~' || requestObject['3'][spelling] == '/' || requestObject['3'][spelling] == '\\' || requestObject['3'][spelling] == '%') {
            $('#errorMessages').html('The ngram browser does not support searches for "~", "/", "\\", or "&".');
            return;  
        }
    }
    
    requestObject['rollingAverage'] = $('#rollingAverage').val();
    
    requestObject['smoothing'] = 'False';
    if ($('#smoothing').is(':checked')) {
        requestObject['smoothing'] = 'True';
    }

    requestObject['1'][spelling] = encodeURIComponent(requestObject['1'][spelling]);
    requestObject['2'][spelling] = encodeURIComponent(requestObject['2'][spelling]);
    requestObject['3'][spelling] = encodeURIComponent(requestObject['3'][spelling]);

    var nextLocation = window.location.toString().split('?')[0];
    
    nextLocation = nextLocation +  '?requestFromClient=' + JSON.stringify(requestObject);
    
    window.location = nextLocation;
}

/*  --------------------------------------------------------------------
    
    -------------------------------------------------------------------- */

function decorateQueryTerms(dataKeys) {
    
    var spelling = '';
    
    $('input[type=radio][name=spellings]').each(
        function() {
            if ($(this).is(':checked')) {
                spelling = $(this).val();
            } 
        }
    );
    
    var corpus = '';
    if (spelling == 'spe') {
        corpus = '/data/eebo_tcp/plaintext';    
    }
    if (spelling == 'reg') {
        corpus = '/data/eebo_tcp/plaintext_reg';    
    }
    if (spelling == 'lem') {
        corpus = '/data/eebo_tcp/plaintext_lem';    
    }

    var color = d3.schemeCategory10;
    
    results = '';
    
    var queryTerms = [];
    
    for (var a = 0; a < dataKeys.length; a++) {
        if (dataKeys[a] != 'year' && dataKeys[a].indexOf('(rolling average)') == -1) {
            queryTerms.push(dataKeys[a]);
        }
    }
    
    var numberOfQueryTerms = 0;

    for (var a = 0; a < queryTerms.length; a++) {

        if (queryTerms[a].length > 1 || queryTerms[a].match(/[a-z]/i) != null) {
        
            try {
                for (var b = 0; b < EEBO_LINE_WORD_XREF[queryTerms[a]].length; b++) {

                    numberOfQueryTerms += 1;

                    if (numberOfQueryTerms < 11) {
                
                        if (results > '') {
                            results = results + ', ';
                        }
                    
                        if (EEBO_SAVE_REQUEST_FROM_CLIENT['1']['pos']  == '' && EEBO_SAVE_REQUEST_FROM_CLIENT['2']['pos']  == '' && EEBO_SAVE_REQUEST_FROM_CLIENT['3']['pos']  == '') {
                    
                            results = results + '<span class="queryTerms" style="color:' + color[a] + '"><a style="color:' + color[a] + '" href="javascript:linkToGrok(\'' + EEBO_LINE_WORD_XREF[queryTerms[a]][b] + '\', \'' + corpus + '\');">' + EEBO_LINE_WORD_XREF[queryTerms[a]][b] + '</a></span>';
                        }
                        else {
                    
                            results = results + '<span class="queryTerms" style="color:' + color[a] + '">' + EEBO_LINE_WORD_XREF[queryTerms[a]][b] + '</span>';
                        }
                    }
                    else {
                        $('#errorMessages').html('Limiting legend terms to the first 10 (of ' + numberOfQueryTerms + ') words returned by the query.');
                    }
                }
            }
            catch(err) {
            }
        }
    }
    
    return results;
}

/*  --------------------------------------------------------------------
    ACTUALLY GENERATE THE GRAPH
    -------------------------------------------------------------------- */

function getDataFromServer(requestFromClient) {
    
    var temp = $.ajax({url: EEBO_URL_PREFIX + 'queryDatabase?requestFromClient=' + encodeURIComponent(JSON.stringify(requestFromClient)), async: false}).responseText;

    try {

        var dataFromServer = JSON.parse(temp);
        
        EEBO_NGRAMS_SAVE_DATA = d3.tsvParse(dataFromServer[0].replace(/"/g, '\\\"'));

        EEBO_LINE_WORD_XREF = dataFromServer[1];
        EEBO_GROK_KEYS = dataFromServer[2];
        var errorMessages = dataFromServer[3];

        $('#errorMessages').html(errorMessages);
        
        if (EEBO_NGRAMS_SAVE_DATA.length > 0) {

            var queryKeys = Object.keys(EEBO_NGRAMS_SAVE_DATA[0]);

            EEBO_NGRAMS_SAVE_COUNTS = {};

            for (var a = 0; a < queryKeys.length; a++) {
                if (queryKeys[a] != 'year') {
                    for (var b = 0; b < EEBO_NGRAMS_SAVE_DATA.length; b++) {   

                        var year = EEBO_NGRAMS_SAVE_DATA[b]['year'];
                        var wordKey = queryKeys[a];
  
                        var parsed_values = JSON.parse(EEBO_NGRAMS_SAVE_DATA[b][wordKey])

                        EEBO_NGRAMS_SAVE_DATA[b][wordKey] = parsed_values[0]; 

                        if (year in EEBO_NGRAMS_SAVE_COUNTS) {
                        }
                        else {
                            EEBO_NGRAMS_SAVE_COUNTS[year] = {};
                        }    

                        if (wordKey in EEBO_NGRAMS_SAVE_COUNTS[year]) {
                        }
                        else {
                            EEBO_NGRAMS_SAVE_COUNTS[year][wordKey] = 0;
                        }  

                        EEBO_NGRAMS_SAVE_COUNTS[year][wordKey] = EEBO_NGRAMS_SAVE_COUNTS[year][wordKey] + parsed_values[1];  
                    }
                } 
            }

            var d = new Date();
            EEBO_SAVE_TIME_VALUE = d.getTime();
            
            EEBO_SAVE_SMOOTHING = requestFromClient['smoothing'];
            EEBO_SAVE_ROLLING_AVERAGE = requestFromClient['rollingAverage'];
        
            var htmlResults = '<div id=\'queryLegend\'></div><div id=\"graph' + EEBO_SAVE_TIME_VALUE + '\" class=\"graphArea\"></div><div id=\"data' + EEBO_SAVE_TIME_VALUE + '\" class=\"dataArea\"></div>';

            $('#resultsArea').html(htmlResults);
            
            var queryKeys = Object.keys(EEBO_NGRAMS_SAVE_DATA[0]);
            
            var regexQueryTerms = '';
            
            for (var a = 0; a < queryKeys.length; a++) {
                if (queryKeys[a].indexOf('rolling average') == -1 && queryKeys[a].indexOf('/') != -1)  {
                    if (regexQueryTerms > '') {
                        regexQueryTerms = regexQueryTerms + ' and ';
                    }
                    regexQueryTerms = regexQueryTerms + queryKeys[a];
                }
            }
            
            if (regexQueryTerms > '') {
                $('#regexQueryTerms').html('Regex(s) resolved to ' + regexQueryTerms);
            }
        }
    }
    catch(err) {
        $('#errorMessages').html('Server error processing query.  For support, please email spenteco@wustl.edu.');
    }
}

function actuallyDrawTheGraph(isRedraw) {

    var selectedData = [];
    
    if (EEBO_FROM_YEAR == 1473 && EEBO_TO_YEAR == 1700) {
        selectedData = EEBO_NGRAMS_SAVE_DATA   
    }
    else {
        for (var a = 0; a < EEBO_NGRAMS_SAVE_DATA.length; a++) {
            if (EEBO_NGRAMS_SAVE_DATA[a]['year'] >= EEBO_FROM_YEAR && EEBO_NGRAMS_SAVE_DATA[a]['year'] <= EEBO_TO_YEAR) {

                selectedData.push(EEBO_NGRAMS_SAVE_DATA[a])   
            }
        }
    }
    
    var keys = Object.keys(selectedData[0]);
    
    var hasRollingAverage = false;
    for (var a = 0; a < keys.length; a++) {
        if (keys[a].indexOf('rolling average') > -1) {
            hasRollingAverage = true;
        }
    }
    
    var minimum_value = 99999999;
    var maximum_value = -1;
    
    for (var a = 0; a < selectedData.length; a++) {
        for (var b = 0; b < keys.length; b++) {
        
            if (keys[b] != 'year') {
                if (parseFloat(selectedData[a][keys[b]]) < minimum_value) {
                    minimum_value = selectedData[a][keys[b]];
                }
                if (parseFloat(selectedData[a][keys[b]]) > maximum_value) {
                    maximum_value = selectedData[a][keys[b]];
                }
            }
        }
    }

    var data = selectedData;

    var all_years = []
    for (var a = 0; a < data.length; a++) {
        all_years.push(data[a]['year']);
    }

    var words_to_graph = [];
    var hasRollingAverage = false;

    var keys = Object.keys(data[0]);
    for (var a = 0; a < keys.length; a++) {
        if (keys[a] != 'year') {
            words_to_graph.push(keys[a]);
        }
        if (keys[a].indexOf('rolling average') > -1) {
            hasRollingAverage = true;
        }
    }

    //  ----------------------------------------------------------------

    //var margin = {top: 20, right: 80, bottom: 30, left: 80};
    //var width = 960 - margin.left - margin.right;

    var margin = {top: 20, right: 80, bottom: 30, left: 80};
    var width = SAVE_GRAPH_WIDTH - margin.left - margin.right;
    var height = SAVE_GRAPH_HEIGHT - margin.top - margin.bottom;

    var n = data.length;

    var xScale = d3.scaleLinear()
        .domain([all_years[0], all_years[n - 1]]) 
        .range([0, width]);

    EEBO_DEBUG = xScale;

    var yScale = d3.scaleLinear()
        .domain([0, maximum_value]) 
        .range([height, 0]);
        
    var smoothingFunction = d3.curveStep;
    if (EEBO_SAVE_SMOOTHING == "True") {
        smoothingFunction = d3.curveMonotoneX;    
    }

    var line = d3.line()
        .x(function(d) { return xScale(d.year); })
        .y(function(d) { return yScale(d.y); })
        .curve(smoothingFunction);

    $('#graph' + EEBO_SAVE_TIME_VALUE).html('');

    var svg = d3.select("#graph" + EEBO_SAVE_TIME_VALUE)
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var n_ticks = 12;
    if (SAVE_WIDTH < 415) {
        n_ticks = 6;
    }

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")).ticks(n_ticks));

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale));

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

    for (var a = 0; a < words_to_graph.length; a++) {

        var data_for_this_path = [];
        for (var b = 0; b < data.length; b++) {
            data_for_this_path.push({"year": data[b]['year'], "y": data[b][words_to_graph[a]]});
        }

        svg.append("path")
            .datum(data_for_this_path)
            .attr("class", "line")
            .attr("id", "line" + a)
            .attr("d", line)
            .attr("name", words_to_graph[a])
            .style("stroke", function(d) { 
                            return getCustomColor(color.range(), words_to_graph, EEBO_SAVE_ROLLING_AVERAGE, words_to_graph[a]);
                          })
            .style("stroke-width", "3");
        
        var computed_circle_r = parseInt(800 / data_for_this_path.length / 2) - 1;
        var actual_r = 3;
        if (computed_circle_r > actual_r) {
            actual_r = computed_circle_r;
        }
        if (actual_r > 10) {
            actual_r = 10;
        }

        for (var b = 0; b < data_for_this_path.length; b++) {

            svg.append("circle")
                .attr("class", "dot")
                .attr("a", a)
                .attr("name", words_to_graph[a])
                .attr("year", data_for_this_path[b]['year'])
                .attr("cx", function(d, i) { return xScale(data_for_this_path[b]['year']) })
                .attr("cy", function(d) { return yScale(data_for_this_path[b]['y']) })
                .attr("r", actual_r)
                .attr("fill", function(d) { 
                                    return getCustomColor(color.range(), words_to_graph, EEBO_SAVE_ROLLING_AVERAGE, words_to_graph[a]);
                                  })
                .attr("fill-opacity", "0.0")
                .attr('stroke', function(d) { 
                                    return getCustomColor(color.range(), words_to_graph, EEBO_SAVE_ROLLING_AVERAGE, words_to_graph[a]);
                                  })
                .attr('stroke-width', '1')
                .attr("stroke-opacity", "0.0");
        }

        var b = data_for_this_path.length - 1;

        if (words_to_graph[a].indexOf('rolling average') == -1) {

            svg.append("text")
                .attr("x", xScale(data_for_this_path[b]['year']))
                .attr("y", yScale(data_for_this_path[b]['y']))
                .attr("dy", ".35em")
                .attr("fill", function(d) { 
                                    return getCustomColor(color.range(), words_to_graph, 'none', words_to_graph[a]);
                                  })
                .text(words_to_graph[a])
                .attr("font-weight", "bold");
        }
    }

    var decoratedQueryTerms = decorateQueryTerms(words_to_graph);

    $('#queryLegend').html(decoratedQueryTerms);

    $('circle')
        .mouseover(
            function(event) {

                var path_node = $('#line' + $(this).attr('a'))[0];

                EEBO_MOUSEOVER_LINE = true;
                EEBO_PREV_STYLE = $(path_node).attr('style');

                $(path_node).attr('style', EEBO_PREV_STYLE.replace('stroke-width: 3px;', 'stroke-width: 6px;'));
                $(path_node).css('cursor', 'pointer');

                showMouseoverPopup(event, this);
            }   
        )
        .mousemove(
            function(event) {
                showMouseoverPopup(event, this);
            }   
        )
        .mouseout(
            function(event) {

                var path_node = $('#line' + $(this).attr('a'))[0];

                EEBO_MOUSEOVER_LINE = false;

                $(path_node).attr('style', EEBO_PREV_STYLE);
                $(path_node).css('cursor', 'default');

                $('#mouseoverPopup').css('display', 'none');
            }   
        );

}

function showMouseoverPopup(event, node) {
    
    var mouseY = event.pageY;
    var mouseX = event.pageX;

    var popupContent = $(node).attr('year') + ' ' + $(node).attr('name') + '<br/><br/>'; 

    var relative_frequency = 0.0;

    for (var a = 0; a < EEBO_NGRAMS_SAVE_DATA.length; a++) {
        if (EEBO_NGRAMS_SAVE_DATA[a]['year'] == $(node).attr('year')) {
            popupContent = popupContent + 'relative frquency ' + EEBO_NGRAMS_SAVE_DATA[a][$(node).attr('name')] + '<br/><br/>';
        }
    }

    var raw_name = $(node).attr('name').replace(' (rolling average)', '');

    var n_occurrences = EEBO_NGRAMS_SAVE_COUNTS[parseInt($(node).attr('year'))][raw_name];

    popupContent = popupContent + 'number of occurrences ' + n_occurrences;

    $('#mouseoverPopup').html(popupContent);
    $('#mouseoverPopup').css('top', (mouseY + 10) + 'px');
    $('#mouseoverPopup').css('left', (mouseX + 10) + 'px');
    $('#mouseoverPopup').css('display', 'block');
}

function getCustomColor(colors, queryTermsInResults, rollingAverage, queryTerm) {
 
    var result = '';
 
    if (rollingAverage == 'none') {
        
        for (var a = 0; a < queryTermsInResults.length; a++) {
            if (queryTermsInResults[a] == queryTerm) {
                result = colors[a];
            }
        }
    }
    else {
        
        var trimmedQueryTerm = queryTerm.replace(/ \(rolling average\)/, '');
        
        for (var a = 0; a < queryTermsInResults.length; a++) {
            if (queryTermsInResults[a] == trimmedQueryTerm) {
                result = colors[a];
            }
        }
        
        if (trimmedQueryTerm == queryTerm) {
            result = repeatedLighten(result, 4);
            result = repeatedDesaturate(result, 4);
        }
    }
    
    return result;
}

function repeatedLighten(color, repeatN) {
    
    result = color;
    
    for (var a = 0; a < repeatN; a++) {
        result = tinycolor.lighten(result);
    }
    
    return result.toHexString();
}

function repeatedDesaturate(color, repeatN) {
    
    result = color;
    
    for (var a = 0; a < repeatN; a++) {
        result = tinycolor.desaturate(result);
    }
    
    return result.toHexString();
}

function removeRollingAverageTextLabels(s, EEBO_SAVE_ROLLING_AVERAGE) {
    result = s;
    if (EEBO_SAVE_ROLLING_AVERAGE != 'none') {

        if (s.indexOf('rolling average)') == -1) {
            result = '';
        }
        else {
            result = s.replace(' (rolling average)', '');
        }
    }
    return result;
}

/*  --------------------------------------------------------------------
    THESE FUNCTIONS HANDLE IN-BROWSER CHANGES TO THE GRAPH.
    -------------------------------------------------------------------- */

function handleSmoothingChange() {
    
    var smoothing = "False";
    if ($("#smoothing").is(":checked")) {
        smoothing = "True";
    }
    
    EEBO_SAVE_SMOOTHING = smoothing;
    
    actuallyDrawTheGraph(true);
}

function handleRollingAverageChange(fromDocumentLoad) {

    EEBO_SAVE_ROLLING_AVERAGE = $('#rollingAverage').val();
        
    for (var r = 0; r < EEBO_NGRAMS_SAVE_DATA.length; r++) {
     
        var keys =  d3.keys(EEBO_NGRAMS_SAVE_DATA[r]);
        
        for (var k = 0; k < keys.length; k++) {
            if (keys[k].indexOf('rolling average)') != -1) {
                delete EEBO_NGRAMS_SAVE_DATA[r][keys[k]];    
            }
        }
    }
        
    if (EEBO_SAVE_ROLLING_AVERAGE != 'none') {
    
        var keys =  d3.keys(EEBO_NGRAMS_SAVE_DATA[0]);
        
        for (var k = 0; k < keys.length; k++) { 
            if (keys[k] != 'year') {
        
                for (var r = 0; r < EEBO_NGRAMS_SAVE_DATA.length; r++) {
                    
                    var lowR = r;
                    var highR = r;
                    
                    if (EEBO_SAVE_ROLLING_AVERAGE == '5_year') {
                        lowR = r - 2;
                        highR = r + 2;
                    }
                    
                    if (EEBO_SAVE_ROLLING_AVERAGE == '10_year') {
                        lowR = r - 4;
                        highR = r + 5;
                    }
                    
                    if (EEBO_SAVE_ROLLING_AVERAGE == '15_year') {
                        lowR = r - 7;
                        highR = r + 7;
                    }
                    
                    if (EEBO_SAVE_ROLLING_AVERAGE == '20_year') {
                        lowR = r - 9;
                        highR = r + 10;
                    }
                    
                    var accumulator = 0.0;
                    var numberAdded = 0;
                    
                    for (var r2 = lowR; r2 < highR + 1; r2++) {
                        if (r2 > -1 && r2 < EEBO_NGRAMS_SAVE_DATA.length) {
                            
                            accumulator = accumulator + parseFloat(EEBO_NGRAMS_SAVE_DATA[r2][keys[k]]);
                            numberAdded = numberAdded + 1;    
                        }
                    }
                    
                    EEBO_NGRAMS_SAVE_DATA[r][keys[k] + ' (rolling average)'] = (accumulator / numberAdded).toString();
                }
            }
        }
    
    }
        
    if (fromDocumentLoad == true) {
        actuallyDrawTheGraph(false);
    }
    else {
        actuallyDrawTheGraph(true);
    }
}

/*  --------------------------------------------------------------------
    
    -------------------------------------------------------------------- */

function linkToGrok(word, corpus) {

    var blacklab_field = '';
    if (corpus == '/data/eebo_tcp/plaintext') {
        blacklab_field = 'word';
    }
    if (corpus == '/data/eebo_tcp/plaintext_reg') {
        blacklab_field = 'reg';
    }
    if (corpus == '/data/eebo_tcp/plaintext_lem') {
        blacklab_field = 'lemma';
    }
    
    window.open('https://ada.artsci.wustl.edu/corpus-frontend-1.2/eebotcp/search/hits?number=20&first=0&patt=[' + 
                    blacklab_field + '="' + word + '"]');
}

function handleSaveButton(windowLocation) {
    
    window.open("mailto:abasu@wustl.edu?subject=Interesting query results&body=" + encodeURIComponent(windowLocation));
}
    
function toggleSavedQueries() {
 
    if ($("#savedQueriesToggle").html() == "show") {
        $("#savedQueriesToggle").html("hide");  
        $("#savedQueries").css("display", "block"); 
    }
    else {
        $("#savedQueriesToggle").html("show");  
        $("#savedQueries").css("display", "none"); 
    }
}

function showHideInstructions() {

    if ($('#eeboInstructions').css('display') == 'block') {
        $('#eeboInstructions').css('display', 'none');
        $('#instructionToggle').html('show instructions');
    }
    else {
        $('#eeboInstructions').css('display', 'block');
        $('#instructionToggle').html('hide instructions');
    }
}
