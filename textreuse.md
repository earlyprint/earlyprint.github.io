---
layout: page
title: Text Reuse
permalink: /textreuse/
---

Search to filter the table, and click on a link to view a text reuse report.

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
      <th>Lang.</th>
      <th>Keywords</th>
      <th>ESTC</th>
      <th>STC/Wing</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

<script src="/assets/tcp_ids_with_reports.js?v=1500"></script>

<script src="/assets/tools/js/jquery-1.11.0.min.js?v=1500"></script><script src="/assets/tools/js/jquery-1.11.0.min.js?v=1500"></script>
<script src="/assets/tools/js/jquery.csv.min.js?v=1500"></script>
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
      if (tcp_ids_with_reports.has(textId)) {
        if (list[1] === 'phase 1') {
          return `<div>${ textId }</div><div><a href='https://ada.artsci.wustl.edu/all_to_all_html_outputs/${ textId }.html' target='_blank'>Text reuse report</a></div>`;
        }
        else {
          return `<div>${ textId }</div><div><a href='https://ada.artsci.wustl.edu/all_to_all_phase2/${ textId }.html' target='_blank'>Reuse report (pswd req)</a></div>`;
        }
      } 
      else { 
        return `<div>${ textId }</div><div>Not available</div>`; 
      }
    },
    width: '80px'
  },
  { data: 3,
    name: 'Author',
    width: '15%'
    },
  { data: 4,
    name: 'Title',
    render: $.fn.dataTable.render.ellipsis( 115, true ),
    width: '30%'
    },
  { data: 6,
    name: 'Date',
    render: function(data, type, row) {
      if (type === 'sort') {
        var match = data.match(/[\dl][^\d,\s]?\d[^\d,\s]?[\-\?\d][^\d]?[\-\?\d]/)
        if (match) {
          var number = match[0].replace('l', '1').replace('-', '?').replace(/[^\d\?]/, '')
          return number;
        } else {
          return data;
        }
      }
      else { return data; }
    }
    },
  { data: 5,
    name: 'Imprint',
    render: $.fn.dataTable.render.ellipsis( 50, true ),
    width: '20%'
    },
  { data: 7,
    name: 'Lang.'
    },
  { data: 8,
    name: 'Keywords',
    render: $.fn.dataTable.render.ellipsis( 50, true ),
    width: '15%'
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
    }
    },
  { data: 2,
    name: 'STC/Wing'
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
