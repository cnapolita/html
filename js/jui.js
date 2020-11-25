
/*
Cameron Napolitano
cameron_naplitano@student.uml.edu
UMass Lowell Student
91.61 GUI Progamming
11/12/2020
This file defines the scripts used by table.html based on JQuery
Implementation based on: https://jqueryui.com/tabs/#manipulation
*/

/*
Creates a multiplation table based on inputs provided by form.
*/

var tabID = 0;
var tabTemplate = '<li><a href="#{href}"></a>Tab<span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span></li>';

function createTable()
{
    // Intialize vars from form, rounding down
    var xstart = parseInt(document.getElementById('xstart').value);
    var xend   = parseInt(document.getElementById('xend').value);
    var ystart = parseInt(document.getElementById('ystart').value);
    var yend   = parseInt(document.getElementById('yend').value);
    
    // Define color list
    var colors = [
        'color-one', 
        'color-two',
        'color-three',
        'color-four',
        'color-five',
        'color-six',
        'color-seven'
    ];

    // Construct table, row by row
    // The first loop constructs the column headers
    var table = [
        '<thead>',
            '<tr>',
                '<th scope="col" class="text-center diagonal">X</th>'].join('');
    var i;
    for (i = xstart; i <= xend; i++) {
        var rowColor = colors[(i - xstart) % 7];
        var column = [
                '<th scope="col" class="text-center ', rowColor, '">', i, '</th>'].join('');
        table = table.concat(column);
    }

    // Complete the header and start the body
    var endHeader = [
            '</tr>',
        '</thead>',
        '<tbody>'].join('');
    table = table.concat(endHeader);

    // Insert a row
    var j;
    for (i = 0; i + ystart <= yend; i++) {
        // Style values leading to diagonal
        var rowColor = colors[i % 7];
        var row = [
            '<tr>',
                '<th scope="col" class="text-center ', rowColor,'">', i + ystart, '</th>'].join('');

        // Add a field
        for (j = 0; j + xstart <= xend; j++) {
            // Set color in relation to the diagonal
            var columnColor = i > j ? rowColor : colors[j % 7];
            // Add specific color along diagonal
            var style = j === i ? 'diagonal' : '';

            // Compute and insert product
            var product = (j + xstart) * (i + ystart);
            var bodyColumn = ['<th scope="col" class="text-center ', columnColor, ' ', style, '">', product, '</th>'].join('');
            row = row.concat(bodyColumn);
        }

        // Finish row and add to table
        row = row.concat('</tr>');
        table = table.concat(row);
    }

    // Finish table and inject
    table = table.concat('</tbody>');
    document.getElementById('multTable').innerHTML = table;
    return;
}

$(document).ready(function() {
    $('#inputs').submit( function() {
        // Swap bounds if start > end for x...
        if ( parseInt( $('#xstart').val()) > parseInt( $('#xend').val()) ) {
            var temp = $('#xstart').val() ;
            $('#xstart').val( $('#xend').val() ) ;
            $('#xend').val( temp ) ;
          }
        // ... for y
        if ( parseInt( $('#ystart').val()) > parseInt( $('#yend').val())) {
            var temp = $('#ystart').val();
            $('#ystart').val($('#yend').val());
            $('#yend').val(temp);
          }
        });

    // Establish rules for validation
    $("#inputs").validate({
        rules: {
            xstart: {
                required: true,
                integer: true,
                // easier just to limit range than to try and validate # of entries
                range: [-100, 100]
            },
            xend: {
                required: true,
                integer: true,
                range: [-100, 100]
            },
            ystart: {
                required: true,
                integer: true,
                range: [-100, 100]
            },
            yend: {
                required: true,
                integer: true,
                range: [-100, 100]
            }
        },
      messages : {
            xstart: {
                required: "Please enter the starting range for the horizontal x-axis",
                integer: "The value is between whole numbers. Please enter a whole number."
            },
            xend: {
                required: "Please enter the ending range for the horizontal x-axis",
                integer: "The value is between whole numbers. Please enter a whole number."
            },
            ystart: {
                required: "Please enter the starting range for the vertical y-axis",
                integer: "The value is between whole numbers. Please enter a whole number."
            },
            yend: {
                required: "Please enter the ending range for the vertical y-axis",
                integer: "The value is between whole numbers. Please enter a whole number."
            }
        },
        // Set default behavior upon submit
        submitHandler: createTable
    });

    // Initialize sliders
    $( "#HorStartSlider" ).slider({
        min:  -100,
        max:   100,
        value:   0,
        slide: function( event, ui ) { $("#xstart").val(ui.value); createTable(); }
    });
    $( "#HorEndSlider" ).slider({
        min:  -100,
        max:   100,
        value: 50,
        slide: function( event, ui ) { $("#xend").val(ui.value); createTable(); }
    });
    $( "#VertStartSlider" ).slider({
        min:  -100,
        max:   100,
        value: 0,
        slide: function( event, ui ) { $("#ystart").val(ui.value); createTable(); }
    });
    $( "#VertEndSlider" ).slider({
        min:  -100,
        max:   100,
        value: 50,
        slide: function( event, ui ) { $("#yend").val(ui.value); createTable(); }
    });

    // Connect input boxes to sliders
    $("#xstart").on("input", function() {
        if ($(this).valid()){
            $( "#HorStartSlider" ).slider('value', $(this).val());
        }
    });
    $("#xend").on("input", function() {
        if ($(this).valid()){
            $( "#HorEndSlider" ).slider('value', $(this).val());
        }
    });
    $("#ystart").on("input", function() {
        if ($(this).valid()){
            $( "#VertStartSlider" ).slider('value', $(this).val());
        }
    });
    $("#yend").on("input", function() {
        if ($(this).valid()){
            $( "#VertEndSlider" ).slider('value', $(this).val());
        }
    });

    // Initialize Tabs
    var tabs = $( "#tabs" ).tabs();
    // Close icon: removing the tab on click
    tabs.on( "click", "span.ui-icon-close", function() {
        var panelId = $( this ).closest( "li" ).remove();
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
    });
    
    // Link Add button to to tabs
    $("#add").on("click", function() {
        window.alert('hi');
        var id = "tabs-" + tabID,
            li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ));

        window.alert('bye');
        tabs.find( ".ui-tabs-nav" ).append( li );
        tabs.append( "<div id='" + id + "'><p>Hello!</p></div>" );
        tabs.tabs( "refresh" );
    })
});
