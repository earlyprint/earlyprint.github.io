---
layout: page
title: Download
permalink: /download/
---

Search to filter the table, and click on a link to download any of the corrected and linguisticaly-annotated *EarlyPrint* XML texts, or the *Oxford Text Archive* (OTA) downloadable XML, HTML, and EPUB files, which include the original *Text Creation Partnership* XML. Some fields have been truncated for space, but the full field is available on mouseover and when searching and downloading the data. We provide Library of Congress Subject Headings when available, in the "Keywords" column. Keep in mind that only a portion of the texts have been assigned subject headings.

If you want to download the entire *EarlyPrint* corpus, the texts are available on our [public Bitbucket repository](https://bitbucket.org/eplib/eebotcp/src/master/).

<!-- <form class="fr">
  <label>Search in:</label>
  <select id="metadataSelect"></select>
  <input type="text" id="metadataInput" />
</form> -->
<table id="metadataTable" class="display f6 compact">
  <thead>
    <tr class="header">
      <th>TCP ID <input style="width:inherit;" type="text" placeholder="Filter..." /></th>
      <th>Author <input style="width:inherit;" type="text" placeholder="Filter..." /></th>
      <th>Title <input style="width:inherit;" type="text" placeholder="Filter..." /></th>
      <th>Date<input style="width:inherit;" type="text" placeholder="Filter..." /></th>
      <th>Imprint<input style="width:inherit;" type="text" placeholder="Filter..." /></th>
      <th>Lang.<input style="width:inherit;" type="text" placeholder="Filter..." /></th>
      <th>Keywords<input style="width:inherit;" type="text" placeholder="Filter..." /></th>
      <th>ESTC<input style="width:inherit;" type="text" placeholder="Filter..." /></th>
      <th>STC/Wing<input style="width:inherit;" type="text" placeholder="Filter..." /></th>
    </tr>
  </thead>
  <tbody class="f7"></tbody>
</table>


<script src="/assets/tools/js/jquery-1.11.0.min.js?v=1500"></script><script src="/assets/tools/js/jquery-1.11.0.min.js?v=1500"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.20/b-1.6.1/b-html5-1.6.1/datatables.min.css"/>
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.20/b-1.6.1/b-html5-1.6.1/datatables.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/plug-ins/1.10.20/dataRender/ellipsis.js"></script>
<script>
var columns = [
  { data: 0,
    name: 'TCP ID',
    render: function(data, type, row) {
      var list = data.split(/ ; |, no\. /);
      var textId = list[2].replace(')','');
      if (type === 'display') {
        return `<div>${ textId }</div><div><a href='https://bitbucket.org/eplib/${ textId.slice(0,3) }/raw/master/${ textId }.xml' target='_blank'>EP XML</a></div><div><a href='https://ota.bodleian.ox.ac.uk/repository/xmlui/handle/20.500.12024/${textId}' target='_blank'>OTA Files</a></div>`
      } else { return textId; }
    },
    width: '80px'
  },
  { data: 3,
    name: 'Author',
    width: '10%'
    },
  { data: 4,
    name: 'Title',
    render: $.fn.dataTable.render.ellipsis( 100, true ),
    width: '250px'
    },
  { data: 6,
    name: 'Date',
    width: "80px"
    },
  { data: 5,
    name: 'Imprint',
    render: $.fn.dataTable.render.ellipsis( 50, true )
    },
  { data: 7,
    name: 'Lang.',
    width: "40px"
    },
  { data: 8,
    name: 'Keywords',
    render: $.fn.dataTable.render.ellipsis( 50, true )
    },
  { data: 1,
    name: 'ESTC',
    render: function(data, type, row) {
      if (data !== '') {
        if (data.indexOf('ESTC') !== -1) {
          var estc = data.split(' ')[1];
        } else { var estc = data; }
        if (type !== 'display') {
          return estc
        } else {
          return `<a href="http://estc.bl.uk/${estc}" target="_blank">${estc}</a>`
        }
      } else {
        return data
      }
    },
    width: "40px"
    },
  { data: 2,
    name: 'STC/Wing',
    width: "40px"
    }
]
$(document).ready( function () {
//  columns.forEach(col => {
//    if (col.name !== 'Download') {
//      var option = $("<option></option>").val(col.name).text(col.name);
//      $('#metadataSelect').append(option);
//    }
//    });

//  $('#metadataTable thead th').each( function () {
//        var title = $(this).text();
//	$(this).html( `<input type="text" placeholder="${title}" />` );
//    } );


  console.time("generateTable")
  var table = $('#metadataTable').DataTable({
    ajax: {
      url: "/assets/flatmetadata.json",
      dataSrc: ''
      },
    pageLength: 25,
    deferRender: true,
    autoWidth: true,
    dom: "liBptiBpr",
    buttons: [ {extend: "csv", text: "Download Metadata as CSV", filename: "earlyprint_metadata", exportOptions: {orthogonal: 'filter'} } ],
    columns: columns,
    "initComplete": function(settings, json) {
      console.timeEnd("generateTable");
    }
    });

    // Apply the search
    table.columns().every( function () {
        var that = this;

        $( 'input', this.header() ).on( 'keyup change clear', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
//  var col = "TCP ID";
//  $('#metadataSelect').on('change', function() {
//    col = this.value;
//    table.search('').columns().search( '' ).column(`${col}:name`).search( $('#metadataInput').val() ).draw();
//  });
//  $('#metadataInput').on( 'keyup', function () {
//    table.column(`${col}:name`).search( this.value ).draw();
//  });

} );
</script>

