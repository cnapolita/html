/*
Cameron Napolitano
cameron_naplitano@student.uml.edu
UMass Lowell Student
91.61 GUI Progamming
12/16/2020
This file defines the scripts used by scrabble.html.
*/

/* A simple implementation of the pieces, but easy to understand while accurately recreating the probability involved */
var pieces = [     
    'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
    'B', 'B',
    'C', 'C',
    'D', 'D', 'D', 'D',
    'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
    'F', 'F',
    'G', 'G', 'G',
    'H', 'H',
    'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I',
    'J',
    'K',
    'L', 'L', 'L', 'L',
    'M', 'M',
    'N', 'N', 'N', 'N', 'N', 'N',
    'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
    'P', 'P',
    'Q',
    'R', 'R', 'R', 'R', 'R', 'R',
    'S', 'S', 'S', 'S',
    'T', 'T', 'T', 'T', 'T', 'T',
    'U', 'U', 'U', 'U',
    'V', 'V',
    'W', 'W',
    'X',
    'Y', 'Y',
    'Z',
    'Blank', 'Blank'
]
var PieceCosts = {
    'A': 1,
    'B': 3,
    'C': 3,
    'D': 2,
    'E': 1,
    'F': 4,
    'G': 2,
    'H': 4,
    'I': 1,
    'J': 8,
    'K': 5,
    'L': 1,
    'M': 3,
    'N': 1,
    'O': 1,
    'P': 3,
    'Q': 10,
    'R': 1,
    'S': 1,
    'T': 1,
    'U': 1,
    'V': 4,
    'W': 4,
    'X': 8,
    'Y': 4,
    'Z': 10,
    'Blank': 0
}

// NOTE: not certain about the scope of ready
// Copy and shuffle pieces
var workingPieces = [...pieces];
shuffle(workingPieces);

// Dictionary of all pieces
var holder_pieces = {};

// Current Word & Score
var current_word = ['_', '_', '_', '_', '_', '_', '_'];
var current_score = 0;

// IDs of Letters on board so we know which ones to remove
var board_letter_IDs = [];

// Generic Tile Class
class Tile {
    static currentID = 7;
    static imgNameFormat = '../graphics_data/tiles/Scrabble_Tile_?.jpg'

    constructor(type) {
        this.type = type;
        this.isBlank = (type === 'Blank');
        this.ID = Tile.currentID++;
        this.location = 'holder';
        
        // Construct html
        var html = [
            '<div id=', this.ID,' class="col-2">',
                '<img class="tile" src="', Tile.imgNameFormat.replace('?', type), '" alt="TILE">',
            '</div>'].join('');
        $('#holder').append(html);
        $('#' + this.ID).draggable({
            snap: '.board',
            inner: true,
            revert: 'invalid'
        });
    }

    
}
// Shuffle algorithm for the Pieces
// Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  
    return array;
}

// Populates board with numberOfPieces as the number of pieces to add.
function populateBoard(numberOfPieces) {
    for (var i = 0; i < numberOfPieces && workingPieces.length > 0; i++) {
        var piece = new Tile(workingPieces.pop());
        holder_pieces[piece.ID] = piece;
    }
    $('#remain').text('pieces remaing: ' + workingPieces.length);
}
$(document).ready(function() {
    // Define board behavior
    $('.board').droppable({drop: function(event, ui) {
            // Get IDs
            var piece_ID = ui.draggable.attr('id');
            var board_ID = $(this).attr('id');

            // Check if the tile moved
            var tile = holder_pieces[piece_ID];
            if (tile.location === board_ID) {
                // Nothing has changed
                return;
            }

            // Update old location
            if (tile.location != 'holder') {
                current_word[tile.location] = '_';
                $('#word').text('current word:' + current_word.join(''));

            }

            // Prompt user to set blank value
            // if (tile.isBlank) {
            //     var dialog = [
            //         '<div id="dialog', piece_ID,'" title="Select Letter">',
            //             '<input id="input', piece_ID, '" type="text" pattern="[A-Z]">',
            //             '<button id="button', piece_ID, '" type="button" class="btn btn-secondary col">Submit</button>',
            //         '</div>'].join('');
            //     $('body').append(dialog);
            //     $('#dialog' + piece_ID).dialog();
            //     $('#button' + piece_ID).click(function() {
            //         // get value
            //         var id = $(this).attr('id').splice(-1);
            //         window.alert(id);
            //         var val = $('#button' + id).val();
                    
            //         // Update tile
            //         $('#' + id).find('img').attr('src', Tile.imgNameFormat.replace('?', val));
            //         holder_pieces[id].type = val;

            //         // Remove this block
            //         $('.ui-dialog').remove();
            //     });

            // }
            tile.location = board_ID;
            // Get and assign letter
            var new_letter = tile.type;
            current_word[board_ID] = new_letter;
            $('#word').text('current word:' + current_word.join(''));

            // Add to used pieces list
            board_letter_IDs.push(piece_ID);
        }
    });
    $('#holder').droppable({drop: function(event, ui) {
        // Update tile location
        var piece_ID = ui.draggable.attr('id');
        var tile = holder_pieces[piece_ID];
        var board_ID = tile.location;
        if (board_ID != 'holder') {
            holder_pieces[piece_ID].location = 'holder';

            //  Update word
            current_word[board_ID] = '_';
            $('#word').text('current word: ' + current_word.join(''));

            // Remove from board letters       
            var index = board_letter_IDs.indexOf(piece_ID);
            if (index != -1) {
                board_letter_IDs.splice(index, 1);
            }
        }
    }});

    // Initialize Board
    populateBoard(7);

    // Initialize Buttons
    $('#submit').click(function() {
        // Verify and Get Word
        var i;
        var word = '';
        var score = 0;
        for (i = 0; i < 6; i++) {
            var letter = current_word[i];
            if (letter === '_')
                break;

            // Add letter and compute
            word += letter;
            var multiplier = (i === 1 || i === 5) ? 2 : 1;
            var tile_cost = PieceCosts[letter];
            score += multiplier * tile_cost;
        }

        // Look for any left over characters
        for (++i; i < 6; i++) {
            if (current_word[i] != '_') {
                // NOTE: This should display some error, but for now we will return
                return
            }
        }

        if (word.length === 0) {
            // NOTE: Should also error here
            return
        }

        // Update html
        current_score += score;
        $('#score').text('score: ' + current_score.toString());
        current_word = ['_', '_', '_', '_', '_', '_', '_'];
        $('#word').text('current word:' + current_word.join(''));

        // Remove used letters from play
        for (var j = 0; j < board_letter_IDs.length; j++) {
            var id = board_letter_IDs[j];
            $('#' + id).remove();
            delete holder_pieces[id];
        }

        // Get new letters
        populateBoard(board_letter_IDs.length);

        // Reset
        board_letter_IDs = [];
    });
    $('#reset').click(function() {
        // Reset the current round
        current_word = ['_', '_', '_', '_', '_', '_', '_'];
        $('#word').text('current word:' + current_word.join(''));

        // Remove pieces and return to sack
        for (id in holder_pieces) {
            $('#' + id).remove();
            workingPieces.push(holder_pieces[id].type);
            shuffle(workingPieces);
        }
        
        // Reset state variables
        holder_pieces = {};
        board_letter_IDs = [];

        // Re-populate rack
        populateBoard(7);
        
    });
    $('#restart').click(function() {
        // Start a new game
        current_word = ['_', '_', '_', '_', '_', '_', '_'];
        $('#word').text('current word:' + current_word.join(''));
        current_score = 0;
        $('#score').text('score: ' + current_score);

        // Reset state variables
        holder_pieces = {};
        board_letter_IDs = [];

        // Copy and shuffle
        workingPieces = [...pieces];
        shuffle(workingPieces);

        // Remove all tiles
        $('#holder').empty();
        populateBoard(7);
    });
});