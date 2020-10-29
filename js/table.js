/*
Cameron Napolitano
cameron_naplitano@student.uml.edu
UMass Lowell Student
91.61 GUI Progamming
10/15/2020
This file defines the scripts used by table.html
*/

/*
Creates a multiplation table based on inputs provided by form.
Creates an error message instead on bad inputs.
*/
function createTable()
{
    // Prevent form submission from reseting page
    event.preventDefault();

    // Clear Error Message
    document.getElementById('error').innerHTML = '';

    // Intialize vars from form, rounding down
    var xstart = parseInt(document.getElementById('xstart').value);
    var xend   = parseInt(document.getElementById('xend').value);
    var ystart = parseInt(document.getElementById('ystart').value);
    var yend   = parseInt(document.getElementById('yend').value);

    //Check for empty fields
    if(isNaN(xstart)) {
        document.getElementById('error').innerHTML = 'ERROR: The start value for the horizontal axis is not initialized or invalid.';
        return;
    }
    if(isNaN(xend)) {
        document.getElementById('error').innerHTML = 'ERROR: The end value for the horizontal axis is not initialized or invalid.';
        return;
    }
    if(isNaN(ystart)) {
        document.getElementById('error').innerHTML = 'ERROR: The start value for the vertical axis is not initialized or invalid.';
        return;
    }
    if(isNaN(yend)) {
        document.getElementById('error').innerHTML = 'ERROR: The end value for the vertical axis is not initialized or invalid.';
        return;
    }

    // Ensure start values are less than or equal to end values
    if(xstart > xend) {
        document.getElementById('error').innerHTML = 'ERROR: The start value for the horizontal axis is greater than the end value.';
        return;
    }
    if (ystart > yend) {
        document.getElementById('error').innerHTML = 'ERROR: The start value for the vertical axis is greater than the end value.';
        return;
    }

    // Check if range is too big
    if ((xend - xstart + 1) * (yend - ystart + 1) > 100000) {
        document.getElementById('error').innerHTML = 'ERROR: The table is too large. The maximum number of elements is 100,000 (100 x 100).';
        return;
    }
    
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