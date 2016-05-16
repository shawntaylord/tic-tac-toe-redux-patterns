'use strict';
/* Reducers.js
  Functions that take the previousState and an action describing that SOMETHING
  HAPPENED, but not how the state changes in response. The reducer defines what
  ultimately happens.

  (previousState, action) => newState
*/

var reducers = {};

function updateCell(cell, action) {
  // cell - previous value in cell ('o' || 'x')
  switch (action.type) {
    case 'SET_X':
      return 'x';
    case 'SET_O':
      return 'o';
    case 'RESTART_GAME':
      return '';
    default:
      return cell;
  }
}

reducers.updateGrid = function(grid, action) {
  // maintain state of board
  grid = grid || ['', '', '', '', '', '', '', '', ''];
  grid.map(function(cell, index) {
    var output = cell;
    if (action.index === index || action.type === 'RESTART_GAME') {
      output = updateCell(cell, action);
    }
    return output;
  });
  return grid;
};

reducers.updateTurn = function(turn, action) {
  // maintain string with current player's turn ('x' or 'o')
  switch (action.type) {
    case 'GO_X':
      return 'x';
    case 'GO_O':
      return 'o';
    // SHOW_WINNER?
    case 'RESTART_GAME':
      return 'x';
    default:
      return turn || 'x';
  }
};

reducers.updateScore = function(score, action) {
  // keep track of number of wins for each player
  switch (action.type) {
    case 'GAME_COMPLETE':
      var newScore = {};
      newScore[action.winner] = score[action.winner] + 1;
      return Object.assign({}, newScore, score);
    default:
      return score || {x: 0, o: 0};
  }
};

reducers.updateWinningSequence = function(winningSequence, action) {
  // maintain list of grid cells that represent a winning sequence
  switch (action.type) {
    case 'GAME_COMPLETE':
      return action.sequence.slice();
    case 'RESTART_GAME':
      return [];
    default:
      return winningSequence || [];
  }
};

reducers.updatePlayer = function(player, action) {
  // choose the player's piece
  switch (action.type) {
    case 'PICK_SIDE':
      return action.side;
    default:
      return player || '';
  }
};

reducers.updateTurnCounter = function(turnCounter, action) {
  // maintain number of turns played
  switch (action.type) {
    case 'GO_X':
      return turnCounter + 1;
    case 'GO_O':
      return turnCounter + 1;
    case 'RESTART_GAME':
      return 0;
    default:
      return turnCounter || 0;

  }
};

module.exports = reducers;
