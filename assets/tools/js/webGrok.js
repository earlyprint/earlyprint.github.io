
var SOLR = ''
//var NUMBER_OF_TEXTS_PER_PAGE = 20;
var NUMBER_OF_TEXTS_PER_PAGE = 100;

/* from http://www.joezimjs.com/javascript/3-ways-to-parse-a-query-string-in-a-url/ */
 
var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;
 
    // Split into key/value pairs
    queries = queryString.split("&");
 
    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
 
    return params;
};

function runGrok() {
    
    var corpus = $('#corpus').val();
    var searchPattern = $('#searchPattern').val().replace(/“/g, '"').replace(/”/g, '"');
    var startYear = parseInt($("#yearSlider").rangeSlider("values").min);
    var endYear = parseInt($("#yearSlider").rangeSlider("values").max);
    var authors = $('#authors').val();
    var titles = $('#titles').val();

    console.log('searchPattern', searchPattern);
    
    window.location.assign(window.location.pathname + '?corpus=' + corpus + '&searchPattern=' + searchPattern + '&startYear=' + startYear + '&endYear=' + endYear + '&authors=' + authors + '&titles=' + titles + '&page=1');
}
        
function pageThroughResults(goToPage) {
        
    var queryString = window.location.search;
    
    var queryStringParms = parseQueryString(queryString);
    
    var corpus = $.trim(queryStringParms['?corpus']);
    var searchPattern = $.trim(queryStringParms['searchPattern']);
    var startYear = $.trim(queryStringParms['startYear']);
    var endYear = $.trim(queryStringParms['endYear']);
    var authors = $.trim(queryStringParms['authors']);
    var titles = $.trim(queryStringParms['titles']);
    var page = parseInt($.trim(queryStringParms['page']));
    
    window.location.assign(window.location.pathname + '?corpus=' + corpus + '&searchPattern=' + searchPattern + '&startYear=' + startYear + '&endYear=' + endYear + '&authors=' + authors + '&titles=' + titles + '&page=' + goToPage + '&NUMBER_OF_TEXTS_PER_PAGE=' + NUMBER_OF_TEXTS_PER_PAGE);

}

$(document).ready(
    function() {
        
        var queryString = window.location.search;
        
        if (queryString == '') {
        
            $('#results').css('display', 'none');

            $("#yearSlider").rangeSlider({bounds: {min: 1473, max: 1700}, 
                                            defaultValues: {min: 1473, max: 1700}, 
                                            valueLabels: "show"});

            $('#topPagingWidget').html('');
            $('#bottomPagingWidget').html('');
        }
        else {
        
            $('#results').css('display', 'none');
            $('#runningQueryMessage').css('display', 'block');
    
            var queryStringParms = parseQueryString(queryString);
    
            var corpus = $.trim(queryStringParms['?corpus']);
            var searchPattern = $.trim(queryStringParms['searchPattern']).replace(/\+/g, '%2B');
            var startYear = $.trim(queryStringParms['startYear']);
            var endYear = $.trim(queryStringParms['endYear']);
            var authors = $.trim(queryStringParms['authors']);
            var titles = $.trim(queryStringParms['titles']);
            var page = parseInt($.trim(queryStringParms['page']));
            
            $('#corpus > option').each(
                function() {
                    
                    if ($(this).val() == decodeURIComponent(corpus)) {
                        $(this).prop('selected', true);
                    }
                    else {
                        $(this).prop('selected', false);
                    }   
                }
            );
            
            $('#searchPattern').val(decodeURIComponent(searchPattern));
        
            $("#yearSlider").rangeSlider({bounds: {min: 1473, max: 1700}, defaultValues: {min: startYear, max: endYear}, valueLabels: "show"});
            
            $('#authors').val(decodeURIComponent(authors));
            $('#titles').val(decodeURIComponent(titles));
            
           //console.log('corpus', corpus, 'searchPattern', searchPattern, 'startYear', startYear, 'endYear', endYear, 'authors', authors, 'titles', titles, 'page', page);

            var solrQuery = '';

            if (searchPattern > '') {
                solrQuery = 'text:' + searchPattern.toLowerCase();
            }

            if (solrQuery > '') {
                solrQuery = solrQuery + '+AND+';
            }
            solrQuery = solrQuery + 'date:[' + startYear + '+TO+' + endYear + ']';

            if (authors > '') {
                solrQuery = solrQuery + '+AND+' + 'author:' + authors.toLowerCase();
            }

            if (titles > '') {
                solrQuery = solrQuery + '+AND+' + 'title:' + titles.toLowerCase();
            }

            var solrUrl = 'https://earlyprint.wustl.edu/proxy.php?corpus=' + corpus + '&page=' + (page - 1) + '&solrQuery=' + encodeURIComponent(solrQuery) + '&NUMBER_OF_TEXTS_PER_PAGE=' + NUMBER_OF_TEXTS_PER_PAGE;

            getFromSolr(solrUrl, page, searchPattern);
        }

        addEnterKeyEvents();
    }
);

function getFromSolr(solrUrl, page, searchPattern) {

   console.log('trying', solrUrl);

    $.get(solrUrl,
        function(data) {

            if ($.trim(data) > '') {

                try {
            
                    SOLR = JSON.parse(data)[1];

                    var solr_error_message = '';
                    try {
                        solr_error_message = SOLR['error']['msg'];
                    }
                    catch(err) {
                    }

                    if (solr_error_message > '') {

                        if (solr_error_message == 'maxClauseCount is set to 1024') {
                            $('#results').html('<div class="solrErrorMessage">Please make your wildcarded search pattern more specific;<br/>the search pattern you have now results in more than 1,024 words.</div>');
                        }
                        else {
                            $('#results').html('<div class="solrErrorMessage">solr/lucene error message:<br/>' + solr_error_message + '</div>');
                        }
                        
                        $('#runningQueryMessage').css('display', 'none');
                        $('#results').css('display', 'block');
                    }
                    else {

                        var numberOfTexts = SOLR.response.numFound;
                        var totalPages = Math.floor(numberOfTexts / NUMBER_OF_TEXTS_PER_PAGE) + 1;

                        var pageSnippet = 'Page ' + page + ' of ' + totalPages + '.';

                        var previousPage = -1;
                        if (page > 1) {
                            pageSnippet = '<a href="javascript:pageThroughResults(' + (page - 1) + ')">Previous</a> ' + pageSnippet;
                        }
                        var nextPage = -1
                        if (page < totalPages) {
                            pageSnippet = pageSnippet + ' <a href="javascript:pageThroughResults(' + (page + 1) + ')">Next</a>';
                        }
                             
                        var number_found_message = SOLR.response.numFound + ' documents in results.';
                        if (SOLR.response.numFound > NUMBER_OF_TEXTS_PER_PAGE) {
                            number_found_message = number_found_message + '  Showing ' + NUMBER_OF_TEXTS_PER_PAGE + ' documents per page.';
                        }

                        $('#resultsInformation').html(number_found_message);
                   
                        $('#topPagingWidget').html(pageSnippet);
                        $('#bottomPagingWidget').html(pageSnippet);

                        $('#results').html('<table id="resultsTable"></table>');

                        for (var a = 0; a < SOLR.response.docs.length; a++) {
                            
                            var textDetails =   '<td class="key">' + 
                                                    '<a href="http://name.umdl.umich.edu/' + SOLR.response.docs[a].id + '">' +
                                                        SOLR.response.docs[a].id +
                                                    '</a>' +
                                                '</td>' +
                                                '<td class="date">' + 
                                                    SOLR.response.docs[a].date +
                                                '</td>' +
                                                '<td class="author">' + 
                                                    SOLR.response.docs[a].author +
                                                '</td>' +
                                                '<td class="title">' + 
                                                    SOLR.response.docs[a].title +
                                                '</td>';

                            try {
                                for (var b = 0; b < SOLR.highlighting[SOLR.response.docs[a].id].text.length; b++) {

                                    $('#resultsTable').append('<tr>' + textDetails + '<td>' + $.trim(SOLR.highlighting[SOLR.response.docs[a].id].text[b]) + '</td></tr>');
                                }
                            }
                            catch(err) {

                                if ($.trim(searchPattern) == '') {
                                    var hDetails = '<td class="match_left"></td><td class="match"></td><td class="match_right"></td>';    
                                    $('#resultsTable').append('<tr">' + textDetails + hDetails + '</tr>');
                                }
                                else {

                                    $('#resultsTable').append('<tr>' + textDetails + '<td><em>Too many matches to highlight.  Try a more specific search pattern.</em></td></tr>');
                                }
                            }
                        }
                        
                        $('#runningQueryMessage').css('display', 'none');
                        $('#results').css('display', 'block');
                    }

                }
                catch(err) {
                            
                    $('#results').html('<div class="solrErrorMessage">Cannot parse solr response:<br/>' + data + '</div>');
                    
                    $('#runningQueryMessage').css('display', 'none');
                    $('#results').css('display', 'block');
                }
            }
            else {
                console.log('retrying', solrUrl);
                getFromSolr(solrUrl, page, searchPattern);
            }
        }
    ); 

}

function addEnterKeyEvents() {

    $('#searchPattern').keypress(
        function(e) {
            if(e.which == 13) {
                runGrok();
            }
        }
    );

    $('#authors').keypress(
        function(e) {
            if(e.which == 13) {
                runGrok();
            }
        }
    );

    $('#titles').keypress(
        function(e) {
            if(e.which == 13) {
                runGrok();
            }
        }
    );

}

function toggle_instructions() {

    if ($('#instructions_link').html() == 'Show Instructions') {
        $('#instructions_link').html('Hide Instructions');

        var pane_width = window.outerWidth;
        if (pane_width > parseInt($('#leftContent').width())) {
            pane_width = $('#leftContent').width();
        }

        console.log('pane_width', pane_width, 'window.outerWidth', window.outerWidth, "$('#leftContent').width()", $('#leftContent').width(), (pane_width > parseInt($('#leftContent').width())));

        $('#instructions').css({'display': 'inline-block', 'width': (pane_width - 50) + 'px'});
    }
    else {
        $('#instructions_link').html('Show Instructions');
        $('#instructions').css({'display': 'none'});
    }
}

