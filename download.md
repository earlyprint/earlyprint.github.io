---
layout: page
title: Download
permalink: /download/
---

Search to filter the table, and click on a link to download any of the corrected and linguisticaly-annotated *EarlyPrint* XML texts, or the original *Text Creation Partnership* XML. Some fields have been truncated for space, but the full field is available on mouseover and when searching and downloading the data.

We provide Library of Congress Subject Headings when available, in the "Keywords" column. Keep in mind that only a portion of the texts have been assigned subject headings.

You can also filter and download metadata by searching and clicking "Download Metadata as CSV" at the bottom of this page.

<form class="fr">
  <label>Search in:</label>
  <select id="metadataSelect"></select>
  <input type="text" id="metadataInput" />
</form>
<table id="metadataTable" class="display compact">
  <thead>
    <tr class="header">
      <th>TCP ID</th>
      <th>Author</th>
      <th>Title</th>
      <th>Date</th>
      <th>Imprint</th>
      <!-- <th>Signatures</th> -->
      <th>Lang.</th>
      <th>Keywords</th>
      <!-- <th>Proquest ID</th> -->
      <th>ESTC ID</th>
      <th>STC No.</th>
      <!-- <th>Thomason Tracts No.</th> -->
      <!-- <th>Download</th> -->
    </tr>
  </thead>
  <tbody></tbody>
</table>


<script src="/assets/tools/js/jquery-1.11.0.min.js?v=1500"></script><script src="/assets/tools/js/jquery-1.11.0.min.js?v=1500"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.20/b-1.6.1/b-html5-1.6.1/datatables.min.css"/>
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.20/b-1.6.1/b-html5-1.6.1/datatables.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/plug-ins/1.10.20/dataRender/ellipsis.js"></script>
<script>
var columns = [
  { data: 15,
    name: 'TCP ID',
    render: function(data, type, row) {
      var list = data.split(/ ; |, no\. /);
      var textId = list[2].replace(')','');
      if (type === 'display') {
        if (list[1] === 'phase 1') {
          return `<div>${ textId }</div><div><a href='https://bitbucket.org/shcdemo/${ textId.slice(0,3) }/raw/master/${ textId }.xml' target='_blank'>EP XML</a></div><div><a href='https://raw.githubusercontent.com/textcreationpartnership/${textId}/master/${textId}.xml' target='_blank'>TCP XML</a></div>`
        } else { return `${ textId }\n(Available 01/2021)` }
      } else { return textId; }
    },
    width: '75px'
  },
  { data: 6,
    name: 'Author',
    width: '15%'
    },
  { data: 7,
    name: 'Title',
    render: $.fn.dataTable.render.ellipsis( 115, true ),
    width: '30%'
    },
  { data: 11,
    name: 'Date'
    },
  { data: 10,
    name: 'Imprint',
    render: $.fn.dataTable.render.ellipsis( 50, true ),
    width: '20%'
    },
  { data: 13,
    name: 'Lang.'
    },
  { data: 14,
    name: 'Keywords',
    render: $.fn.dataTable.render.ellipsis( 50, true ),
    width: '15%'
    },
  { data: 2,
    name: 'ESTC ID',
    render: function(data, type, row) {
      if (data !== '') {
        var estc = data.split(' ')[1]
        if (type !== 'display') {
          return estc
        } else {
          return `<a href="http://estc.bl.uk/${estc}" target="_blank">${estc}</a>`
        }
      } else {
        return data
      }
    }
    },
  { data: 1,
    name: 'STC No.',
    render: function(data, type, row) {
      if (data !== '') {
        return data.split(' ')[1]
      } else {
        return data
      }
    }
    }
]
$(document).ready( function () {
  columns.forEach(col => {
    if (col.name !== 'Download') {
      var option = $("<option></option>").val(col.name).text(col.name);
      $('#metadataSelect').append(option);
    }
    });

  console.time("generateTable")
  var table = $('#metadataTable').DataTable({
    ajax: {
      url: "/assets/flatmetadata.json",
      dataSrc: ''
      },
    pageLength: 25,
    deferRender: true,
    autoWidth: false,
    dom: "liBptiBpr",
    buttons: [ {extend: "csv", text: "Download Metadata as CSV", filename: "earlyprint_metadata", exportOptions: {orthogonal: 'filter'} } ],
    columns: columns,
    "initComplete": function(settings, json) {
      console.timeEnd("generateTable");
    }
    });
  var col = "TCP ID";
  $('#metadataSelect').on('change', function() {
    col = this.value;
    table.search('').columns().search( '' ).column(`${col}:name`).search( $('#metadataInput').val() ).draw();
  });
  $('#metadataInput').on( 'keyup', function () {
    table.column(`${col}:name`).search( this.value ).draw();
  });

} );
</script>
