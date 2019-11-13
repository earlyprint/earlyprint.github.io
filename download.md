---
layout: page
title: Download
permalink: /download/
---

Search to filter the table, and click on a link to download any of the corrected and linguisticaly-annotated *EarlyPrint* XML texts, or the original *Text Creation Partnership* XML.

You can also filter and download metadata by searching and clicking "Download Metadata as CSV" at the bottom of this page.

<form class="fr">
  <label>Search in:</label>
  <select id="metadataSelect"></select>
  <input type="text" id="metadataInput" />
</form>
<table id="metadataTable" class="display">
  <thead>
    <tr class="header">
      <th>TCP ID</th>
      <!-- <th>Author</th> -->
      <th>Title</th>
      <th>Date</th>
      <th>Proquest ID</th>
      <th>ESTC ID</th>
      <th>STC No.</th>
      <!-- <th>Thomason Tracts No.</th> -->
      <th>VID</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>


<script src="/assets/tools/js/jquery-1.11.0.min.js?v=1500"></script><script src="/assets/tools/js/jquery-1.11.0.min.js?v=1500"></script>
<script src="/assets/tools/js/jquery.csv.min.js?v=1500"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.20/b-1.6.1/b-html5-1.6.1/datatables.min.css"/>
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.20/b-1.6.1/b-html5-1.6.1/datatables.min.js"></script>
<script>
var columns = [
  { data: 'dlps',
    name: 'TCP ID',
    render: function(data, type, row) {
      return `${data}<div><a href='https://bitbucket.org/shcdemo/${ data.slice(0,3) }/raw/master/${ data }.xml' target='_blank'>EP XML</a></div><div><a href='https://raw.githubusercontent.com/textcreationpartnership/${data}/master/${data}.xml' target='_blank'>TCP XML</a></div>`
    },
    width: '75px'
  },
  /*{ data: 'author',
    name: 'Author'
    },*/
  { data: 'title',
    name: 'Title'
    },
  { data: 'date',
    name: 'Date'
    },
  { data: 'proquest',
    name: 'Proquest ID'
    },
  { data: 'estc',
    name: 'ESTC ID'
    },
  { data: 'stc',
    name: 'STC No.'
    },
  { data: 'vid',
    name: 'VID'
  }
]
$(document).ready( function () {
  columns.forEach(col => {
    var option = $("<option></option>").val(col.name).text(col.name);
    $('#metadataSelect').append(option);
    });

  $.ajax({
    url: "/assets/flatmetadata.csv"
    }).done(function(data) {
      var d = $.csv.toObjects(data, {separator: "\t"});
      var table = $('#metadataTable').DataTable({
        pageLength: 25,
        deferRender: true,
        autoWidth: false,
        scrollY: '500px',
        data: d,
        dom: "ltiBpr",
        buttons: [ {extend: "csv", text: "Download Metadata as CSV"} ],
        columns: columns
        });
      var col = "TCP ID";
      $('#metadataSelect').on('change', function() {
        col = this.value;
        table.search('').columns().search( '' ).column(`${col}:name`).search( $('#metadataInput').val() ).draw();
      });
      $('#metadataInput').on( 'keyup', function () {
        table.column(`${col}:name`).search( this.value ).draw();
      });

      })

} );
</script>
