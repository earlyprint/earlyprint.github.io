let map_data = [];
let metadata = {};
let metadata_values = ['Bible', 'Poetry', 'Civil War, 1642-1649'];
let radius = 3;
let limit = 2500;
let context,
    canvas,
    circles,
    width,
    height,
    new_data,
    selectedPoint;

const color = d3.scaleOrdinal(['#4477AA','#EE6677','#228833','#CCBB44','#66CCEE','#AA3377']);

function draw(transform, limit) {
    context.clearRect(0, 0, width, height);
    let active;
    if (limit) {
	limited = new_data.slice(limit,limit*2);
        limited.forEach(function(point) {
    	    drawPoint(point, transform);
		if(!point.selected) {
                    drawPoint(point, transform);
                }
                else {
                    active = point;
                }
        });
    } else {
        new_data.forEach(function(point) {
		if(!point.selected) {
                    drawPoint(point, transform);
                }
                else {
                    active = point;
                }
        });
    }


    if(active) {
            context.strokeStyle = 'red';
	    context.lineWidth = 2;
            drawPoint(active, transform);
            context.strokeStyle = '#999';
	    context.lineWidth = 1;
        }
}

function drawPoint(point, transform) {
	let d = transform.apply([point.x, point.y]);
        context.beginPath();
	context.globalAlpha = 0.5;
        context.fillStyle = '#DDD';
	metadata_values.forEach(m => {
	    if (point.subject.indexOf(m) > -1) {
		context.globalAlpha = 1;
		context.fillStyle = color(m);
	    } 
	});
	context.arc(d[0], d[1], radius, 0, 2*Math.PI);
	context.closePath();
	context.stroke();
	context.fill();
}


function append_checkbox(id_no, checkbox_type, checkbox_value_count, checkbox_value) {
    $('#checkbox-list').append(`<li id="container_${id_no}"><input type="checkbox" name="${checkbox_type}_${id_no}" id="${checkbox_type}_${id_no}"  name="${checkbox_type}_${id_no}" onchange="javascript:handle_checkbox('${checkbox_type}_${id_no}', '${checkbox_type}', '${checkbox_value}');"><label for="${checkbox_type}_${id_no}">${checkbox_value} (${checkbox_value_count})</label></li>`);
    if (metadata_values.indexOf(checkbox_value) > -1) {
	    $(`#${checkbox_type}_${id_no}`).attr('checked', true);
	    $(`#container_${id_no}`).css('background-color', color(checkbox_value));
    }
}

function add_drop_downs() {
    color_domain = [];
    for (var a = 5; a < map_data[2].length; a++) {
	color_domain.push(map_data[2][a][0]);
    }
    color.domain(color_domain);
    for (var a = 5; a < map_data[2].length; a++) {
        append_checkbox(a, 'NA', map_data[2][a][0], map_data[2][a][1]);
    }
}

function handle_checkbox(id, metadata_type, metadata_value) {

    var turn_on_nodes = $(`#${id}`).is(':checked');

    if (turn_on_nodes === true) {
    	metadata_values.push(metadata_value);
	$(`#container_${id.split('_')[1]}`).css('background-color', color(metadata_value));
    } else {
	var i = metadata_values.indexOf(metadata_value);
	metadata_values.splice(i, 1);
	$(`#container_${id.split('_')[1]}`).css('background-color', 'inherit');
    }
    var transform = d3.zoomTransform(canvas.node());
    draw(transform);
}

function filterSubject() {
  // Declare variables
  let input = document.getElementById('subjectFilter');
  let filter = input.value.toUpperCase();
  let ul = document.getElementById("checkbox-list");
  let li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (let i = 0; i < li.length; i++) {
    let label = li[i].getElementsByTagName("label")[0];
    let txtValue = label.textContent || label.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function showAbout() {
    let about = document.querySelector("#about");
    about.classList.remove("hide-about");
}

function searchNearby(quadtree, xmin, ymin, xmax, ymax) {
  const results = [];
  quadtree.visit(function(node, x1, y1, x2, y2) {
    if (!node.length) {
      do {
        var d = node.data;
        if (d.x >= xmin && d.x < xmax && d.y >= ymin && d.y < ymax) {
          results.push(d);
        }
      } while (node = node.next);
    }
    return x1 >= xmax || y1 >= ymax || x2 < xmin || y2 < ymin;
  });
  return results;
}

$( document ).ready(function() {
    d3.json('map_data.js').then(function( data ) {
        map_data = data;
        add_drop_downs();
        
        for (var a = 0; a < map_data[0].length; a++) {
            metadata[map_data[0][a][0]] = map_data[0][a][4];
        }
        
        let graph_data = map_data[0];
        const padding = 0;

	var zoom = d3.zoom().scaleExtent([0.4, 20]).on("zoom", zoomGo).on("end", zoomEnd);
        canvas = d3.select("canvas").on("click", onClick).call(zoom);
        width = window.innerWidth;//canvas.property("width");
        height = window.innerWidth;//canvas.property("height");
	let canvas_el = document.getElementById("graph");
	canvas_el.width = width;
	canvas_el.height = height;
        context = canvas.node().getContext("2d");
        
        let xScale = d3.scaleLinear()
            .domain([d3.min(graph_data, function(d) { return d[1]; }) - 1.0, 
                     d3.max(graph_data, function(d) { return d[1]; }) + 1.0])
            .range([padding, width - padding]);
        
        let yScale = d3.scaleLinear()
            .domain([d3.min(graph_data, function(d) { return d[2]; }) - 1.0, 
                     d3.max(graph_data, function(d) { return d[2]; }) + 1.0])
            .range([height - padding, padding]);
        
	new_data = graph_data.map((d,i) => { return {'i': i, 'id': d[0], 'x': xScale(d[1]), 'y': yScale(d[2]), 'title': d[3].title, 'author': d[3].author, 'year': d[3].year, 'subject': d[3].subject }});
//        graph_data.forEach(v => {
//            v[1] = xScale(v[1]);
//            v[2] = yScale(v[2]);
//	    map_data[v[0]] = v.slice(1);
//        })
    
    function x(d) { return d.x; };
    function y(d) { return d.y; };

    let quadTree = d3.quadtree(new_data, x, y);

    let searchData = new_data.map(d => {return {'i': d.i, 'title': d.title, 'author': d.author};});
    searchData = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title', 'author'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      identify: function(obj) { return obj.i; },
      local: searchData 
    });
    
    $('#search .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'searchData',
      source: searchData,
      display: (d) => { return `${d.title}\n${d.author}`;}
    });
    $('.typeahead').bind('typeahead:select', function(ev, suggestion) {
      let item = new_data[suggestion.i]
      selectItem(item);
      zoom.translateTo(canvas, item.x, item.y, [width/2,height/4]);
      zoom.scaleTo(canvas.transition().duration(750), 5, [width/2,height/4]);
    });

    function selectItem(item) {
        let transform = d3.zoomTransform(canvas.node());
	let infoBox = d3.select('#pointInfo')
        if(selectedPoint) {
            new_data[selectedPoint].selected = false;
        }
	if (item) {
	    let newHTML = `<em>TCP ID Number:</em> ${item.id}<br/><b>${item.title}</b><br/><br/><em>Author(s):</em><br/>${item.author}<br/><em>Publication date:</em> ${item.year}<br/><br><em>Subject Headings:</em><br/>${item.subject}<br/><br/><a href="https://ada.artsci.wustl.edu/catalog/doc/${item.id}.xml" target="_blank">View more info</a><br><a href="https://texts.earlyprint.org/works/${item.id}.xml" target="_blank">Read this text</a><br/><br/><strong>Nearby texts:</strong>`;
            item.selected = true;
            selectedPoint = item.i;
	    let r = 5;
	    let nearbyPoints = searchNearby(quadTree, item.x-r, item.y-r, item.x+r, item.y+r);
	    nearbyPoints.forEach(n => {
		    if (n.id !== item.id) {
		      newHTML = newHTML + `<br/><br/><em>${n.id} ${n.author}</em><br><em><a href="https://ada.artsci.wustl.edu/catalog/doc/${item.id}.xml" target="_blank">${n.title.slice(0,50)}...</a></em>`
		    }
	    });
	    infoBox.html(newHTML);
	} else {
            infoBox.html("Click a point to get more information, or use the search box above.<br><br><em>Scroll to zoom. Click and drag to pan.</em>");
	}
	draw(transform);
    }


    function onClick() {
	$('.typeahead').typeahead('val', '');
        let mouse = d3.mouse(this);
        let transform = d3.zoomTransform(canvas.node());
	let d = transform.invert([mouse[0], mouse[1]]);

        // find the closest point in the dataset to the clicked point
	let closest = quadTree.find(d[0],d[1],radius);
	selectItem(closest);
    }

    function zoomGo() {
        context.clearRect(0, 0, width, height);
        draw(d3.event.transform, limit);
    }
    function zoomEnd() {
        context.clearRect(0, 0, width, height);
        draw(d3.event.transform);
    }
    
    context.strokeStyle = '#999';
    draw(d3.zoomIdentity);
    let progress = document.querySelector(".loader");
    progress.classList.remove("is-active");

    d3.select('#about').on('click', function() {
	    this.classList.add('hide-about');
    });
    });
});
