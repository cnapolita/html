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

// Generic Tile Class
class Tile {
    static currentID = 0;
    static imgNameFormat = '../graphics_data/tiles/Scrabble_Tile_?.jpg'

    constructor(type) {
        this.type = type;
        this.ID = 'tile' + Tile.currentID++;
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

$(document).ready(function() {
    
    $('.board').droppable();
    $('#holder').droppable();

    // Copy and shuffle pieces
    var workingPieces = pieces;
    workingPieces = shuffle(workingPieces);

    // Initialize Board
    var holder_pieces = [];
    for (var i = 0; i < 7; i++) {
        var piece = new Tile(workingPieces.pop());
        holder_pieces.push(piece);
    }
});