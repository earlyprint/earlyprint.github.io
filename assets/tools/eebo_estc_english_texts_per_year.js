/*******************************************************************************
 * Bar graph of english texts in EEBO per year.
 *******************************************************************************/

filename = '/assets/tools/eebo_estc_english_texts_per_year.csv'

var width = 1000;
var height = 600;
// For tablet devices.
//height = height < width ? width : height;

// Set the main parameters
var yearData;
var startYear = 1473;
var endYear = 1700;
var barWidth;
var padding = 50;
var xScale;
var yScale;
var svg;
var showEstc = 1;

/******************************************************************************
 * JQuery range slider
 ******************************************************************************/
$(document).ready(function() {
        
    $(".wrapper").css("max-width", "1100px");

	$( "#slider_range_estc" ).slider({
		range: true,
		min: 1473,
		max: 1700,
		values: [ 1473, 1700 ],
		slide: function( event, ui ) {
			startYear = ui.values[0];
			endYear = ui.values[1];
			initGraph();
			updateGraph();
		}
	});
});

/******************************************************************************
 * Load the csv file - the main action happens here.
 ******************************************************************************/
d3.csv(filename, function(d){
	yearData = d;
	initGraph();
	buildGraph();

	d3.select('#estc_checkbox')
		.on('change', function(){

			svg.selectAll('rect')
				.remove();

			if(this.checked){
				showEstc = 1;
			}else{
				showEstc = 0;
			}

			initGraph();
			updateGraph();
		});
});

/******************************************************************************
 * Initialize the graph's parameters
 ******************************************************************************/
function initGraph(){
	barWidth = (width - padding * 2) / (endYear - startYear + 1);

	eeboMax = d3.max(yearData, function(d){
			if(+d['year'] >= startYear && +d['year'] <= endYear) {
				return +d['eebo'];
			}
		});
	
	estcMax = d3.max(yearData, function(d){
			if(+d['year'] >= startYear && +d['year'] <= endYear) {
				return +d['estc'];
			}
	});

	if(showEstc){
		max = d3.max([eeboMax, estcMax]);
	}else{
		max = eeboMax;
	}

	xScale = d3.scale.linear()
		 .domain([startYear, endYear])
		 .range([padding, width - padding]);

	xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom')
		.tickFormat(function(d){return d});

	yScale = d3.scale.linear()
		.domain([0, max])
		.range([height - padding, padding]);

	yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left');
}

/******************************************************************************
 * Build the graph
 ******************************************************************************/
function buildGraph(){
	svg = d3.select('#barplot')
		.append('svg')
		.attr({
				width: width,
				height: height
		});

	if(showEstc){
		var estcBars = svg.selectAll('rect.estc')
			.data(yearData.filter(function(d){
				if(+d['year'] >= startYear && +d['year'] <= endYear) {
					return +d['year'];
				}
			}))
			.enter()
			.append('rect')
			.attr('class', 'estc')
			.attr({
				x: function(d){return xScale(+d['year'])},
				y: function(d){return yScale(+d['estc'])},
				height: function(d){return height - padding - yScale(+d['estc'])},
				width: barWidth - 1,
				fill: 'lightgray'
			})
			.append('title')
			.text(function(d, i){
				if(+d['year'] >= startYear && +d['year'] <= endYear) {
					return +d['year'] + ": " +d['estc'] + ' titles in ESTC';
				}
			});
	}

	var eeboBars = svg.selectAll('rect.eebo')
		.data(yearData.filter(function(d){
			if(+d['year'] >= startYear && +d['year'] <= endYear) {
				return +d['year'];
			}
		}))
		.enter()
		.append('rect')
		.attr('class', 'eebo')
		.attr({
			x: function(d){return xScale(+d['year'])},
			y: function(d){return yScale(+d['eebo'])},
			height: function(d){return height - padding - yScale(+d['eebo'])},
			width: barWidth - 1
		})
		.append('title')
		.text(function(d, i){
			if(+d['year'] >= startYear && +d['year'] <= endYear) {
				return +d['year'] + ": " +d['eebo'] + ' titles in TCP-EEBO';
			}
		});

	svg.append('g')
		.attr('class', 'xAxis')
		.attr('transform', 'translate(' + (barWidth / 2) + ',' + (height - padding + 2) + ')')
		.call(xAxis);

	svg.append('g')
		.attr('class', 'yAxis')
		.attr('transform', 'translate(' + (padding - 2) + ',0)')
		.call(yAxis);

	svg.selectAll('.xAxis, .yAxis')
		.style({
			'font-family': 'sans-serif',
			'font-size': '10pt',
			fill: 'none',
			stroke: 'black'
		})
}

/******************************************************************************
 * Update the graph
 ******************************************************************************/
function updateGraph(){
	dataSubset = yearData.filter(function(d){
			if(+d['year'] >= startYear && +d['year'] <= endYear) {
				return +d['year'];
			}
	});

	if(showEstc){
		estcBars = svg.selectAll('rect.estc')
			.data(dataSubset, function(d){return +d['year']});

		estcBars.exit()
			.remove();

		estcBars.enter()
			.append('rect')
			.attr('class', 'estc')
			.attr({
				x: function(d){return xScale(+d['year'])},
				y: function(d){return yScale(+d['estc'])},
				height: function(d){return height - padding - yScale(+d['estc'])},
				width: barWidth - 20,
				fill: 'lightgray'
			}); 

		estcBars.transition()
			.duration(1000)
			.attr({
				x: function(d){return xScale(+d['year'])},
				y: function(d){return yScale(+d['estc'])},
				height: function(d){return height - padding - yScale(+d['estc'])},
				width: barWidth - 1
			});

		estcBars.append('title')
			.text(function(d, i){
				return d['year'] + ": " + d['estc'] + ' titles in ESTC';
			});
	}

	eeboBars = svg.selectAll('rect.eebo')
		.data(dataSubset, function(d){return +d['year']});

	eeboBars.exit()
		.remove();

	eeboBars.enter()
		.append('rect')
		.attr('class', 'eebo')
		.attr({
			x: function(d){return xScale(+d['year'])},
			y: function(d){return yScale(+d['eebo'])},
			height: function(d){return height - padding - yScale(+d['eebo'])},
			width: barWidth - 2
		}); 

	eeboBars.transition()
		.duration(1000)
		.attr({
			x: function(d){return xScale(+d['year'])},
			y: function(d){return yScale(+d['eebo'])},
			height: function(d){return height - padding - yScale(+d['eebo'])},
			width: barWidth - 1
		});

	eeboBars.append('title')
		.text(function(d, i){
			return d['year'] + ": " + d['eebo'] + ' titles in TCP-EEBO';
		});

	t = svg.transition().duration(1000);
	t.select('g.xAxis')
		.attr('transform', 'translate(' + (barWidth / 2) + ',' + (height - padding + 2) + ')')
		.call(xAxis);
	t.select('g.yAxis')
		.call(yAxis);
}
