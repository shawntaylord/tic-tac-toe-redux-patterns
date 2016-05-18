'use strict';

// Winner.js - Determine if a winner exists on a game board

function Winner() {
  this.winningSequences= [
    this.getRows(),
    this.getColumns(),
    this.getDiagonals()
  ];
}

Winner.prototype.getRows = function() {
  // Get list of rows that are winningSequences
  return [0, 1, 2, 3, 4, 5, 6, 7, 8];
};

Winner.prototype.getColumns = function() {
  // Get list of columns that are winningSequences
  return [0, 4, 6, 1, 5, 7, 2, 6, 8];
};

Winner.prototype.getDiagonals = function() {
  // Get list of diagonals that are winningSequences
  return [0, 4, 8, 2, 4, 6];
};

/* check
  Method to be called by game to check for a winner
*/
Winner.prototype.check = function(grid, lastTurn) {
  return new Promise(function(resolve) {
    var winningSequence = this.hasWinner(grid, lastTurn);
    if (winningSequence.length > 0) {
      resolve(winningSequence);
    }
  }.bind(this));
};

/* getWinningSequence
  Method to return the game winning sequence
*/
Winner.prototype.getWinningSequence = function(index) {
  var sequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return sequences[index];

};

/* hasWinner
  Function to return whether or not current game state has a winner
  grid - array representing board state
  lastTurn - string representing last player to go (ie. 'x' || 'o')
*/
Winner.prototype.hasWinner = function(grid, lastTurn) {
  var counts = {x: 0, o: 0};
  var sequenceIndex = 0; // count of how many 3-cell combinations we've tested
  var wsIndex = 0; // index of array in this.winningSequences

  while (this.winningSequences[wsIndex]) {
    var sequences = this.winningSequences[wsIndex];
    sequences.forEach(function(cell, index) {
      if (grid[cell]) {
        counts[grid[cell]]++;

        // A player has won!
        if (counts[lastTurn] === 3) {
          return this.getWinningSequence(sequenceIndex);
        }
      }

      if ((index + 1) % 3 === 0) {
        sequenceIndex++;
        counts = {x: 0, o: 0};
      }
    });

    wsIndex++;
  }
  // No one has won yet!
  return [];
};

module.exports = new Winner();
