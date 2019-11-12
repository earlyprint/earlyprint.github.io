---
layout: page
title: Download
permalink: /download/
---

Click on a link to download any of the *EarlyPrint* XML texts. You can also filter and download metadata by searching and clicking "Download as CSV."

<form class="fr">
  <label>Search in:</label>
  <select id="metadataSelect"></select>
  <input type="text" id="metadataInput" />
</form>
<table id="metadataTable" class="display">
  <thead>
    <tr class="header">
      <th>TCP ID</th>
      <th>Author</th>
      <th>Title</th>
      <th>Date</th>
      <th>Proquest ID</th>
      <th>ESTC ID</th>
      <th>STC or Wing No.</th>
      <th>Thomason Tracts No.</th>
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
  { data: 'tcp',
    name: 'TCP ID',
    render: function(data, type, row) {
      return `<a href='https://bitbucket.org/shcdemo/${ data.slice(0,3) }/raw/master/${ data }.xml' _target='blank'>${ data }</a>`
    }
  },
  { data: 'author',
    name: 'Author'
    },
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
  { data: 'stc_wing',
    name: 'STC or Wing No.'
    },
  { data: 'thomason',
    name: 'Thomason Tracts No.'
  }
]
$(document).ready( function () {
  columns.forEach(col => {
    var option = $("<option></option>").val(col.name).text(col.name);
    $('#metadataSelect').append(option);
    });

  $.ajax({
    url: "/assets/metadata.csv"
    }).done(function(data) {
      var d = $.csv.toObjects(data);
      var table = $('#metadataTable').DataTable({
        pageLength: 25,
        deferRender: true,
        autoWidth: false,
        data: d,
        dom: "l<'fr'B>tipr",
        buttons: [ {extend: "csv", text: "Download as CSV"} ],
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
