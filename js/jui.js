
/*
Cameron Napolitano
cameron_naplitano@student.uml.edu
UMass Lowell Student
91.61 GUI Progamming
11/26/2020
This file defines the scripts used by table.html based on JQuery UI
Implementation also based on: https://jqueryui.com/tabs/#manipulation
*/

var tabCounter = 0;
var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
var labelTemplate = '<a href="#tab-1" role="presentation" tabindex="-1" class="ui-tabs-anchor" id="ui-id-2">#{cont}</a>';

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

/*
Creates a multiplation table based on inputs provided by form.
*/
function createTable()
{
    // Intialize vars from form, rounding down
    var xstart = parseInt(document.getElementById('xstart').value);
    var xend   = parseInt(document.getElementById('xend').value);
    var ystart = parseInt(document.getElementById('ystart').value);
    var yend   = parseInt(document.getElementById('yend').value);
    
    // Construct table, row by row
    // The first loop constructs the column headers
    var table = [
        '<table class="table table-bordered">',
            '<thead>',
                '<tr>',
                    '<th scope="col" class="text-center diagonal">X</th>'].join('');
    var i;
    // Reverse direction if end is less than beginning
    // this is gross but I dont feel like refactoring
    if (xstart <= xend) {
        for (i = 0; i + xstart <= xend; i++) {
            var rowColor = colors[i % 7];
            var column = [
                    '<th scope="col" class="text-center ', rowColor, '">', i + xstart, '</th>'].join('');
            table = table.concat(column);
        }
    }
    else
    {
        for (i = 0; i + xend <= xstart; i++) {
            var rowColor = colors[i % 7];
            var column = [
                    '<th scope="col" class="text-center ', rowColor, '">', xstart - i, '</th>'].join('');
            table = table.concat(column);
        }        
    }

    // Complete the header and start the body
    var endHeader = [
            '</tr>',
        '</thead>',
        '<tbody>'].join('');
    table = table.concat(endHeader);

    // Insert row by row
    // Flip range if end < beginning
    // I still dont feel like refactoring
    // so mutant code it is
    var j;
    if (ystart <= yend) {
        for (i = 0; i + ystart <= yend; i++) {
            // Style values leading to diagonal
            var rowColor = colors[i % 7];
            var row = [
                '<tr>',
                    '<th scope="col" class="text-center ', rowColor,'">', i + ystart, '</th>'].join('');

            // Add a field
            // Account for flip scenario
            // have mercy on me...
            if (xstart <= xend) {
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
            }
            else {
                for (j = 0; j + xend <= xstart; j++) {
                    // Set color in relation to the diagonal
                    var columnColor = i > j ? rowColor : colors[j % 7];
                    // Add specific color along diagonal
                    var style = j === i ? 'diagonal' : '';

                    // Compute and insert product
                    var product = (xstart - j) * (i + ystart);
                    var bodyColumn = ['<th scope="col" class="text-center ', columnColor, ' ', style, '">', product, '</th>'].join('');
                    row = row.concat(bodyColumn);
                }
            }

            // Finish row and add to table
            row = row.concat('</tr>');
            table = table.concat(row);
        }
    }
    else {
        for (i = 0; i + yend <= ystart; i++) {
            // Style values leading to diagonal
            var rowColor = colors[i % 7];
            var row = [
                '<tr>',
                    '<th scope="col" class="text-center ', rowColor,'">', ystart - i, '</th>'].join('');

            // Add a field
            // Again, accounting for flip scenario
            // It's soooo gggrrrossss
            if (xstart <= xend) {
                for (j = 0; j + xstart <= xend; j++) {
                    // Set color in relation to the diagonal
                    var columnColor = i > j ? rowColor : colors[j % 7];
                    // Add specific color along diagonal
                    var style = j === i ? 'diagonal' : '';

                    // Compute and insert product
                    var product = (j + xstart) * (ystart - i);
                    var bodyColumn = ['<th scope="col" class="text-center ', columnColor, ' ', style, '">', product, '</th>'].join('');
                    row = row.concat(bodyColumn);
                }
            }
            else {
                for (j = 0; j + xend  <= xstart; j++) {
                // Set color in relation to the diagonal
                var columnColor = i > j ? rowColor : colors[j % 7];
                // Add specific color along diagonal
                var style = j === i ? 'diagonal' : '';

                // Compute and insert product
                var product = (xstart - j) * (ystart - i);
                var bodyColumn = ['<th scope="col" class="text-center ', columnColor, ' ', style, '">', product, '</th>'].join('');
                row = row.concat(bodyColumn);
                }
            }

            // Finish row and add to table
            row = row.concat('</tr>');
            table = table.concat(row);
        }
    }

    // Finish table and return
    table = table.concat('</tbody></table>');
    return table;
}
/*
Inserts a table into the active tab
*/
function insertTable() {
    var tabIndex = $('#tabs').tabs('option', 'active');
    if (typeof(tabIndex) != 'boolean') {
        var panelId = $(`ul li:nth-child(${++tabIndex})`).attr("aria-controls");
        $('#' + panelId).html(createTable());
    }
}

$(document).ready(function() {
    // Establish rules for validation
    $("#inputs").validate({
        rules: {
            xstart: {
                required: true,
                integer: true,
                // easier just to limit range than to try and validate # of entries
                range: [-50, 50]
            },
            xend: {
                required: true,
                integer: true,
                range: [-50, 50]
            },
            ystart: {
                required: true,
                integer: true,
                range: [-50, 50]
            },
            yend: {
                required: true,
                integer: true,
                range: [-50, 50]
            }
        },
      messages : {
            xstart: {
                required: "Please enter the starting value.",
                integer: "Please enter a whole number.",
                range: "Please enter a number between -50 and 50."
            },
            xend: {
                required: "Please enter the ending value.",
                integer: "Please enter a whole number.",
                range: "Please enter a number between -50 and 50."
            },
            ystart: {
                required: "Please enter the starting value.",
                integer: "Please enter a whole number.",
                range: "Please enter a number between -50 and 50."
            },
            yend: {
                required: "Please enter the ending value.",
                integer: "Please enter a whole number.",
                range: "Please enter a number between -50 and 50."
            }
        }
    });

    // Initialize sliders
    $( "#HorStartSlider" ).slider({
        min:  -50,
        max:   50,
        value:   0,
        slide: function( event, ui ) { $("#xstart").val(ui.value); insertTable(); }
    });
    $( "#HorEndSlider" ).slider({
        min:  -50,
        max:   50,
        value: 50,
        slide: function( event, ui ) { $("#xend").val(ui.value); insertTable(); }
    });
    $( "#VertStartSlider" ).slider({
        min:  -50,
        max:   50,
        value: 0,
        slide: function( event, ui ) { $("#ystart").val(ui.value); insertTable(); }
    });
    $( "#VertEndSlider" ).slider({
        min:  -50,
        max:   50,
        value: 50,
        slide: function( event, ui ) { $("#yend").val(ui.value); insertTable(); }
    });

    // Connect input boxes to sliders
    $("#xstart").on("input", function() {
        if ($('#inputs').valid()){
            $( "#HorStartSlider" ).slider('value', $(this).val());
            insertTable();
        }
    });
    $("#xend").on("input", function() {
        if ($('#inputs').valid()){
            $( "#HorEndSlider" ).slider('value', $(this).val());
            insertTable();
        }
    });
    $("#ystart").on("input", function() {
        if ($('#inputs').valid()) {
            $( "#VertStartSlider" ).slider('value', $(this).val());
            insertTable();
        }
    });
    $("#yend").on("input", function() {
        if ($('#inputs').valid()){
            $( "#VertEndSlider" ).slider('value', $(this).val());
            insertTable();
        }
    });

    // Initialize Tabs
    var tabs = $( "#tabs" ).tabs({
        load: function(event, ui) {
            if ($('#inputs').valid()) {
                ui.panel.html(createTable());
            }
        }
    });

    // Cause close icon to remove relative tab
    tabs.on( "click", "span.ui-icon-close", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
    });

    // Remove all tabs
    $("#del").click(function () { 
        $('#tabs .ui-tabs-nav a').each(function() {
        // Remove tab and panel
        var panelId = $(this).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        });
        tabs.tabs( "refresh" );
    });
    
    // Link Add button to to tabs
    $("#add").on("click", function() {
        if ($('#inputs').valid()) {            
            // Initialize content of new tab
            var label = createLabel();
            id = "tab-" + tabCounter,
            li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) );
    
            // Add new tab
            tabs.find( ".ui-tabs-nav" ).append( li );
            tabs.append( "<div id='" + id + "' class='scrollit'>" + createTable() + "</div>" );
            tabs.tabs( "refresh" );
            tabCounter++;
        }
    })
});

/* Helper function for creating tab label */
function createLabel() {
    var xstart = parseInt(document.getElementById('xstart').value);
    var xend   = parseInt(document.getElementById('xend').value);
    var ystart = parseInt(document.getElementById('ystart').value);
    var yend   = parseInt(document.getElementById('yend').value);

    return xstart + '-' + xend + ' x ' + ystart + '-' + yend;
}
