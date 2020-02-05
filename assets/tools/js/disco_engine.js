
var GLOBAL_URL_PARAMS = '';
var HOSTNAME = 'https://talus.artsci.wustl.edu';
//var HOSTNAME = 'http://localhost';

$( document ).ready(function() {

    GLOBAL_URL_PARAMS = new URLSearchParams(window.location.search);

    if (GLOBAL_URL_PARAMS.has('author')) {
        $('#author_1').val(GLOBAL_URL_PARAMS.get('author'));
    }

    if (GLOBAL_URL_PARAMS.has('title')) {
        $('#title_1').val(GLOBAL_URL_PARAMS.get('title'));
    }

    if (GLOBAL_URL_PARAMS.has('eebo_tcp_id')) {
        $('#eebo_tcp_id_2').val(GLOBAL_URL_PARAMS.get('eebo_tcp_id'));
    }

    if (GLOBAL_URL_PARAMS.has('n_results')) {
        $('#n_results').val(GLOBAL_URL_PARAMS.get('n_results'));
    }

    if (GLOBAL_URL_PARAMS.has('which_to_do')) {

        $('#results').html('<h2 style="color:blue;">Working . . . </h2>');

        $.get(HOSTNAME + '/all_3_prototype/run_query.php?' + GLOBAL_URL_PARAMS.toLocaleString())
            .done(
                function(data) {

                    $('#results').html(data);

                    $('a').each(
                        function() {
                            if ($(this).attr('href').indexOf('find_texts') > -1) {
                                var link_parts = $(this).attr('href').split('=');
                                var tcp_id = link_parts[link_parts.length - 1];
                                $(this).attr('href', 'javascript:handle_link("' + tcp_id + '");');
                            }
                        }
                    );

                    console.log('indexOf', document.location.href.indexOf('find_texts'));

                    if (document.location.href.indexOf('find_texts') > -1) {
                        open_tab('tfidf_content');
                    }
                }
            );
    }
});

function handle_button(n) {

    var parameters = '';

    if (n == 1) {

        GLOBAL_URL_PARAMS.set('which_to_do', 'lookup_tcp_id'); 
        GLOBAL_URL_PARAMS.set('author', $('#author_1').val());
        GLOBAL_URL_PARAMS.set('title', $('#title_1').val());
    }
    if (n == 2) {

        GLOBAL_URL_PARAMS.set('which_to_do', 'find_texts'); 
        GLOBAL_URL_PARAMS.set('eebo_tcp_id',  $('#eebo_tcp_id_2').val());
        GLOBAL_URL_PARAMS.set('n_results', $('#n_results').val());
        GLOBAL_URL_PARAMS.set('tfidf_weight', '6');
        GLOBAL_URL_PARAMS.set('mallet_weight', '6');
        GLOBAL_URL_PARAMS.set('tag_weight', '6');
    }

    window.location.assign('/lab/tool_discovery_engine.html?' + GLOBAL_URL_PARAMS.toLocaleString());
}

function handle_link(tcp_id) {
    $('#eebo_tcp_id_2').val(tcp_id);
    handle_button(2);
}

function draw_scatter_plot(id) {

    if (id.indexOf('combined') > -1) {
        $('#scatter_' + id).html($('#variable_' + id).html());
        return;
    }

    var graph_type = 'tf-idf';
    var mallet_topic_keys = '';

    if (id.indexOf('mallet') > -1) {
        graph_type = 'mallet';
        mallet_topic_keys = JSON.parse($('#mallet_topc_keys').html());
    }
    if (id.indexOf('tag') > -1) {
        graph_type = 'tag';
    }

    var all_data = JSON.parse($('#variable_' + id).html());

    var from_tcp_id = all_data[0];
    var to_tcp_id = all_data[1];
    var graph_data = all_data[2];

    var w = 450;
    var h = 450;
    var padding = 50;

    var scale_index = 1;
    if (graph_data[0][2] > graph_data[0][1]) {
        scale_index = 2;
    }

    var xScale = d3.scaleLinear()
        .domain([0, d3.max(graph_data, function(d) { return d[scale_index]; }) + 0.05])
        .range([padding, w - padding]);
        
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(graph_data, function(d) { return d[scale_index]; }) + 0.05])
        .range([h - padding, padding]);
		
    var xAxis = d3.axisBottom().scale(xScale).ticks(5);
    
    var yAxis = d3.axisLeft().scale(yScale).ticks(5);
    
    var svg = d3.select('#scatter_' + id)
                .append('svg')
                .attr('width', w)
                .attr('height', h);

    var tooltip = $('#tooltip');

    svg.append("line")
        .attr('x1', xScale(0))
        .attr('y1', yScale(0))
        .attr('x2', xScale(graph_data[0][scale_index] + 0.05))
        .attr('y2', yScale(graph_data[0][scale_index] + 0.05))
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('opacity', 0.5);
					
    svg.selectAll('circle')
        .data(graph_data)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
            return xScale(d[1]);
        })
        .attr('cy', function(d) {
            return yScale(d[2]);
        })
        .attr('r', 7)
        .attr('fill', 'green')
        .attr('opacity', 0.5)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .on('mouseover',
            function(d) {
                d3.select(this).attr('fill', 'red');

                var html  = '<b>' + d[0] + '</b><br/>' +
                            from_tcp_id + ': ' + (Math.round(d[1]  * 1000) / 1000) + '<br/>' +
                            to_tcp_id + ': ' + (Math.round(d[2]  * 1000) / 1000) + '<br/>';

                if (graph_type == 'mallet') {
                    html  = '<p class="tooltip_p"><b>topic ' + d[0] + '</b> ' + mallet_topic_keys[d[0]] + '</p>' +
                            from_tcp_id + ': ' + (Math.round(d[1]  * 1000) / 1000) + '<br/>' +
                            to_tcp_id + ': ' + (Math.round(d[2]  * 1000) / 1000) + '<br/>';
                }

                $(tooltip).html(html);
                $(tooltip).css({'left': (d3.event.pageX + 15) + 'px',
                                'top': (d3.event.pageY + 15) + 'px',
                                'display': 'block'});

            })
        .on('mouseout',
            function(d) {
                d3.select(this).attr('fill', 'green');
                $(tooltip).css({'display': 'none'});
            });
        
    svg.append('g')
        .attr('class', 'x axis')	
        .attr('transform', 'translate(0,' + (h - padding) + ')')
        .call(xAxis);
    
    svg.append('g')
        .attr('class', 'y axis')	
        .attr('transform', 'translate(' + padding + ', 0)')
        .call(yAxis);

    svg.append('text')
        .attr('class', 'x label')
        .attr('text-anchor', 'end')
        .attr('font-size', 12)
        .attr('font-weight', 'bold')
        .attr('x', 275)
        .attr('y', h)
        .text(graph_type + ' score -- ' + from_tcp_id);

    svg.append('text')
        .attr('class', 'y label')
        .attr('text-anchor', 'end')
        .attr('font-size', 12)
        .attr('font-weight', 'bold')
        .attr('x', -150)
        .attr('y', 0)
        .attr('dy', '.75em')
        .attr('transform', 'rotate(-90)')
        .text(graph_type + ' score -- ' + to_tcp_id);


}

function toggle_row(id) {

    if ($('#graph_' + id).css('display') == 'none') {

        if ($('#scatter_' + id).html() == '') {
            draw_scatter_plot(id);
        }

        $('#graph_' + id).css('display', 'block');
        $('#link_' + id).html('-');
    }
    else {
        $('#graph_' + id).css('display', 'none');
        $('#link_' + id).html('+');
    }
}

function open_tab(tab_id) {

    console.log('open_tab', tab_id);

    $('.tabcontent').each(
        function() {
            $(this).css('display', 'none');
        }
    );

    $('.tablinks').each(
        function() {
            $(this).removeClass('active')
        }
    );

    $('#' + tab_id).css('display', 'block');
    
    $('#' + tab_id + '_link').addClass('active');
}
