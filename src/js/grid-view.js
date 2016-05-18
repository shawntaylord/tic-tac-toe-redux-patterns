'use strict';

var utils = require('./utils');

function GridView(grid) {
  this.$tableCells = utils.qsa('TTT-cell', grid);
}

GridView.prototype.render = function(whatToRender, data) {
  this[whatToRender](data);
};

GridView.prototype.grid = function(grid) {
  var $cell;

  grid.forEach(function(cell, index) {
    $cell = this.$tableCells[index];
    if (!$cell.classList.contains('TTT-cell--filled')) {
      var div = document.createElement('div');
      if (cell === 'o') {
        div.classList.add('TTT-cell--o');
      } else {
        div.classList.add('TTT-cell--x');
      }
      $cell.innerHtml = div;
    }

  }.bind(this));
};

GridView.prototype.winner = function(winner) {
  winner.forEach(function(cellIndex) {
    var $cell = this.$tableCells[cellIndex];
    $cell.classList.add('TTT-cell--winner');
  }.bind(this));
};

module.exports = function(grid) {
  return new GridView(grid);
};
